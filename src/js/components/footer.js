/**
 * Footer Component
 * Rodapé com informações, links e copyright
 */

export class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const currentYear = new Date().getFullYear();

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #2d3748;
                    color: #e2e8f0;
                }

                footer {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 3rem 2rem 1rem;
                }

                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid #4a5568;
                    padding-bottom: 2rem;
                }

                .footer-section h3 {
                    margin-bottom: 1rem;
                    font-size: 1rem;
                    font-weight: 600;
                    color: white;
                }

                .footer-section ul {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .footer-section a {
                    color: #cbd5e0;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    font-size: 0.9rem;
                }

                .footer-section a:hover {
                    color: #667eea;
                }

                .footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.85rem;
                    color: #a0aec0;
                }

                .footer-copyright {
                    text-align: center;
                }

                @media (max-width: 768px) {
                    .footer-bottom {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                }
            </style>

            <footer>
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Produto</h3>
                        <ul>
                            <li><a href="#" data-link="features">Features</a></li>
                            <li><a href="#" data-link="pricing">Preços</a></li>
                            <li><a href="#" data-link="security">Segurança</a></li>
                            <li><a href="#" data-link="roadmap">Roadmap</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3>Empresa</h3>
                        <ul>
                            <li><a href="#" data-link="about">Sobre</a></li>
                            <li><a href="#" data-link="blog">Blog</a></li>
                            <li><a href="#" data-link="careers">Carreiras</a></li>
                            <li><a href="#" data-link="contact">Contato</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="#" data-link="privacy">Privacidade</a></li>
                            <li><a href="#" data-link="terms">Termos de Uso</a></li>
                            <li><a href="#" data-link="cookies">Cookies</a></li>
                            <li><a href="#" data-link="gdpr">GDPR</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3>Recursos</h3>
                        <ul>
                            <li><a href="#" data-link="docs">Documentação</a></li>
                            <li><a href="#" data-link="api">API</a></li>
                            <li><a href="#" data-link="status">Status</a></li>
                            <li><a href="#" data-link="support">Suporte</a></li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-copyright">
                        &copy; ${currentYear} Harvard In Box AI. Todos os direitos reservados.
                    </div>
                    <div class="footer-socials">
                        <a href="#" data-social="twitter">Twitter</a> •
                        <a href="#" data-social="github">GitHub</a> •
                        <a href="#" data-social="linkedin">LinkedIn</a>
                    </div>
                </div>
            </footer>
        `;
    }

    setupEventListeners() {
        this.shadowRoot.querySelectorAll('[data-link]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLinkClick(e.target.dataset.link);
            });
        });

        this.shadowRoot.querySelectorAll('[data-social]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSocialClick(e.target.dataset.social);
            });
        });
    }

    handleLinkClick(link) {
        this.dispatchEvent(new CustomEvent('footer-link-clicked', { detail: { link } }));
    }

    handleSocialClick(social) {
        this.dispatchEvent(new CustomEvent('social-link-clicked', { detail: { social } }));
    }
}

customElements.define('app-footer', FooterComponent);
