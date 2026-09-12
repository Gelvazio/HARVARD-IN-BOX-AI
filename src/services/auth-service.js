// auth-service.js - Serviço de autenticação com Supabase Auth
export class AuthService {
  constructor(supabaseClient) {
    this.db = supabaseClient;
    this.currentUser = null;
    this.listeners = [];
  }

  async signUp(email, password, fullName = '') {
    const { data, error } = await this.db.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/pages/login.html`,
      },
    });

    if (error) throw error;

    // Criar perfil do usuário na tabela users
    if (data.user) {
      await this.createUserProfile(data.user.id, email, fullName);
    }

    return data;
  }

  async signIn(email, password) {
    const { data, error } = await this.db.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    this.currentUser = data.user;
    this.notifyListeners();
    this.saveSessionLocally();

    return data;
  }

  async signOut() {
    const { error } = await this.db.auth.signOut();

    if (error) throw error;

    this.currentUser = null;
    this.notifyListeners();
    this.clearSessionLocally();

    return true;
  }

  async resetPassword(email) {
    const { data, error } = await this.db.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/pages/reset-password.html`,
    });

    if (error) throw error;

    return data;
  }

  async updatePassword(newPassword) {
    const { data, error } = await this.db.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    return data;
  }

  async getCurrentUser() {
    const { data, error } = await this.db.auth.getUser();

    if (error) {
      this.currentUser = null;
      return null;
    }

    this.currentUser = data.user;
    return data.user;
  }

  async getSession() {
    const { data, error } = await this.db.auth.getSession();

    if (error) throw error;

    if (data.session) {
      this.currentUser = data.session.user;
      this.notifyListeners();
    }

    return data.session;
  }

  async verifyOTP(email, token, type = 'email') {
    const { data, error } = await this.db.auth.verifyOtp({
      email,
      token,
      type,
    });

    if (error) throw error;

    this.currentUser = data.user;
    this.notifyListeners();

    return data;
  }

  async createUserProfile(userId, email, fullName = '') {
    const { error } = await this.db.from('users').insert([
      {
        id: userId,
        email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    if (error && !error.message.includes('duplicate')) {
      console.warn('Erro ao criar perfil:', error);
    }
  }

  async getUserProfile(userId) {
    const { data, error } = await this.db
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return data;
  }

  async updateUserProfile(userId, updates) {
    const { data, error } = await this.db
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select();

    if (error) throw error;

    return data[0];
  }

  saveSessionLocally() {
    if (this.currentUser) {
      try {
        localStorage.setItem(
          'harvard_user_session',
          JSON.stringify({
            user: this.currentUser,
            timestamp: Date.now(),
          })
        );
      } catch (e) {
        console.warn('Erro ao salvar sessão:', e);
      }
    }
  }

  clearSessionLocally() {
    try {
      localStorage.removeItem('harvard_user_session');
    } catch (e) {
      console.warn('Erro ao limpar sessão:', e);
    }
  }

  loadSessionFromLocal() {
    try {
      const stored = localStorage.getItem('harvard_user_session');
      if (stored) {
        const { user } = JSON.parse(stored);
        this.currentUser = user;
        return user;
      }
    } catch (e) {
      console.warn('Erro ao carregar sessão:', e);
    }

    return null;
  }

  isAuthenticated() {
    return this.currentUser !== null && this.currentUser !== undefined;
  }

  getCurrentUserSync() {
    return this.currentUser;
  }

  onAuthStateChange(callback) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach((callback) => {
      callback(this.currentUser);
    });
  }
}

export const createAuthService = (supabaseClient) => new AuthService(supabaseClient);
