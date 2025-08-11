import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys, ApiResponse, QueryError, mockApiDelay } from './queryClient';

// Portfolio data types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  year: number;
  status: 'completed' | 'in-progress' | 'concept';
  imageUrl: string;
  thumbnailUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  highlights: string[];
  metrics?: {
    userIncrease?: string;
    performanceImprovement?: string;
    conversionRate?: string;
    timeToMarket?: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  description: string;
  projects: string[];
  yearsOfExperience: number;
  certifications: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  teamSize?: number;
  location: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  duration: string;
  team: string[];
  myRole: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: {
    [key: string]: string;
  };
  images: string[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

// Mock data - In production, this would come from a CMS or API
const mockProjects: Project[] = [
  {
    id: 'first-advantage-design-system',
    title: 'First Advantage Design System',
    description: 'Comprehensive design system for background screening platform',
    longDescription: 'Led the creation of a scalable design system serving 50+ product teams across multiple platforms, resulting in 40% faster development cycles and improved user experience consistency.',
    technologies: ['Figma', 'React', 'TypeScript', 'Storybook', 'Design Tokens'],
    category: 'Design System',
    year: 2023,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&q=80',
    highlights: [
      'Reduced design-to-development time by 40%',
      'Achieved 95% adoption across product teams',
      'Improved accessibility compliance to WCAG 2.1 AA'
    ],
    metrics: {
      userIncrease: '40%',
      performanceImprovement: '25%',
      timeToMarket: '6 weeks'
    }
  },
  {
    id: 'marinemax-pos-interface',
    title: 'MarineMax POS Interface',
    description: 'Modern point-of-sale system for marine retail operations',
    longDescription: 'Redesigned the entire POS experience for the largest recreational boat retailer, focusing on efficiency and ease of use for sales representatives.',
    technologies: ['React', 'Redux', 'Material-UI', 'Node.js', 'PostgreSQL'],
    category: 'Enterprise Software',
    year: 2022,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop&q=80',
    highlights: [
      'Increased transaction speed by 60%',
      'Reduced training time for new employees by 50%',
      'Improved customer satisfaction scores by 35%'
    ],
    metrics: {
      performanceImprovement: '60%',
      userIncrease: '35%',
      conversionRate: '22%'
    }
  },
  {
    id: 'cancer-diagnostic-workflow',
    title: 'Cancer Diagnostic Workflow',
    description: 'AI-powered diagnostic interface for medical professionals',
    longDescription: 'Developed an intuitive interface for cancer diagnostic workflows, integrating AI recommendations with clinical expertise to improve diagnostic accuracy and speed.',
    technologies: ['Vue.js', 'Python', 'TensorFlow', 'D3.js', 'WebRTC'],
    category: 'Healthcare Technology',
    year: 2023,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&q=80',
    highlights: [
      'Improved diagnostic accuracy by 15%',
      'Reduced review time by 45%',
      'Enhanced collaboration between specialists'
    ],
    metrics: {
      performanceImprovement: '45%',
      userIncrease: '15%',
      timeToMarket: '8 months'
    }
  },
  {
    id: 'component-library-ui',
    title: 'Enterprise Component Library',
    description: 'Scalable React component library with comprehensive documentation',
    longDescription: 'Built a comprehensive component library serving multiple enterprise applications, featuring over 100 reusable components with full TypeScript support and automated testing.',
    technologies: ['React', 'TypeScript', 'Storybook', 'Jest', 'Chromatic'],
    category: 'Design System',
    year: 2023,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80',
    highlights: [
      'Delivered 100+ production-ready components',
      'Achieved 99.8% component test coverage',
      'Reduced bug reports by 65% across applications'
    ],
    metrics: {
      performanceImprovement: '50%',
      userIncrease: '30%',
      timeToMarket: '12 weeks'
    }
  },
  {
    id: 'mobile-design-patterns',
    title: 'Mobile Design Patterns',
    description: 'Cross-platform mobile design system and interaction patterns',
    longDescription: 'Created a unified mobile design system spanning iOS and Android platforms, featuring adaptive components and consistent interaction patterns across all touchpoints.',
    technologies: ['Figma', 'Sketch', 'Principle', 'Swift', 'Kotlin'],
    category: 'Mobile UX',
    year: 2022,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&q=80',
    highlights: [
      'Unified experience across iOS and Android',
      'Improved user engagement by 45%',
      'Reduced development inconsistencies by 70%'
    ],
    metrics: {
      userIncrease: '45%',
      performanceImprovement: '35%',
      conversionRate: '28%'
    }
  },
  {
    id: 'accessibility-framework',
    title: 'Accessibility Framework',
    description: 'WCAG 2.2 AA compliant design and development standards',
    longDescription: 'Established comprehensive accessibility guidelines and automated testing framework to ensure all products meet WCAG 2.2 AA standards, improving usability for all users.',
    technologies: ['axe-core', 'WAVE', 'VoiceOver', 'JAWS', 'Color Oracle'],
    category: 'Accessibility',
    year: 2023,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop&q=80',
    highlights: [
      'Achieved WCAG 2.2 AA compliance across all products',
      'Increased screen reader compatibility by 90%',
      'Reduced accessibility violations by 85%'
    ],
    metrics: {
      performanceImprovement: '90%',
      userIncrease: '25%',
      timeToMarket: '16 weeks'
    }
  }
];

const mockSkills: Skill[] = [
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design Tools',
    level: 98,
    description: 'Advanced prototyping and design system creation',
    projects: ['first-advantage-design-system', 'marinemax-pos-interface'],
    yearsOfExperience: 5,
    certifications: ['Figma Professional Certification']
  },
  {
    id: 'react',
    name: 'React',
    category: 'Development',
    level: 92,
    description: 'Modern React development with hooks and state management',
    projects: ['first-advantage-design-system', 'marinemax-pos-interface'],
    yearsOfExperience: 6,
    certifications: ['React Professional Developer']
  },
  {
    id: 'ux-research',
    name: 'UX Research',
    category: 'Research',
    level: 94,
    description: 'User testing methodologies and analysis',
    projects: ['cancer-diagnostic-workflow', 'marinemax-pos-interface'],
    yearsOfExperience: 15,
    certifications: ['Certified Usability Analyst (CUA)']
  }
];

const mockExperience: Experience[] = [
  {
    id: 'ux-director',
    company: 'First Advantage',
    position: 'Director of UX',
    startDate: '2020-03',
    description: 'Led UX strategy and design system implementation across multiple product lines',
    achievements: [
      'Established design system used by 50+ teams',
      'Improved user satisfaction by 40%',
      'Reduced development time by 30%'
    ],
    technologies: ['Figma', 'React', 'Design Systems', 'User Research'],
    teamSize: 12,
    location: 'Remote'
  }
];

const mockCaseStudies: CaseStudy[] = [
  {
    id: 'design-system-transformation',
    title: 'Design System Transformation',
    subtitle: 'Building scalable design foundations',
    client: 'First Advantage',
    duration: '18 months',
    team: ['UX Director', 'Senior Designers (3)', 'Front-end Engineers (4)'],
    myRole: 'UX Director & Design System Lead',
    challenge: 'Inconsistent user experiences across 15+ products, slow development cycles, and lack of design standards',
    solution: 'Comprehensive design system with reusable components, design tokens, and clear governance model',
    outcome: 'Unified user experience, 40% faster development, and improved accessibility compliance',
    metrics: {
      'Development Speed': '+40%',
      'Design Consistency': '+85%',
      'Accessibility Score': '95%',
      'Team Adoption': '100%'
    },
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop&q=80'
    ],
    technologies: ['Figma', 'React', 'TypeScript', 'Storybook'],
    testimonial: {
      quote: "Melissa's leadership in creating our design system has been transformational for our product organization.",
      author: 'John Smith',
      position: 'VP of Product'
    }
  }
];

