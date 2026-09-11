// progress-bar.js - Barra de progresso
export class ProgressBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const value = parseInt(this.getAttribute('value')) || 0;
    const max = parseInt(this.getAttribute('max')) || 100;
    const label = this.getAttribute('label') || '';
    const percent = Math.min((value / max) * 100, 100);

    this.innerHTML = `
      <div class="progress-wrapper">
        ${label ? `<div class="progress-label">${label}</div>` : ''}
        <div class="progress-bar" data-theme="${this.getTheme()}">
          <div class="progress-fill" style="width: ${percent}%"></div>
        </div>
        <div class="progress-info">
          <span class="progress-value">${value}</span>
          <span class="progress-max">/ ${max}</span>
          <span class="progress-percent">${Math.round(percent)}%</span>
        </div>
      </div>
    `;
    this.applyStyles();
  }

  applyStyles() {
    if (!document.getElementById('progress-bar-styles')) {
      const style = document.createElement('style');
      style.id = 'progress-bar-styles';
      style.textContent = `
        .progress-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        .progress-label {
          font-size: 14px;
          font-weight: 600;
        }
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-bar[data-theme="dark"] {
          background: #374151;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .progress-info {
          display: flex;
          gap: 8px;
          font-size: 12px;
          color: #6b7280;
          justify-content: space-between;
        }
        .progress-percent {
          font-weight: 600;
          color: #3b82f6;
        }
      `;
      document.head.appendChild(style);
    }
  }

  updateProgress(value) {
    this.setAttribute('value', value);
    this.render();
  }

  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
}

customElements.define('progress-bar', ProgressBar);
