import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';

// Store and service imports
import { queryClient } from './services/queryClient';

// Component imports
import { PasswordGate } from './components/PasswordGate';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WorkSection } from './components/WorkSection';
import { SkillsSection } from './components/SkillsSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIAvatar } from './components/AIAvatar';
import { Toaster } from './components/ui/sonner';

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }: { 
  error: Error; 
  resetErrorBoundary: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 flex items-center justify-center">
    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md">
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {error.message}
      </p>
      <motion.button
        onClick={resetErrorBoundary}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </motion.button>
    </div>
  </div>
);

// Simple Loading Component
const EnhancedLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Orbs */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl"
            style={{
              width: 200 + i * 50,
              height: 200 + i * 50,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Loading Content */}
      <div className="text-center space-y-8 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div 
            className="h-16 w-64 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl mx-auto relative overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.3)",
                "0 0 40px rgba(6, 182, 212, 0.6)",
                "0 0 20px rgba(6, 182, 212, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xl">MAC DESIGNS</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {Math.round(progress)}%
          </p>
        </div>

        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Crafting UX Excellence...
        </motion.p>
      </div>
    </motion.div>
  );
};

// Simple Progress Bar - no custom hooks
const SimpleProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/50 dark:bg-gray-800/50 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600"
          style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/50 dark:bg-gray-800/50 z-50 backdrop-blur-sm">
      <motion.div 
        className="h-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 relative overflow-hidden"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};

// Simple Background - no parallax on mobile
const SimpleBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  if (isMobile) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={`static-${i}`}
              className="absolute bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
              style={{
                width: 300 + i * 75,
                height: 300 + i * 75,
                left: `${20 + i * 30}%`,
                top: `${10 + i * 25}%`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`layer1-${i}`}
            className="absolute bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
            style={{
              width: 400 + i * 100,
              height: 400 + i * 100,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 25}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-cyan-400 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-25 animate-pulse" />
      </motion.div>
    </div>
  );
};

