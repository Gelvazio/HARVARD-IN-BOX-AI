# 🎯 ESTRATÉGIA DE IMPLEMENTAÇÃO — HARVARD-IN-BOX-AI

## Setup Definido

- ✅ **Interface**: Vanilla JS + Vite.js (lightweight, rápido)
- ✅ **Backend**: Supabase (Auth + PostgreSQL + Realtime)
- ✅ **IA**: Multi-modelo (Claude, GPT, Gemini) — usuário escolhe
- ✅ **Stack**: Web Components reutilizáveis + Tailwind CSS
- ✅ **Prioridade #1**: Qualidade da tutoria (IA diagnóstica)
- ✅ **Integrações**: Zapier, NotebookLM, Discord/Slack
- ✅ **Timeline**: Sem pressa (projeto evolutivo)
- ✅ **Escopo**: Todos os 6 papéis simultane amente
- ✅ **Autenticação**: Supabase Auth (email/senha)
- ✅ **Público**: Estudantes individuais

---

## 🏗️ ARQUITETURA PROPOSTA

```
harvard-in-box-ai/
├── src/
│   ├── components/          # Web Components reutilizáveis
│   │   ├── advisor-panel/   # Construtor de currículo
│   │   ├── tutor-chat/      # Chat diagnóstico
│   │   ├── librarian/       # Curador de fontes
│   │   ├── editor-review/   # Revisor de trabalhos
│   │   └── companion/       # Perspectiva interdisciplinar
│   ├── services/
│   │   ├── ai-router.js     # Roteia pra Claude/GPT/Gemini
│   │   ├── supabase.js      # Cliente Supabase
│   │   ├── zapier.js        # Automação
│   │   ├── notebooklm.js    # Integração Google
│   │   └── discord.js       # Bot Discord
│   ├── pages/
│   │   ├── dashboard.html
│   │   ├── new-course.html
│   │   ├── study.html
│   │   └── profile.html
│   └── styles/              # Tailwind CSS
├── supabase/
│   └── migrations/          # Schema SQL
└── vite.config.js
```

---

## 📊 BANCO DE DADOS (Supabase)

### Tabelas Principais

```sql
-- Usuários
users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  created_at TIMESTAMP
)

-- Cursos
courses (
  id UUID PRIMARY KEY,
  user_id UUID FK,
  name VARCHAR,
  destination TEXT,        # O que quer aprender
  current_level TEXT,      # Onde está hoje
  milestones JSONB,        # Marcos semanais
  created_at TIMESTAMP
)

-- Fontes/Materiais
sources (
  id UUID PRIMARY KEY,
  course_id UUID FK,
  type VARCHAR,            # 'book', 'course', 'podcast', 'paper'
  title VARCHAR,
  url TEXT,
  notebooklm_id VARCHAR,   # ID no NotebookLM
  created_at TIMESTAMP
)

-- Sessões de aprendizado
sessions (
  id UUID PRIMARY KEY,
  course_id UUID FK,
  role VARCHAR,            # 'advisor', 'tutor', 'librarian', 'editor', 'companion'
  messages JSONB,          # Array de mensagens
  created_at TIMESTAMP
)

-- Trabalhos do aluno
assignments (
  id UUID PRIMARY KEY,
  course_id UUID FK,
  user_submission TEXT,    # O que o aluno enviou
  ai_feedback TEXT,        # Feedback do Editor
  created_at TIMESTAMP
)

-- Integrações externas
integrations (
  id UUID PRIMARY KEY,
  user_id UUID FK,
  zapier_token VARCHAR,
  discord_id VARCHAR,
  notebooklm_api_key VARCHAR,
  created_at TIMESTAMP
)

-- Configurações de IA por usuário
ai_preferences (
  id UUID PRIMARY KEY,
  user_id UUID FK,
  preferred_model VARCHAR,  # 'claude', 'gpt', 'gemini'
  api_key_encrypted VARCHAR,
  created_at TIMESTAMP
)
```

---

## 🧭 FLUXO DO USUÁRIO

