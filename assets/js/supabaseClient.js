const supabaseUrl = 'https://YOUR_SUPABASE_URL.supabase.co';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

const { createClient } = window.supabase;
window.supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
