import { useState, useEffect } from 'react';
import { Send, Mail, MessageSquare, Clock, CheckCircle, AlertTriangle, X, Info, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

// Mock SMS service functions to prevent errors
const checkSMSServiceHealth = async () => ({
  configured: false,
  database: false,
  edgeFunction: false,
  message: 'SMS service not configured'
});

const sendSMS = async (data: any) => ({
  success: false,
  error: 'SMS service not available'
});

interface SMSResponse {
  success: boolean;
  error?: string;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'failed';
  senderName: string;
  senderCompany?: string;
}

export function SMSMessenger() {
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [serviceStatus, setServiceStatus] = useState<{
    configured: boolean;
    database: boolean;
    edgeFunction: boolean;
    message: string;
  } | null>(null);

  // Check service health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await checkSMSServiceHealth();
        setServiceStatus(health);
      } catch (error) {
        console.error('Health check failed:', error);
        setServiceStatus({
          configured: false,
          database: false,
          edgeFunction: false,
          message: 'Unable to check service status'
        });
      }
    };

    checkHealth();
  }, []);

  const handleSendSMS = async () => {
    if (!message.trim() || !senderName.trim()) {
      setError('Please fill in your name and message');
      return;
    }

    if (message.length > 160) {
      setError('Message must be 160 characters or less');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Create temporary message for UI feedback
    const tempMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      status: 'sending',
      senderName,
      senderCompany
    };

    setMessages(prev => [tempMessage, ...prev]);

    try {
      // Send SMS via our service
      const response: SMSResponse = await sendSMS({
        sender_name: senderName,
        sender_company: senderCompany || undefined,
        message: message,
        phone_number: '+16187954580'
      });

      if (response.success) {
        // Update message status to sent
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        ));

        // Show appropriate success message based on service type
        if (serviceStatus?.configured) {
          setSuccess('Message sent successfully to Melissa! 🎉');
        } else {
          setSuccess('Demo message sent! (Using mock service - configure Supabase for real SMS) 📱');
        }
        
        // Clear form
        setMessage('');
        setSenderName('');
        setSenderCompany('');

        // Auto-hide success message after 5 seconds
        setTimeout(() => setSuccess(null), 5000);
      } else {
        // Update message status to failed
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id 
            ? { ...msg, status: 'failed' as const }
            : msg
        ));

        setError(response.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('SMS sending error:', err);
      
      // Update message status to failed
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...msg, status: 'failed' as const }
          : msg
      ));

      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: Message['status']) => {
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

  const getStatusText = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return 'Sending...';
      case 'sent':
        return serviceStatus?.configured ? 'Delivered' : 'Demo Sent';
      case 'failed':
        return 'Failed';
      default:
        return '';
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);

  return (
    <motion.div
      className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-50"
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
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smartphone size={20} />
            <div>
              <h3 className="font-semibold text-sm">Direct SMS to Melissa</h3>
              <p className="text-xs opacity-90">
                {serviceStatus?.configured ? 'Real SMS delivery!' : 'Demo mode - configure Supabase for real SMS'}
              </p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={`text-white border-white/30 text-xs ${
              serviceStatus?.configured 
                ? 'bg-white/20' 
                : 'bg-yellow-500/30 border-yellow-300/50'
            }`}
          >
            <div className={`w-2 h-2 rounded-full animate-pulse mr-1 ${
              serviceStatus?.configured ? 'bg-green-300' : 'bg-yellow-300'
            }`}></div>
            {serviceStatus?.configured ? 'Live' : 'Demo'}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Service Status Info */}
        {serviceStatus && !serviceStatus.configured && (
          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-700 dark:text-blue-300 text-xs">
              Demo mode active. Messages won't be sent to real phone. 
              <br />Check setup instructions to enable real SMS.
            </AlertDescription>
          </Alert>
        )}

        {/* Status Messages */}
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
                      onClick={clearError}
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
                      onClick={clearSuccess}
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

        {/* Form */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              Your Name *
            </label>
            <Input
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="John Smith"
              className="h-8 text-sm"
              disabled={isLoading}
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              Company (Optional)
            </label>
            <Input
              value={senderCompany}
              onChange={(e) => setSenderCompany(e.target.value)}
              placeholder="Tech Corp"
              className="h-8 text-sm"
              disabled={isLoading}
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              Message *
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Melissa, I'd like to discuss a UX opportunity..."
              rows={3}
              className="resize-none text-sm"
              disabled={isLoading}
              maxLength={160}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-400">
                SMS limit: 160 chars
              </span>
              <span className={`text-xs ${
                message.length > 160 ? 'text-red-500' : 'text-gray-400'
              }`}>
                {message.length}/160
              </span>
            </div>
          </div>

          <Button
            onClick={handleSendSMS}
            disabled={!message.trim() || !senderName.trim() || isLoading || message.length > 160}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-9 text-sm font-medium"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {serviceStatus?.configured ? 'Sending to Melissa...' : 'Sending demo...'}
              </div>
            ) : (
              <>
                <Send className="mr-2" size={14} />
                {serviceStatus?.configured ? 'Send to (618) 795-4580' : 'Send Demo Message'}
              </>
            )}
          </Button>
        </div>

        {/* Message Status History */}
        {messages.length > 0 && (
          <div className="pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
            <h4 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">
              Recent Messages
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {messages.slice(0, 3).map((msg) => (
                <motion.div 
                  key={msg.id}
                  className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {msg.senderName}
                      {msg.senderCompany && (
                        <span className="text-gray-500 dark:text-gray-400 font-normal">
                          {' '}• {msg.senderCompany}
                        </span>
                      )}
                    </span>
                    <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-xs truncate flex-1 mr-2">
                      {msg.text.length > 40 ? `${msg.text.slice(0, 40)}...` : msg.text}
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
        )}

        {/* Contact Info Footer */}
        <div className="text-center pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {serviceStatus?.configured 
              ? 'Messages go directly to Melissa\'s phone 📱' 
              : 'Demo mode - real messages need Supabase setup 🛠️'
            }
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {serviceStatus?.configured 
              ? 'Powered by secure SMS delivery'
              : 'Check SMS_SETUP_INSTRUCTIONS.md for setup'
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
}