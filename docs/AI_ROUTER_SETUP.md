# 🤖 AI Router Multi-Modelo - Guia de Setup

## Visão Geral

O **AIRouter** é um sistema inteligente que gerencia integração com múltiplos provedores de IA (Claude, OpenAI, Google Gemini) com:

- ✅ Fallback automático entre modelos
- ✅ Armazenamento seguro de chaves API
- ✅ Preferências persistentes por usuário
- ✅ Retry logic com backoff exponencial
- ✅ Gerenciamento centralizado de preferências

---

## 1. Inicialização do AIRouter

### Configuração Básica (com Supabase)

```javascript
import { createAIRouter } from '/src/services/ai-router.js';
import { supabase } from '/src/main.js'; // ou seu cliente Supabase

const userId = 'user-123'; // ID do usuário autenticado

const router = createAIRouter({
  supabaseClient: supabase,
  userId: userId,
  model: 'claude', // modelo padrão
  timeout: 30000, // timeout em ms
  maxRetries: 3,  // máximo de tentativas
  apiKeys: {
    claude: process.env.ANTHROPIC_API_KEY,
    gpt: process.env.OPENAI_API_KEY,
    gemini: process.env.GOOGLE_API_KEY,
  },
});
```

### Configuração Mínima (sem persistência)

```javascript
import { AIRouter } from '/src/services/ai-router.js';

const router = new AIRouter({
  model: 'claude',
  apiKeys: {
    claude: 'sk-...',
  },
});
```

---

## 2. Uso Básico - Enviar Mensagens

### Usando o modelo padrão (Claude)

```javascript
const messages = [
  { role: 'user', content: 'Explique machine learning' },
];

const response = await router.sendMessage(messages);
console.log(response); // "Machine learning é..."
```

### Especificar modelo explicitamente

```javascript
const response = await router.sendMessage(messages, {
  model: 'gpt', // força uso de GPT
  modelId: 'gpt-4o-mini',
  maxTokens: 1024,
  systemPrompt: 'Você é um especialista em IA',
});
```

### Com fallback automático

```javascript
const response = await router.sendMessage(messages, {
  model: 'claude',
  allowFallback: true, // tenta gpt → gemini se claude falhar
  maxTokens: 500,
});
```

---

## 3. Gerenciamento de Chaves API

### Configurar chave API

```javascript
// Atualizar chave localmente
await router.setAPIKey('gpt', 'sk-new-openai-key');

// Salva automaticamente no banco se userId for configurado
```

### Recuperar chave API

```javascript
const claudeKey = await router.getAPIKey('claude');
console.log(claudeKey); // 'sk-...'
```

---

## 4. Gerenciar Preferências do Usuário

### Usando AIPreferenceManager

```javascript
import { createAIPreferenceManager } from '/src/services/ai-preference-manager.js';

const prefManager = createAIPreferenceManager(supabase, userId);

// Inicializar preferências (cria entrada se não existir)
await prefManager.initializePreferences();

// Definir modelo padrão
await prefManager.setDefaultModel('gpt');

// Configurar idioma
await prefManager.setLanguage('pt-BR');

// Definir tom de voz
await prefManager.setTone('casual'); // 'formal' | 'casual' | 'academic'

// Definir comprimento de resposta
await prefManager.setResponseLength('long'); // 'short' | 'medium' | 'long'

// Habilitar modo voz
await prefManager.toggleVoiceMode(true);

// Salvar template de prompt
await prefManager.updatePromptTemplate('tutor', 
  'Seja meu tutor. Me pergunte uma pergunta de cada vez sobre {{tema}}.'
);

// Recuperar template
const tutorTemplate = await prefManager.getPromptTemplate('tutor');
```

---

## 5. Integração com Roles de IA

### Advisor (Construtor de Currículo)

```javascript
import { createAIRouter } from '/src/services/index.js';

const router = createAIRouter({
  supabaseClient: supabase,
  userId: currentUser.id,
  model: 'claude',
});

const messages = [
  {
    role: 'user',
    content: `Aja como meu advogado acadêmico. Construa um curso de 6 semanas sobre Machine Learning.
      Minha base: iniciante (sei o básico de programação)
      Meu destino: entender e aplicar ML em projetos reais
      Pergunte 5 coisas pra customizar: destino, base, sequência, corte, milestones.`,
  },
];

const advisorResponse = await router.sendMessage(messages, {
  systemPrompt: 'Você é um advisor acadêmico de elite do MIT',
  maxTokens: 2000,
});
```

