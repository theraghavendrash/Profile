import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, formatStatValue, buildMailtoUrl } from './portfolioUtils';

test('validateContactForm passes for complete valid submission', () => {
  const result = validateContactForm({
    name: 'Alice Cooper',
    email: 'alice@example.com',
    subject: 'Staff Engineering Role',
    message: 'Hello Raghav, we loved your work on Loan 360.'
  });

  assert.equal(result.isValid, true);
  assert.equal(result.errors.name, '');
  assert.equal(result.errors.email, '');
  assert.equal(result.errors.subject, '');
  assert.equal(result.errors.message, '');
});

test('validateContactForm catches invalid email format', () => {
  const result = validateContactForm({
    name: 'Alice',
    email: 'invalid-email',
    subject: 'Inquiry',
    message: 'This is a test message over ten characters long.'
  });

  assert.equal(result.isValid, false);
  assert.match(result.errors.email, /valid email/i);
});

test('validateContactForm enforces minimum character lengths', () => {
  const result = validateContactForm({
    name: 'A',
    email: 'a@b.com',
    subject: 'Hi',
    message: 'Short'
  });

  assert.equal(result.isValid, false);
  assert.notEqual(result.errors.name, '');
  assert.notEqual(result.errors.subject, '');
  assert.notEqual(result.errors.message, '');
});

test('formatStatValue handles decimals and integers properly', () => {
  assert.equal(formatStatValue(99.99, 2), '99.99');
  assert.equal(formatStatValue(40), '40');
  assert.equal(formatStatValue(12000), '12,000');
});

test('buildMailtoUrl constructs valid URI with encoded parameters', () => {
  const url = buildMailtoUrl('raghavendracsh@gmail.com', 'System Architecture', 'Bob', 'Need advice');
  assert.ok(url.startsWith('mailto:raghavendracsh@gmail.com?'));
  assert.ok(url.includes('System%20Architecture'));
  assert.ok(url.includes('Bob'));
});
