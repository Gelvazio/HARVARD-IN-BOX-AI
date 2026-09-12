export class AIPreferenceManager {
  constructor(supabaseClient, userId) {
    this.db = supabaseClient;
    this.userId = userId;
  }

  async initializePreferences() {
    if (!this.userId) return null;

    const { data } = await this.db
      .from('ai_preferences')
      .select('*')
      .eq('user_id', this.userId)
      .single();

    if (!data) {
      const { data: newPrefs } = await this.db
        .from('ai_preferences')
        .insert([{ user_id: this.userId }])
        .select()
        .single();
      return newPrefs;
    }

    return data;
  }

  async getPreferences() {
    if (!this.userId) return null;

    const { data, error } = await this.db
      .from('ai_preferences')
      .select('*')
      .eq('user_id', this.userId)
      .single();

    return error ? null : data;
  }

  async setDefaultModel(model) {
    if (!['claude', 'gpt', 'gemini'].includes(model)) return false;

    const { error } = await this.db
      .from('ai_preferences')
      .update({ default_model: model })
      .eq('user_id', this.userId);

    return !error;
  }

  async getAPIKeys() {
    const prefs = await this.getPreferences();
    return prefs?.api_keys || {};
  }

  async updateAPIKey(model, key) {
    if (!['claude', 'gpt', 'gemini'].includes(model)) return false;

    const prefs = await this.getPreferences();
    const keys = prefs?.api_keys || {};
    keys[model] = key;

    const { error } = await this.db
      .from('ai_preferences')
      .update({ api_keys: keys })
      .eq('user_id', this.userId);

    return !error;
  }

  async removeAPIKey(model) {
    const prefs = await this.getPreferences();
    const keys = prefs?.api_keys || {};
    delete keys[model];

    const { error } = await this.db
      .from('ai_preferences')
      .update({ api_keys: keys })
      .eq('user_id', this.userId);

    return !error;
  }

  async setLanguage(language) {
    const { error } = await this.db
      .from('ai_preferences')
      .update({ language })
      .eq('user_id', this.userId);

    return !error;
  }

  async setTone(tone) {
    if (!['formal', 'casual', 'academic'].includes(tone)) return false;

    const { error } = await this.db
      .from('ai_preferences')
      .update({ tone })
      .eq('user_id', this.userId);

    return !error;
  }

  async setResponseLength(length) {
    if (!['short', 'medium', 'long'].includes(length)) return false;

    const { error } = await this.db
      .from('ai_preferences')
      .update({ response_length: length })
      .eq('user_id', this.userId);

    return !error;
  }

  async toggleVoiceMode(enabled) {
    const { error } = await this.db
      .from('ai_preferences')
      .update({ use_voice_mode: enabled })
      .eq('user_id', this.userId);

    return !error;
  }

  async updatePromptTemplate(templateName, template) {
    const prefs = await this.getPreferences();
    const templates = prefs?.prompt_templates || {};
    templates[templateName] = template;

    const { error } = await this.db
      .from('ai_preferences')
      .update({ prompt_templates: templates })
      .eq('user_id', this.userId);

    return !error;
  }

  async getPromptTemplate(templateName) {
    const prefs = await this.getPreferences();
    return prefs?.prompt_templates?.[templateName] || null;
  }
}

export const createAIPreferenceManager = (supabaseClient, userId) =>
  new AIPreferenceManager(supabaseClient, userId);
