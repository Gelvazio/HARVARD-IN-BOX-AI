// theme-manager.js - Sistema de tema light/dark
export class ThemeManager {
  constructor() {
    this.STORAGE_KEY = 'app-theme-preference';
    this.MEDIA_QUERY = window.matchMedia('(prefers-color-scheme: dark)');
    this.init();
  }

  init() {
    const saved = this.getSavedTheme();
    const theme = saved || this.getSystemTheme();
    this.applyTheme(theme);
    this.setupMediaListener();
  }

  getSavedTheme() {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  getSystemTheme() {
    return this.MEDIA_QUERY.matches ? 'dark' : 'light';
  }

  applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    this.applyGlobalStyles(theme);
    this.dispatchThemeChange(theme);
  }

  setTheme(theme) {
    if (!['light', 'dark'].includes(theme)) return;
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.applyTheme(theme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  setupMediaListener() {
    this.MEDIA_QUERY.addEventListener('change', (e) => {
      if (!this.getSavedTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  applyGlobalStyles(theme) {
    if (!document.getElementById('theme-global-styles')) {
      const style = document.createElement('style');
      style.id = 'theme-global-styles';
      style.textContent = this.getGlobalStyles();
      document.head.appendChild(style);
    }

    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#0f172a');
      root.style.setProperty('--bg-secondary', '#1e293b');
      root.style.setProperty('--text-primary', '#f1f5f9');
      root.style.setProperty('--text-muted', '#94a3b8');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8fafc');
      root.style.setProperty('--text-primary', '#1e293b');
      root.style.setProperty('--text-muted', '#64748b');
    }
  }

  getGlobalStyles() {
    return `
      :root {
        --bg-primary: #ffffff;
        --bg-secondary: #f8fafc;
        --bg-card: #ffffff;
        --text-primary: #1e293b;
        --text-muted: #64748b;
        --border-color: #e2e8f0;
        --primary-color: #3b82f6;
        --success-color: #10b981;
        --error-color: #ef4444;
        --warning-color: #f59e0b;
      }

      * {
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      body {
        background-color: var(--bg-primary);
        color: var(--text-primary);
      }
    `;
  }

  dispatchThemeChange(theme) {
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
  }

  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
}

export const themeManager = new ThemeManager();
