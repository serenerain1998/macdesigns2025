export const EMAIL_CONFIG = {
  RECIPIENT: 'melissa.casole@yahoo.com',
  MAX_MESSAGE_LENGTH: 2000,
  MAX_NAME_LENGTH: 50,
  MAX_COMPANY_LENGTH: 50,
  MAX_SUBJECT_LENGTH: 100,
  SUCCESS_DISPLAY_DURATION: 5000,
  SEND_DELAY: 1000
} as const;

export const FORM_LABELS = {
  NAME: 'Your Name *',
  COMPANY: 'Company',
  SUBJECT: 'Subject Line *',
  MESSAGE: 'Message *',
  NAME_PLACEHOLDER: 'John Smith',
  COMPANY_PLACEHOLDER: 'Tech Corp',
  SUBJECT_PLACEHOLDER: 'UX Collaboration Opportunity',
  MESSAGE_PLACEHOLDER: "Hi Melissa, I'd like to discuss a UX opportunity with you. I'm particularly interested in..."
} as const;

export const STATUS_MESSAGES = {
  REQUIRED_FIELDS: 'Please fill in your name, subject, and message',
  MESSAGE_TOO_LONG: 'Message must be 2000 characters or less',
  SUCCESS: 'Email composed successfully! Your default email client should open. 📧',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  GENERIC_ERROR: 'Failed to send email. Please try again.'
} as const;

export const UI_TEXT = {
  HEADER_TITLE: 'Email Melissa',
  HEADER_SUBTITLE: 'Direct contact via melissa.casole@yahoo.com',
  SEND_BUTTON: 'Send Email to Melissa',
  SENDING_BUTTON: 'Composing Email...',
  RECENT_CONTACTS: 'Recent Contacts',
  EMAIL_CLIENT_INFO: 'Opens your default email client to send to 📧',
  CHARACTER_LIMIT_INFO: 'Professional email format'
} as const;

export interface EmailFormData {
  name: string;
  company: string;
  subject: string;
  message: string;
}

export interface EmailMessage {
  id: string;
  name: string;
  company: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'failed';
}

export type EmailStatus = EmailMessage['status'];