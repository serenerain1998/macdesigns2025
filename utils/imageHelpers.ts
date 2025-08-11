/**
 * Image Helper Utilities for MAC Designs Portfolio
 * Centralized image path management and optimization
 */

// Base paths for different image categories
const IMAGE_PATHS = {
  projects: '/assets/images/projects',
  profile: '/assets/images/profile', 
  backgrounds: '/assets/images/backgrounds',
  icons: '/assets/images/icons',
  placeholders: '/assets/images/placeholders',
} as const;

// Image file extensions
type ImageExtension = 'jpg' | 'jpeg' | 'png' | 'webp' | 'svg';

/**
 * Get the full path for a project image
 */
export const getProjectImage = (filename: string, extension: ImageExtension = 'jpg'): string => {
  return `${IMAGE_PATHS.projects}/${filename}.${extension}`;
};

/**
 * Get the full path for a profile image
 */
export const getProfileImage = (filename: string, extension: ImageExtension = 'jpg'): string => {
  return `${IMAGE_PATHS.profile}/${filename}.${extension}`;
};

/**
 * Get the full path for a background image
 */
export const getBackgroundImage = (filename: string, extension: ImageExtension = 'jpg'): string => {
  return `${IMAGE_PATHS.backgrounds}/${filename}.${extension}`;
};

/**
 * Get the full path for an icon
 */
export const getIcon = (filename: string, extension: ImageExtension = 'svg'): string => {
  return `${IMAGE_PATHS.icons}/${filename}.${extension}`;
};

/**
 * Get the full path for a placeholder image
 */
export const getPlaceholderImage = (filename: string, extension: ImageExtension = 'jpg'): string => {
  return `${IMAGE_PATHS.placeholders}/${filename}.${extension}`;
};

/**
 * Project images mapping for easy reference
 */
export const PROJECT_IMAGES = {
  securityPlatform: getProjectImage('security-platform'),
  surgicalInterface: getProjectImage('surgical-interface'),
  aiPathology: getProjectImage('ai-pathology'),
} as const;

/**
 * Profile images mapping for easy reference
 */
export const PROFILE_IMAGES = {
  hero: getProfileImage('melissa-hero'),
  about: getProfileImage('melissa-about'),
  professional: getProfileImage('melissa-professional'),
} as const;

/**
 * Background images mapping for easy reference
 */
export const BACKGROUND_IMAGES = {
  hero: getBackgroundImage('hero-background'),
  sectionTexture: getBackgroundImage('section-texture'),
  patternOverlay: getBackgroundImage('pattern-overlay', 'png'),
  surgicalRoom: getBackgroundImage('surgical-room', 'png'),
} as const;

/**
 * Icon mapping for easy reference
 */
export const ICONS = {
  logo: getIcon('mac-designs-logo'),
  brandSymbol: getIcon('brand-symbol', 'png'),
} as const;

/**
 * Fallback/placeholder images for development
 */
export const FALLBACK_IMAGES = {
  project: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&q=80',
  profile: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&q=80',
  background: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1200&h=800&fit=crop&q=80',
} as const;

/**
 * Check if running in development mode to show fallbacks
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Get image with fallback for development
 */
export const getImageWithFallback = (
  localPath: string, 
  fallbackUrl: string
): string => {
  // In production, always use local images
  // In development, you can choose to use fallbacks if local images aren't ready
  return localPath;
};

/**
 * Image optimization utility
 * Returns different image formats based on browser support
 */
export const getOptimizedImage = (
  basePath: string, 
  formats: ImageExtension[] = ['webp', 'jpg']
): string => {
  // For now, return the first format
  // This can be enhanced with browser detection
  const extension = formats[0];
  return basePath.includes('.') ? basePath : `${basePath}.${extension}`;
};

/**
 * Preload critical images for better performance
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 */
export const preloadImages = (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(preloadImage));
};