import { useEffect, useRef } from 'react';

interface SecurityMiddlewareProps {
  children: React.ReactNode;
}

export function SecurityMiddleware({ children }: SecurityMiddlewareProps) {
  const securityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Block right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      console.warn('🔒 SECURITY: Right-click blocked');
      return false;
    };

    // Block keyboard shortcuts for developer tools
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        console.warn('🔒 SECURITY: Developer tools shortcut blocked');
        return false;
      }
    };

    // Block text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Block drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Block copy operations
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      console.warn('🔒 SECURITY: Copy operation blocked');
      return false;
    };

    // Block cut operations
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      console.warn('🔒 SECURITY: Cut operation blocked');
      return false;
    };

    // Detect developer tools
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        console.warn('🔒 SECURITY: Developer tools detected');
        // You could implement additional measures here
        // such as redirecting or showing a warning
      }
    };

    // Block view source
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        console.warn('🔒 SECURITY: View source blocked');
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);

    // Monitor for developer tools
    const devToolsInterval = setInterval(detectDevTools, 1000);

    // Block iframe embedding
    if (window.self !== window.top) {
      console.warn('🔒 SECURITY: Site embedding detected');
      window.top.location.href = window.self.location.href;
    }

    // Disable console logging in production (optional)
    if (process.env.NODE_ENV === 'production') {
      // Override console methods to prevent information leakage
      const originalConsole = { ...console };
      console.log = () => {};
      console.info = () => {};
      console.warn = () => {};
      console.error = () => {};
      
      // Restore console for security warnings
      console.warn = originalConsole.warn;
    }

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      clearInterval(devToolsInterval);
    };
  }, []);

  // Additional security measures
  useEffect(() => {
    // Disable text selection globally
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';

    // Disable image dragging
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.draggable = false;
      img.style.pointerEvents = 'none';
    });

    // Add security headers meta tags
    const securityMeta = document.createElement('meta');
    securityMeta.setAttribute('http-equiv', 'Content-Security-Policy');
    securityMeta.setAttribute('content', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
    
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      document.head.appendChild(securityMeta);
    }

    return () => {
      // Restore user selection
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.mozUserSelect = '';
      document.body.style.msUserSelect = '';
    };
  }, []);

  return (
    <div 
      ref={securityRef}
      className="security-protected"
      style={{
        // Additional CSS security measures
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        // Prevent text selection
        WebkitTapHighlightColor: 'transparent',
        // Disable image dragging
        WebkitUserDrag: 'none',
        KhtmlUserDrag: 'none',
        MozUserDrag: 'none',
        OUserDrag: 'none',
        userDrag: 'none',
      }}
    >
      {children}
    </div>
  );
}
