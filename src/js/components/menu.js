/**
 * Menu Component
 * Menu lateral com os 6 papéis de IA e navegação
 */

export class MenuComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    --menu-width: 280px;
                }

                .menu-toggle {
                    display: none;
                    position: fixed;
                    top: 1rem;
                    left: 1rem;
                    z-index: 1000;
                    background: white;
                    border: none;
                    border-radius: 8px;
                    padding: 0.75rem;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                @media (max-width: 768px) {
                    .menu-toggle {
                        display: block;
                    }
                }

                aside {
                    position: fixed;
                    left: 0;
                    top: 80px;
                    width: var(--menu-width);
                    height: calc(100vh - 80px);
                    background: #f8f9fa;
                    border-right: 1px solid #e5e7eb;
                    padding: 2rem 0;
                    overflow-y: auto;
                    transition: transform 0.3s ease;
                }

                @media (max-width: 768px) {
                    aside {
                        transform: translateX(-100%);
                        z-index: 999;
                        background: white;
                    }

                    aside.open {
                        transform: translateX(0);
                    }
                }

                .menu-section {
                    margin-bottom: 2rem;
                }

                .menu-title {
                    padding: 1rem 1.5rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #999;
                    letter-spacing: 0.5px;
                }

                .menu-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.875rem 1.5rem;
                    color: #333;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-left: 3px solid transparent;
                }

                .menu-item:hover {
                    background: #e8eef7;
                    border-left-color: #667eea;
                }

                .menu-item.active {
                    background: #e8eef7;
                    color: #667eea;
                    border-left-color: #667eea;
                    font-weight: 600;
                }

                .menu-icon {
                    font-size: 1.25rem;
                }
            </style>

            <button class="menu-toggle">☰</button>

            <aside>
                <div class="menu-section">
                    <div class="menu-title">Papéis de IA</div>
                    <div class="menu-item active" data-role="advisor">
                        <span class="menu-icon">🎯</span>
                        <span>Advogado</span>
                    </div>
                    <div class="menu-item" data-role="tutor">
                        <span class="menu-icon">🎓</span>
                        <span>Tutor</span>
                    </div>
                    <div class="menu-item" data-role="librarian">
                        <span class="menu-icon">📚</span>
                        <span>Bibliotecário</span>
                    </div>
                    <div class="menu-item" data-role="editor">
                        <span class="menu-icon">✂️</span>
                        <span>Editor</span>
                    </div>
                    <div class="menu-item" data-role="companion">
                        <span class="menu-icon">🧭</span>
                        <span>Companheiro</span>
                    </div>
                    <div class="menu-item" data-role="automation">
                        <span class="menu-icon">⚙️</span>
                        <span>Automação</span>
                    </div>
                </div>

                <div class="menu-section">
                    <div class="menu-title">Navegação</div>
                    <div class="menu-item" data-page="dashboard">
                        <span class="menu-icon">📊</span>
                        <span>Dashboard</span>
                    </div>
                    <div class="menu-item" data-page="courses">
                        <span class="menu-icon">📖</span>
                        <span>Meus Cursos</span>
                    </div>
                    <div class="menu-item" data-page="settings">
                        <span class="menu-icon">⚙️</span>
                        <span>Configurações</span>
                    </div>
                </div>
            </aside>
        `;
    }

    setupEventListeners() {
        const toggle = this.shadowRoot.querySelector('.menu-toggle');
        const aside = this.shadowRoot.querySelector('aside');

        toggle?.addEventListener('click', () => this.toggleMenu());

        this.shadowRoot.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => this.handleMenuClick(e.currentTarget));
        });
    }

    toggleMenu() {
        const aside = this.shadowRoot.querySelector('aside');
        this.isOpen = !this.isOpen;
        aside?.classList.toggle('open', this.isOpen);
    }

    handleMenuClick(element) {
        const role = element.dataset.role || null;
        const page = element.dataset.page || null;

        this.shadowRoot.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        element.classList.add('active');

        if (role) {
            this.dispatchEvent(new CustomEvent('role-selected', { detail: { role } }));
        }
        if (page) {
            this.dispatchEvent(new CustomEvent('page-selected', { detail: { page } }));
        }
    }

    setActiveRole(role) {
        this.shadowRoot.querySelectorAll(`[data-role="${role}"]`).forEach(item => {
            item.classList.add('active');
        });
    }
}

customElements.define('app-menu', MenuComponent);