```
1. Signup (Supabase Auth) → Dashboard
   ↓
2. "Novo Curso" → Advisor faz entrevista (5 perguntas)
   • Destino: o que quer aprender?
   • Base: onde está hoje?
   • Sequência: em que ordem?
   • O que ignorar por agora?
   • Milestones: quando sabe que avançou?
   ↓
3. Advisor monta o plano:
   • Cria `course` no banco
   • Armazena respostas em JSONB
   • Gera milestones semanais
   ↓
4. Zapier agenda automático:
   • Cria eventos no Google Calendar
   • Cria Doc com o plano formatado
   ↓
5. Librarian busca as 3-4 fontes:
   • Pesquisa por tema
   • Valida credibilidade
   • Insere em NotebookLM
   • Salva referências no banco
   ↓
6. Tutor espera usuário fazer pergunta:
   • Faz UMA pergunta diagnóstica
   • Encontra a lacuna específica
   • Responde somente o necessário
   • Loop até compreensão
   ↓
7. Editor revisa quando usuário entrega trabalho:
   • Desafia a lógica
   • Encontra fraquezas
   • Melhora estrutura
   • Feedback linha por linha
   ↓
8. Companion cruza com outras disciplinas:
   • "Como isso se relaciona com X?"
   • Perspectiva de fora do campo
```

---

## 🔄 OS 6 PAPÉIS EM DETALHES

### 1. 🎯 Advogado (Advisor)
**Função**: Constrói currículo personalizado
**Quando ativa**: Início de novo curso
**Entrada**: 5 respostas do usuário
**Saída**: Plano estruturado + milestones semanais
**Integração**: Zapier → Google Calendar/Docs

**Prompt base**:
```
Aja como meu advogado acadêmico elite. Quero construir um curso customizado de 6 semanas sobre [tema].
Primeiro me entreviste para encontrar minha base com perguntas abertas.
Depois defina o destino, construa a sequência, liste o que devo ignorar por agora.
Me dê milestones semanais mensuráveis.
Pergunte até 5 coisas por etapa, uma de cada vez.
```

---

### 2. ⚙️ Automação (Zapier MCP)
**Função**: Conecta plano da IA a ferramentas do dia a dia
**Integra com**: Google Calendar, Google Docs
**Output**:
- Documentos semanais em Google Drive
- Eventos no calendário com lembretes
- Templates pré-formatados

---

### 3. 📚 Bibliotecário (Librarian)
**Função**: Triagem de fontes, sinal vs. ruído
**Processo**:
1. Busca as melhores 3-4 fontes (livro, curso, podcast, paper)
2. Valida credibilidade
3. Insere no NotebookLM Google
4. IA fica ancorada apenas nessas fontes
5. Transforma em: podcast, vídeo, slides via NotebookLM Studio

**Prompt base**:
```
Você é um bibliotecário expert. Para o tema [tema], identifique as 3 melhores fontes.
Priorize: autoridade, recenticidade, clareza.
Ignore: clickbait, conteúdo generalista, YouTube aleatório.
Justifique cada escolha.
```

---

### 4. 🎓 Tutor
**Função**: Diagnostica lacuna específica do aluno
**Diferença do Professor**: Não explica, pergunta
**Processo**:
1. Aluno faz pergunta
2. Tutor identifica a raiz da confusão
3. Tutor faz UMA pergunta diagnóstica
4. Loop até aluno entender

**Prompt base**:
```
Seja meu tutor sobre [tema]. Me pergunte uma pergunta de cada vez.
Não me dê aula. Encontre a lacuna na minha compreensão.
Seja preciso. Questione até eu explicar com minhas próprias palavras.
```

---

### 5. ✂️ Editor
**Função**: Revisa trabalho entregue
**Processo**:
1. Desafia a lógica
2. Encontra fraquezas no argumento
3. Corta repetição
4. Melhora estrutura e precisão
5. Linha por linha

