// Supabase client initialization
// Replace the URL and key with your project's configuration
const SUPABASE_URL = window._env?.SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = window._env?.SUPABASE_ANON_KEY || 'public-anon-key';

window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
