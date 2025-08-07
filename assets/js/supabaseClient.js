const supabaseUrl = 'https://ooqhyadslcxjotxiqwrn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vcWh5YWRzbGN4am90eGlxd3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE1OTEsImV4cCI6MjA3MDEyNzU5MX0.obxJJm6zE8CL64zNmRKUhnvCRPON1iLr-DTTR07yXc8';

const { createClient } = window.supabase;
window.supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
