export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<keyof ContactFormState, string>;
}

export function validateContactForm(data: ContactFormState): ValidationResult {
  const errors: Record<keyof ContactFormState, string> = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const trimmedName = (data.name || '').trim();
  const trimmedEmail = (data.email || '').trim();
  const trimmedSubject = (data.subject || '').trim();
  const trimmedMessage = (data.message || '').trim();

  if (!trimmedName) {
    errors.name = 'Name is required.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!trimmedSubject) {
    errors.subject = 'Subject is required.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!trimmedMessage) {
    errors.message = 'Message is required.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  const isValid = !Object.values(errors).some(err => err.length > 0);

  return { isValid, errors };
}

export function formatStatValue(value: number, decimals: number = 0): string {
  if (decimals > 0) {
    return value.toFixed(decimals);
  }
  return value.toLocaleString();
}

export function buildMailtoUrl(
  toEmail: string,
  subject: string,
  fromName: string,
  message: string
): string {
  const fullSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject.trim()}`);
  const fullBody = encodeURIComponent(
    `From: ${fromName.trim()}\n\nMessage:\n${message.trim()}\n\n---\nSent via Portfolio Contact Form`
  );
  return `mailto:${toEmail}?subject=${fullSubject}&body=${fullBody}`;
}
