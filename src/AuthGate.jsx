import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Dashboard from './Dashboard';
import LoginScreen from './LoginScreen';

export default function AuthGate() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <main className="portal-shell">
        <section className="portal-card">
          <p className="status-text">Loading...</p>
        </section>
      </main>
    );
  }

  return user ? <Dashboard user={user} /> : <LoginScreen />;
}
