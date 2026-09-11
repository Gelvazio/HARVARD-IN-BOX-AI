// task-item.js - Item de tarefa
export class TaskItem extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const status = this.getAttribute('status') || 'pending';
    const priority = this.getAttribute('priority') || 'medium';
    const title = this.getAttribute('title') || '';
    const dueDate = this.getAttribute('due-date') || '';
    const checked = this.hasAttribute('completed');

    this.innerHTML = `
      <div class="task-item" data-status="${status}" data-priority="${priority}" data-theme="${this.getTheme()}">
        <input type="checkbox" class="task-checkbox" ${checked ? 'checked' : ''} />
        <div class="task-main">
          <h4 class="task-title">${title}</h4>
          ${dueDate ? `<span class="task-date">${dueDate}</span>` : ''}
        </div>
        <span class="task-priority task-priority-${priority}">${this.getPriorityLabel(priority)}</span>
      </div>
    `;
    this.applyStyles();
  }

  setupEventListeners() {
    const checkbox = this.querySelector('.task-checkbox');
    checkbox?.addEventListener('change', (e) => {
      this.toggleCompleted(e.target.checked);
      this.dispatchEvent(new CustomEvent('task-toggle', { detail: { completed: e.target.checked } }));
    });
  }

  toggleCompleted(completed) {
    this.classList.toggle('completed', completed);
    if (completed) {
      this.setAttribute('completed', '');
    } else {
      this.removeAttribute('completed');
    }
  }

  getPriorityLabel(priority) {
    const labels = { high: 'CRÍTICA', medium: 'MÉDIA', low: 'BAIXA' };
    return labels[priority] || priority;
  }

  applyStyles() {
    if (!document.getElementById('task-item-styles')) {
      const style = document.createElement('style');
      style.id = 'task-item-styles';
      style.textContent = `
        .task-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .task-item[data-theme="dark"] {
          background: #1f2937;
          border-color: #374151;
        }
        .task-item.completed {
          opacity: 0.6;
        }
        .task-item.completed .task-title {
          text-decoration: line-through;
        }
        .task-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        .task-main {
          flex: 1;
          min-width: 0;
        }
        .task-title {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
        }
        .task-date {
          font-size: 12px;
          color: #9ca3af;
        }
        .task-priority {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }
        .task-priority-high {
          background: #fecaca;
          color: #7f1d1d;
        }
        .task-priority-medium {
          background: #fcd34d;
          color: #78350f;
        }
        .task-priority-low {
          background: #bbf7d0;
          color: #065f46;
        }
      `;
      document.head.appendChild(style);
    }
  }

  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
}

customElements.define('task-item', TaskItem);
