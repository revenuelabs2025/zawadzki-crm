document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.getElementById('logout');
  if (!logoutLink) return;
  logoutLink.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      if (window.supabase && window.supabase.createClient) {
        const supabaseUrl = 'https://ooqhyadslcxjotxiqwrn.supabase.co';
        const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vcWh5YWRzbGN4am90eGlxd3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE1OTEsImV4cCI6MjA3MDEyNzU5MX0.obxJJm6zE8CL64zNmRKUhnvCRPON1iLr-DTTR07yXc8';
        const client = window.supabaseClient || window.supabase.createClient(supabaseUrl, supabaseAnonKey);
        await client.auth.signOut();
      }
    } catch (err) {
      console.error('Sign out error:', err);
    }
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });
});
