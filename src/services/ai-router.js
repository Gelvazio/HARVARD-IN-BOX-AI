// ai-router.js - Roteador de IA multi-modelo (Claude/GPT/Gemini)
export class AIRouter {
  constructor(config = {}) {
    this.model = config.model || 'claude';
    this.apiKey = config.apiKey || '';
    this.timeout = config.timeout || 30000;
  }

  async sendMessage(messages, options = {}) {
    const model = options.model || this.model;

    switch (model) {
      case 'claude':
        return this.callClaudeAPI(messages, options);
      case 'gpt':
        return this.callOpenAIAPI(messages, options);
      case 'gemini':
        return this.callGeminiAPI(messages, options);
      default:
        throw new Error(`Modelo não suportado: ${model}`);
    }
  }

  async callClaudeAPI(messages, options) {
    return fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: options.modelId || 'claude-3-5-sonnet-20241022',
        max_tokens: options.maxTokens || 1024,
        messages: this.formatMessagesForClaude(messages),
        system: options.systemPrompt,
      }),
      signal: AbortSignal.timeout(this.timeout),
    }).then(res => this.handleResponse(res));
  }

  async callOpenAIAPI(messages, options) {
    return fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: options.modelId || 'gpt-4o-mini',
        max_tokens: options.maxTokens || 1024,
        messages,
        system: options.systemPrompt,
      }),
      signal: AbortSignal.timeout(this.timeout),
    }).then(res => this.handleResponse(res));
  }

  async callGeminiAPI(messages, options) {
    const formattedContent = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    return fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${options.modelId || 'gemini-2.0-flash'}:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: formattedContent,
          generationConfig: { maxOutputTokens: options.maxTokens || 1024 },
        }),
        signal: AbortSignal.timeout(this.timeout),
      }
    ).then(res => this.handleResponse(res));
  }

  formatMessagesForClaude(messages) {
    return messages.map(m => ({
      role: m.role,
      content: m.content,
    }));
  }

  async handleResponse(res) {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`API Error: ${data.error?.message || res.statusText}`);
    }

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

  setModel(model) {
    if (!['claude', 'gpt', 'gemini'].includes(model)) return false;
    this.model = model;
    return true;
  }

  setAPIKey(key) {
    this.apiKey = key;
  }
}

export const createAIRouter = (config) => new AIRouter(config);
