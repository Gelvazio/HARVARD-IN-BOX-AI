# 🗺️ ROADMAP COMPLETO — Harvard In Box AI

## 📋 Visão Geral do Projeto

**O que é?** Framework que usa 6 papéis de IA para criar educação personalizada  
**Como funciona?** Usuário escolhe papel → IA fornece tutoria específica → Sistema rastreia progresso  
**Stack**: Vite.js + Supabase + Vanilla JS + Tailwind CSS  
**Objetivo**: MVP funcional com todos os 6 papéis em 4-5 meses

---

## 🎯 TAREFAS DETALHADAS (1-15)

### ✅ TAREFA 01: Setup Vite + Supabase + Estrutura Base [CONCLUÍDO]
**Tempo**: ~30 minutos | **Status**: 🟢 CONCLUÍDO

**O que fazer:**
- ✅ Configurar build tool (Vite.js) para development rápido
- ✅ Setup Tailwind CSS para styling
- ✅ Criar estrutura de pastas modularizada (src/js/, src/css/)
- ✅ Arquivo de configuração global (.env.local)
- ✅ Web Components básicos (header, menu, footer)
- ✅ Entry point da aplicação (main.js)

**Deliverables:**
```
vite.config.js, tailwind.config.js, package.json
src/js/main.js, src/js/core/config.js, src/js/core/event-manager.js
src/css/styles.css, src/index.html
```

**Resultado**: Aplicação rodando em http://localhost:3000 com componentes básicos

---

### ⏳ TAREFA 02: Schema SQL Completo (Banco de Dados)
**Tempo**: 3-5 dias | **Status**: 🔴 PENDENTE | **Prioridade**: 🔴 CRÍTICA

**O que fazer:**
Criar banco de dados Supabase com 11 tabelas principais

**Tabelas:**
1. **users** — Contas de usuário (email, perfil, preferências)
2. **courses** — Planos de aprendizado criados pelo Advisor
3. **milestones** — Marcos semanais para cada curso
4. **sources** — Materiais curados (livros, cursos, podcasts)
5. **sessions** — Histórico de chat com cada papel de IA
6. **messages** — Mensagens individuais em cada sessão
7. **assignments** — Trabalhos/exercícios submetidos
8. **ai_preferences** — Qual modelo de IA o usuário prefere (Claude/GPT/Gemini)
9. **integrations** — Conexões com Zapier, Discord, NotebookLM
10. **ai_insights** — Conexões interdisciplinares do Companion
11. **user_progress** — Rastreamento de progresso geral

**O que será criado:**
- Migration SQL com todas as 11 tabelas
- Índices para performance
- Foreign keys para relacionamentos
- Row Level Security (RLS) para privacidade
- Triggers automáticos para updated_at
- 1 View SQL para dashboard ativo

**Deliverables:**
```
db/migration_001.sql aplicada no Supabase
Todas as 11 tabelas criadas e testadas
RLS habilitado (usuários veem só seus dados)
Índices criados para queries rápidas
```

**Resultado**: Banco de dados pronto para receber dados de usuários

---

### ⏳ TAREFA 03: Web Components Reutilizáveis
**Tempo**: 1-2 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🟡 ALTA

**O que fazer:**
Criar componentes visuais reutilizáveis seguindo Clean Code

**Componentes a criar:**
1. **card-panel.js** — Card genérico (título, conteúdo, ações)
2. **input-form.js** — Formulário genérico com validação
3. **chat-message.js** — Mensagem de chat (user/ai)
4. **modal-dialog.js** — Modal genérico (confirmar, alertas)
5. **button-action.js** — Botão com loading states
6. **progress-bar.js** — Barra de progresso
7. **task-item.js** — Item de tarefa/milestone
8. **theme-toggle.js** — Switch light/dark mode

**Características:**
- Shadow DOM (CSS isolado)
- Reutilizáveis em qualquer página
- Event-driven (comunicação via eventos)
- Responsivos
- Acessíveis (ARIA)