**Prompt base**:
```
Você é um editor executivo. Revise este trabalho:
- Lógica: está sound?
- Argumentação: há fraquezas?
- Estrutura: flui bem?
- Linguagem: é clara e precisa?
Seja implacável mas construtivo.
```

---

### 6. 🧭 Companheiro (Companion)
**Função**: Cruza áreas diferentes
**Objetivo**: Enxergar seu tópico sob nova luz
**Exemplos de pergunta**:
- "Como um músico de jazz pensa em improvisar — e como isso se relaciona com liderança?"
- "Qual a conexão entre culinária e finanças?"

**Prompt base**:
```
Você é um pensador que cruza disciplinas. Encontre 3 conexões inesperadas entre [tema] e [campo diferente].
Explique por que essas conexões importam.
```

---

## ⚡ FASES DE DESENVOLVIMENTO

| Fase | O quê | Semanas | Status |
|------|-------|---------|--------|
| **1** | Setup Vite + Supabase Auth + UI base | 1-2 | ⏳ |
| **2** | Advisor + BD de cursos | 2-3 | ⏳ |
| **3** | Tutor (coração) + multi-IA routing | 3-4 | ⏳ |
| **4** | Librarian + NotebookLM | 2-3 | ⏳ |
| **5** | Zapier + Google Calendar/Docs | 1-2 | ⏳ |
| **6** | Editor + Companion | 2-3 | ⏳ |
| **7** | Discord/Slack bots | 1-2 | ⏳ |
| **Total** | MVP + Todas as integrações | 15-20 semanas | 📅 |

---

## 🛠️ TECH STACK DETALHADO

### Frontend
```json
{
  "bundler": "Vite.js",
  "framework": "Vanilla JS + Web Components",
  "styling": "Tailwind CSS",
  "state": "LocalStorage + Supabase Realtime",
  "api-client": "Supabase JS client",
  "ui-components": "Custom Web Components"
}
```

### Backend
```json
{
  "database": "Supabase PostgreSQL",
  "auth": "Supabase Auth",
  "realtime": "Supabase Realtime",
  "functions": "Supabase Edge Functions (opcional)",
  "storage": "Supabase Storage (para uploads)"
}
```

### Integrações
```json
{
  "ai": ["Claude API", "OpenAI API", "Google Gemini API"],
  "automation": "Zapier Webhooks",
  "notebook": "Google NotebookLM API",
  "chat": ["Discord.js", "Slack Bolt"]
}
```

---

## 🚀 PRÓXIMOS PASSOS RECOMENDADOS

### Ordem de Prioridade:
1. **AGORA**: Setup Vite + Supabase + estrutura base (Semana 1)
2. **DEPOIS**: Schema SQL completo (Semana 1)
3. **ENTÃO**: Web Components reutilizáveis (Semana 1-2)
4. **CORE**: Advisor + Tutor (Semanas 2-6) — aqui está 80% do valor

### Métricas de Sucesso:
- ✅ Usuário consegue criar um curso com Advisor
- ✅ Tutor faz perguntas diagnósticas (não explica)
- ✅ Librarian encontra 3-4 fontes confiáveis
- ✅ Zapier agenda automaticamente no calendário
- ✅ Usuários retornam (retention)

---

## 📝 NOTAS IMPORTANTES

1. **Prioridade máxima**: Qualidade da tutoria (IA). Invista tempo em prompts diagnósticos bem calibrados.

2. **Não comece com UI bonita**: Core funcional primeiro, depois design.

3. **Multi-IA é feature, não bug**: Deixar usuário escolher Claude/GPT/Gemini é vantagem competitiva.

4. **NotebookLM é opcional no MVP**: Se a API não estiver pronta, comece sem Librarian e adicione depois.

5. **Zapier pode ser manual no MVP**: Usuário copia o plano manualmente pro Google Calendar; automação depois.

6. **Discord bot é acessibilidade**: Trazer o app pra onde alunos já estão (Discord) = 10x mais engajamento.

---

**Data de criação do documento**: 11-09-2026
**Última atualização**: 11-09-2026
**Status**: Planejamento finalizado, pronto para desenvolvimento
