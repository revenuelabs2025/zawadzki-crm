const SUPABASE_URL = window.SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'public-anon-key';
window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
