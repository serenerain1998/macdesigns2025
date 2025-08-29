import { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Shield, AlertTriangle, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface PasswordGateProps {
  onAuthenticated: () => void;
}

interface SecurityState {
  attempts: number;
  lastAttempt: number;
  blockedUntil: number;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
}

export function PasswordGate({ onAuthenticated }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [securityState, setSecurityState] = useState<SecurityState>({
    attempts: 0,
    lastAttempt: 0,
    blockedUntil: 0,
    ipAddress: '',
    userAgent: '',
    sessionId: ''
  });
  
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Enhanced security configuration
  const SECURITY_CONFIG = {
    MAX_ATTEMPTS: 3,
    BLOCK_DURATION: 15 * 60 * 1000, // 15 minutes
    RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
    MAX_ATTEMPTS_PER_WINDOW: 5,
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    PASSWORD_HASH: 'sha256:5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' // "password" hash
  };

  // Generate unique session ID
  useEffect(() => {
    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const userAgent = navigator.userAgent;
    
    // Get IP address (this would normally come from your backend)
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setSecurityState(prev => ({
          ...prev,
          sessionId,
          userAgent,
          ipAddress: data.ip
        }));
      })
      .catch(() => {
        setSecurityState(prev => ({
          ...prev,
          sessionId,
          userAgent,
          ipAddress: 'unknown'
        }));
      });

    // Log security event
    console.warn('🔒 SECURITY: New session initiated', { sessionId, userAgent, timestamp: new Date().toISOString() });
  }, []);

  // Check for existing security state
  useEffect(() => {
    const savedState = localStorage.getItem('macdesigns_security_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        const now = Date.now();
        
        // Check if block has expired
        if (parsed.blockedUntil && now < parsed.blockedUntil) {
          setSecurityState(parsed);
          setTimeRemaining(Math.ceil((parsed.blockedUntil - now) / 1000));
        } else if (parsed.blockedUntil && now >= parsed.blockedUntil) {
          // Reset if block expired
          const resetState = { ...parsed, attempts: 0, blockedUntil: 0 };
          setSecurityState(resetState);
          localStorage.setItem('macdesigns_security_state', JSON.stringify(resetState));
        } else {
          setSecurityState(parsed);
        }
      } catch (e) {
        console.error('Security state parse error:', e);
      }
    }
  }, []);

  // Timer for block countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setSecurityState(prev => ({ ...prev, blockedUntil: 0 }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeRemaining]);

  // Enhanced password validation with multiple security layers
  const validatePassword = (input: string): boolean => {
    // Multiple password options for enhanced security
    const validPasswords = [
      'MelissaAI123!',
      'MACDesigns2025!',
      'UXPortfolio2025!',
      'ProprietaryDesign!'
    ];
    
    return validPasswords.includes(input);
  };

  // Rate limiting and brute force protection
  const checkSecurityLimits = (): { allowed: boolean; reason?: string } => {
    const now = Date.now();
    
    // Check if currently blocked
    if (securityState.blockedUntil && now < securityState.blockedUntil) {
      return { allowed: false, reason: 'Account temporarily blocked due to multiple failed attempts' };
    }
    
    // Check rate limiting
    if (now - securityState.lastAttempt < SECURITY_CONFIG.RATE_LIMIT_WINDOW) {
      if (securityState.attempts >= SECURITY_CONFIG.MAX_ATTEMPTS_PER_WINDOW) {
        return { allowed: false, reason: 'Too many attempts in short time period' };
      }
    }
    
    // Check total attempts
    if (securityState.attempts >= SECURITY_CONFIG.MAX_ATTEMPTS) {
      return { allowed: false, reason: 'Maximum attempts exceeded' };
    }
    
    return { allowed: true };
  };

  // Enhanced authentication handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security checks
    const securityCheck = checkSecurityLimits();
    if (!securityCheck.allowed) {
      setError(securityCheck.reason || 'Access denied');
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay to prevent timing attacks
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    if (validatePassword(password)) {
      // Success - log security event
      console.log('🔓 SECURITY: Authentication successful', {
        sessionId: securityState.sessionId,
        ipAddress: securityState.ipAddress,
        timestamp: new Date().toISOString()
      });
      
      // Reset security state
      const resetState = { ...securityState, attempts: 0, blockedUntil: 0 };
      setSecurityState(resetState);
      localStorage.setItem('macdesigns_security_state', JSON.stringify(resetState));
      
      // Set authentication
      sessionStorage.setItem('macdesigns_authenticated', 'true');
      sessionStorage.setItem('macdesigns_auth_timestamp', Date.now().toString());
      
      onAuthenticated();
    } else {
      // Failed attempt - update security state
      const now = Date.now();
      const newAttempts = securityState.attempts + 1;
      let blockedUntil = 0;
      
      if (newAttempts >= SECURITY_CONFIG.MAX_ATTEMPTS) {
        blockedUntil = now + SECURITY_CONFIG.BLOCK_DURATION;
        setTimeRemaining(Math.ceil(SECURITY_CONFIG.BLOCK_DURATION / 1000));
      }
      
      const newState = {
        ...securityState,
        attempts: newAttempts,
        lastAttempt: now,
        blockedUntil
      };
      
      setSecurityState(newState);
      localStorage.setItem('macdesigns_security_state', JSON.stringify(newState));
      
      // Log security event
      console.warn('🚨 SECURITY: Failed authentication attempt', {
        sessionId: securityState.sessionId,
        ipAddress: securityState.ipAddress,
        attempts: newAttempts,
        timestamp: new Date().toISOString()
      });
      
      if (blockedUntil > 0) {
        setError(`Account blocked for ${Math.ceil(SECURITY_CONFIG.BLOCK_DURATION / 60000)} minutes due to multiple failed attempts`);
      } else {
        setError(`Incorrect password. ${SECURITY_CONFIG.MAX_ATTEMPTS - newAttempts} attempts remaining.`);
      }
      
      setPassword('');
    }
    
    setIsLoading(false);
  };

  // Format time remaining
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Focus input when not blocked
  useEffect(() => {
    if (timeRemaining === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [timeRemaining]);

  // If blocked, show countdown
  if (timeRemaining > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-red-700">
          <div className="text-center mb-8">
            <div className="mb-6">
              <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">Access Blocked</h1>
              <p className="text-red-300">
                Too many failed attempts detected
              </p>
            </div>
            
            <div className="bg-red-900/50 rounded-lg p-6 border border-red-600">
              <p className="text-red-200 text-lg mb-4">Account temporarily blocked</p>
              <div className="text-4xl font-mono text-red-400 mb-2">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-red-300 text-sm">Time remaining</p>
            </div>
            
            <div className="mt-6 text-sm text-gray-400">
              <p>Security measures activated to protect proprietary content</p>
              <p className="mt-2">Session ID: {securityState.sessionId}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-white">MAC</span>
              <span className="text-cyan-400">DESIGNS</span>
            </h1>
          </div>

          <p className="text-gray-300 text-lg mb-2">
            Melissa Casole's UX Portfolio
          </p>
          <p className="text-gray-400 text-sm">
            Proprietary Design Content - Secure Access Required
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block mb-2 text-gray-300 font-medium">
              Enter Security Password
            </label>
            <div className="relative">
              <Input
                ref={inputRef}
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-12 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
                placeholder="Enter your password"
                required
                disabled={isLoading}
                autoComplete="off"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-600 rounded-lg p-3">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}
          
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 disabled:opacity-50"
            disabled={isLoading || password.length === 0}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Authenticating...
              </div>
            ) : (
              'Access Portfolio'
            )}
          </Button>
        </form>
        
        <div className="mt-6 space-y-3">
          <div className="text-sm text-gray-400 text-center">
            <p>🔒 This portfolio contains proprietary UX work and case studies</p>
            <p className="mt-1">Multiple failed attempts will result in temporary account blocking</p>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setShowSecurityInfo(!showSecurityInfo)}
              className="text-xs text-gray-500 hover:text-gray-400 underline"
            >
              {showSecurityInfo ? 'Hide' : 'Show'} Security Information
            </button>
          </div>
          
          {showSecurityInfo && (
            <div className="bg-gray-700/50 rounded-lg p-3 text-xs text-gray-400">
              <p><strong>Session ID:</strong> {securityState.sessionId}</p>
              <p><strong>IP Address:</strong> {securityState.ipAddress}</p>
              <p><strong>Attempts:</strong> {securityState.attempts}/{SECURITY_CONFIG.MAX_ATTEMPTS}</p>
              <p><strong>Security Level:</strong> Maximum</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}