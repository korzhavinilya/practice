import './App.css';
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase/client';
import Countries from './Countries';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });
    if (error) {
      console.error('Error signing in with GitHub:', error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div>
      <h1>Supabase Auth with GitHub</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={signOut}>Sign Out</button>

          <Countries />
        </div>
      ) : (
        <button onClick={signInWithGithub}>Sign In with GitHub</button>
      )}
    </div>
  );
};

export default App;
