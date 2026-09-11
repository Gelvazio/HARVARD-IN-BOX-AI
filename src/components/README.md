# Web Components Reutilizáveis

Componentes Web customizados para o projeto HARVARD-IN-BOX-AI.

## 📦 Componentes Disponíveis

### 1. **card-panel** 
Painel/card reutilizável com título, subtítulo e ícone.

```html
<card-panel title="Meu Curso" subtitle="Python para Iniciantes" icon="📚">
  <p>Conteúdo do card aqui</p>
</card-panel>
```

**Atributos:**
- `title` - Título do card
- `subtitle` - Subtítulo (opcional)
- `icon` - Emoji ou ícone (opcional)

---

### 2. **button-action**
Botão com variantes e estados de carregamento.

```html
<button-action variant="primary" size="md">Clique aqui</button-action>
<button-action variant="secondary" loading>Carregando...</button-action>
<button-action disabled>Desabilitado</button-action>
```

**Atributos:**
- `variant` - `primary` (azul) ou `secondary` (cinza)
- `size` - `sm`, `md`, `lg`
- `loading` - Mostra spinner de carregamento
- `disabled` - Desabilita o botão

**Eventos:**
- `btn-click` - Disparado ao clicar

---

### 3. **input-form**
Campo de entrada com label, validação e mensagem de erro.

```html
<input-form label="Email" type="email" placeholder="seu@email.com" required></input-form>
<input-form label="Senha" type="password" required error="Senha obrigatória"></input-form>
```

**Atributos:**
- `label` - Label do campo
- `type` - Tipo (text, email, password, etc)
- `placeholder` - Placeholder
- `required` - Campo obrigatório
- `error` - Mensagem de erro

**Eventos:**
- `input-change` - Disparado ao digitar (detail: valor)

---

### 4. **modal-dialog**
Modal com overlay e controle de abertura/fechamento.

```html
<modal-dialog id="meuModal" title="Confirmar Ação" size="md">
  <p>Tem certeza que deseja continuar?</p>
  <button-action variant="primary">Confirmar</button-action>
</modal-dialog>

<script>
  const modal = document.getElementById('meuModal');
  modal.open();   // Abre modal
  modal.close();  // Fecha modal
</script>
```

**Atributos:**
- `title` - Título do modal
- `size` - `sm` (400px), `md` (600px), `lg` (800px)

**Métodos:**
- `open()` - Abre o modal
- `close()` - Fecha o modal

**Eventos:**
- `modal-close` - Disparado ao fechar

---

### 5. **chat-message**
Mensagem de chat com suporte a avatares e timestamps.

```html
<chat-message role="assistant" avatar="https://...">
  Olá! Como posso ajudar?
</chat-message>

<chat-message role="user" timestamp="14:30">
  Qual é seu nome?
</chat-message>
```

**Atributos:**
- `role` - `assistant` ou `user`
- `avatar` - URL do avatar (opcional)
- `timestamp` - Hora da mensagem (opcional)

---

### 6. **progress-bar**
Barra de progresso com label e percentual.

```html
<progress-bar value="35" max="100" label="Progresso do Curso"></progress-bar>
```

**Atributos:**
- `value` - Valor atual
- `max` - Valor máximo (padrão: 100)
- `label` - Rótulo (opcional)

**Métodos:**
- `updateProgress(value)` - Atualiza o valor

---

### 7. **task-item**
Item de tarefa com checkbox e prioridade.

```html
<task-item 
  title="Implementar Advisor" 
  due-date="15/09/2026"
  priority="high"
  status="pending"
></task-item>

<task-item 
  title="Tarefa Concluída"
  completed
></task-item>
```

**Atributos:**
- `title` - Título da tarefa
- `due-date` - Data de entrega
- `priority` - `high` (vermelho), `medium` (amarelo), `low` (verde)
- `status` - `pending`, `in-progress`, `completed`
- `completed` - Marca como concluída

**Eventos:**
- `task-toggle` - Disparado ao marcar/desmarcar (detail: {completed})

---

## 🎨 Sistema de Tema

O sistema de tema gerencia light/dark mode automaticamente.

```javascript
import { themeManager } from './components/index.js';

// Alternar tema
themeManager.toggleTheme();

// Definir tema específico
themeManager.setTheme('dark');
themeManager.setTheme('light');

// Obter tema atual
const theme = themeManager.getCurrentTheme();

// Escutar mudanças de tema
window.addEventListener('theme-changed', (e) => {
  console.log('Novo tema:', e.detail.theme);
});
```

**Recursos:**
- ✅ Respeita preferência do sistema (`prefers-color-scheme`)
- ✅ Persiste a escolha do usuário em localStorage
- ✅ Transições suaves entre temas
- ✅ Variáveis CSS globais

---

## 📝 Como Usar

### 1. Importar componentes
```javascript
import { CardPanel, ButtonAction, InputForm, ModalDialog, ChatMessage, ProgressBar, TaskItem, themeManager } from './components/index.js';
```

### 2. Usar no HTML
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HARVARD-IN-BOX-AI</title>
</head>
<body>
  <card-panel title="Bem-vindo" icon="👋">
    <p>Escolha uma opção abaixo</p>
    <button-action variant="primary">Começar Curso</button-action>
  </card-panel>

  <script type="module">
    import { themeManager } from './components/index.js';
  </script>
</body>
</html>
```

---

## ✅ Checklist de Componentes

- [x] card-panel ✅
- [x] button-action ✅
- [x] input-form ✅
- [x] modal-dialog ✅
- [x] chat-message ✅
- [x] progress-bar ✅
- [x] task-item ✅
- [x] Sistema de tema light/dark ✅

---

## 🎯 Padrões Seguidos

- ✅ Máximo 30 linhas por função
- ✅ Modularização em arquivos separados
- ✅ Nomes descritivos em kebab-case
- ✅ Suporte a tema light/dark
- ✅ Web Components standards
- ✅ Sem dependências externas

---

**Responsável**: Gelvazio  
**Data de Criação**: 11-09-2026  
**Última Atualização**: 11-09-2026
