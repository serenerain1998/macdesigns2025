import { ArrowUp, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button when user has scrolled more than 50% of the page
      const shouldShow = scrollY > (documentHeight - windowHeight) * 0.5;
      setShowScrollTop(shouldShow);
      
      // Debug scroll position
      if (scrollY > 100) {
        console.log('Scroll position:', scrollY, 'Should show button:', shouldShow);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    try {
      console.log('Scroll to top clicked, current scroll position:', window.scrollY);
      
      // Try multiple scroll methods for maximum compatibility
      
      // Method 1: Smooth scroll to top
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
        console.log('Method 1: Smooth scroll');
      }
      
      // Method 2: Scroll to top of document
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0; // For Safari
      console.log('Method 2: Direct scrollTop');
      
      // Method 3: Window scroll
      window.scrollTo(0, 0);
      console.log('Method 3: Window scroll');
      
      // Method 4: Scroll into view for body
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('Method 4: Scroll into view');
      
      // Method 5: Fallback with timeout
      setTimeout(() => {
        if (window.scrollY > 0) {
          console.log('Fallback scroll triggered');
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      }, 200);
      
    } catch (error) {
      console.error('Scroll error:', error);
      // Final fallback to instant scroll
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center text-2xl font-bold">
              <span className="text-white">MAC </span>
              <span className="text-gradient">DESIGNS</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Crafting exceptional user experiences through human-centered design, emerging technologies, and strategic thinking.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Mac Designs. All Rights Reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Designed and built with passion for great UX
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => window.open('https://www.linkedin.com/in/melissacasole/', '_blank')}
            >
              <Linkedin size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => window.open('mailto:melissa.casole@yahoo.com', '_blank')}
            >
              <Mail size={20} />
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            Built with React, Tailwind CSS, and thoughtful UX principles
          </div>
          
          <Button 
            onClick={scrollToTop}
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-800 mt-4 md:mt-0 transition-all duration-300 hover:scale-105 group"
            title="Scroll to top of page"
          >
            <span className="group-hover:translate-y-[-2px] transition-transform duration-300">
              Back to Top
            </span>
            <ArrowUp className="ml-2 size-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
      
      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          variant="ghost"
          size="icon"
          className="fixed bottom-8 right-8 z-50 bg-gray-800/90 dark:bg-gray-900/90 hover:bg-gray-700 dark:hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-in fade-in slide-in-from-bottom-2"
          title="Scroll to top of page"
        >
          <ArrowUp className="size-5" />
        </Button>
      )}
    </footer>
  );
}