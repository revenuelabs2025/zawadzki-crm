import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getProfile } from '../api/getProfile';

// Hook managing authentication session and profile.
export function useAuth() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(session);
      if (session?.user) {
        const prof = await getProfile();
        if (mounted) setProfile(prof);
      }
      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        const prof = await getProfile();
        setProfile(prof);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  };

  return { session, user: session?.user ?? null, profile, loading, signOut };
}
