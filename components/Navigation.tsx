import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Zap } from 'lucide-react';
import { Button } from './ui/button';


// Enhanced smooth scroll function
const smoothScrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    // Update URL hash
    history.pushState(null, '', `#${sectionId}`);
    
    // Smooth scroll to element
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
    
    console.log(`✅ Smooth scrolling to section: ${sectionId}`, element);
  } else {
    console.warn(`❌ Section not found: ${sectionId}`);
  }
};

// React Bits Navigation Item Component with Smooth Scrolling
const NavigationItem = ({ 
  href, 
  children, 
  isActive, 
  delay = 0,
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  isActive: boolean; 
  delay?: number;
  onClick?: () => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default anchor behavior
    const sectionId = href.replace('#', '');
    smoothScrollToSection(sectionId);
    // Immediately update active section for better UX
    if (onClick) {
      onClick();
    } else {
      // If no custom onClick, update active section directly
      const event = new CustomEvent('sectionChange', { detail: sectionId });
      window.dispatchEvent(event);
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className="relative px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Active indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-100/60 to-blue-50/60 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-50/60 to-blue-50/60 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <span className="relative z-10 font-medium">{children}</span>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: isActive ? "100%" : "0%", 
          opacity: isActive ? 1 : 0 
        }}
        whileHover={{ width: "100%", opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Sparkle effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.a>
  );
};

// Mobile Menu Component with Enhanced Smooth Scrolling
const MobileMenu = ({ 
  isOpen, 
  onClose, 
  activeSection 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  activeSection: string;
}) => {
  const menuItems = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#work', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#case-studies', label: 'Case Studies' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleMobileNavClick = (sectionId: string) => {
    smoothScrollToSection(sectionId);
    onClose(); // Close mobile menu after navigation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-gray-200 dark:border-gray-700 shadow-2xl z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">Menu</span>
              </motion.div>

              <motion.button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Navigation Items */}
            <nav className="p-6 space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleMobileNavClick(item.href.replace('#', ''))}
                  className={`w-full text-left block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 relative overflow-hidden group ${
                    activeSection === item.href.slice(1)
                      ? 'text-cyan-600 dark:text-cyan-400 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <span className="relative z-10">{item.label}</span>

                  {/* Active indicator */}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Footer */}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Handle scroll effects - trigger background sooner for better visibility
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.15; // 15% of viewport height for earlier trigger
      setIsScrolled(latest > triggerPoint);
    });
    return unsubscribe;
  }, [scrollY]);

  // Enhanced active section detection with intersection observer
  useEffect(() => {
    const sections = ['hero', 'about', 'work', 'skills', 'case-studies', 'contact'];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    
    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible in the viewport
        let maxVisibility = 0;
        let mostVisibleSection = '';
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visibilityRatio = entry.intersectionRatio;
            const sectionId = entry.target.id;
            
            // If this section is more visible than the current most visible
            if (visibilityRatio > maxVisibility) {
              maxVisibility = visibilityRatio;
              mostVisibleSection = sectionId;
            }
          }
        });

        // Update active section if we found a visible one
        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-10% 0px -10% 0px' // More responsive detection
      }
    );

    // Observe all sections
    sectionElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Also listen for hash changes and scroll events to update active section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ['hero', 'about', 'work', 'skills', 'case-studies', 'contact'].includes(hash)) {
        setActiveSection(hash);
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Listen for custom section change events
    const handleSectionChange = (event: CustomEvent) => {
      setActiveSection(event.detail);
    };
    window.addEventListener('sectionChange', handleSectionChange as EventListener);
    
    // Add scroll listener as backup for better responsiveness
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sections = ['hero', 'about', 'work', 'skills', 'case-studies', 'contact'];
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('sectionChange', handleSectionChange as EventListener);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigationItems = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#work', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#case-studies', label: 'Case Studies' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-gradient-to-r from-gray-50/95 via-blue-50/90 to-indigo-50/90 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border-b border-gray-200/40 dark:border-cyan-700/30 shadow-xl'
            : 'bg-gray-50/30 dark:bg-gray-900/20 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Smooth Scroll */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScrollToSection('hero')}
            >
              <motion.div
                className="relative w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center overflow-hidden"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-5 h-5 text-white relative z-10" />
                </motion.div>
              </motion.div>

              <div className="flex flex-col">
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  MAC DESIGNS
                </motion.span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  UX + Psychology
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation with Smooth Scrolling */}
            <div className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item, index) => (
                <NavigationItem
                  key={item.href}
                  href={item.href}
                  isActive={activeSection === item.href.slice(1)}
                  delay={index * 0.1}
                >
                  {item.label}
                </NavigationItem>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Contact Button with Smooth Scroll */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="hidden sm:flex bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full px-6 py-2 relative overflow-hidden group"
                  onClick={() => smoothScrollToSection('contact')}
                >
                  {/* Background shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-pulse"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <span className="relative z-10">Let's Talk</span>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced progress indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{
            width: useTransform(scrollY, (latest) => {
              const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
              return `${(latest / maxScroll) * 100}%`;
            }),
          }}
          initial={{ width: "0%" }}
        />
      </motion.nav>

      {/* Mobile Menu with Smooth Scrolling */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}