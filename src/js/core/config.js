/**
 * Configuration Module
 * Setup global configuration, Supabase client, e constantes
 */

import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

const CONFIG = {
    app: {
        name: import.meta.env.VITE_APP_NAME || 'Harvard In Box AI',
        version: import.meta.env.VITE_APP_VERSION || '1.0.0',
        env: import.meta.env.VITE_APP_ENV || 'development',
        debug: import.meta.env.VITE_APP_DEBUG === 'true',
    },
    api: {
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
        timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
    },
    supabase: {
        url: import.meta.env.VITE_SUPABASE_URL,
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
};

export async function initializeSupabase() {
    if (!CONFIG.supabase.url || !CONFIG.supabase.anonKey) {
        throw new Error('Supabase configuration missing in .env.local');
    }

    supabaseClient = createClient(
        CONFIG.supabase.url,
        CONFIG.supabase.anonKey,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
            },
        }
    );

    return supabaseClient;
}

export function getSupabaseClient() {
    if (!supabaseClient) {
        throw new Error('Supabase client not initialized. Call initializeSupabase first.');
    }
    return supabaseClient;
}

export function getConfig() {
    return Object.freeze(CONFIG);
}

export function isDevelopment() {
    return CONFIG.env === 'development';
}

export function isDebugMode() {
    return CONFIG.debug;
}
