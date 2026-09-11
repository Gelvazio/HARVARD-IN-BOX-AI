// chat-message.js - Mensagem de chat
export class ChatMessage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const role = this.getAttribute('role') || 'user';
    const timestamp = this.getAttribute('timestamp') || '';
    const avatar = this.getAttribute('avatar') || '';

    this.innerHTML = `
      <div class="chat-message" data-role="${role}" data-theme="${this.getTheme()}">
        ${avatar ? `<img src="${avatar}" alt="avatar" class="chat-avatar" />` : ''}
        <div class="chat-body">
          <div class="chat-content">
            <slot></slot>
          </div>
          ${timestamp ? `<span class="chat-timestamp">${timestamp}</span>` : ''}
        </div>
      </div>
    `;
    this.applyStyles();
  }

  applyStyles() {
    if (!document.getElementById('chat-message-styles')) {
      const style = document.createElement('style');
      style.id = 'chat-message-styles';
      style.textContent = `
        .chat-message {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-message[data-role="assistant"] {
          flex-direction: row;
        }
        .chat-message[data-role="user"] {
          flex-direction: row-reverse;
        }
        .chat-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        .chat-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-width: 70%;
        }
        .chat-content {
          padding: 12px;
          border-radius: 8px;
          line-height: 1.4;
          word-wrap: break-word;
        }
        .chat-message[data-role="assistant"] .chat-content {
          background: #e5e7eb;
          color: #1f2937;
        }
        .chat-message[data-role="user"] .chat-content {
          background: #3b82f6;
          color: white;
        }
        .chat-message[data-theme="dark"] .chat-message[data-role="assistant"] .chat-content {
          background: #374151;
          color: white;
        }
        .chat-timestamp {
          font-size: 12px;
          color: #9ca3af;
          padding: 0 4px;
        }
      `;
      document.head.appendChild(style);
    }
  }

  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
}

customElements.define('chat-message', ChatMessage);