### Tutor (Diagnóstico de Lacunas)

```javascript
const tutorMessages = [
  { role: 'user', content: 'Explique gradient descent para eu entender' },
];

const tutorResponse = await router.sendMessage(tutorMessages, {
  model: 'claude', // Claude é excelente para tutoria
  systemPrompt: `Seja um tutor. Não dê aula, faça UMA pergunta diagnóstica.
    Encontre a lacuna específica de compreensão do aluno.`,
  maxTokens: 500,
});
```

### Librarian (Curador de Fontes)

```javascript
const librarianMessages = [
  {
    role: 'user',
    content: 'Encontre 3-4 melhores fontes sobre Processamento de Linguagem Natural',
  },
];

const librarianResponse = await router.sendMessage(librarianMessages, {
  systemPrompt: 'Você é um curador de conteúdo. Retorne apenas 3-4 melhores fontes.',
  allowFallback: true,
});
```

### Editor (Revisão de Trabalhos)

```javascript
const editorMessages = [
  {
    role: 'user',
    content: `Revise este ensaio. Identifique:
      1. Gaps na lógica
      2. Argumentos fracos
      3. Erros estruturais
      4. Repetições
      
      Ensaio: "${userEssay}"`,
  },
];

const feedback = await router.sendMessage(editorMessages, {
  systemPrompt: 'Você é um editor crítico. Encontre fraquezas, não elogie.',
  maxTokens: 1500,
});
```

---

## 6. Sequência de Fallback

Se um modelo falhar, a ordem de fallback é:

| Primário | Secundário | Terciário |
|----------|-----------|-----------|
| claude   | gpt       | gemini    |
| gpt      | gemini    | claude    |
| gemini   | claude    | gpt       |

**Exemplo**: Usuário escolhe Claude, mas a chave API expirou:
1. Tenta Claude → ❌ Falha
2. Espera 1s, tenta GPT → ✅ Sucesso
3. Retorna resposta de GPT

---

## 7. Configurações de Ambiente

Adicione ao `.env.local`:

```bash
VITE_ANTHROPIC_API_KEY=sk-ant-...
VITE_OPENAI_API_KEY=sk-...
VITE_GOOGLE_API_KEY=...
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_KEY=eyJ...
```

No código:

```javascript
const router = createAIRouter({
  supabaseClient: supabase,
  userId: currentUser.id,
  apiKeys: {
    claude: import.meta.env.VITE_ANTHROPIC_API_KEY,
    gpt: import.meta.env.VITE_OPENAI_API_KEY,
    gemini: import.meta.env.VITE_GOOGLE_API_KEY,
  },
});
```

---

## 8. Tratamento de Erros

```javascript
try {
  const response = await router.sendMessage(messages, {
    model: 'claude',
    allowFallback: false, // sem fallback
  });
} catch (error) {
  if (error.message.includes('Todas as tentativas')) {
    console.log('Nenhuma API disponível');
    // Mostrar tela de erro ao usuário
  } else if (error.message.includes('Modelo não suportado')) {
    console.log('Modelo inválido');
  } else {
    console.log('Erro inesperado:', error);
  }
}
```

---

## 9. Logging e Monitoramento

```javascript
// Antes de enviar mensagem
console.log(`[AIRouter] Usando modelo: ${router.model}`);
console.log(`[AIRouter] Tokens máximos: 1024`);

// Capturar tempo de resposta
const start = performance.now();
const response = await router.sendMessage(messages);
const elapsed = performance.now() - start;
console.log(`[AIRouter] Tempo de resposta: ${elapsed}ms`);

// Salvar na tabela sessions
await supabase.from('sessions').insert([
  {
    user_id: userId,
    session_type: 'tutor',
    ai_model_used: router.model,
    duration_minutes: Math.round(elapsed / 60000),
    messages: messages,
  },
]);
```

---

## 10. Checklist de Implementação

- [ ] Chaves API configuradas em `.env.local`
- [ ] Cliente Supabase conectado
- [ ] AIRouter inicializado com userId
- [ ] Preferências do usuário inicializadas
- [ ] Fallback testado (simular falha de API)
- [ ] Testes unitários passando
- [ ] Logging implementado
- [ ] Tratamento de erros robusto
- [ ] Documentação de prompts para cada role
- [ ] Performance testada (< 5s por requisição)

---

## Referências

- [Claude API Docs](https://docs.anthropic.com)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Google Gemini API](https://ai.google.dev/)
- [Supabase Documentation](https://supabase.com/docs)
