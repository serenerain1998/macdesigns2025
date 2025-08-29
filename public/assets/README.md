# MAC Designs - Local Assets Directory

This directory contains all local assets for the MAC Designs portfolio website.

## 📁 Folder Structure

```
/public/assets/
├── images/
│   ├── projects/          # Project thumbnails and screenshots
│   ├── profile/           # Profile photos and personal images
│   ├── backgrounds/       # Background images and textures
│   ├── icons/            # Custom icons and logos
│   └── placeholders/     # Placeholder images for development
├── videos/               # Video files (if needed)
├── documents/            # PDFs, resumes, etc.
└── Melissa_Casole_UX_Resume.pdf  # Resume file (required)
```

## 🖼️ How to Reference Images in React Components

### Basic Image Reference
```tsx
// For images in /public/assets/images/
<img src="/assets/images/your-image.jpg" alt="Description" />

// Using ImageWithFallback component (recommended)
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src="/assets/images/your-image.jpg" 
  alt="Description"
  className="w-full h-full object-cover"
/>
```

### Project Images Example
```tsx
// In WorkSection.tsx - replace external URLs with:
{
  id: 'security-screening-platform',
  title: 'Security Screening Platform',
  thumbnailUrl: '/assets/images/projects/security-platform.jpg',
  // ... other properties
}
```

### Profile Images Example
```tsx
// In AboutSection.tsx or HeroSection.tsx
<ImageWithFallback 
  src="/assets/images/profile/melissa-hero.jpg" 
  alt="Melissa Casole - UX Designer"
  className="rounded-full w-32 h-32 object-cover"
/>
```

## 🎯 Image Optimization Guidelines

### Recommended Sizes
- **Project Thumbnails**: 400x300px (4:3 ratio) - for WorkSection cards
- **Profile Photos**: 400x400px (1:1 ratio) - for AboutSection
- **Hero Images**: 1200x800px (3:2 ratio) - for HeroSection backgrounds
- **Background Images**: 1920x1080px (16:9 ratio) - for section backgrounds

### File Formats
- **Photos**: Use JPEG for photographs (.jpg) - smaller file size
- **Graphics/Icons**: Use PNG for transparency (.png) - crisp edges
- **Modern Browsers**: Use WebP for better compression (.webp) - best quality/size

### File Naming Convention
- Use lowercase with hyphens: `project-name.jpg`
- Be descriptive: `melissa-profile-photo.jpg`
- Include size if multiple versions: `hero-bg-1920x1080.jpg`

## 🔄 Current External Images to Replace

Replace these external Unsplash URLs with local images in `/components/WorkSection.tsx`:

1. **Security Screening Platform**: 
   - **Current**: `https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop&q=80`
   - **Replace with**: `/assets/images/projects/security-platform.jpg`
   - **Subject**: Technology/software interface

2. **Surgical Technology Interface**: 
   - **Current**: `https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&q=80`
   - **Replace with**: `/assets/images/projects/surgical-interface.jpg`
   - **Subject**: Medical technology/operating room

3. **AI Pathology Platform**: 
   - **Current**: `https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop&q=80`
   - **Replace with**: `/assets/images/projects/ai-pathology.jpg`
   - **Subject**: Surgical room with medical cameras

## 📄 Resume Download Setup

### Required File:
- **Filename:** `Melissa_Casole_UX_Resume.pdf`
- **Location:** `/public/assets/Melissa_Casole_UX_Resume.pdf`
- **Format:** PDF
- **Recommended Size:** Under 5MB for optimal download speed

### File Requirements:
1. **Name must match exactly:** `Melissa_Casole_UX_Resume.pdf`
2. **Place in this directory:** `/public/assets/`
3. **Ensure it's accessible:** Test by visiting `/assets/Melissa_Casole_UX_Resume.pdf` in your browser

### Download Functionality:
- ✅ **File exists:** Downloads automatically with proper filename
- ❌ **File missing:** Shows friendly error with contact information
- 🔄 **Loading state:** Button displays spinner during download
- 📱 **Cross-platform:** Works on desktop, mobile, and all browsers

## 🚀 Step-by-Step Setup

1. **Create the folder structure** (if not exists):
   ```
   /public/assets/images/projects/
   /public/assets/images/profile/
   /public/assets/images/backgrounds/
   /public/assets/images/icons/
   ```

2. **Add your images** to the appropriate folders

3. **Update image references** in your React components:
   ```tsx
   // Instead of external URLs, use:
   thumbnailUrl: '/assets/images/projects/your-image.jpg'
   ```

4. **Test the images** by visiting them directly in your browser:
   ```
   http://localhost:3000/assets/images/projects/your-image.jpg
   ```

## 🔧 Alternative Hosting

If hosting images externally (Google Drive, Dropbox, etc.), update the image paths in your components, but local hosting is recommended for:
- ⚡ **Better Performance** - No external dependencies
- 🔒 **Reliability** - Images won't break if external service changes
- 🎨 **Consistent Quality** - Full control over image optimization
- 📱 **Offline Support** - Works in all environments

---

**Note:** This directory structure works with standard React/Next.js public folder conventions. The `/public` folder is served statically, so `/public/assets/images/file.jpg` becomes `/assets/images/file.jpg` in your code.