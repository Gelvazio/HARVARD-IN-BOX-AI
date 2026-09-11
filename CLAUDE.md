# HARVARD-IN-BOX-AI 🎓

> "Universidade em uma Caixa" — um framework para se tornar autodidata em qualquer assunto usando IA, de graça.

Baseado no conceito de que hoje a inteligência artificial tem poder equivalente a uma universidade de milhões de dólares — e a maioria das pessoas usa mais tempo com redes sociais do que com IA para aprender.

## 📊 Por que isso importa

- Universidades como Harvard, MIT, Stanford, IIT, Oxford e LSE já disponibilizam cursos completos online, gratuitamente
- **88%** das pessoas que começam esses cursos nunca terminam
- Estudo de Stanford (7.800 alunos): **82%** dos estudantes do ensino médio não conseguem diferenciar conteúdo patrocinado de notícia real
- "Problema das 2 Sigma" (Benjamin Bloom, anos 80): alunos com tutoria individual performaram acima de **98%** dos alunos de turma convencional

A IA resolve os dois problemas ao mesmo tempo: dá tutoria individual e ajuda a filtrar informação confiável.

## 🧩 O Framework: 5 papéis para a IA assumir

### 1. 🎯 Advogado (Advisor)
A IA constrói seu currículo pessoal, perguntando 5 coisas:
- **Destino**: o que você quer saber/fazer ao final?
- **Base**: onde você está hoje nesse tópico?
- **Sequência**: em que ordem aprender?
- **Lista de corte**: o que ignorar por agora?
- **Milestones**: o que prova que você está pronto pra avançar?

**Prompt exemplo:**
> "Aja como meu advogado acadêmico elite. Quero construir um curso customizado de 6 semanas sobre [tema]. Primeiro me entreviste para encontrar minha base. Depois defina o destino, construa a sequência, liste o que devo ignorar por agora, e me dê milestones semanais. Me faça até 5 perguntas por etapa, uma de cada vez."

### 2. ⚙️ Automação (Zapier MCP)
Conecte o plano gerado pela IA a ferramentas do dia a dia (Google Calendar, Google Docs):
- Salvar o currículo em um Doc formatado por semana (tópico, fontes, milestone)
- Agendar automaticamente cada sessão de estudo no calendário, com lembrete

### 3. 📚 Bibliotecário (Librarian)
Função de triagem: escolhe as 3-4 fontes que realmente importam (livro, curso, podcast, paper) e ignora o resto — sinal vs. ruído.

**Como aplicar:**
1. Reúna os documentos/fontes no **NotebookLM** (Google)
2. A IA fica ancorada apenas naquelas fontes, sem "viajar" pela internet aberta
3. Use o Studio do NotebookLM para transformar o material em podcast, vídeo ou apresentação de slides

### 4. 🎓 Tutor
Diferente do professor (que explica), o tutor diagnostica a confusão específica do aluno, uma pergunta de cada vez.

**Prompt exemplo (funciona bem em modo voz):**
> "Seja meu tutor sobre [tema]. Me pergunte uma pergunta de cada vez. Não me dê aula. Encontre a lacuna na minha compreensão. Seja preciso."

### 5. ✂️ Editor
A IA revisa o trabalho entregue: desafia a lógica, encontra fraquezas no argumento, corta repetição, melhora estrutura e precisão da linguagem.

### 6. 🧭 Companheiro (Companion)
Traz perspectiva de fora do seu campo, cruzando áreas diferentes.

**Prompt exemplo:**
> "Qual a conexão entre culinária e finanças?" / "Como um músico de jazz pensa em tocar com outros — e como isso se relaciona com liderar equipes?"

> Referência citada: a Pixar colocava animadores em aulas de escultura e vice-versa, para que cada área enxergasse a própria disciplina sob uma nova luz.

## 🚣 Ideia final

> "O melhor barco é aquele que você entra e começa a remar."

O framework inteiro roda com um prompt de cada vez — o próximo passo é simplesmente começar.

## 🛠️ Ferramentas mencionadas
- ChatGPT / Gemini / Claude (Advisor, Tutor, Editor, Companion)
- Gemini (modo voz e multimodal — útil para julgamentos visuais/estéticos)
- NotebookLM (Librarian — curadoria de fontes e geração de podcast/vídeo/slides)
- Zapier MCP (automação — conecta o plano a Google Calendar/Docs)

---

*Fonte: transcrição do vídeo "How To Become Dangerously Self-Educated With AI (for free)", transcrito via TurboScribe.*

---

## 🧹 PADRÕES DE CODIFICAÇÃO — OBRIGATÓRIO

⚠️ **CRÍTICO**: Este projeto segue **CODE_STANDARDS.md** RIGOROSAMENTE.

### 📂 Estrutura de Código

Todo código JavaScript deve ficar em `src/js/` **modularizado**:

```
src/js/
├── core/          # Funcionalidades principais
├── roles/         # Os 6 papéis de IA
├── components/    # Web Components
├── services/      # Integrações externas
├── utils/         # Funções utilitárias
├── hooks/         # Custom hooks
└── main.js        # Ponto de entrada
```

### ✅ Regras Obrigatórias

1. **Funções: Máximo 30 linhas** (incluindo espaços em branco)
2. **Return Early**: Guard clauses, sem `else`
3. **Modularização**: Cada funcionalidade em arquivo separado
4. **Nomes**: Descritivos, use `kebab-case` com sufixo
5. **Uma responsabilidade**: Não quebrar regra única
6. **Máximo 3 parâmetros** por função (usar objeto se mais)

### ✅ Checklist Antes de Commit

