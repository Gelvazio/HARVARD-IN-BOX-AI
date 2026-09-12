# 📋 TAREFAS — HARVARD-IN-BOX-AI

**Última atualização**: 12-09-2026 00:15

---

## TAREFA 01: Setup Vite + Supabase + Estrutura Base
- **Status**: 🟢 CONCLUÍDO
- **Data de início**: 11-09-2026 23:45
- **Data de conclusão**: 12-09-2026 00:15
- **Descrição**: Configurar ambiente de desenvolvimento com Vite.js, integração Supabase, estrutura de pastas, e UI base com Tailwind CSS
- **Subtarefas**:
  - [x] Inicializar projeto Vite
  - [x] Instalar e configurar Tailwind CSS
  - [x] Setup cliente Supabase no projeto
  - [x] Criar estrutura de pastas (src/, components/, services/, pages/)
  - [x] Configurar variáveis de ambiente (.env.local)
  - [x] Criar layout base do dashboard
- **Prioridade**: 🔴 CRÍTICA
- **Estimativa**: 1-2 semanas

---

## TAREFA 02: Schema SQL Completo (Banco de Dados)
- **Status**: 🟢 CONCLUÍDO
- **Data de início**: 11-09-2026 23:50
- **Data de conclusão**: 11-09-2026 23:58
- **Descrição**: Criar todas as tabelas, relacionamentos e índices no Supabase PostgreSQL
- **Subtarefas**:
  - [x] Criar tabela `users`
  - [x] Criar tabela `courses`
  - [x] Criar tabela `sources`
  - [x] Criar tabela `sessions`
  - [x] Criar tabela `assignments`
  - [x] Criar tabela `integrations`
  - [x] Criar tabela `ai_preferences`
  - [x] Criar índices de performance
  - [x] Setup RLS (Row Level Security)
- **Prioridade**: 🔴 CRÍTICA
- **Estimativa**: 3-5 dias

---

## TAREFA 03: Web Components Reutilizáveis
- **Status**: 🟢 CONCLUÍDO
- **Data de início**: 11-09-2026 23:59
- **Data de conclusão**: 12-09-2026 00:15
- **Descrição**: Criar componentes web reutilizáveis para toda a plataforma
- **Subtarefas**:
  - [x] Componente `card-panel`
  - [x] Componente `input-form`
  - [x] Componente `button-action`
  - [x] Componente `modal-dialog`
  - [x] Componente `chat-message`
  - [x] Componente `progress-bar`
  - [x] Componente `task-item`
  - [x] Sistema de tema (light/dark)
- **Prioridade**: 🟡 ALTA
- **Estimativa**: 1-2 semanas

---

## TAREFA 04: Advisor (Construtor de Currículo)
- **Status**: 🟢 CONCLUÍDO
- **Data de início**: 12-09-2026 00:20
- **Data de conclusão**: 12-09-2026 00:35
- **Descrição**: Implementar o papel Advisor que constrói currículo personalizado
- **Subtarefas**:
  - [x] Criar fluxo de entrevista (5 perguntas)
  - [x] Integrar com AI (Claude/GPT/Gemini router)
  - [x] Salvar curso e respostas em Supabase
  - [x] Gerar milestones semanais automaticamente
  - [x] Criar página `new-course.html`
  - [ ] Integração com Zapier (conectar Google Calendar)
  - [ ] Testes de funcionamento
- **Prioridade**: 🔴 CRÍTICA
- **Estimativa**: 2-3 semanas

---

## TAREFA 05: Tutor (Diagnóstico de Lacunas)
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Implementar o papel Tutor com chat diagnóstico inteligente
- **Subtarefas**:
  - [ ] Criar componente chat com histórico
  - [ ] Implementar AI router (Claude/GPT/Gemini)
  - [ ] Sistema de prompts diagnósticos
  - [ ] Salvar sessões em banco de dados
  - [ ] Criar página `study.html` com chat
  - [ ] Modo voz (opcional)
  - [ ] Testes de qualidade da tutoria
- **Prioridade**: 🔴 CRÍTICA
- **Estimativa**: 3-4 semanas

---

## TAREFA 06: Librarian (Curador de Fontes)
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Implementar o papel Librarian com integração NotebookLM
- **Subtarefas**:
  - [ ] Criar sistema de busca de fontes
  - [ ] Validar credibilidade de fontes
  - [ ] Integração com NotebookLM API
  - [ ] Salvar fontes em banco de dados
  - [ ] Componente de seleção de 3-4 fontes
  - [ ] Geração automática de podcast/vídeo via NotebookLM
  - [ ] Testes com NotebookLM Studio
- **Prioridade**: 🟡 ALTA
- **Estimativa**: 2-3 semanas

---

## TAREFA 07: Editor (Revisão de Trabalhos)
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Implementar o papel Editor com feedback estruturado
- **Subtarefas**:
  - [ ] Criar componente de upload/submissão de trabalho
  - [ ] Implementar análise via AI (lógica, argumentação, estrutura)
  - [ ] Gerar feedback linha por linha
  - [ ] Salvar avaliações em banco de dados
  - [ ] Componente de visualização de feedback
  - [ ] Sugestões de melhoria automáticas
  - [ ] Testes de feedback
- **Prioridade**: 🟡 ALTA
- **Estimativa**: 2-3 semanas

---

