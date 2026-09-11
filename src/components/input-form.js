// input-form.js - Campo de entrada reutilizável
export class InputForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupValidation();
  }

  render() {
    const label = this.getAttribute('label') || '';
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';
    const required = this.hasAttribute('required');
    const error = this.getAttribute('error') || '';

    this.innerHTML = `
      <div class="input-wrapper">
        ${label ? `<label class="input-label">${label} ${required ? '<span class="required">*</span>' : ''}</label>` : ''}
        <input
          type="${type}"
          class="input-field"
          placeholder="${placeholder}"
          ${required ? 'required' : ''}
          data-theme="${this.getTheme()}"
        />
        ${error ? `<span class="input-error">${error}</span>` : ''}
      </div>
    `;
    this.applyStyles();
  }

  setupValidation() {
    const input = this.querySelector('input');
    input?.addEventListener('input', (e) => {
      this.dispatchEvent(new CustomEvent('input-change', { detail: e.target.value }));
    });
    input?.addEventListener('blur', (e) => {
      this.validate(e.target.value);
    });
  }

  validate(value) {
    const type = this.getAttribute('type');
    const required = this.hasAttribute('required');
    const isValid = required ? value.trim() !== '' : true;
    this.classList.toggle('invalid', !isValid);
    return isValid;
  }

  applyStyles() {
    if (!document.getElementById('input-form-styles')) {
      const style = document.createElement('style');
      style.id = 'input-form-styles';
      style.textContent = `
        .input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .input-label {
          font-weight: 600;
          font-size: 14px;
          color: var(--text-primary, #1f2937);
        }
        .required {
          color: #ef4444;
        }
        .input-field {
          padding: 8px 12px;
          border: 1px solid var(--border-color, #d1d5db);
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .input-field[data-theme="dark"] {
          background: #1f2937;
          color: white;
          border-color: #374151;
        }
        .input-error {
          color: #ef4444;
          font-size: 12px;
        }
      `;
      document.head.appendChild(style);
    }
  }

  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
}

customElements.define('input-form', InputForm);
