import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';
import {
  getSafeAuthErrorMessage,
  validateEmail,
  validatePassword,
} from './authValidation';

export { validatePassword };

export default function LoginScreen() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isRegister = mode === 'register';

  function switchMode(nextMode) {
    setMode(nextMode);
    setEmailError('');
    setPasswordError('');
    setAuthError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setAuthError('');

    const nextEmailError = validateEmail(email);
    const nextPasswordError = validatePassword(password);
    setEmailError(nextEmailError ?? '');
    setPasswordError(nextPasswordError ?? '');

    if (nextEmailError || nextPasswordError) {
      return;
    }

    setSubmitting(true);
    try {
      const normalizedEmail = email.trim();
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      } else {
        await signInWithEmailAndPassword(auth, normalizedEmail, password);
      }
    } catch (error) {
      setAuthError(getSafeAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="portal-shell">
      <section className="portal-card">
        <div className="portal-header">
          <span className="portal-badge">Student Portal</span>
          <h1>{isRegister ? 'Create an account' : 'Sign in'}</h1>
        </div>

        <div className="mode-toggle" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            role="tab"
            aria-selected={!isRegister}
            className={!isRegister ? 'tab-button active' : 'tab-button'}
            onClick={() => switchMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isRegister}
            className={isRegister ? 'tab-button active' : 'tab-button'}
            onClick={() => switchMode('register')}
          >
            Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (emailError) {
                  setEmailError('');
                }
              }}
              placeholder="student@example.com"
              disabled={submitting}
            />
            {emailError && (
              <p className="field-error" role="alert">
                {emailError}
              </p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (passwordError) {
                  setPasswordError('');
                }
              }}
              placeholder="At least 8 characters"
              disabled={submitting}
            />
            {passwordError && (
              <p className="field-error" role="alert">
                {passwordError}
              </p>
            )}
          </div>

          {authError && (
            <p className="error-banner" role="alert">
              {authError}
            </p>
          )}

          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting
              ? isRegister
                ? 'Creating account...'
                : 'Signing in...'
              : isRegister
                ? 'Register'
                : 'Login'}
          </button>
        </form>
      </section>
    </main>
  );
}
