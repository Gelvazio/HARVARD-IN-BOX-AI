// components/index.js - Exporta todos os componentes reutilizáveis
export { CardPanel } from './card-panel.js';
export { ButtonAction } from './button-action.js';
export { InputForm } from './input-form.js';
export { ModalDialog } from './modal-dialog.js';
export { ChatMessage } from './chat-message.js';
export { ProgressBar } from './progress-bar.js';
export { TaskItem } from './task-item.js';

// Importar e inicializar sistema de tema
import { themeManager } from '../utils/theme-manager.js';
export { themeManager };
