import { supabase } from '../lib/supabaseClient';

// Fetches the profile for the current authenticated user.
// Returns null if user or profile not found.
export async function getProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.error('Error fetching user:', userError);
    return null;
  }
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return profile;
}