**Deliverables:**
```
src/js/components/card-panel.js
src/js/components/input-form.js
src/js/components/chat-message.js
src/js/components/modal-dialog.js
src/js/components/button-action.js
src/js/components/progress-bar.js
src/js/components/task-item.js
src/js/components/theme-toggle.js
```

**Resultado**: Biblioteca de componentes pronta para usar em qualquer tela

---

### ⏳ TAREFA 04: Advisor (Construtor de Currículo)
**Tempo**: 2-3 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🔴 CRÍTICA

**O que fazer:**
Implementar o primeiro papel de IA — constrói plano de estudos personalizado

**Fluxo:**
1. Usuário clica "Novo Curso"
2. IA faz 5 perguntas (destino, base, sequência, ignora, milestones)
3. IA processa respostas
4. IA gera plano estruturado
5. Sistema salva em Supabase
6. Zapier agenda no Google Calendar

**O que será criado:**
```
src/js/roles/advisor.js
src/js/roles/advisor-questions.js
src/js/roles/advisor-validator.js
src/js/roles/advisor-interview.js
src/js/roles/advisor-planner.js
src/pages/new-course.html
```

**Integrations:**
- Claude/GPT/Gemini API (qual IA responde)
- Supabase (salvar curso)
- Zapier (schedule Google Calendar)

**Deliverables:**
- Página de novo curso funcionando
- Entrevista com 5 perguntas
- Plano gerado automaticamente
- Milestones semanais
- Integração com Google Calendar

**Resultado**: Usuário consegue criar plano de estudo em 5 minutos

---

### ⏳ TAREFA 05: Tutor (Diagnóstico de Lacunas)
**Tempo**: 3-4 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🔴 CRÍTICA

**O que fazer:**
Implementar o papel mais importante — detecta exatamente o que o aluno não entendeu

**Como funciona:**
1. Usuário abre sessão de Tutor
2. Faz pergunta sobre o tema
3. IA (Claude melhor) **não explica** — **pergunta**
4. Diagnostica a confusão específica
5. Volta a perguntar até aluno entender
6. Sistema salva sessão em Supabase

**O que será criado:**
```
src/js/roles/tutor.js
src/js/roles/tutor-chat.js
src/js/roles/tutor-diagnostics.js
src/js/roles/tutor-prompts.js
src/pages/study.html
```

**Características:**
- Chat com histórico
- Claude API (melhor para tutoria diagnóstica)
- Modo voz (opcional)
- Salva sessões
- Retoma conversas

**Deliverables:**
- Página de estudo com chat
- IA faz perguntas, não explica
- Histórico de conversas salvo
- Integração com Supabase

**Resultado**: Aluno aprende melhor porque IA diagnostica a confusão exata

---

### ⏳ TAREFA 06: Librarian (Curador de Fontes)
**Tempo**: 2-3 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🟡 ALTA

**O que fazer:**
Implementar curador de fontes — encontra as 3-4 melhores referências

**Como funciona:**
1. Usuário diz o tema
2. Librarian busca as 3-4 melhores fontes (livro, curso, podcast, paper)
3. Valida credibilidade (autor, recenticidade, clareza)
4. Insere no NotebookLM Google
5. Gera podcast/vídeo/slides automaticamente

**O que será criado:**
```
src/js/roles/librarian.js
src/js/roles/librarian-search.js
src/js/roles/librarian-validator.js
src/services/notebooklm-service.js
src/pages/sources.html
```

**Integrations:**
- NotebookLM API (Google)
- Supabase (salvar fontes)
- Web search (encontrar materiais)

**Deliverables:**
- Interface de busca
- IA valida credibilidade
- Integração com NotebookLM
- Geração de podcast/vídeo/slides

**Resultado**: Aluno acessa apenas as MELHORES fontes, ignora ruído

---

### ⏳ TAREFA 07: Editor (Revisão de Trabalhos)
**Tempo**: 2-3 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🟡 ALTA

**O que fazer:**
Implementar revisor — fornece feedback estruturado em trabalhos

**Como funciona:**
1. Usuário envia trabalho (texto, código, projeto)
2. IA analisa em 4 dimensões:
   - Lógica: está sound?
   - Argumentação: há fraquezas?
   - Estrutura: flui bem?
   - Linguagem: é clara e precisa?
