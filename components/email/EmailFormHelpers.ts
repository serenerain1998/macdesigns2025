import { EMAIL_CONFIG } from './EmailFormConstants';
import type { EmailFormData } from './EmailFormConstants';

export const createEmailBody = (emailData: EmailFormData): string => {
  return `
Name: ${emailData.name}
Company: ${emailData.company || 'Not specified'}
Subject: ${emailData.subject}

Message:
${emailData.message}

---
Sent from MAC DESIGNS Portfolio Contact Form
  `.trim();
};

export const createMailtoLink = (emailData: EmailFormData): string => {
  const emailBody = createEmailBody(emailData);
  return `mailto:${EMAIL_CONFIG.RECIPIENT}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailBody)}`;
};

export const sendEmail = async (emailData: EmailFormData): Promise<{ success: boolean; error?: string }> => {
  const mailtoLink = createMailtoLink(emailData);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      window.open(mailtoLink, '_blank');
      resolve({ success: true });
    }, EMAIL_CONFIG.SEND_DELAY);
  });
};

export const validateForm = (formData: EmailFormData): string | null => {
  if (!formData.name.trim() || !formData.subject.trim() || !formData.message.trim()) {
    return 'Please fill in your name, subject, and message';
  }

  if (formData.message.length > EMAIL_CONFIG.MAX_MESSAGE_LENGTH) {
    return `Message must be ${EMAIL_CONFIG.MAX_MESSAGE_LENGTH} characters or less`;
  }

  return null;
};

export const createTempMessage = (formData: EmailFormData): import('./EmailFormConstants').EmailMessage => ({
  id: Date.now().toString(),
  name: formData.name,
  company: formData.company,
  subject: formData.subject,
  message: formData.message,
  timestamp: new Date().toLocaleTimeString(),
  status: 'sending'
});

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};