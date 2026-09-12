export class AIRouter {
  constructor(config = {}) {
    this.db = config.supabaseClient;
    this.userId = config.userId;
    this.model = config.model || 'claude';
    this.apiKeys = config.apiKeys || {};
    this.timeout = config.timeout || 30000;
    this.maxRetries = config.maxRetries || 3;
    this.fallbackModels = { claude: 'gpt', gpt: 'gemini', gemini: 'claude' };
  }

  async sendMessage(messages, options = {}) {
    const primaryModel = options.model || this.model;
    const maxAttempts = options.allowFallback !== false ? 3 : 1;
    let lastError;
    const modelsToTry = this.getModelSequence(primaryModel);

    for (let i = 0; i < Math.min(maxAttempts, modelsToTry.length); i++) {
      const model = modelsToTry[i];
      try {
        return await this.callModelAPI(model, messages, options);
      } catch (error) {
        lastError = error;
        if (i < modelsToTry.length - 1) {
          console.warn(`${model} falhou, tentando próximo modelo...`, error);
          await this.delay(1000 * (i + 1));
        }
      }
    }

    throw lastError || new Error('Todas as tentativas de API falharam');
  }

  getModelSequence(primaryModel) {
    const sequence = [primaryModel];
    const fallback = this.fallbackModels[primaryModel];
    if (fallback) sequence.push(fallback);
    const remaining = ['claude', 'gpt', 'gemini'].filter(m => !sequence.includes(m));
    return sequence.concat(remaining);
  }

  async callModelAPI(model, messages, options) {
    const apiKey = await this.getAPIKey(model);
    if (!apiKey) throw new Error(`Nenhuma chave API configurada para ${model}`);

    switch (model) {
      case 'claude':
        return this.callClaudeAPI(apiKey, messages, options);
      case 'gpt':
        return this.callOpenAIAPI(apiKey, messages, options);
      case 'gemini':
        return this.callGeminiAPI(apiKey, messages, options);
      default:
        throw new Error(`Modelo não suportado: ${model}`);
    }
  }

  async callClaudeAPI(apiKey, messages, options) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: options.modelId || 'claude-3-5-sonnet-20241022',
        max_tokens: options.maxTokens || 1024,
        messages: this.formatMessagesForClaude(messages),
        system: options.systemPrompt,
      }),
      signal: AbortSignal.timeout(this.timeout),
    });

    return this.handleResponse(response);
  }

  async callOpenAIAPI(apiKey, messages, options) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: options.modelId || 'gpt-4o-mini',
        max_tokens: options.maxTokens || 1024,
        messages,
        system: options.systemPrompt,
      }),
      signal: AbortSignal.timeout(this.timeout),
    });

    return this.handleResponse(response);
  }

  async callGeminiAPI(apiKey, messages, options) {
    const formattedContent = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${options.modelId || 'gemini-2.0-flash'}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: formattedContent,
          generationConfig: { maxOutputTokens: options.maxTokens || 1024 },
        }),
        signal: AbortSignal.timeout(this.timeout),
      }
    );

    return this.handleResponse(response);
  }

  formatMessagesForClaude(messages) {
    return messages.map(m => ({ role: m.role, content: m.content }));
  }

  async handleResponse(res) {
    const data = await res.json();
    if (!res.ok) throw new Error(`API Error: ${data.error?.message || res.statusText}`);
    return this.extractContent(data);
  }

  extractContent(data) {
    if (data.content?.[0]?.text) return data.content[0].text;
    if (data.choices?.[0]?.message?.content) return data.choices[0].message.content;
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error('Resposta inesperada da API');
  }

  async getAPIKey(model) {
    if (this.apiKeys[model]) return this.apiKeys[model];

    if (this.userId && this.db) {
      const { data, error } = await this.db
        .from('ai_preferences')
        .select('api_keys')
        .eq('user_id', this.userId)
        .single();

      if (!error && data?.api_keys?.[model]) {
        this.apiKeys[model] = data.api_keys[model];
        return data.api_keys[model];
      }
    }

    return null;
  }

  async setAPIKey(model, key) {
    if (!['claude', 'gpt', 'gemini'].includes(model)) return false;
    this.apiKeys[model] = key;

    if (this.userId && this.db) {
      const { data } = await this.db
        .from('ai_preferences')
        .select('api_keys')
        .eq('user_id', this.userId)
        .single();

      const currentKeys = data?.api_keys || {};
      currentKeys[model] = key;

      const { error } = await this.db
        .from('ai_preferences')
        .update({ api_keys: currentKeys, updated_at: new Date().toISOString() })
        .eq('user_id', this.userId);

      return !error;
    }

    return true;
  }

  async setDefaultModel(model) {
    if (!['claude', 'gpt', 'gemini'].includes(model)) return false;
    this.model = model;

    if (this.userId && this.db) {
      const { error } = await this.db
        .from('ai_preferences')
        .update({ default_model: model, updated_at: new Date().toISOString() })
        .eq('user_id', this.userId);

      return !error;
    }

    return true;
  }

  async getPreferences() {
    if (!this.userId || !this.db) return null;

    const { data, error } = await this.db
      .from('ai_preferences')
      .select('*')
      .eq('user_id', this.userId)
      .single();

    return error ? null : data;
  }

  async updatePreferences(updates) {
    if (!this.userId || !this.db) return false;

    const { error } = await this.db
      .from('ai_preferences')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', this.userId);

    return !error;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const createAIRouter = (config) => new AIRouter(config);
