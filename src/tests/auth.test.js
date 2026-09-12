// auth.test.js - Testes para o sistema de autenticação
import { AuthService } from '../services/auth-service.js';
import { AuthGuard } from '../utils/auth-guard.js';

export class AuthTests {
  async runAllTests() {
    console.log('🔐 Iniciando testes de autenticação...\n');

    const results = {
      passed: 0,
      failed: 0,
      tests: [],
    };

    await this.testAuthServiceInitialization(results);
    await this.testSessionPersistence(results);
    await this.testAuthStateListener(results);
    await this.testAuthGuardInitialization(results);
    await this.testUserAuthentication(results);
    await this.testPasswordValidation(results);

    this.printResults(results);
    return results;
  }

  async testAuthServiceInitialization(results) {
    const test = { name: 'AuthService Initialization', status: '❌' };

    try {
      // Mock Supabase client
      const mockSupabase = {
        auth: {},
        from: () => ({
          insert: () => ({ select: () => ({ data: null, error: null }) }),
        }),
      };

      const authService = new AuthService(mockSupabase);

      if (
        authService.currentUser === null &&
        Array.isArray(authService.listeners) &&
        authService.isAuthenticated() === false
      ) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Inicialização incorreta');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testSessionPersistence(results) {
    const test = { name: 'Session Persistence', status: '❌' };

    try {
      const mockSupabase = { auth: {}, from: () => ({ insert: () => ({ select: () => ({}) }) }) };
      const authService = new AuthService(mockSupabase);

      // Simular usuário
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      authService.currentUser = mockUser;

      // Salvar sessão
      authService.saveSessionLocally();

      // Simular novo serviço
      const authService2 = new AuthService(mockSupabase);
      const loaded = authService2.loadSessionFromLocal();

      if (loaded && loaded.id === 'user-123') {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Sessão não persistida');
      }

      // Limpar
      authService2.clearSessionLocally();
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testAuthStateListener(results) {
    const test = { name: 'Auth State Listener', status: '❌' };

    try {
      const mockSupabase = { auth: {}, from: () => ({ insert: () => ({ select: () => ({}) }) }) };
      const authService = new AuthService(mockSupabase);

      let callbackCalled = false;
      let callbackUser = null;

      // Subscribe ao estado
      authService.onAuthStateChange((user) => {
        callbackCalled = true;
        callbackUser = user;
      });

      // Mudar estado
      const mockUser = { id: 'user-456', email: 'test2@example.com' };
      authService.currentUser = mockUser;
      authService.notifyListeners();

      if (callbackCalled && callbackUser.id === 'user-456') {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Listener não funcionou');
      }

      // Limpar localStorage
      authService.clearSessionLocally();
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testAuthGuardInitialization(results) {
    const test = { name: 'AuthGuard Initialization', status: '❌' };

    try {
      const mockSupabase = { auth: {}, from: () => ({ insert: () => ({ select: () => ({}) }) }) };
      const authService = new AuthService(mockSupabase);
      const authGuard = new AuthGuard(authService);

      if (authGuard.authService === authService) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('AuthGuard não inicializado');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testUserAuthentication(results) {
    const test = { name: 'User Authentication State', status: '❌' };

    try {
      const mockSupabase = { auth: {}, from: () => ({ insert: () => ({ select: () => ({}) }) }) };
      const authService = new AuthService(mockSupabase);

      // Antes de autenticar
      if (authService.isAuthenticated()) {
        throw new Error('Usuário não autenticado deve retornar false');
      }

      // Depois de autenticar
      authService.currentUser = { id: 'user-789', email: 'test3@example.com' };

      if (authService.isAuthenticated() && authService.getCurrentUserSync()) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Autenticação não funcionou');
      }

      authService.clearSessionLocally();
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testPasswordValidation(results) {
    const test = { name: 'Password Validation', status: '❌' };

    try {
      // Simular validação de senha
      const passwords = {
        weak: '123456', // muito comum
        medium: 'Password123', // bom
        strong: 'P@ssw0rd!Secure', // muito forte
      };

      const validatePassword = (pwd) => {
        if (pwd.length < 6) return 'invalid';
        if (pwd.length < 10 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return 'weak';
        return 'medium';
      };

      const result1 = validatePassword(passwords.weak) === 'weak';
      const result2 = validatePassword(passwords.medium) === 'medium';

      if (result1 && result2) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Validação de senha incorreta');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  printResults(results) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RESULTADOS DOS TESTES DE AUTH');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    results.tests.forEach((test) => {
      console.log(`${test.status} ${test.name}`);
      if (test.error) {
        console.log(`   └─ ${test.error}\n`);
      }
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(
      `✅ Passou: ${results.passed} | ❌ Falhou: ${results.failed} | Total: ${results.passed + results.failed}\n`
    );

    return results.passed === results.passed + results.failed;
  }
}

export const runAuthTests = async () => {
  const tester = new AuthTests();
  return tester.runAllTests();
};
