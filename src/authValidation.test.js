import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getSafeAuthErrorMessage,
  validateEmail,
  validatePassword,
} from './authValidation.js';

test('validateEmail rejects empty and invalid emails', () => {
  assert.equal(validateEmail(''), 'Email is required.');
  assert.equal(validateEmail('   '), 'Email is required.');
  assert.equal(validateEmail('invalid-email'), 'Please enter a valid email address.');
  assert.equal(validateEmail('student@example.com'), null);
});

test('validatePassword rejects empty and short passwords', () => {
  assert.equal(validatePassword(''), 'Password is required.');
  assert.equal(validatePassword('123'), 'Password must contain at least 8 characters.');
  assert.equal(validatePassword('StudentPortal2026!'), null);
});

test('getSafeAuthErrorMessage maps known codes and hides internal details', () => {
  assert.equal(
    getSafeAuthErrorMessage({ code: 'auth/invalid-credential', message: 'internal trace' }),
    'Unable to sign in with these credentials.'
  );
  assert.equal(
    getSafeAuthErrorMessage({ code: 'auth/email-already-in-use' }),
    'This email is already registered.'
  );
  assert.equal(
    getSafeAuthErrorMessage({ code: 'auth/weak-password' }),
    'Please choose a stronger password.'
  );
  assert.equal(
    getSafeAuthErrorMessage({ code: 'auth/unknown-internal', message: 'secret detail' }),
    'Authentication failed. Please try again.'
  );
});