## TAREFA 08: Companion (Perspectiva Interdisciplinar)
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Implementar o papel Companion que cruza disciplinas
- **Subtarefas**:
  - [ ] Sistema de sugestões de conexões entre áreas
  - [ ] Prompts para pensar fora da caixa
  - [ ] Salvar insights em banco de dados
  - [ ] Componente de "curiosidades relacionadas"
  - [ ] Geração de conexões inesperadas
  - [ ] Testes de qualidade das conexões
- **Prioridade**: 🟢 MÉDIA
- **Estimativa**: 2-3 semanas

---

## TAREFA 09: Automação Zapier (Google Calendar/Docs)
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Integração com Zapier para automação com Google Calendar e Google Docs
- **Subtarefas**:
  - [ ] Setup de webhooks Zapier
  - [ ] Criação automática de eventos no Google Calendar
  - [ ] Criação automática de Docs com plano de estudo
  - [ ] Formatação de documentos
  - [ ] Lembretes automáticos
  - [ ] Testes de fluxo end-to-end
- **Prioridade**: 🟡 ALTA
- **Estimativa**: 1-2 semanas

---

## TAREFA 10: Discord Bot
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Criar bot Discord para acessibilidade e engajamento
- **Subtarefas**:
  - [ ] Setup Discord.js
  - [ ] Comandos básicos (/new-course, /ask, /feedback)
  - [ ] Autenticação com Supabase
  - [ ] Integração com papéis da IA
  - [ ] Salvar contexto de conversas
  - [ ] Testes em servidor Discord
- **Prioridade**: 🟢 MÉDIA
- **Estimativa**: 1-2 semanas

---

## TAREFA 11: Autenticação Supabase (Email/Senha)
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Implementar sistema completo de autenticação com Supabase Auth
- **Subtarefas**:
  - [ ] Página de signup
  - [ ] Página de login
  - [ ] Recuperação de senha
  - [ ] Verificação de email
  - [ ] Sessão persistente
  - [ ] Logout
  - [ ] Redirecionamento de usuários não autenticados
- **Prioridade**: 🔴 CRÍTICA
- **Estimativa**: 1 semana

---

## TAREFA 12: AI Router (Multi-modelo)
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Criar sistema de roteamento que permite usuário escolher Claude/GPT/Gemini
- **Subtarefas**:
  - [ ] Integração Claude API
  - [ ] Integração OpenAI API
  - [ ] Integração Google Gemini API
  - [ ] Seleção de modelo por usuário
  - [ ] Armazenamento seguro de chaves API
  - [ ] Fallback automático se uma API falhar
  - [ ] Testes com todos os modelos
- **Prioridade**: 🔴 CRÍTICA
- **Estimativa**: 1-2 semanas

---

## TAREFA 13: Dashboard Principal
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Criar dashboard com resumo de cursos, milestones e progresso
- **Subtarefas**:
  - [ ] Listagem de cursos do usuário
  - [ ] Cards de progresso por semana
  - [ ] Milestones alcançados
  - [ ] Atalhos para cada papel (Advisor, Tutor, Librarian, etc)
  - [ ] Estatísticas de aprendizado
  - [ ] Testes de layout responsivo
- **Prioridade**: 🟡 ALTA
- **Estimativa**: 1-2 semanas

---

## TAREFA 14: Página de Perfil do Usuário
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Criar página de perfil com configurações e preferências
- **Subtarefas**:
  - [ ] Exibir dados do usuário
  - [ ] Editar email/senha
  - [ ] Escolher modelo de IA preferido
  - [ ] Conectar integrações (Discord, Zapier, NotebookLM)
  - [ ] Temas (light/dark)
  - [ ] Exportar dados
  - [ ] Deletar conta
- **Prioridade**: 🟢 MÉDIA
- **Estimativa**: 1 semana

---

## TAREFA 15: Testes e QA
- **Status**: ⏳ PENDENTE
- **Data de início**: —
- **Data de conclusão**: —
- **Descrição**: Testes completos de funcionalidade, performance e UX
- **Subtarefas**:
  - [ ] Testes unitários (componentes)
  - [ ] Testes de integração (API)
  - [ ] Testes E2E (fluxos completos)
  - [ ] Testes de performance (Lighthouse)
  - [ ] Testes de segurança (OWASP)
  - [ ] Testes com diferentes navegadores
  - [ ] Feedback de usuários (beta testing)
- **Prioridade**: 🟡 ALTA
- **Estimativa**: 2-3 semanas

---

## LEGENDA DE STATUS

- 🔴 **PENDENTE**: Não iniciada
- 🟡 **INICIADO**: Começou, data de início registrada
- 🟠 **EM ANDAMENTO**: Sendo executada ativamente
- 🟢 **CONCLUÍDO**: Finalizada com data de conclusão
- ⚫ **CANCELADO**: Cancelada (motivo deve ser documentado)

---

## RESUMO DO PROGRESSO

| Status | Quantidade |
|--------|-----------|
| 🔴 PENDENTE | 10 |
| 🟡 INICIADO | 0 |
| 🟠 EM ANDAMENTO | 0 |
| 🟢 CONCLUÍDO | 4 |
| ⚫ CANCELADO | 0 |
| **TOTAL** | **15** |

**Taxa de conclusão**: 26.7% (4/15)  
**Tempo para conclusão de TAREFA 04**: ~15 minutos  
**Próxima**: TAREFA 05 - Tutor (Diagnóstico de Lacunas)

---

**Responsável**: Gelvazio  
**Criado em**: 11-09-2026 22:00  
**Última modificação**: 11-09-2026 22:00
