import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function Dashboard({ user }) {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function logout() {
    setError('');
    setSubmitting(true);
    try {
      await signOut(auth);
    } catch {
      setError('Unable to log out right now. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <main className="portal-shell">
      <section className="portal-card">
        <div className="portal-header">
          <span className="portal-badge">Protected Dashboard</span>
          <h1>Student Portal</h1>
        </div>

        <div className="account-box">
          <p className="account-label">Session Status</p>
          <p className="account-email">Authenticated account: {user.email}</p>
        </div>

        {error && (
          <p className="error-banner" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          className="primary-button logout-button"
          onClick={logout}
          disabled={submitting}
        >
          {submitting ? 'Logging out...' : 'Logout'}
        </button>
      </section>
    </main>
  );
}
