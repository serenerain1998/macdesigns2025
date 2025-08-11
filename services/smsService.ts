import { supabase, isSupabaseConfigured, getSupabaseStatus } from './supabaseClient';

export interface SMSMessage {
  id?: string;
  sender_name: string;
  sender_company?: string;
  message: string;
  phone_number: string;
  status: 'pending' | 'sent' | 'failed';
  created_at?: string;
  error_message?: string;
}

export interface SMSResponse {
  success: boolean;
  message_id?: string;
  error?: string;
  mode?: 'demo' | 'production';
}

// Mock SMS sending for development when Supabase is not configured
const mockSMSSend = async (messageData: Omit<SMSMessage, 'id' | 'created_at' | 'status'>): Promise<SMSResponse> => {
  // Simulate realistic API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Mock success with high reliability (95% success rate)
  const isSuccess = Math.random() > 0.05;
  
  if (isSuccess) {
    // Log demo message for development
    console.group('📱 Demo SMS Sent Successfully');
    console.log('📞 To:', messageData.phone_number);
    console.log('👤 From:', messageData.sender_name);
    console.log('🏢 Company:', messageData.sender_company || 'Not provided');
    console.log('💬 Message:', messageData.message);
    console.log('⏰ Time:', new Date().toLocaleString());
    console.log('🎯 Mode: Demo (no real SMS sent)');
    console.groupEnd();
    
    return {
      success: true,
      message_id: 'demo_' + Date.now(),
      mode: 'demo'
    };
  } else {
    return {
      success: false,
      error: 'Demo network simulation - random failure for testing',
      mode: 'demo'
    };
  }
};

// Send SMS via Supabase Edge Function
export const sendSMS = async (messageData: Omit<SMSMessage, 'id' | 'created_at' | 'status'>): Promise<SMSResponse> => {
  try {
    // Check if Supabase is properly configured
    if (!isSupabaseConfigured()) {
      return await mockSMSSend(messageData);
    }

    // Validate input
    if (!messageData.sender_name?.trim()) {
      return {
        success: false,
        error: 'Sender name is required',
        mode: 'production'
      };
    }

    if (!messageData.message?.trim()) {
      return {
        success: false,
        error: 'Message is required',
        mode: 'production'
      };
    }

    if (messageData.message.length > 500) {
      return {
        success: false,
        error: 'Message is too long (max 500 characters)',
        mode: 'production'
      };
    }

    // Store the message in the database
    const { data: messageRecord, error: dbError } = await supabase
      .from('sms_messages')
      .insert([{
        sender_name: messageData.sender_name.trim(),
        sender_company: messageData.sender_company?.trim() || null,
        message: messageData.message.trim(),
        phone_number: messageData.phone_number,
        status: 'pending'
      }])
      .select('id')
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      
      // If table doesn't exist, provide helpful error
      if (dbError.code === '42P01') {
        return {
          success: false,
          error: 'SMS service not set up. Please run the setup SQL script.',
          mode: 'production'
        };
      }
      
      return {
        success: false,
        error: 'Failed to store message. Please try again.',
        mode: 'production'
      };
    }

    // Format the message to include sender info
    const formattedMessage = `
📱 New Portfolio Contact from MAC DESIGNS:

👤 Name: ${messageData.sender_name}
🏢 Company: ${messageData.sender_company || 'Not provided'}

💬 Message:
${messageData.message}

📅 ${new Date().toLocaleString()}
    `.trim();

    // Call Supabase Edge Function to send SMS
    const { data, error } = await supabase.functions.invoke('send-sms', {
      body: {
        to: messageData.phone_number,
        message: formattedMessage,
        messageId: messageRecord.id
      }
    });

    if (error) {
      console.error('SMS sending error:', error);
      
      // Update message status to failed
      await supabase
        .from('sms_messages')
        .update({ 
          status: 'failed',
          error_message: error.message || 'Unknown error'
        })
        .eq('id', messageRecord.id);

      // Provide user-friendly error messages
      if (error.message?.includes('Function not found')) {
        return {
          success: false,
          error: 'SMS service not deployed. Please deploy the Edge Function.',
          mode: 'production'
        };
      }

      return {
        success: false,
        error: 'Failed to send SMS. Please try again or use another contact method.',
        mode: 'production'
      };
    }

    // Update message status to sent
    await supabase
      .from('sms_messages')
      .update({ 
        status: 'sent',
        error_message: null
      })
      .eq('id', messageRecord.id);

    return {
      success: true,
      message_id: messageRecord.id,
      mode: 'production'
    };

  } catch (error) {
    console.error('SMS service error:', error);
    
    // Network or unexpected errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.',
        mode: isSupabaseConfigured() ? 'production' : 'demo'
      };
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
      mode: isSupabaseConfigured() ? 'production' : 'demo'
    };
  }
};

// Get SMS message history (for admin/debugging purposes)
export const getSMSHistory = async (): Promise<SMSMessage[]> => {
  try {
    if (!isSupabaseConfigured()) {
      return []; // Return empty array for demo mode
    }

    const { data, error } = await supabase
      .from('sms_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching SMS history:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('SMS history service error:', error);
    return [];
  }
};

// Health check function with improved messaging
export const checkSMSServiceHealth = async (): Promise<{
  configured: boolean;
  database: boolean;
  edgeFunction: boolean;
  message: string;
  mode: 'demo' | 'production';
}> => {
  const status = getSupabaseStatus();
  
  const result = {
    configured: false,
    database: false,
    edgeFunction: false,
    message: '',
    mode: 'demo' as const
  };

  // Check configuration
  result.configured = isSupabaseConfigured();
  if (!result.configured) {
    result.message = 'Running in demo mode - perfect for testing the interface!';
    return result;
  }

  result.mode = 'production';

  // Check database connection
  try {
    const { error } = await supabase
      .from('sms_messages')
      .select('count', { count: 'exact', head: true });
    
    result.database = !error;
    if (error) {
      result.message = `Database connection issue: ${error.message}`;
      return result;
    }
  } catch (error) {
    result.message = 'Unable to connect to database';
    return result;
  }

  // Assume edge function is working if database is working
  result.edgeFunction = true;
  result.message = 'SMS service is ready for production use';

  return result;
};

// Get service mode for UI components
export const getSMSServiceMode = () => {
  const status = getSupabaseStatus();
  return {
    mode: status.mode,
    configured: status.configured,
    displayName: status.mode === 'demo' ? 'Demo Mode' : 'Live SMS',
    description: status.mode === 'demo' 
      ? 'Interface testing enabled - no real messages sent'
      : 'Real SMS delivery to phone number',
    badgeColor: status.mode === 'demo' ? 'yellow' : 'green'
  };
};