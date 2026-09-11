# 🧹 CODE STANDARDS — Harvard In Box AI

> **"Clean Code é essencial. Não é negociável. Todas as regras abaixo DEVEM ser seguidas à risca."**

---

## 📂 ESTRUTURA DE PASTAS

```
src/
├── js/                              # ✅ TODO código JavaScript vai aqui
│   ├── core/                        # Funcionalidades principais
│   │   ├── auth.js                  # Autenticação Supabase
│   │   ├── database.js              # Conexão com banco
│   │   ├── ai-router.js             # Rotear entre IA models
│   │   └── config.js                # Configurações globais
│   │
│   ├── roles/                       # Os 6 papéis de IA
│   │   ├── advisor.js               # Advogado
│   │   ├── tutor.js                 # Tutor
│   │   ├── librarian.js             # Bibliotecário
│   │   ├── editor.js                # Editor
│   │   ├── companion.js             # Companheiro
│   │   └── automation.js            # Automação
│   │
│   ├── components/                  # Web Components
│   │   ├── card-panel.js
│   │   ├── input-form.js
│   │   ├── chat-message.js
│   │   ├── modal-dialog.js
│   │   └── role-selector.js
│   │
│   ├── services/                    # Serviços de integração
│   │   ├── zapier-service.js        # Integração Zapier
│   │   ├── notebooklm-service.js    # NotebookLM API
│   │   ├── discord-service.js       # Discord Bot
│   │   ├── google-service.js        # Google Calendar/Docs
│   │   └── storage-service.js       # LocalStorage + IndexedDB
│   │
│   ├── utils/                       # Funções utilitárias
│   │   ├── validators.js            # Validação de dados
│   │   ├── formatters.js            # Formatação de strings
│   │   ├── parsers.js               # Parsing de dados
│   │   ├── dates.js                 # Manipulação de datas
│   │   └── http.js                  # Requisições HTTP
│   │
│   ├── hooks/                       # Custom hooks (se usar framework)
│   │   ├── useCourse.js
│   │   ├── useSession.js
│   │   └── useAI.js
│   │
│   └── main.js                      # Ponto de entrada principal
│
├── css/
│   └── styles.css
│
└── index.html
```

---

## ✅ REGRAS OBRIGATÓRIAS DE CÓDIGO

### 1. 📏 TAMANHO DE FUNÇÕES: MÁXIMO 30 LINHAS

**❌ ERRADO:**
```javascript
function processUserData(user) {
    // linha 1
    const name = user.name.trim();
    // linha 2-3
    const email = user.email.toLowerCase();
    // linha 4-5
    const age = calculateAge(user.birthDate);
    // linha 6-7
    
    if (age < 18) {
        return { error: 'Usuário menor de idade' };
    }
    // linha 10-12
    
    if (!email.includes('@')) {
        return { error: 'Email inválido' };
    }
    // linha 15-17
    
    const validatedUser = {
        name,
        email,
        age,
        createdAt: new Date(),
        isActive: true,
        preferences: {
            theme: 'light',
            language: 'pt-BR',
            notifications: true
        }
    };
    // linha 28-32
    
    return database.save(validatedUser);
    // linha 34
}
```

**✅ CORRETO:**
```javascript
// Quebrar em funções menores
function processUserData(user) {
    validateAge(user);
    validateEmail(user);
    
    const validatedUser = buildUserObject(user);
    return database.save(validatedUser);
}

function validateAge(user) {
    const age = calculateAge(user.birthDate);
    if (age < 18) throw new Error('Usuário menor de idade');
}

function validateEmail(user) {
    if (!user.email.includes('@')) throw new Error('Email inválido');
}

function buildUserObject(user) {
    return {
        name: user.name.trim(),
        email: user.email.toLowerCase(),
        age: calculateAge(user.birthDate),
        createdAt: new Date(),
        isActive: true,
        preferences: getDefaultPreferences()
    };
}

function getDefaultPreferences() {
    return {
        theme: 'light',
        language: 'pt-BR',
        notifications: true
    };
}
```

**Benefícios:**
- ✅ Fácil de testar
- ✅ Fácil de ler
- ✅ Responsabilidade única
- ✅ Reutilizável

---

### 2. 🔄 RETURN EARLY (Guard Clauses)