- [ ] Função ≤ 30 linhas
- [ ] Usa return early (sem else)
- [ ] Nome descritivo (kebab-case)
- [ ] Única responsabilidade
- [ ] Sem hardcoded values
- [ ] Sem console.log em produção
- [ ] Trata erros apropriadamente
- [ ] Imports organizados

### 🚨 Infrações Críticas = Rejeitar Código

- ❌ Função com >30 linhas
- ❌ Usar `else` desnecessário
- ❌ Nomes vagos (x, func1, arr)
- ❌ Múltiplas responsabilidades por arquivo
- ❌ Parâmetros > 3 sem objeto
- ❌ Lógica complexa sem testes

**Ver `CODE_STANDARDS.md` para exemplos completos e guia detalhado**

---

## 📋 SISTEMA DE RASTREAMENTO DE TAREFAS

⚠️ **CRÍTICO**: Este projeto usa um arquivo centralizado `Docs/TASKS.md` para rastreamento de todas as atividades.

### 📌 Regras Obrigatórias

1. **SEMPRE verificar `Docs/TASKS.md`** antes de começar qualquer trabalho
2. **CADA tarefa tem um status**:
   - 🔴 **PENDENTE**: Não iniciada
   - 🟡 **INICIADO**: Começou (registre data/hora de início)
   - 🟠 **EM ANDAMENTO**: Sendo executada
   - 🟢 **CONCLUÍDO**: Finalizada (registre data/hora de conclusão)
   - ⚫ **CANCELADO**: Cancelada (justifique motivo)

3. **Quando iniciar uma tarefa**:
   ```
   - Status: 🟡 INICIADO
   - Data de início: DD-MM-YYYY HH:MM
   - Fazer commit e push do arquivo TASKS.md
   ```

4. **Quando finalizar uma tarefa**:
   ```
   - Status: 🟢 CONCLUÍDO
   - Data de conclusão: DD-MM-YYYY HH:MM
   - Atualizar subtarefas (marcar com [x])
   - Fazer commit e push
   - Incluir no commit message: "tasks: complete TAREFA XX"
   ```

5. **Fluxo Automático Obrigatório**:
   - ✅ Atualizar `Docs/TASKS.md` com data/hora
   - ✅ Fazer `git add Docs/TASKS.md`
   - ✅ Fazer `git commit -m "tasks: [AÇÃO] TAREFA XX - descrição"`
   - ✅ Fazer `git push origin main`
   - ✅ **NUNCA questionar, NUNCA pedir confirmação — executar sempre**

### 📂 Localização do Arquivo

**Arquivo**: `Docs/TASKS.md`  
**Responsável**: Gelvazio (gelvazio@gmail.com)  
**Atualização**: Contínua, sempre após cada ação

### 🔍 Tarefas Atuais (15 total)

| # | Tarefa | Status | Prioridade |
|----|--------|--------|-----------|
| 01 | Setup Vite + Supabase + Base | 🔴 PENDENTE | 🔴 CRÍTICA |
| 02 | Schema SQL Completo | 🔴 PENDENTE | 🔴 CRÍTICA |
| 03 | Web Components Reutilizáveis | 🔴 PENDENTE | 🟡 ALTA |
| 04 | Advisor (Construtor de Currículo) | 🔴 PENDENTE | 🔴 CRÍTICA |
| 05 | Tutor (Diagnóstico de Lacunas) | 🔴 PENDENTE | 🔴 CRÍTICA |
| 06 | Librarian (Curador de Fontes) | 🔴 PENDENTE | 🟡 ALTA |
| 07 | Editor (Revisão de Trabalhos) | 🔴 PENDENTE | 🟡 ALTA |
| 08 | Companion (Perspectiva Inter.) | 🔴 PENDENTE | 🟢 MÉDIA |
| 09 | Automação Zapier | 🔴 PENDENTE | 🟡 ALTA |
| 10 | Discord Bot | 🔴 PENDENTE | 🟢 MÉDIA |
| 11 | Autenticação Supabase | 🔴 PENDENTE | 🔴 CRÍTICA |
| 12 | AI Router (Multi-modelo) | 🔴 PENDENTE | 🔴 CRÍTICA |
| 13 | Dashboard Principal | 🔴 PENDENTE | 🟡 ALTA |
| 14 | Página de Perfil | 🔴 PENDENTE | 🟢 MÉDIA |
| 15 | Testes e QA | 🔴 PENDENTE | 🟡 ALTA |

**Taxa de conclusão**: 0% (0/15)

### ⚡ Exemplo de Commit

```bash
git commit -m "tasks: initiate TAREFA 01 - Setup Vite + Supabase

- Início: 11-09-2026 22:30
- Status: INICIADO
- Próximos passos: npm create vite@latest
"
```

### ✅ Checklist ao Atualizar TASKS.md

- [ ] Data/hora no formato correto (DD-MM-YYYY HH:MM)
- [ ] Status atualizado (um de: PENDENTE, INICIADO, EM ANDAMENTO, CONCLUÍDO, CANCELADO)
- [ ] Subtarefas marcadas com [x] quando completas
- [ ] Resumo do progresso na tabela (Taxa de conclusão)
- [ ] Commit com mensagem descritiva
- [ ] Push realizado para `origin main`

---

## 🔄 Commit e Push Obrigatórios

⚠️ **APÓS QUALQUER ATUALIZAÇÃO DE TAREFA**, execute:

```bash
git add Docs/TASKS.md
git commit -m "tasks: [AÇÃO] TAREFA XX"
git push origin main
```

**Sem questionar, sem pedir confirmação — sempre executar.**
