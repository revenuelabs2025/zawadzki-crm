import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getProfile } from '../api/getProfile';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const profile = await getProfile();
    setLoading(false);

    if (!profile) {
      navigate('/no-access');
      return;
    }

    navigate('/');
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