**❌ ERRADO:**
```javascript
function getUserCourse(userId, courseId) {
    if (userId) {
        if (courseId) {
            const course = database.find(courseId);
            if (course) {
                if (course.userId === userId) {
                    return course;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}
```

**✅ CORRETO:**
```javascript
function getUserCourse(userId, courseId) {
    if (!userId) return null;
    if (!courseId) return null;
    
    const course = database.find(courseId);
    if (!course) return null;
    if (course.userId !== userId) return null;
    
    return course;
}

// Ou mais conciso:
function getUserCourse(userId, courseId) {
    if (!userId || !courseId) return null;
    
    const course = database.find(courseId);
    return course?.userId === userId ? course : null;
}
```

**Benefícios:**
- ✅ Menos indentação (max 2 níveis)
- ✅ Mais legível
- ✅ Falha rápido
- ✅ Evita "arrow code"

---

### 3. 🚫 EVITAR ELSE

**❌ ERRADO:**
```javascript
function handleCourseStatus(course) {
    if (course.status === 'active') {
        return displayActiveView(course);
    } else if (course.status === 'completed') {
        return displayCompletedView(course);
    } else if (course.status === 'paused') {
        return displayPausedView(course);
    } else {
        return displayDefaultView(course);
    }
}
```

**✅ CORRETO:**
```javascript
function handleCourseStatus(course) {
    const statusHandlers = {
        active: displayActiveView,
        completed: displayCompletedView,
        paused: displayPausedView
    };
    
    const handler = statusHandlers[course.status] || displayDefaultView;
    return handler(course);
}
```

**Ou com switch (aceitável):**
```javascript
function handleCourseStatus(course) {
    switch (course.status) {
        case 'active':
            return displayActiveView(course);
        case 'completed':
            return displayCompletedView(course);
        case 'paused':
            return displayPausedView(course);
        default:
            return displayDefaultView(course);
    }
}
```

**Benefícios:**
- ✅ Mais fácil de adicionar casos
- ✅ Menos indentação
- ✅ Mais declarativo

---

## 📋 NOMENCLATURA DE ARQUIVOS

### Regras:
- 🔸 **Arquivos de funcionalidade**: `kebab-case` + sufixo
  - `advisor-role.js` (papel)
  - `user-service.js` (serviço)
  - `email-validator.js` (validador)
  - `date-formatter.js` (formatador)

- 🔸 **Prefixos obrigatórios**:
  ```
  use-* → hooks (useAuth.js, useCourse.js)
  get-* → getters/queries (getCourse.js, getUser.js)
  set-* → setters (setUserPreference.js)
  handle-* → event handlers (handleLogin.js, handleSubmit.js)
  *-service.js → serviços (database-service.js)
  *-validator.js → validação (email-validator.js)
  *-formatter.js → formatação (date-formatter.js)
  ```

- 🔸 **Nomes descritivos**: 
  - ❌ `util.js` (muito genérico)
  - ✅ `date-formatter.js` (específico)

---

## 🧩 MODULARIZAÇÃO: REGRA CRÍTICA

### Cada arquivo = Uma responsabilidade

**❌ ERRADO:**
```javascript
// advisor.js (arquivo gigante)
function askQuestion() { /* ... */ }
function validateAnswer() { /* ... */ }
function calculateBase() { /* ... */ }
function buildSequence() { /* ... */ }
function generateMilestones() { /* ... */ }
function saveToDatabase() { /* ... */ }
function sendToZapier() { /* ... */ }
function notifyUser() { /* ... */ }
// 200+ linhas
```

**✅ CORRETO:**
```
js/roles/
├── advisor.js                    # Orquestra o fluxo
├── advisor-questions.js          # Perguntas da entrevista
├── advisor-validator.js          # Validação de respostas
├── advisor-sequence-builder.js   # Construção da sequência
└── advisor-milestone-generator.js # Geração de milestones

// advisor.js
import { askQuestions } from './advisor-questions.js';
import { validateAnswers } from './advisor-validator.js';
import { buildSequence } from './advisor-sequence-builder.js';
import { generateMilestones } from './advisor-milestone-generator.js';

export async function runAdvisor(courseId) {
    const answers = await askQuestions();
    validateAnswers(answers);
    const sequence = buildSequence(answers);
    const milestones = generateMilestones(sequence);
    return { sequence, milestones };
}
```

