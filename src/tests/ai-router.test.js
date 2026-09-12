import { AIRouter, createAIRouter } from '../services/ai-router.js';
import { AIPreferenceManager } from '../services/ai-preference-manager.js';

describe('AIRouter - Multi-modelo com Fallback', () => {
  let router;
  let mockDB;

  beforeEach(() => {
    mockDB = {
      from: jest.fn((table) => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({
              data: {
                api_keys: {
                  claude: 'sk-claude-test',
                  gpt: 'sk-gpt-test',
                  gemini: 'sk-gemini-test',
                },
                default_model: 'claude',
              },
              error: null,
            })),
          })),
        })),
        update: jest.fn(() => ({
          eq: jest.fn(() => Promise.resolve({ error: null })),
        })),
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({
              data: { id: 'test-id' },
              error: null,
            })),
          })),
        })),
      })),
    };

    router = new AIRouter({
      supabaseClient: mockDB,
      userId: 'user-123',
      model: 'claude',
      apiKeys: {
        claude: 'sk-claude-test',
        gpt: 'sk-gpt-test',
        gemini: 'sk-gemini-test',
      },
    });
  });

  test('getModelSequence retorna ordem correta de fallback', () => {
    const sequence = router.getModelSequence('claude');
    expect(sequence[0]).toBe('claude');
    expect(sequence).toContain('gpt');
    expect(sequence).toContain('gemini');
  });

  test('getModelSequence para GPT', () => {
    const sequence = router.getModelSequence('gpt');
    expect(sequence[0]).toBe('gpt');
    expect(sequence[1]).toBe('gemini');
  });

  test('getModelSequence para Gemini', () => {
    const sequence = router.getModelSequence('gemini');
    expect(sequence[0]).toBe('gemini');
    expect(sequence[1]).toBe('claude');
  });

  test('setAPIKey atualiza chave localmente e no banco', async () => {
    const result = await router.setAPIKey('claude', 'new-key-123');
    expect(result).toBe(true);
    expect(router.apiKeys.claude).toBe('new-key-123');
  });

  test('setDefaultModel atualiza modelo padrão', async () => {
    const result = await router.setDefaultModel('gpt');
    expect(result).toBe(true);
    expect(router.model).toBe('gpt');
  });

  test('setDefaultModel rejeita modelo inválido', async () => {
    const result = await router.setDefaultModel('invalid');
    expect(result).toBe(false);
  });

  test('getAPIKey retorna chave local primeiro', async () => {
    const key = await router.getAPIKey('claude');
    expect(key).toBe('sk-claude-test');
  });

  test('delay funciona corretamente', async () => {
    const start = Date.now();
    await router.delay(100);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(100);
  });

  test('extractContent extrai resposta Claude', () => {
    const data = { content: [{ text: 'Hello Claude' }] };
    const result = router.extractContent(data);
    expect(result).toBe('Hello Claude');
  });

  test('extractContent extrai resposta OpenAI', () => {
    const data = { choices: [{ message: { content: 'Hello GPT' } }] };
    const result = router.extractContent(data);
    expect(result).toBe('Hello GPT');
  });

  test('extractContent extrai resposta Gemini', () => {
    const data = {
      candidates: [{ content: { parts: [{ text: 'Hello Gemini' }] } }],
    };
    const result = router.extractContent(data);
    expect(result).toBe('Hello Gemini');
  });

  test('extractContent lança erro para formato desconhecido', () => {
    const data = { unknown: 'format' };
    expect(() => router.extractContent(data)).toThrow('Resposta inesperada');
  });
});

describe('AIPreferenceManager - Gestão de Preferências', () => {
  let manager;
  let mockDB;

  beforeEach(() => {
    mockDB = {
      from: jest.fn((table) => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({
              data: {
                user_id: 'user-123',
                default_model: 'claude',
                api_keys: {},
                language: 'pt-BR',
                tone: 'formal',
                response_length: 'medium',
              },
              error: null,
            })),
          })),
        })),
        update: jest.fn(() => ({
          eq: jest.fn(() => Promise.resolve({ error: null })),
        })),
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({
              data: { id: 'new-pref' },
              error: null,
            })),
          })),
        })),
      })),
    };

    manager = new AIPreferenceManager(mockDB, 'user-123');
  });

  test('initializePreferences cria entrada se não existir', async () => {
    mockDB.from = jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null, error: 'not found' })),
        })),
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({
            data: { user_id: 'user-123' },
            error: null,
          })),
        })),
      })),
    }));

    const result = await manager.initializePreferences();
    expect(result).toBeTruthy();
  });

  test('setDefaultModel valida modelo', async () => {
    const result = await manager.setDefaultModel('gpt');
    expect(result).toBe(true);
  });

  test('setDefaultModel rejeita modelo inválido', async () => {
    const result = await manager.setDefaultModel('invalid');
    expect(result).toBe(false);
  });

  test('setLanguage atualiza idioma', async () => {
    const result = await manager.setLanguage('en-US');
    expect(result).toBe(true);
  });

  test('setTone valida tom de voz', async () => {
    const result = await manager.setTone('casual');
    expect(result).toBe(true);

    const invalid = await manager.setTone('invalid');
    expect(invalid).toBe(false);
  });

  test('setResponseLength valida comprimento', async () => {
    const result = await manager.setResponseLength('long');
    expect(result).toBe(true);

    const invalid = await manager.setResponseLength('invalid');
    expect(invalid).toBe(false);
  });

  test('updateAPIKey armazena chave seguramente', async () => {
    const result = await manager.updateAPIKey('claude', 'new-key');
    expect(result).toBe(true);
  });

  test('removeAPIKey remove chave', async () => {
    const result = await manager.removeAPIKey('claude');
    expect(result).toBe(true);
  });

  test('toggleVoiceMode ativa/desativa modo voz', async () => {
    const result = await manager.toggleVoiceMode(true);
    expect(result).toBe(true);
  });

  test('updatePromptTemplate armazena template', async () => {
    const template = 'Seja meu tutor sobre {{tema}}';
    const result = await manager.updatePromptTemplate('tutor', template);
    expect(result).toBe(true);
  });
});

describe('AIRouter - Integração End-to-End', () => {
  test('createAIRouter factory cria instância', () => {
    const mockDB = { from: jest.fn() };
    const config = { supabaseClient: mockDB, userId: 'user-123' };
    const router = createAIRouter(config);

    expect(router).toBeInstanceOf(AIRouter);
    expect(router.userId).toBe('user-123');
  });

  test('AIRouter com configuração mínima funciona', () => {
    const router = new AIRouter({ model: 'gpt' });
    expect(router.model).toBe('gpt');
    expect(router.timeout).toBe(30000);
    expect(router.maxRetries).toBe(3);
  });
});
