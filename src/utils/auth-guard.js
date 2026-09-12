// auth-guard.js - Protetor de rotas com redirecionamento automático
export class AuthGuard {
  constructor(authService) {
    this.authService = authService;
  }

  async protectRoute(requiredAuth = true) {
    try {
      const user = await this.authService.getCurrentUser();

      if (requiredAuth && !user) {
        // Redirecionar para login
        this.redirectToLogin();
        return false;
      }

      if (!requiredAuth && user) {
        // Página publica, mas usuário autenticado - redirecionar para dashboard
        this.redirectToDashboard();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro no auth guard:', error);
      if (requiredAuth) {
        this.redirectToLogin();
      }

      return false;
    }
  }

  async initializeAuth() {
    // Carregar sessão do localStorage primeiro
    const localUser = this.authService.loadSessionFromLocal();

    // Verificar sessão ativa no Supabase
    try {
      const session = await this.authService.getSession();

      if (!session && !localUser) {
        return null;
      }

      // Se tem sessão no Supabase, atualizar localStorage
      if (session) {
        this.authService.saveSessionLocally();
      }

      return this.authService.getCurrentUserSync();
    } catch (error) {
      console.error('Erro ao inicializar auth:', error);
      return localUser;
    }
  }

  async ensureAuthenticated() {
    const isProtected = await this.protectRoute(true);

    if (!isProtected) {
      throw new Error('Usuário não autenticado');
    }

    return this.authService.getCurrentUserSync();
  }

  redirectToLogin() {
    window.location.href = '/pages/login.html?redirect=' + encodeURIComponent(window.location.pathname);
  }

  redirectToDashboard() {
    window.location.href = '/pages/dashboard.html';
  }

  redirectToPage(path) {
    window.location.href = path;
  }

  isPublicPage() {
    const publicPages = ['/pages/login.html', '/pages/signup.html', '/pages/reset-password.html'];

    return publicPages.some((page) => window.location.pathname.includes(page));
  }
}

export const createAuthGuard = (authService) => new AuthGuard(authService);
