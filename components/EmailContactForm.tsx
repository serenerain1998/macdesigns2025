import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EmailHeader,
  StatusMessages, 
  EmailFormFields, 
  SendButton, 
  MessageHistory, 
  ContactInfo 
} from './email/EmailFormComponents';
import { 
  sendEmail, 
  validateForm, 
  createTempMessage 
} from './email/EmailFormHelpers';
import { 
  EMAIL_CONFIG, 
  STATUS_MESSAGES 
} from './email/EmailFormConstants';
import type { EmailFormData, EmailMessage } from './email/EmailFormConstants';

interface EmailContactFormProps {
  onClose: () => void;
}

export function EmailContactForm({ onClose }: EmailContactFormProps) {
  const [formData, setFormData] = useState<EmailFormData>({
    name: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (field: keyof EmailFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendEmail = async () => {
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const tempMessage = createTempMessage(formData);
    setMessages(prev => [tempMessage, ...prev]);

    try {
      const response = await sendEmail(formData);

      if (response.success) {
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        ));

        setSuccess(STATUS_MESSAGES.SUCCESS);
        
        setFormData({
          name: '',
          company: '',
          subject: '',
          message: ''
        });

        setTimeout(() => setSuccess(null), EMAIL_CONFIG.SUCCESS_DISPLAY_DURATION);
      } else {
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id 
            ? { ...msg, status: 'failed' as const }
            : msg
        ));

        setError(response.error || STATUS_MESSAGES.GENERIC_ERROR);
      }
    } catch (err) {
      console.error('Email sending error:', err);
      
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...msg, status: 'failed' as const }
          : msg
      ));

      setError(STATUS_MESSAGES.NETWORK_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);

  return (
    <motion.div
      className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-50"
      initial={{ scale: 0, opacity: 0, y: 100 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: 100 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        opacity: { duration: 0.2 }
      }}
    >
      <EmailHeader onClose={onClose} />

      <div className="p-4 space-y-4">
        <StatusMessages 
          error={error}
          success={success}
          onClearError={clearError}
          onClearSuccess={clearSuccess}
        />

        <EmailFormFields 
          formData={formData}
          isLoading={isLoading}
          onInputChange={handleInputChange}
        />

        <SendButton 
          onSend={handleSendEmail}
          isLoading={isLoading}
          formData={formData}
        />

        <MessageHistory messages={messages} />

        <ContactInfo />
      </div>
    </motion.div>
  );
}