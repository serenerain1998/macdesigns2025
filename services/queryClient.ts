import { QueryClient } from '@tanstack/react-query';

// Create a query client with optimized defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Query keys factory for type safety and consistency
export const queryKeys = {
  all: ['macdesigns'] as const,
  
  // Portfolio content queries
  portfolio: () => [...queryKeys.all, 'portfolio'] as const,
  projects: () => [...queryKeys.portfolio(), 'projects'] as const,
  project: (id: string) => [...queryKeys.projects(), id] as const,
  skills: () => [...queryKeys.portfolio(), 'skills'] as const,
  experience: () => [...queryKeys.portfolio(), 'experience'] as const,
  testimonials: () => [...queryKeys.portfolio(), 'testimonials'] as const,
  
  // Case studies queries
  caseStudies: () => [...queryKeys.all, 'case-studies'] as const,
  caseStudy: (id: string) => [...queryKeys.caseStudies(), id] as const,
  
  // Animation and UI queries
  animations: () => [...queryKeys.all, 'animations'] as const,
  animationPresets: () => [...queryKeys.animations(), 'presets'] as const,
  
  // Analytics and performance
  analytics: () => [...queryKeys.all, 'analytics'] as const,
  performance: () => [...queryKeys.analytics(), 'performance'] as const,
} as const;

// Error handling
export class QueryError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'QueryError';
  }
}

// Generic API response type
export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: number;
}

// Mock API delay for realistic development experience
export const mockApiDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));