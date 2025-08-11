import { createClient } from '@supabase/supabase-js';

// Browser-compatible environment variable access
const getEnvVar = (name: string, fallback: string = '') => {
  // Try import.meta.env first (Vite/modern bundlers)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[name] || fallback;
  }
  
  // Try process.env (Create React App/Webpack)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name] || fallback;
  }
  
  // Try window global (runtime injection)
  if (typeof window !== 'undefined' && (window as any).__ENV__) {
    return (window as any).__ENV__[name] || fallback;
  }
  
  return fallback;
};

// Get Supabase configuration from environment or use development defaults
const supabaseUrl = getEnvVar('REACT_APP_SUPABASE_URL', getEnvVar('VITE_SUPABASE_URL', 'https://placeholder.supabase.co'));
const supabaseAnonKey = getEnvVar('REACT_APP_SUPABASE_ANON_KEY', getEnvVar('VITE_SUPABASE_ANON_KEY', 'placeholder-anon-key'));

// Check if we're in development mode
const isDevelopment = () => {
  try {
    return (
      typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' ||
       window.location.hostname.includes('ngrok') ||
       import.meta?.env?.DEV === true ||
       (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development'))
    );
  } catch {
    return false;
  }
};

// Validate configuration and provide helpful feedback
const isConfigured = supabaseUrl && 
                    !supabaseUrl.includes('placeholder') && 
                    supabaseAnonKey && 
                    !supabaseAnonKey.includes('placeholder');

// Only show configuration info in development mode
if (!isConfigured && isDevelopment()) {
  console.group('💬 SMS Service Configuration');
  console.log('📱 SMS functionality is running in demo mode');
  console.log('🔧 To enable real SMS delivery:');
  console.log('   • Set REACT_APP_SUPABASE_URL or VITE_SUPABASE_URL');
  console.log('   • Set REACT_APP_SUPABASE_ANON_KEY or VITE_SUPABASE_ANON_KEY');
  console.log('   • Follow SMS_SETUP_INSTRUCTIONS.md for complete setup');
  console.log('✨ Demo mode works perfectly for testing the interface!');
  console.groupEnd();
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We don't need user sessions for SMS
  },
  global: {
    headers: {
      'X-Client-Info': 'mac-designs-portfolio'
    }
  }
});

// Test connection function
export const testSupabaseConnection = async () => {
  if (!isConfigured) {
    return false; // Don't attempt connection if not configured
  }

  try {
    const { data, error } = await supabase
      .from('sms_messages')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      if (isDevelopment()) {
        console.log('📡 Supabase connection test:', error.message);
      }
      return false;
    }
    
    if (isDevelopment()) {
      console.log('✅ Supabase connected successfully');
    }
    return true;
  } catch (error) {
    if (isDevelopment()) {
      console.log('📡 Supabase connection test failed:', error);
    }
    return false;
  }
};

// Database schema type definitions
export interface Database {
  public: {
    Tables: {
      sms_messages: {
        Row: {
          id: string;
          sender_name: string;
          sender_company: string | null;
          message: string;
          phone_number: string;
          status: 'pending' | 'sent' | 'failed';
          created_at: string;
          error_message: string | null;
        };
        Insert: {
          id?: string;
          sender_name: string;
          sender_company?: string | null;
          message: string;
          phone_number: string;
          status?: 'pending' | 'sent' | 'failed';
          created_at?: string;
          error_message?: string | null;
        };
        Update: {
          id?: string;
          sender_name?: string;
          sender_company?: string | null;
          message?: string;
          phone_number?: string;
          status?: 'pending' | 'sent' | 'failed';
          created_at?: string;
          error_message?: string | null;
        };
      };
    };
  };
}

// Export connection status for components to check
export const isSupabaseConfigured = () => {
  return isConfigured;
};

// Get configuration status for UI components
export const getSupabaseStatus = () => {
  return {
    configured: isConfigured,
    url: isConfigured ? '✅ Connected' : '🔧 Demo Mode',
    mode: isConfigured ? 'production' : 'demo'
  };
};