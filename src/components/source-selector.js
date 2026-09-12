// source-selector.js - Componente de seleção de fontes
export class SourceSelector extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const sources = JSON.parse(this.getAttribute('sources') || '[]');
    const selectedCount = sources.filter(s => s.selected).length;

    this.innerHTML = `
      <div class="source-selector" data-theme="${this.getTheme()}">
        <div class="selector-header">
          <h3>📚 Selecione as 3-4 Melhores Fontes</h3>
          <span class="selected-count">${selectedCount}/4 selecionadas</span>
        </div>

        <div class="sources-list">
          ${sources.map((s, idx) => this.renderSource(s, idx)).join('')}
        </div>

        <div class="selector-actions">
          <button class="btn btn-secondary" data-action="clear">Limpar</button>
          <button class="btn btn-primary" data-action="confirm" ${selectedCount === 0 ? 'disabled' : ''}>
            Confirmar Seleção
          </button>
        </div>
      </div>
    `;
    this.applyStyles();
  }

  renderSource(source, idx) {
    return `
      <div class="source-card" data-index="${idx}" data-selected="${source.selected || false}">
        <div class="source-checkbox">
          <input type="checkbox" ${source.selected ? 'checked' : ''} />
        </div>
        <div class="source-content">
          <div class="source-title">${source.title}</div>
          <div class="source-meta">
            <span class="source-type">${source.type}</span>
            <span class="source-author">${source.author}</span>
          </div>
          <div class="source-description">${source.description}</div>
          <div class="source-score">
            <span class="score-label">Credibilidade:</span>
            <div class="score-bar">
              <div class="score-fill" style="width: ${source.credibilityScore * 10}%"></div>
            </div>
            <span class="score-value">${source.credibilityScore}/10</span>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const cards = this.querySelectorAll('.source-card');
    cards.forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', (e) => {
        card.setAttribute('data-selected', e.target.checked);
        this.dispatchSourceSelected();
      });
    });

    this.querySelector('[data-action="clear"]')?.addEventListener('click', () => {
      this.clearSelection();
    });

    this.querySelector('[data-action="confirm"]')?.addEventListener('click', () => {
      this.confirmSelection();
    });
  }

  dispatchSourceSelected() {
    const selected = Array.from(this.querySelectorAll('.source-card[data-selected="true"]')).map(
      (card, idx) => ({ index: idx, title: card.querySelector('.source-title').textContent })
    );
    this.dispatchEvent(new CustomEvent('sources-selected', { detail: { selected } }));
    this.render();
  }

  clearSelection() {
    this.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });
    this.dispatchSourceSelected();
  }

  confirmSelection() {
    const selected = Array.from(this.querySelectorAll('input[type="checkbox"]:checked')).map(
      (cb) => cb.closest('.source-card').querySelector('.source-title').textContent
    );
    this.dispatchEvent(new CustomEvent('selection-confirmed', { detail: { sources: selected } }));
  }

  applyStyles() {
    if (!document.getElementById('source-selector-styles')) {
      const style = document.createElement('style');
      style.id = 'source-selector-styles';
      style.textContent = `
        .source-selector {
          padding: 20px;
          background: white;
          border-radius: 12px;
        }
        .source-selector[data-theme="dark"] {
          background: #1f2937;
        }
        .selector-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e5e7eb;
        }
        .selector-header h3 {
          margin: 0;
          font-size: 18px;
        }
        .selected-count {
          background: #dbeafe;
          color: #1e40af;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .sources-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
          max-height: 600px;
          overflow-y: auto;
        }
        .source-card {
          display: flex;
          gap: 12px;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .source-card:hover {
          border-color: #3b82f6;
          background: #f0f9ff;
        }
        .source-card[data-selected="true"] {
          border-color: #3b82f6;
          background: #eff6ff;
        }
        .source-checkbox {
          display: flex;
          align-items: center;
        }
        .source-checkbox input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .source-content {
          flex: 1;
          min-width: 0;
        }
        .source-title {
          font-weight: 600;
          margin-bottom: 4px;
        }
        .source-meta {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 12px;
        }
        .source-type {
          background: #e0e7ff;
          color: #4f46e5;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .source-author {
          color: #6b7280;
        }
        .source-description {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .source-score {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }
        .score-bar {
          flex: 1;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }
        .score-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #10b981);
          transition: width 0.3s;
        }
        .selector-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
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
        .btn-secondary:hover {
          background: #d1d5db;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `;
      document.head.appendChild(style);
    }
  }

  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
}

customElements.define('source-selector', SourceSelector);
