// button-action.js - Botão reutilizável com variantes
export class ButtonAction extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const disabled = this.hasAttribute('disabled');
    const loading = this.hasAttribute('loading');
    const size = this.getAttribute('size') || 'md';

    this.innerHTML = `
      <button
        class="btn btn-${variant} btn-${size}"
        data-theme="${this.getTheme()}"
        ${disabled ? 'disabled' : ''}
      >
        ${loading ? '<span class="btn-loader"></span>' : ''}
        <span class="btn-text"><slot></slot></span>
      </button>
    `;
    this.applyStyles();
  }

  setupEventListeners() {
    const btn = this.querySelector('button');
    btn?.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('btn-click', { detail: e }));
    });
  }

  applyStyles() {
    if (!document.getElementById('button-action-styles')) {
      const style = document.createElement('style');
      style.id = 'button-action-styles';
      style.textContent = `
        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
        }
        .btn-primary:hover:not(:disabled) {
          background: #2563eb;
        }
        .btn-secondary {
          background: #e5e7eb;
          color: #1f2937;
        }
        .btn-secondary:hover:not(:disabled) {
          background: #d1d5db;
        }
        .btn-sm { padding: 6px 12px; font-size: 12px; }
        .btn-lg { padding: 12px 24px; font-size: 16px; }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-loader {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
}

customElements.define('button-action', ButtonAction);
