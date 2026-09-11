/**
 * Header Component
 * Barra de navegação superior com logo e links principais
 */

export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const isAuthenticated = this.hasAttribute('authenticated');
        const userName = this.getAttribute('user-name') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1.5rem;
                    font-weight: bold;
                    cursor: pointer;
                }

                .logo span {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                nav {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }

                button {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .btn-primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }

                .btn-primary:hover {
                    transform: scale(1.05);
                }

                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .user-name {
                    color: #666;
                }
            </style>

            <header>
                <div class="logo">
                    <span>📚</span>
                    <span>Harvard In Box AI</span>
                </div>

                <nav>
                    ${isAuthenticated ? this.renderAuthenticatedNav(userName) : this.renderUnauthenticatedNav()}
                </nav>
            </header>
        `;
    }

    renderAuthenticatedNav(userName) {
        return `
            <div class="user-menu">
                <span class="user-name">Olá, ${userName}</span>
                <button class="btn-primary" data-action="profile">Perfil</button>
                <button class="btn-primary" data-action="logout">Sair</button>
            </div>
        `;
    }

    renderUnauthenticatedNav() {
        return `
            <button class="btn-primary" data-action="login">Login</button>
            <button class="btn-primary" data-action="signup">Cadastro</button>
        `;
    }

    setupEventListeners() {
        this.shadowRoot.querySelectorAll('button[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAction(e.target.dataset.action));
        });

        this.shadowRoot.querySelector('.logo').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/' } }));
        });
    }

    handleAction(action) {
        this.dispatchEvent(new CustomEvent(action));
    }
}

customElements.define('app-header', HeaderComponent);
