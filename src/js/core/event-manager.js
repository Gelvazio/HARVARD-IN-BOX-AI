/**
 * Event Manager Module
 * Gerencia event listeners globais e comunicação entre componentes
 */

export function setupEventListeners() {
    setupHeaderListeners();
    setupMenuListeners();
    setupFooterListeners();
    setupGlobalListeners();
}

function setupHeaderListeners() {
    const header = document.querySelector('app-header');
    if (!header) return;

    header.addEventListener('login', handleLogin);
    header.addEventListener('signup', handleSignup);
    header.addEventListener('logout', handleLogout);
    header.addEventListener('navigate', handleNavigate);
    header.addEventListener('profile', handleProfile);
}

function setupMenuListeners() {
    const menu = document.querySelector('app-menu');
    if (!menu) return;

    menu.addEventListener('role-selected', handleRoleSelected);
    menu.addEventListener('page-selected', handlePageSelected);
}

function setupFooterListeners() {
    const footer = document.querySelector('app-footer');
    if (!footer) return;

    footer.addEventListener('footer-link-clicked', handleFooterLinkClick);
    footer.addEventListener('social-link-clicked', handleSocialLinkClick);
}

function setupGlobalListeners() {
    // Listener para erros não capturados
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Listener para mudanças de orientação
    window.addEventListener('orientationchange', handleOrientationChange);
}

// ============================================================================
// HEADER HANDLERS
// ============================================================================

function handleLogin() {
    console.log('📝 Login clicado');
    // TODO: Abrir modal de login ou navegar para página de login
}

function handleSignup() {
    console.log('📝 Signup clicado');
    // TODO: Abrir modal de cadastro ou navegar para página de cadastro
}

function handleLogout() {
    console.log('👋 Logout');
    // TODO: Fazer logout no Supabase e limpar sessão
}

function handleNavigate(event) {
    const { path } = event.detail;
    console.log('🔗 Navegando para:', path);
    // TODO: Implementar navegação interna
}

function handleProfile() {
    console.log('👤 Perfil clicado');
    // TODO: Navegar para página de perfil
}

// ============================================================================
// MENU HANDLERS
// ============================================================================

function handleRoleSelected(event) {
    const { role } = event.detail;
    console.log('🎯 Papel selecionado:', role);
    // TODO: Carregar interface específica do papel
    // TODO: Salvar escolha em localStorage/Supabase
}

function handlePageSelected(event) {
    const { page } = event.detail;
    console.log('📄 Página selecionada:', page);
    // TODO: Navegar para página (dashboard, courses, settings)
}

// ============================================================================
// FOOTER HANDLERS
// ============================================================================

function handleFooterLinkClick(event) {
    const { link } = event.detail;
    console.log('🔗 Link de footer:', link);
    // TODO: Navegar ou abrir página apropriada
}

function handleSocialLinkClick(event) {
    const { social } = event.detail;
    const urls = {
        twitter: 'https://twitter.com/harvard-in-box',
        github: 'https://github.com/Gelvazio/harvard-in-box-ai',
        linkedin: 'https://linkedin.com/company/harvard-in-box-ai',
    };

    if (urls[social]) {
        window.open(urls[social], '_blank');
    }
}

// ============================================================================
// GLOBAL ERROR HANDLERS
// ============================================================================

function handleGlobalError(event) {
    console.error('❌ Erro global:', event.error);
    // TODO: Enviar para serviço de logging
}

function handleUnhandledRejection(event) {
    console.error('❌ Promise rejeitada não capturada:', event.reason);
    // TODO: Enviar para serviço de logging
}

function handleOrientationChange() {
    console.log('📱 Orientação mudou');
    // TODO: Ajustar layout se necessário
}

// ============================================================================
// PUBLIC EXPORTS
// ============================================================================

export { setupEventListeners };