**Benefícios:**
- ✅ Fácil encontrar código
- ✅ Fácil testar (1 responsabilidade)
- ✅ Fácil reutilizar
- ✅ Menos conflitos em Git

---

## 🧪 PRINCÍPIOS CLEAN CODE

### 1. Nomes Significativos
```javascript
// ❌ Ruim
const d = new Date();
const u = user.name;
const arr = [];

// ✅ Bom
const currentDate = new Date();
const userName = user.name;
const completedMilestones = [];
```

### 2. Funções Fazem Uma Coisa
```javascript
// ❌ Ruim (faz 3 coisas)
function processAndSaveUser(user) {
    user.email = user.email.toLowerCase();
    user.name = user.name.trim();
    database.save(user);
}

// ✅ Bom (cada função faz 1 coisa)
function normalizeUser(user) {
    return {
        ...user,
        email: user.email.toLowerCase(),
        name: user.name.trim()
    };
}

function saveUser(user) {
    return database.save(user);
}

// Uso:
const normalized = normalizeUser(user);
saveUser(normalized);
```

### 3. Comentários = Código Ruim
```javascript
// ❌ Ruim (precisa de comentário)
// Verifica se a idade é válida
const age = new Date() - user.birthDate / (1000 * 60 * 60 * 24 * 365);
if (age >= 18) { /* ... */ }

// ✅ Bom (nome explícito)
function isAdult(user) {
    const age = calculateAge(user.birthDate);
    return age >= 18;
}

if (isAdult(user)) { /* ... */ }
```

### 4. Evitar Parâmetros Booleanos
```javascript
// ❌ Ruim
function getUsers(isActive, isAdmin) {
    // Confuso: o que significa cada true/false?
}

// ✅ Bom
function getActiveUsers() { /* ... */ }
function getAdminUsers() { /* ... */ }
function getUsers({ isActive, isAdmin }) { /* ... */ }
```

---

## 🎯 ESTRUTURA DE FUNÇÃO IDEAL

```javascript
// ✅ Padrão recomendado
function doSomething(input) {
    // 1. Validação/Guard clauses (linhas 1-5)
    if (!input) return null;
    if (!isValid(input)) throw new Error('Invalid input');
    
    // 2. Transformação/Lógica (linhas 6-20)
    const processed = transform(input);
    const result = calculate(processed);
    
    // 3. Return (última linha)
    return result;
}
```

**Máximo: 30 linhas incluindo comentários e espaços em branco**

---

## ✅ CHECKLIST ANTES DE FAZER COMMIT

Toda função/arquivo DEVE passar neste checklist:

- [ ] Nome do arquivo é descritivo (kebab-case)
- [ ] Função tem no máximo 30 linhas
- [ ] Usa return early (sem else)
- [ ] Tem uma única responsabilidade
- [ ] Nomes de variáveis são claros
- [ ] Sem comentários desnecessários
- [ ] Sem código duplicado
- [ ] Importações organizadas (ordem alfabética)
- [ ] Funções exportadas claramente (`export`)
- [ ] Sem console.log em produção
- [ ] Sem hardcoded values (usar constantes)
- [ ] Trata erros apropriadamente
- [ ] Nenhuma função recebe mais de 3 parâmetros

---

## 🚨 REGRAS INFRAÇÕES CRÍTICAS

**Qualquer um dos itens abaixo = REJEITAR CÓDIGO**

```javascript
// ❌ INACEITÁVEL 1: Função com >30 linhas
function bigFunction() {
    // 31+ linhas
}

// ❌ INACEITÁVEL 2: Sem modularização
// tudo em um arquivo

// ❌ INACEITÁVEL 3: Else sem necessidade
if (x) {
    return a;
} else {
    return b;
}

// ❌ INACEITÁVEL 4: Nomes vagos
const x = 5;
const func1 = () => {};
const arr = [];

// ❌ INACEITÁVEL 5: Lógica complexa em uma função
function doEverything() {
    // validação + cálculo + salvamento + notificação
}

// ❌ INACEITÁVEL 6: Parâmetros > 3
function process(a, b, c, d, e, f) {}

// ❌ INACEITÁVEL 7: Sem trato de erro
async function fetchData() {
    const response = await fetch(url);
    return response.json(); // e se falhar?
}
```

