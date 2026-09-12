# Roles de IA - HARVARD-IN-BOX-AI

Implementação dos 6 papéis que a IA assume para tutoria personalizada.

## 📚 Papéis Implementados

### 1. 🎯 Advisor (Construtor de Currículo) ✅

Constrói currículo personalizado através de uma entrevista estruturada com 5 perguntas:

**Fluxo:**
1. **Destino**: O que você quer saber/fazer ao final?
2. **Base**: Onde você está hoje? (iniciante/intermediário/avançado)
3. **Sequência**: Em que ordem aprender?
4. **Ignorar**: O que deixar para depois?
5. **Milestones**: Como provar progresso?

**Arquivos:**
- `advisor-interview.js` - Fluxo de entrevista e gerenciamento de respostas
- `pages/new-course.html` - Interface da entrevista

**Serviços Utilizados:**
- `ai-router.js` - Integração com Claude/GPT/Gemini
- `milestone-generator.js` - Geração automática de marcos semanais
- `course-service.js` - Persistência em Supabase

**Exemplo de Uso:**
```javascript
import { AdvisorInterview } from './advisor-interview.js';
import { createAIRouter } from '../services/ai-router.js';

const aiRouter = createAIRouter({
  model: 'claude',
  apiKey: process.env.ANTHROPIC_API_KEY
});

const interview = new AdvisorInterview(aiRouter);

// Pergunta atual
const question = interview.getCurrentQuestion();
console.log(question.prompt);

// Registrar resposta
interview.recordResponse("Python para análise de dados");

// Progresso
const progress = interview.getProgress();
console.log(`${progress.percentage}%`);

// Gerar descrição do curso
const description = await interview.generateCourseDescription('Python');
```

---

## 🔄 Próximos Papéis (Em Desenvolvimento)

### 2. 🎓 Tutor (Diagnóstico de Lacunas)
- Chat com histórico
- Diagnóstico inteligente de confusões
- Sistema de prompts adaptativos
- Modo voz integrado

### 3. 📚 Librarian (Curador de Fontes)
- Busca e validação de fontes
- Integração com NotebookLM
- Geração de podcasts/vídeos
- Rankeamento de credibilidade

### 4. ✂️ Editor (Revisão de Trabalhos)
- Upload de trabalhos
- Análise de lógica e argumentação
- Feedback linha por linha
- Sugestões de melhoria

### 5. 🧭 Companion (Perspectiva Interdisciplinar)
- Cruzamento de áreas diferentes
- Conexões inesperadas
- Pensamento lateral
- Insights inter-disciplinares

### 6. ⚙️ Automação (Zapier)
- Integração com Google Calendar
- Criação automática de Google Docs
- Agendamento de lembretes
- Sincronização de progresso

---

## 🛠️ Infraestrutura

### AI Router
Roteador multi-modelo para:
- **Claude** (Anthropic API)
- **GPT** (OpenAI API)
- **Gemini** (Google API)

Gerencia:
- Mudança de modelos
- Chamadas de API
- Tratamento de erros
- Timeout automático

### Course Service
Persistência em Supabase:
- Salvar cursos
- Salvar milestones
- Salvar fontes
- Atualizar progresso

### Milestone Generator
Geração automática de marcos:
- Objetivos de aprendizagem
- Provas de conclusão
- Distribuição temporal
- Validação de aprendizado

---

## 📝 Exemplo de Fluxo Completo

```javascript
// 1. Iniciar entrevista
const interview = new AdvisorInterview(aiRouter);

// 2. Responder 5 perguntas
for (const q of INTERVIEW_FLOW) {
  interview.recordResponse(userResponse);
}

// 3. Gerar curso
const courseDescription = await interview.generateCourseDescription('Python');

// 4. Salvar no banco
const course = await courseService.saveCourse(userId, {
  title: 'Python para Análise de Dados',
  description: courseDescription,
  ...interview.getResponses()
});

// 5. Gerar milestones
const milestones = await milestoneGenerator.generateMilestones(course, 6);

// 6. Salvar milestones
await courseService.saveMilestones(course.id, milestones);
```

---

**Responsável**: Gelvazio  
**Data de Criação**: 12-09-2026  
**Status**: Em Desenvolvimento (Advisor 50%)