3. Editor gera feedback linha por linha
4. Salva em Supabase

**O que será criado:**
```
src/js/roles/editor.js
src/js/roles/editor-analyzer.js
src/js/roles/editor-feedback.js
src/pages/submit-work.html
```

**Características:**
- Upload de arquivo ou texto
- Análise em múltiplas dimensões
- Feedback estruturado
- Sugestões de melhoria
- Histórico de revisões

**Deliverables:**
- Página de submissão
- Análise automática
- Feedback linha por linha
- Sugestões de melhoria

**Resultado**: Aluno recebe feedback de editor profissional em minutos

---

### ⏳ TAREFA 08: Companion (Perspectiva Interdisciplinar)
**Tempo**: 2-3 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🟢 MÉDIA

**O que fazer:**
Implementar companheiro — cruza seu tópico com outras disciplinas

**Como funciona:**
1. Usuário está aprendendo Tema A
2. Companion sugere conexões com Temas B, C, D
3. Exemplo: "Como jazz improvisation se relaciona com liderança?"
4. Amplia perspectiva do aluno
5. Salva insights em Supabase

**O que será criado:**
```
src/js/roles/companion.js
src/js/roles/companion-insights.js
src/js/roles/companion-connections.js
src/pages/insights.html
```

**Características:**
- Sugestões automáticas
- Conexões inesperadas
- Relevance scoring
- Salva insights favoritos

**Deliverables:**
- Interface de insights
- IA gera conexões
- Relacionadas ao tópico aprendido
- Salva insights

**Resultado**: Aluno enxerga seu tópico sob novas perspectivas

---

### ⏳ TAREFA 09: Automação Zapier (Google Calendar/Docs)
**Tempo**: 1-2 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🟡 ALTA

**O que fazer:**
Implementar automação — conecta plano de estudo a ferramentas que aluno já usa

**O que automatizar:**
1. **Google Calendar**: Cria eventos para cada sessão de estudo
2. **Google Docs**: Salva plano formatado por semana
3. **Lembretes**: Notificações automáticas
4. **Acompanhamento**: Sincroniza progresso

**O que será criado:**
```
src/services/zapier-service.js
src/services/google-service.js
src/js/roles/automation.js
```

**Integrations:**
- Zapier Webhooks
- Google Calendar API
- Google Drive API
- Email (notificações)

**Deliverables:**
- Usuário conecta sua conta Google
- Plano salvo automaticamente em Docs
- Eventos criados no Calendar
- Lembretes automáticos

**Resultado**: Aluno tem plano integrado às ferramentas que já usa

---

### ⏳ TAREFA 10: Discord Bot
**Tempo**: 1-2 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🟢 MÉDIA

**O que fazer:**
Criar bot Discord para acessibilidade — trazer app para onde alunos já estão

**Comandos:**
- `/new-course` — Criar novo curso
- `/ask` — Fazer pergunta ao Tutor
- `/feedback` — Submeter trabalho para Editor
- `/status` — Ver progresso
- `/insights` — Sugestões do Companion

**O que será criado:**
```
src/services/discord-service.js
src/js/discord-bot.js
```

**Características:**
- Bot rodando 24/7
- Integração com Supabase
- Autenticação de usuários
- Commands e interações

**Deliverables:**
- Bot Discord funcional
- Principais comandos implementados
- Integrado com Supabase
- Rodando em servidor

**Resultado**: Alunos podem usar app direto no Discord

---

### ⏳ TAREFA 11: Autenticação Supabase (Email/Senha)
**Tempo**: 1 semana | **Status**: 🔴 PENDENTE | **Prioridade**: 🔴 CRÍTICA

**O que fazer:**
Implementar sistema completo de autenticação

**Páginas:**
1. **Login** — Email + senha
2. **Signup** — Criar conta (email, nome, senha)
3. **Recuperação** — Reset de senha
4. **Verificação** — Confirmar email
5. **Sessão** — Manter usuário logado

