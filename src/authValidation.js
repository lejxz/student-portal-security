const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AUTH_ERROR_MESSAGES = {
  'auth/invalid-credential': 'Unable to sign in with these credentials.',
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/weak-password': 'Please choose a stronger password.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
};

export function validateEmail(value) {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  if (!trimmed) {
    return 'Email is required.';
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return 'Please enter a valid email address.';
  }
  return null;
}

export function validatePassword(value) {
  if (!value) {
    return 'Password is required.';
  }
  if (value.length < 8) {
    return 'Password must contain at least 8 characters.';
  }
  return null;
}

export function getSafeAuthErrorMessage(error) {
  const code = error && typeof error === 'object' ? error.code : undefined;
  return AUTH_ERROR_MESSAGES[code] ?? 'Authentication failed. Please try again.';
}
