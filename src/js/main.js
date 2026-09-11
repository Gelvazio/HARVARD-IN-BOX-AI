/**
 * Main Entry Point - Harvard In Box AI
 * Inicializa todos os componentes e configurações da aplicação
 */

import { HeaderComponent } from './components/header.js';
import { MenuComponent } from './components/menu.js';
import { FooterComponent } from './components/footer.js';
import { initializeSupabase } from './core/config.js';
import { setupEventListeners } from './core/event-manager.js';

// Inicializar aplicação
async function initializeApp() {
    console.log('🚀 Iniciando Harvard In Box AI...');

    try {
        // 1. Inicializar Supabase
        await initializeSupabase();
        console.log('✅ Supabase inicializado');

        // 2. Setup de event listeners globais
        setupEventListeners();
        console.log('✅ Event listeners configurados');

        // 3. Verificar autenticação
        const authState = await checkAuthState();
        console.log('✅ Estado de autenticação verificado:', authState);

        // 4. Renderizar componentes se necessário
        updateUIWithAuthState(authState);
        console.log('✅ UI renderizada');

        console.log('🎉 Aplicação iniciada com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao inicializar aplicação:', error);
        showErrorMessage('Erro ao inicializar a aplicação');
    }
}

async function checkAuthState() {
    // TODO: Implementar verificação de autenticação com Supabase
    return { isAuthenticated: false, user: null };
}

function updateUIWithAuthState(authState) {
    const header = document.querySelector('app-header');
    if (header && authState.isAuthenticated) {
        header.setAttribute('authenticated', '');
        header.setAttribute('user-name', authState.user?.name || 'Usuário');
    }
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 10000;
    `;
    document.body.appendChild(errorDiv);

    setTimeout(() => errorDiv.remove(), 5000);
}

// Iniciar aplicação quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