**O que será criado:**
```
src/js/core/auth.js
src/pages/login.html
src/pages/signup.html
src/pages/forgot-password.html
```

**Características:**
- Email/senha com Supabase Auth
- Verificação de email
- Reset de senha
- Session persistente
- Redirect automático

**Deliverables:**
- Páginas de autenticação
- Login/Signup funcionando
- Recuperação de senha
- Session management

**Resultado**: Usuários conseguem criar conta e fazer login

---

### ⏳ TAREFA 12: AI Router (Multi-modelo)
**Tempo**: 1-2 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🔴 CRÍTICA

**O que fazer:**
Criar sistema que permite usuário escolher qual IA usar (Claude, GPT, Gemini)

**Como funciona:**
1. Usuário escolhe modelo na configuração
2. Sistema roteia para API correta
3. Chaves de API armazenadas com segurança
4. Fallback automático se uma API cair

**O que será criado:**
```
src/js/core/ai-router.js
src/services/claude-service.js
src/services/openai-service.js
src/services/gemini-service.js
```

**Características:**
- Suporta Claude, GPT-4, Gemini
- Fallback automático
- Rate limiting
- Criptografia de chaves
- Usage tracking

**Deliverables:**
- AI Router funcional
- Integração com 3 provedores
- Fallback automático
- Settings para escolher modelo

**Resultado**: Usuário pode escolher qual IA prefere usar

---

### ⏳ TAREFA 13: Dashboard Principal
**Tempo**: 1-2 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🟡 ALTA

**O que fazer:**
Criar dashboard com resumo visual do progresso

**O que mostrar:**
1. **Cursos ativos** — Cards com progresso
2. **Milestones** — Marcos alcançados
3. **Sessões recentes** — Últimas conversas
4. **Progresso geral** — Percentual completado
5. **Próximos passos** — Recomendações

**O que será criado:**
```
src/pages/dashboard.html
src/js/pages/dashboard.js
```

**Características:**
- Cards com progresso
- Gráficos simples
- Botões para cada papel
- Responsivo
- Atualização em tempo real

**Deliverables:**
- Dashboard página principal
- Resumo de cursos
- Progresso visual
- Links para cada papel

**Resultado**: Usuário vê visão geral do aprendizado

---

### ⏳ TAREFA 14: Página de Perfil do Usuário
**Tempo**: 1 semana | **Status**: 🔴 PENDENTE | **Prioridade**: 🟢 MÉDIA

**O que fazer:**
Criar página de perfil com configurações

**O que incluir:**
1. **Dados pessoais** — Nome, email, avatar
2. **Preferências de IA** — Qual modelo usar
3. **Integrações** — Conectar Google, Discord, Zapier
4. **Tema** — Light/dark mode
5. **Segurança** — Mudar senha, deletar conta
6. **Exportar dados** — Download de dados

**O que será criado:**
```
src/pages/profile.html
src/js/pages/profile.js
```

**Características:**
- Editar perfil
- Integração com Google, Discord
- Preferências de modelo IA
- Segurança (2FA opcional)
- Exportar dados

**Deliverables:**
- Página de perfil
- Editar informações
- Gerenciar integrações
- Configurações de segurança

**Resultado**: Usuário controla sua conta e preferências

---

### ⏳ TAREFA 15: Testes e QA
**Tempo**: 2-3 semanas | **Status**: 🔴 PENDENTE | **Prioridade**: 🟡 ALTA

**O que fazer:**
Testar tudo e garantir qualidade

**Tipos de testes:**
1. **Unitários** — Funções individuais
2. **Integração** — Módulos juntos
3. **E2E** — Fluxos completos (criar curso → estudar → receber feedback)
4. **Performance** — Lighthouse score > 90
5. **Segurança** — OWASP top 10
6. **Navegadores** — Chrome, Firefox, Safari, Edge
7. **Mobile** — iPhone, Android

**O que será criado:**
```
src/__tests__/
  - core.test.js
  - components.test.js
  - integration.test.js
  - e2e.test.js
```