// API service functions with error handling
class PortfolioService {
  async getProjects(): Promise<Project[]> {
    await mockApiDelay(800);
    
    // Simulate potential API errors
    if (Math.random() < 0.05) {
      throw new QueryError('Failed to fetch projects', 500);
    }
    
    return mockProjects;
  }

  async getProject(id: string): Promise<Project> {
    await mockApiDelay(300);
    
    const project = mockProjects.find(p => p.id === id);
    if (!project) {
      throw new QueryError(`Project with id ${id} not found`, 404);
    }
    
    return project;
  }

  async getSkills(): Promise<Skill[]> {
    await mockApiDelay(600);
    return mockSkills;
  }

  async getExperience(): Promise<Experience[]> {
    await mockApiDelay(500);
    return mockExperience;
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    await mockApiDelay(700);
    return mockCaseStudies;
  }

  async getCaseStudy(id: string): Promise<CaseStudy> {
    await mockApiDelay(400);
    
    const caseStudy = mockCaseStudies.find(cs => cs.id === id);
    if (!caseStudy) {
      throw new QueryError(`Case study with id ${id} not found`, 404);
    }
    
    return caseStudy;
  }

  // Analytics and performance tracking
  async trackInteraction(event: string, data: Record<string, any>): Promise<void> {
    await mockApiDelay(100);
    console.log('Analytics tracked:', event, data);
  }
}

const portfolioService = new PortfolioService();

// Custom hooks using TanStack Query
export const useProjects = () => {
  return useQuery({
    queryKey: queryKeys.projects(),
    queryFn: () => portfolioService.getProjects(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: queryKeys.project(id),
    queryFn: () => portfolioService.getProject(id),
    enabled: !!id,
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: queryKeys.skills(),
    queryFn: () => portfolioService.getSkills(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useExperience = () => {
  return useQuery({
    queryKey: queryKeys.experience(),
    queryFn: () => portfolioService.getExperience(),
    staleTime: 15 * 60 * 1000,
  });
};

export const useCaseStudies = () => {
  return useQuery({
    queryKey: queryKeys.caseStudies(),
    queryFn: () => portfolioService.getCaseStudies(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useCaseStudy = (id: string) => {
  return useQuery({
    queryKey: queryKeys.caseStudy(id),
    queryFn: () => portfolioService.getCaseStudy(id),
    enabled: !!id,
  });
};

// Mutations for interactive features
export const useTrackInteraction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ event, data }: { event: string; data: Record<string, any> }) =>
      portfolioService.trackInteraction(event, data),
    onSuccess: () => {
      // Optionally invalidate analytics queries
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics() });
    },
  });
};

// Prefetch utilities for smooth navigation
export const usePrefetchProject = () => {
  const queryClient = useQueryClient();
  
  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.project(id),
      queryFn: () => portfolioService.getProject(id),
      staleTime: 5 * 60 * 1000,
    });
  };
};