// ENHANCED Section Transition with Repeating Animations
const SectionTransition = ({ children, index, id }: { 
  children: React.ReactNode; 
  index: number; 
  id: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keep intersection observer for navigation active states only
  useEffect(() => {
    // Enhanced intersection observer for navigation state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          
          if (entry.isIntersecting && ratio > 0.05) {
            console.log(`SECTION ${id}: In view for navigation (ratio: ${ratio.toFixed(3)})`);
          }
        });
      },
      {
        threshold: [0, 0.05, 0.1, 0.2, 0.3],
        rootMargin: isMobile ? '150px' : '100px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [id, isMobile]);

  // Animation variants for different sections
  const getAnimationProps = () => {
    const baseDelay = index * 0.1;
    const slideDistance = isMobile ? 30 : 50;

    switch (id) {
      case 'hero':
        return {
          initial: { opacity: 0, y: slideDistance, scale: 0.95 },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          transition: { 
            duration: 0.8, 
            delay: baseDelay,
            ease: [0.21, 1.11, 0.81, 0.99],
            type: "spring",
            stiffness: 100
          }
        };
      
      case 'about':
        return {
          initial: { opacity: 0, y: slideDistance, rotateX: 10 },
          whileInView: { opacity: 1, y: 0, rotateX: 0 },
          transition: { 
            duration: 0.9, 
            delay: baseDelay,
            ease: [0.23, 1, 0.320, 1]
          }
        };
      
      case 'work':
        return {
          initial: { opacity: 0, y: slideDistance, x: -20 },
          whileInView: { opacity: 1, y: 0, x: 0 },
          transition: { 
            duration: 0.8, 
            delay: baseDelay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        };
      
      case 'skills':
        return {
          initial: { opacity: 0, y: slideDistance, scale: 0.9 },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          transition: { 
            duration: 0.9, 
            delay: baseDelay,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 80
          }
        };
      
      case 'case-studies':
        return {
          initial: { opacity: 0, y: slideDistance, x: 20, scale: 0.95 },
          whileInView: { opacity: 1, y: 0, x: 0, scale: 1 },
          transition: { 
            duration: 1.2, 
            delay: baseDelay,
            ease: [0.21, 1.11, 0.81, 0.99],
            type: "spring",
            stiffness: 80
          }
        };
      
      case 'contact':
        return {
          initial: { opacity: 0, y: slideDistance, scale: 0.95, rotateY: 5 },
          whileInView: { opacity: 1, y: 0, scale: 1, rotateY: 0 },
          transition: { 
            duration: 1, 
            delay: baseDelay,
            ease: [0.19, 1, 0.22, 1]
          }
        };
      
      default:
        return {
          initial: { opacity: 0, y: slideDistance },
          whileInView: { opacity: 1, y: 0 },
          transition: { 
            duration: 0.8, 
            delay: baseDelay,
            ease: "easeOut"
          }
        };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <motion.div
      ref={sectionRef}
      id={id}
      {...animationProps}
      viewport={{ 
        once: false, // KEY: Animations repeat every time section comes into view
        amount: isMobile ? 0.15 : 0.25, // Trigger when 15-25% visible
        margin: isMobile ? "0px 0px -100px 0px" : "0px 0px -150px 0px" // Earlier trigger
      }}
      style={{
        minHeight: id === 'about' ? '100vh' : 'auto',
      }}
    >
      {children}
    </motion.div>
  );
};

// Main App Component - Simplified
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Simple mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);




  // Initialization
  useEffect(() => {
    console.log('App initializing...');

    // Initialize theme
    const savedTheme = sessionStorage.getItem('macdesigns_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    // Check authentication
    const authenticated = sessionStorage.getItem('macdesigns_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }

    // Mobile scroll fixes
    if (isMobile) {
      document.body.style.touchAction = 'auto';
      document.body.style.overflowY = 'auto';
      document.documentElement.style.touchAction = 'auto';
      document.documentElement.style.overflowY = 'auto';
    }

    // Set loading state
    const timer = setTimeout(() => {
      console.log('Loading complete');
      setIsLoading(false);
    }, isMobile ? 800 : 1200);

    return () => clearTimeout(timer);
  }, [isMobile]);

  const handleAuthenticate = () => {
    console.log('Authentication successful');
    setIsAuthenticated(true);
    sessionStorage.setItem('macdesigns_authenticated', 'true');
  };

  if (isLoading) {
    return (
      <AnimatePresence>
        <EnhancedLoader />
      </AnimatePresence>
    );
  }

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        <PasswordGate onAuthenticated={handleAuthenticate} />
      </AnimatePresence>
    );
  }

  return (
    <motion.div 
      ref={containerRef}
              className={`min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-x-hidden ${
        isMobile ? 'touch-pan-y' : ''
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        WebkitOverflowScrolling: 'touch',
        touchAction: 'auto',
        overflowY: 'auto',
      }}
    >
      {/* Progress Bar */}
      <SimpleProgressBar />

      {/* Background */}
      <SimpleBackground />

      {/* Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.1, 
          ease: "easeOut" 
        }}
      >
        <Navigation />
      </motion.div>

      {/* Main Content with Enhanced Repeating Animations */}
      <main className="relative z-10" style={{ touchAction: 'auto' }}>
        <SectionTransition index={0} id="hero">
          <HeroSection />
        </SectionTransition>

        <SectionTransition index={1} id="about">
          <AboutSection />
        </SectionTransition>

        <SectionTransition index={2} id="work">
          <WorkSection />
        </SectionTransition>

        <SectionTransition index={3} id="skills">
          <SkillsSection />
        </SectionTransition>

        <SectionTransition index={4} id="case-studies">
          <CaseStudiesSection />
        </SectionTransition>

        <SectionTransition index={5} id="contact">
          <ContactSection />
        </SectionTransition>
      </main>

      {/* Footer with Repeating Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] }}
      >
        <Footer />
      </motion.div>
      
      {/* AI Avatar */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.2, 
          type: "spring", 
          stiffness: 100 
        }}
      >
        <AIAvatar />
      </motion.div>

      {/* Toast Notifications */}
      <Toaster />
    </motion.div>
  );
}

// Root App Component
export default function App() {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('App Error:', error, errorInfo);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}