---

## 🔧 IMPORTS & EXPORTS

**Organizar sempre desta forma:**

```javascript
// 1. Imports de bibliotecas
import { createClient } from '@supabase/supabase-js';

// 2. Imports de módulos locais (ordem alfabética)
import { getUserById } from './services/user-service.js';
import { validateEmail } from './utils/validators.js';
import { formatDate } from './utils/formatters.js';

// 3. Imports de constantes
import { API_KEY, MAX_RETRIES } from './config.js';

// 4. Código da função
export function doSomething() {
    // ...
}

// 5. Exports (ao final ou início claro)
export { doSomething, anotherFunction };
```

---

## 📝 EXEMPLO COMPLETO: Antes vs. Depois

### ❌ ANTES (Não-conforme):

```javascript
// advisor.js (100+ linhas)
export function advisor(user, courseId, ageLimit) {
    if (user) {
        if (courseId) {
            let questions = [];
            questions.push("Qual é seu destino?");
            questions.push("Onde você está hoje?");
            questions.push("Em que ordem aprender?");
            questions.push("O que ignorar?");
            questions.push("Milestones?");
            
            let answers = [];
            for (let i = 0; i < questions.length; i++) {
                console.log(questions[i]);
                let answer = prompt(questions[i]);
                answers.push(answer);
            }
            
            // Validação
            if (answers[0] === "" || answers[1] === "" || answers[2] === "" || answers[3] === "" || answers[4] === "") {
                console.log("Preencha todas as respostas");
                return false;
            } else {
                // Construir sequência
                let sequence = [];
                if (answers[0]) {
                    sequence.push({ topic: answers[0], type: 'destination' });
                } else {
                    return false;
                }
                if (answers[1]) {
                    sequence.push({ topic: answers[1], type: 'base' });
                } else {
                    return false;
                }
                
                // ... 40 mais linhas assim
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}
```

### ✅ DEPOIS (Conforme):

```
js/roles/advisor/
├── advisor.js
├── advisor-questions.js
├── advisor-validator.js
├── advisor-interview.js
└── advisor-planner.js
```

**advisor.js:**
```javascript
import { collectAnswers } from './advisor-interview.js';
import { validateAnswers } from './advisor-validator.js';
import { buildPlan } from './advisor-planner.js';

export async function runAdvisor(user, courseId) {
    if (!user?.id || !courseId) return null;
    
    const answers = await collectAnswers();
    validateAnswers(answers);
    
    return buildPlan(answers);
}
```

**advisor-interview.js:**
```javascript
const ADVISOR_QUESTIONS = [
    "Qual é seu destino?",
    "Onde você está hoje?",
    "Em que ordem aprender?",
    "O que ignorar por agora?",
    "Milestones semanais?"
];

export async function collectAnswers() {
    return Promise.all(
        ADVISOR_QUESTIONS.map(question => askQuestion(question))
    );
}

async function askQuestion(question) {
    return prompt(question);
}
```

**advisor-validator.js:**
```javascript
export function validateAnswers(answers) {
    if (answers.some(a => !a)) {
        throw new Error('Todas as respostas são obrigatórias');
    }
}
```

**advisor-planner.js:**
```javascript
export function buildPlan(answers) {
    return {
        destination: answers[0],
        currentLevel: answers[1],
        sequence: answers[2],
        toIgnore: answers[3],
        milestones: generateMilestones(answers[4])
    };
}

function generateMilestones(milestonInfo) {
    // Implementação
    return [];
}
```

---

## 🚀 CONCLUSÃO

**Estas regras NÃO SÃO SUGESTÕES. São OBRIGATÓRIAS.**

Antes de fazer commit:
1. ✅ Verificar tamanho de cada função (max 30 linhas)
2. ✅ Usar return early (sem else)
3. ✅ Um arquivo = Uma responsabilidade
4. ✅ Nomes descritivos
5. ✅ Passar no checklist completo

**Qualidade de código > Velocidade de desenvolvimento**

---

**Data**: 2026-09-11  
**Versão**: 1.0  
**Status**: 🔴 OBRIGATÓRIO
