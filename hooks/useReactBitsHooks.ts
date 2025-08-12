import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useScroll, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

// Safe store access without generics to avoid JSX conflicts
const useSafeStore = (storeHook: () => any, fallback: any) => {
  try {
    return storeHook();
  } catch (error) {
    console.warn('Store access failed, using fallback:', error);
    return fallback;
  }
};

// Enhanced Scroll Progress Hook - FIXED
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001 
  });
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      setProgress(latest);
    });
    
    return unsubscribe;
  }, [smoothProgress]);

  return { 
    progress, 
    scrollYProgress, 
    smoothProgress 
  };
};

// Mouse Tracking Hook - SIMPLIFIED
export const useMouseTracking = () => {
  const [globalPosition, setGlobalPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGlobalPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { globalPosition, isHovering };
};

// Responsive Design Hook - SIMPLIFIED
export const useResponsiveDesign = () => {
  const [breakpoint, setBreakpoint] = useState('desktop');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    const checkMotionPreference = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    checkBreakpoint();
    checkMotionPreference();

    window.addEventListener('resize', checkBreakpoint);
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkMotionPreference);

    return () => {
      window.removeEventListener('resize', checkBreakpoint);
      motionQuery.removeEventListener('change', checkMotionPreference);
    };
  }, []);

  return {
    breakpoint,
    prefersReducedMotion,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  };
};

// Theme Manager Hook - SIMPLIFIED
export const useThemeManager = () => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    sessionStorage.setItem('macdesigns_theme', newTheme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = sessionStorage.getItem('macdesigns_theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return { theme, toggleTheme };
};

// Performance Monitoring Hook - SIMPLIFIED
export const usePerformanceMonitoring = (componentName: string) => {
  const startTime = useRef(0);

  const recordRenderTime = useCallback(() => {
    if (typeof performance !== 'undefined') {
      const endTime = performance.now();
      const renderTime = endTime - startTime.current;
      
      if (renderTime > 16) { // More than one frame
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
      }
    }
  }, [componentName]);

  useEffect(() => {
    if (typeof performance !== 'undefined') {
      startTime.current = performance.now();
    }
  });

  useEffect(() => {
    recordRenderTime();
  });

  return { recordRenderTime };
};

// Animation Orchestrator Hook - SIMPLIFIED WITHOUT STORE DEPENDENCY
export const useAnimationOrchestrator = () => {
  const { prefersReducedMotion } = useResponsiveDesign();
  const [isOptimized, setIsOptimized] = useState(false);

  const shouldAnimate = useMemo(() => {
    return !prefersReducedMotion && !isOptimized;
  }, [prefersReducedMotion, isOptimized]);

  const animationSettings = useMemo(() => ({
    duration: isOptimized ? 0.3 : 0.6,
    ease: "easeOut" as const,
    staggerDelay: isOptimized ? 0.05 : 0.1,
  }), [isOptimized]);

  return {
    shouldAnimate,
    animationSettings,
    isOptimized,
  };
};

// Scroll-based Animation Hook
export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return { elementRef, isVisible };
};

// Loading State Hook
export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  
  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);
  
  return { isLoading, startLoading, stopLoading };
};

// Enhanced Form State Hook
export const useFormState = (initialValues: Record<string, any>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setValue = useCallback((field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const setError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const setTouchedField = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setValue,
    setError,
    setTouched: setTouchedField,
    reset,
  };
};

// Local Storage Hook
export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Debounced Value Hook
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// API Hook with React Query integration
export const useApi = (
  queryKey: string[], 
  queryFn: () => Promise<any>,
  options: { enabled?: boolean; staleTime?: number } = {}
) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { enabled = true, staleTime = 5 * 60 * 1000 } = options;

  useEffect(() => {
    if (!enabled) return;

    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    queryFn()
      .then(result => {
        if (!isCancelled) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (!isCancelled) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [enabled, queryFn]);

  const refetch = useCallback(() => {
    if (!enabled) return Promise.resolve();
    
    setIsLoading(true);
    setError(null);
    
    return queryFn()
      .then(result => {
        setData(result);
        setIsLoading(false);
        return result;
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
        throw err;
      });
  }, [enabled, queryFn]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

// Mutation Hook for data updates
export const useMutation = (mutationFn: (variables: any) => Promise<any>) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (variables: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await mutationFn(variables);
      setData(result);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  }, [mutationFn]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    mutate,
    reset,
  };
};

// Animated In View Hook - For intersection observer animations
export const useAnimatedInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const defaultOptions = {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px',
    ...options,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (defaultOptions.triggerOnce) {
            setHasAnimated(true);
          }
        } else if (!defaultOptions.triggerOnce && !hasAnimated) {
          setIsInView(false);
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.triggerOnce, hasAnimated]);

  return {
    elementRef,
    isInView,
    hasAnimated,
  };
};

// Staggered Animation Hook
export const useStaggeredAnimation = (itemCount: number, delay = 0.1) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger staggered animation
          Array.from({ length: itemCount }, (_, i) => i).forEach((index) => {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * delay * 1000);
          });
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [itemCount, delay]);

  return {
    containerRef,
    visibleItems,
  };
};

// Counter Animation Hook
export const useCounterAnimation = (endValue: number, duration = 2000, startDelay = 0) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const startTime = Date.now() + startDelay;
    const startValue = 0;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }
      
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const newValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCurrentValue(newValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  }, [endValue, duration, startDelay, isAnimating]);

  return {
    currentValue,
    startAnimation,
    isAnimating,
  };
};

// Progress Bar Animation Hook
export const useProgressBarAnimation = (targetProgress: number, duration = 1500, startDelay = 0) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const startTime = Date.now() + startDelay;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }
      
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const newProgress = targetProgress * easeOutCubic;
      
      setCurrentProgress(newProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentProgress(targetProgress);
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  }, [targetProgress, duration, startDelay, isAnimating]);

  return {
    currentProgress,
    startAnimation,
    isAnimating,
  };
};

// Typewriter Effect Hook
export const useTypewriter = (text: string, speed = 50, startDelay = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const startTyping = useCallback(() => {
    if (isTyping) return;
    
    setIsTyping(true);
    setDisplayedText('');
    
    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);
    }, startDelay);
  }, [text, speed, startDelay, isTyping]);

  return {
    displayedText,
    startTyping,
    isTyping,
  };
};