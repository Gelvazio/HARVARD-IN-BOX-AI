# 📦 Como Usar os Web Components

Cada componente (Header, Menu, Footer) é um Web Component reutilizável e independente.

## Importação

```javascript
import { HeaderComponent } from './components/header.js';
import { MenuComponent } from './components/menu.js';
import { FooterComponent } from './components/footer.js';
```

## Uso no HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Harvard In Box AI</title>
</head>
<body>
    <!-- Header -->
    <app-header authenticated user-name="João Silva"></app-header>
    
    <!-- Menu -->
    <app-menu></app-menu>
    
    <!-- Main Content -->
    <main>
        <!-- Seu conteúdo aqui -->
    </main>
    
    <!-- Footer -->
    <app-footer></app-footer>
    
    <!-- Scripts -->
    <script type="module">
        import { HeaderComponent } from './js/components/header.js';
        import { MenuComponent } from './js/components/menu.js';
        import { FooterComponent } from './js/components/footer.js';
    </script>
</body>
</html>
```

## Atributos do Header

```html
<!-- Sem autenticação -->
<app-header></app-header>

<!-- Com autenticação -->
<app-header authenticated user-name="João Silva"></app-header>
```

## Ouvindo Eventos

### Header Events
```javascript
const header = document.querySelector('app-header');

header.addEventListener('login', () => {
    console.log('Usuário clicou em Login');
});

header.addEventListener('signup', () => {
    console.log('Usuário clicou em Signup');
});

header.addEventListener('logout', () => {
    console.log('Usuário clicou em Logout');
});

header.addEventListener('navigate', (e) => {
    console.log('Navegando para:', e.detail.path);
});
```

### Menu Events
```javascript
const menu = document.querySelector('app-menu');

menu.addEventListener('role-selected', (e) => {
    console.log('Papel selecionado:', e.detail.role);
    // 'advisor', 'tutor', 'librarian', 'editor', 'companion', 'automation'
});

menu.addEventListener('page-selected', (e) => {
    console.log('Página selecionada:', e.detail.page);
    // 'dashboard', 'courses', 'settings'
});
```

### Footer Events
```javascript
const footer = document.querySelector('app-footer');

footer.addEventListener('footer-link-clicked', (e) => {
    console.log('Link clicado:', e.detail.link);
});

footer.addEventListener('social-link-clicked', (e) => {
    console.log('Social clicado:', e.detail.social);
});
```

## Controlando Componentes Programaticamente

```javascript
const menu = document.querySelector('app-menu');

// Ativar um papel específico
menu.setActiveRole('tutor');

// Abrir/fechar menu (mobile)
menu.toggleMenu();
```

## CSS Customizado (Shadow DOM)

Os componentes usam Shadow DOM, então o CSS está encapsulado.
Para customizar cores globalmente, use CSS variables:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
}
```

## Responsive Design

Todos os componentes são responsivos:
- **Desktop**: Tela cheia
- **Tablet**: Ajustado
- **Mobile**: Menu hambúrguer

## Características

### Header
- ✅ Logo com link para home
- ✅ Navegação dinâmica (autenticado/não autenticado)
- ✅ Eventos de ação (login, signup, logout, profile)

### Menu
- ✅ 6 papéis de IA com ícones
- ✅ Navegação principal (Dashboard, Cursos, Configurações)
- ✅ Ativo indica seleção
- ✅ Menu hambúrguer em mobile
- ✅ Eventos de seleção

### Footer
- ✅ 4 seções de links (Produto, Empresa, Legal, Recursos)
- ✅ Links sociais (Twitter, GitHub, LinkedIn)
- ✅ Copyright automático do ano
- ✅ Responsivo
- ✅ Eventos de clique em links

---

**Cada componente segue Clean Code:**
- ✅ Máximo 30 linhas de lógica
- ✅ Uma responsabilidade
- ✅ Modularizado
- ✅ Fácil de testar
- ✅ Reutilizável
