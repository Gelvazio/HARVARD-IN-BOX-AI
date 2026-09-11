// modal-dialog.js - Modal reutilizável
export class ModalDialog extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const title = this.getAttribute('title') || '';
    const size = this.getAttribute('size') || 'md';

    this.innerHTML = `
      <div class="modal-overlay" data-theme="${this.getTheme()}">
        <div class="modal-content modal-${size}">
          <div class="modal-header">
            <h2 class="modal-title">${title}</h2>
            <button class="modal-close" aria-label="Fechar">×</button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
    this.applyStyles();
  }

  setupEventListeners() {
    const closeBtn = this.querySelector('.modal-close');
    const overlay = this.querySelector('.modal-overlay');

    closeBtn?.addEventListener('click', () => this.close());
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });
  }

  open() {
    this.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.classList.remove('open');
    document.body.style.overflow = '';
    this.dispatchEvent(new CustomEvent('modal-close'));
  }

  applyStyles() {
    if (!document.getElementById('modal-dialog-styles')) {
      const style = document.createElement('style');
      style.id = 'modal-dialog-styles';
      style.textContent = `
        modal-dialog {
          display: none;
        }
        modal-dialog.open {
          display: block;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease;
        }
        .modal-overlay[data-theme="dark"] .modal-content {
          background: #1f2937;
          color: white;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-sm { width: 90%; max-width: 400px; }
        .modal-md { width: 90%; max-width: 600px; }
        .modal-lg { width: 90%; max-width: 800px; }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }
        .modal-overlay[data-theme="dark"] .modal-header {
          border-color: #374151;
        }
        .modal-title {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #6b7280;
        }
        .modal-body {
          padding: 20px;
        }
      `;
      document.head.appendChild(style);
    }
  }

  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
}

customElements.define('modal-dialog', ModalDialog);