**Deliverables:**
- Testes automatizados passando
- Performance > 90 (Lighthouse)
- Sem vulnerabilidades OWASP
- Suporte multi-navegador
- Responsivo (mobile OK)

**Resultado**: Aplicação pronta para produção

---

## 📊 CRONOGRAMA ESTIMADO

| Tarefa | Tempo | Total Acumulado |
|--------|-------|-----------------|
| 01 ✅ | 0.5h | 0.5h |
| 02 | 3-5 dias | 1 semana |
| 03 | 1-2 sem | 2-3 sem |
| 04 | 2-3 sem | 4-6 sem |
| 05 | 3-4 sem | 7-10 sem |
| 06 | 2-3 sem | 9-13 sem |
| 07 | 2-3 sem | 11-16 sem |
| 08 | 2-3 sem | 13-19 sem |
| 09 | 1-2 sem | 14-21 sem |
| 10 | 1-2 sem | 15-23 sem |
| 11 | 1 sem | 16-24 sem |
| 12 | 1-2 sem | 17-26 sem |
| 13 | 1-2 sem | 18-28 sem |
| 14 | 1 sem | 19-29 sem |
| 15 | 2-3 sem | **21-32 sem** |

**Total estimado**: 5-8 meses (sem pressa = 1 ano tranquilo)

---

## 🎯 PRINCIPAIS ENTREGÁVEIS POR FASE

### Fase 1: FOUNDATION (Tarefas 01-02)
- ✅ Ambiente de dev funcionando
- [ ] Banco de dados pronto
- **Resultado**: Infraestrutura completa

### Fase 2: COMPONENTS (Tarefas 03)
- [ ] Biblioteca de componentes
- **Resultado**: UI pronta para usar

### Fase 3: CORE ROLES (Tarefas 04-05)
- [ ] Advisor (criar cursos)
- [ ] Tutor (diagnosticar)
- **Resultado**: MVP funcional

### Fase 4: EXTENDED ROLES (Tarefas 06-08)
- [ ] Librarian (fontes)
- [ ] Editor (feedback)
- [ ] Companion (insights)
- **Resultado**: Produto completo

### Fase 5: INTEGRATIONS (Tarefas 09-10)
- [ ] Zapier automação
- [ ] Discord bot
- **Resultado**: Multi-plataforma

### Fase 6: PLUMBING (Tarefas 11-14)
- [ ] Autenticação
- [ ] AI Router
- [ ] Dashboard
- [ ] Perfil
- **Resultado**: Experiência completa

### Fase 7: POLISH (Tarefa 15)
- [ ] Testes
- [ ] Performance
- [ ] Segurança
- **Resultado**: Pronto para produção

---

## 🚀 O QUE VOCÊ VAI CONSEGUIR

**No final de tudo:**

✅ Aplicação web funcional (Vite)  
✅ 6 papéis de IA implementados  
✅ Banco de dados robusto (Supabase)  
✅ Integração com 3 IA models  
✅ Automação com Google Calendar/Docs  
✅ Bot Discord  
✅ Dashboard com progresso  
✅ Autenticação de usuários  
✅ Pronto para produção  
✅ Pronto para Vercel deploy  

**Usuário consegue:**
1. Criar plano de estudo personalizado
2. Estudar com tutor IA diagnóstico
3. Acessar melhores fontes do mercado
4. Receber feedback em trabalhos
5. Ver conexões interdisciplinares
6. Sincronizar com Google Calendar
7. Usar no Discord
8. Acompanhar progresso em dashboard

---

## ✅ CHECKLIST FINAL

- [ ] Todas as 15 tarefas concluídas
- [ ] Todos os testes passando
- [ ] Performance > 90 (Lighthouse)
- [ ] Sem vulnerabilidades
- [ ] Documentação completa
- [ ] Code standards seguidos (max 30 linhas, return early, modularizado)
- [ ] Deploy pronto para Vercel
- [ ] 🚀 LANÇAMENTO

---

**Este é o roadmap completo do Harvard In Box AI.**  
**Cada tarefa será marcada como concluída quando finalizada.**  
**Progresso atualizado automaticamente no TASKS.md**
