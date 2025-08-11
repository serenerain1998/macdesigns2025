import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, X, Clock, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { FORM_LABELS, UI_TEXT, EMAIL_CONFIG } from './EmailFormConstants';
import { truncateText } from './EmailFormHelpers';
import type { EmailFormData, EmailMessage, EmailStatus } from './EmailFormConstants';

interface EmailHeaderProps {
  onClose: () => void;
}

export const EmailHeader = ({ onClose }: EmailHeaderProps) => (
  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Mail size={20} />
        <div>
          <h3 className="font-semibold text-sm">{UI_TEXT.HEADER_TITLE}</h3>
          <p className="text-xs opacity-90">{UI_TEXT.HEADER_SUBTITLE}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
      >
        <X size={16} />
      </Button>
    </div>
  </div>
);

interface StatusMessagesProps {
  error: string | null;
  success: string | null;
  onClearError: () => void;
  onClearSuccess: () => void;
}

export const StatusMessages = ({ error, success, onClearError, onClearSuccess }: StatusMessagesProps) => (
  <AnimatePresence>
    {error && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-700 dark:text-red-300 text-sm">
            <div className="flex justify-between items-start">
              <span>{error}</span>
              <button 
                onClick={onClearError}
                className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400"
              >
                <X size={14} />
              </button>
            </div>
          </AlertDescription>
        </Alert>
      </motion.div>
    )}

    {success && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-700 dark:text-green-300 text-sm">
            <div className="flex justify-between items-start">
              <span>{success}</span>
              <button 
                onClick={onClearSuccess}
                className="ml-2 text-green-600 hover:text-green-800 dark:text-green-400"
              >
                <X size={14} />
              </button>
            </div>
          </AlertDescription>
        </Alert>
      </motion.div>
    )}
  </AnimatePresence>
);

interface EmailFormFieldsProps {
  formData: EmailFormData;
  isLoading: boolean;
  onInputChange: (field: keyof EmailFormData, value: string) => void;
}

export const EmailFormFields = ({ formData, isLoading, onInputChange }: EmailFormFieldsProps) => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
          {FORM_LABELS.NAME}
        </label>
        <Input
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder={FORM_LABELS.NAME_PLACEHOLDER}
          className="h-8 text-sm"
          disabled={isLoading}
          maxLength={EMAIL_CONFIG.MAX_NAME_LENGTH}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
          {FORM_LABELS.COMPANY}
        </label>
        <Input
          value={formData.company}
          onChange={(e) => onInputChange('company', e.target.value)}
          placeholder={FORM_LABELS.COMPANY_PLACEHOLDER}
          className="h-8 text-sm"
          disabled={isLoading}
          maxLength={EMAIL_CONFIG.MAX_COMPANY_LENGTH}
        />
      </div>
    </div>

    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
        {FORM_LABELS.SUBJECT}
      </label>
      <Input
        value={formData.subject}
        onChange={(e) => onInputChange('subject', e.target.value)}
        placeholder={FORM_LABELS.SUBJECT_PLACEHOLDER}
        className="h-8 text-sm"
        disabled={isLoading}
        maxLength={EMAIL_CONFIG.MAX_SUBJECT_LENGTH}
      />
    </div>

    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
        {FORM_LABELS.MESSAGE}
      </label>
      <Textarea
        value={formData.message}
        onChange={(e) => onInputChange('message', e.target.value)}
        placeholder={FORM_LABELS.MESSAGE_PLACEHOLDER}
        rows={4}
        className="resize-none text-sm"
        disabled={isLoading}
        maxLength={EMAIL_CONFIG.MAX_MESSAGE_LENGTH}
      />
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-400">
          {UI_TEXT.CHARACTER_LIMIT_INFO}
        </span>
        <span className={`text-xs ${
          formData.message.length > EMAIL_CONFIG.MAX_MESSAGE_LENGTH ? 'text-red-500' : 'text-gray-400'
        }`}>
          {formData.message.length}/{EMAIL_CONFIG.MAX_MESSAGE_LENGTH}
        </span>
      </div>
    </div>
  </div>
);

interface SendButtonProps {
  onSend: () => void;
  isLoading: boolean;
  formData: EmailFormData;
}

export const SendButton = ({ onSend, isLoading, formData }: SendButtonProps) => {
  const isDisabled = !formData.name.trim() || !formData.subject.trim() || !formData.message.trim() || 
                     isLoading || formData.message.length > EMAIL_CONFIG.MAX_MESSAGE_LENGTH;

  return (
    <Button
      onClick={onSend}
      disabled={isDisabled}
      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white h-9 text-sm font-medium"
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          {UI_TEXT.SENDING_BUTTON}
        </div>
      ) : (
        <>
          <Mail className="mr-2" size={14} />
          {UI_TEXT.SEND_BUTTON}
        </>
      )}
    </Button>
  );
};

const getStatusIcon = (status: EmailStatus) => {
  switch (status) {
    case 'sending':
      return <Clock className="w-3 h-3 text-yellow-500 animate-pulse" />;
    case 'sent':
      return <CheckCircle className="w-3 h-3 text-green-500" />;
    case 'failed':
      return <AlertTriangle className="w-3 h-3 text-red-500" />;
    default:
      return null;
  }
};

const getStatusText = (status: EmailStatus) => {
  switch (status) {
    case 'sending':
      return 'Composing...';
    case 'sent':
      return 'Email Ready';
    case 'failed':
      return 'Failed';
    default:
      return '';
  }
};

interface MessageHistoryProps {
  messages: EmailMessage[];
}

export const MessageHistory = ({ messages }: MessageHistoryProps) => {
  if (messages.length === 0) return null;

  return (
    <div className="pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
      <h4 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">
        {UI_TEXT.RECENT_CONTACTS}
      </h4>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {messages.slice(0, 2).map((msg) => (
          <motion.div 
            key={msg.id}
            className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start justify-between text-xs mb-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {msg.name}
                {msg.company && (
                  <span className="text-gray-500 dark:text-gray-400 font-normal">
                    {' '}• {msg.company}
                  </span>
                )}
              </span>
              <span className="text-gray-400 text-xs">{msg.timestamp}</span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">
              {msg.subject}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 text-xs truncate flex-1 mr-2">
                {truncateText(msg.message, 30)}
              </span>
              <div className="flex items-center space-x-1 flex-shrink-0">
                {getStatusIcon(msg.status)}
                <span className={`text-xs ${
                  msg.status === 'sent' ? 'text-green-600 dark:text-green-400' :
                  msg.status === 'failed' ? 'text-red-600 dark:text-red-400' :
                  'text-yellow-600 dark:text-yellow-400'
                }`}>
                  {getStatusText(msg.status)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const ContactInfo = () => (
  <div className="text-center pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
    <p className="text-xs text-gray-500 dark:text-gray-400">
      {UI_TEXT.EMAIL_CLIENT_INFO}
    </p>
    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
      {EMAIL_CONFIG.RECIPIENT}
    </p>
  </div>
);