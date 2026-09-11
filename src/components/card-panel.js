// card-panel.js - Componente reutilizável de painel/card
export class CardPanel extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const icon = this.getAttribute('icon') || '';

    this.innerHTML = `
      <div class="card-panel" data-theme="${this.getTheme()}">
        <div class="card-header">
          ${icon ? `<span class="card-icon">${icon}</span>` : ''}
          <div>
            <h3 class="card-title">${title}</h3>
            ${subtitle ? `<p class="card-subtitle">${subtitle}</p>` : ''}
          </div>
        </div>
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
    this.applyStyles();
  }

  applyStyles() {
    if (!document.getElementById('card-panel-styles')) {
      const style = document.createElement('style');
      style.id = 'card-panel-styles';
      style.textContent = `
        .card-panel {
          background: var(--bg-card, #fff);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }
        .card-panel[data-theme="dark"] {
          background: #1f2937;
          border-color: #374151;
        }
        .card-header {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }
        .card-icon {
          font-size: 24px;
        }
        .card-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }
        .card-subtitle {
          margin: 4px 0 0 0;
          font-size: 14px;
          color: var(--text-muted, #6b7280);
        }
        .card-content {
          font-size: 14px;
          line-height: 1.5;
        }
      `;
      document.head.appendChild(style);
    }
  }

  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
}

customElements.define('card-panel', CardPanel);
