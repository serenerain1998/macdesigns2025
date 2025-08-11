import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Animation state interface
interface AnimationState {
  isLoading: boolean;
  loadingProgress: number;
  sectionsInView: Set<string>;
  currentSection: string;
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  isAnimationPaused: boolean;
  prefersReducedMotion: boolean;
}

// Theme state interface
interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Navigation state interface
interface NavigationState {
  isScrolled: boolean;
  activeSection: string;
  isMobileMenuOpen: boolean;
  setIsScrolled: (scrolled: boolean) => void;
  setActiveSection: (section: string) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

// Authentication state interface
interface AuthState {
  isAuthenticated: boolean;
  authenticate: () => void;
  logout: () => void;
}

// UI interaction state interface
interface UIState {
  hoveredElements: Set<string>;
  expandedCards: Set<string>;
  activeModals: Set<string>;
  notifications: Array<{ id: string; type: 'success' | 'error' | 'info'; message: string; timestamp: number }>;
  setHoveredElement: (id: string, isHovered: boolean) => void;
  toggleCardExpanded: (id: string) => void;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
}

// Combined store interface
interface AppStore extends AnimationState, ThemeState, NavigationState, AuthState, UIState {}

// Main Zustand store with persistence
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Animation state
      isLoading: true,
      loadingProgress: 0,
      sectionsInView: new Set<string>(),
      currentSection: 'hero',
      scrollProgress: 0,
      mousePosition: { x: 0, y: 0 },
      isAnimationPaused: false,
      prefersReducedMotion: false,

      // Theme state
      theme: 'dark',
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // Update DOM class
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: newTheme };
        });
      },

      // Navigation state
      isScrolled: false,
      activeSection: 'hero',
      isMobileMenuOpen: false,
      setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
      setActiveSection: (section) => set({ activeSection: section, currentSection: section }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),

      // Authentication state
      isAuthenticated: false,
      authenticate: () => {
        set({ isAuthenticated: true });
        sessionStorage.setItem('macdesigns_authenticated', 'true');
      },
      logout: () => {
        set({ isAuthenticated: false });
        sessionStorage.removeItem('macdesigns_authenticated');
      },

      // UI interaction state
      hoveredElements: new Set<string>(),
      expandedCards: new Set<string>(),
      activeModals: new Set<string>(),
      notifications: [],
      
      setHoveredElement: (id, isHovered) => {
        set((state) => {
          const newHovered = new Set(state.hoveredElements);
          if (isHovered) {
            newHovered.add(id);
          } else {
            newHovered.delete(id);
          }
          return { hoveredElements: newHovered };
        });
      },

      toggleCardExpanded: (id) => {
        set((state) => {
          const newExpanded = new Set(state.expandedCards);
          if (newExpanded.has(id)) {
            newExpanded.delete(id);
          } else {
            newExpanded.add(id);
          }
          return { expandedCards: newExpanded };
        });
      },

      openModal: (id) => {
        set((state) => ({
          activeModals: new Set([...state.activeModals, id])
        }));
      },

      closeModal: (id) => {
        set((state) => {
          const newModals = new Set(state.activeModals);
          newModals.delete(id);
          return { activeModals: newModals };
        });
      },

      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const timestamp = Date.now();
        set((state) => ({
          notifications: [...state.notifications, { ...notification, id, timestamp }]
        }));
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
          get().removeNotification(id);
        }, 5000);
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }));
      },
    }),
    {
      name: 'mac-designs-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        theme: state.theme,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Animation-specific store for high-frequency updates
export const useAnimationStore = create<{
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  sectionsInView: Set<string>;
  isAnimationPaused: boolean;
  setScrollProgress: (progress: number) => void;
  setMousePosition: (position: { x: number; y: number }) => void;
  addSectionInView: (section: string) => void;
  removeSectionFromView: (section: string) => void;
  toggleAnimationPause: () => void;
}>((set) => ({
  scrollProgress: 0,
  mousePosition: { x: 0, y: 0 },
  sectionsInView: new Set<string>(),
  isAnimationPaused: false,
  
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setMousePosition: (position) => set({ mousePosition: position }),
  
  addSectionInView: (section) => {
    set((state) => ({
      sectionsInView: new Set([...state.sectionsInView, section])
    }));
  },
  
  removeSectionFromView: (section) => {
    set((state) => {
      const newSections = new Set(state.sectionsInView);
      newSections.delete(section);
      return { sectionsInView: newSections };
    });
  },
  
  toggleAnimationPause: () => {
    set((state) => ({ isAnimationPaused: !state.isAnimationPaused }));
  },
}));

// Performance monitoring store
export const usePerformanceStore = create<{
  renderTimes: Map<string, number>;
  animationFPS: number;
  isOptimizedMode: boolean;
  recordRenderTime: (componentName: string, time: number) => void;
  setAnimationFPS: (fps: number) => void;
  toggleOptimizedMode: () => void;
}>((set, get) => ({
  renderTimes: new Map<string, number>(),
  animationFPS: 60,
  isOptimizedMode: false,
  
  recordRenderTime: (componentName, time) => {
    set((state) => {
      const newRenderTimes = new Map(state.renderTimes);
      newRenderTimes.set(componentName, time);
      return { renderTimes: newRenderTimes };
    });
  },
  
  setAnimationFPS: (fps) => set({ animationFPS: fps }),
  
  toggleOptimizedMode: () => {
    set((state) => ({ isOptimizedMode: !state.isOptimizedMode }));
  },
}));