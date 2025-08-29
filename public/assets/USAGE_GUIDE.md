# 🖼️ Local Images Usage Guide

## Quick Start - Replace External Images

### Step 1: Add Your Images
Upload your images to the appropriate folders:
```
/public/assets/images/projects/     ← Project screenshots
/public/assets/images/profile/      ← Your profile photos  
/public/assets/images/backgrounds/  ← Background images
/public/assets/images/icons/        ← Logos and icons
```

### Step 2: Use in Components

#### Option A: Direct Path (Simple)
```tsx
// Instead of external URLs
<img src="https://external-site.com/image.jpg" />

// Use local paths  
<img src="/assets/images/projects/my-project.jpg" />
```

#### Option B: Helper Functions (Recommended)
```tsx
// Import the helpers
import { PROJECT_IMAGES, getProjectImage } from '../utils/imageHelpers';

// Use predefined constants
<img src={PROJECT_IMAGES.securityPlatform} />

// Or generate paths dynamically
<img src={getProjectImage('my-new-project')} />
```

#### Option C: With ImageWithFallback Component (Best)
```tsx
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src="/assets/images/projects/my-project.jpg"
  alt="My Project Screenshot"
  className="w-full h-full object-cover"
/>
```

## 🔄 Migration Examples

### WorkSection Projects
**Before:**
```tsx
thumbnailUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300'
```

**After:**
```tsx
thumbnailUrl: '/assets/images/projects/security-platform.jpg'
// or
thumbnailUrl: PROJECT_IMAGES.securityPlatform
```

## 🚀 Current Working Status
**All Work Section Images Are Now Functional:**
- **Security Platform**: ✅ Using Unsplash fallback (cybersecurity dashboard)
- **Surgical Interface**: ✅ Using surgical-room.png background 
- **AI Pathology**: ✅ Using Unsplash fallback (medical AI interface)

### Using the Surgical Room Background
**Currently Used In:**
- **Surgical Technology Interface Project** - Active thumbnail image

**Available Options:**
```tsx
// Option 1: Direct path
thumbnailUrl: '/assets/images/backgrounds/surgical-room.png'

// Option 2: Using helper constant (CURRENTLY ACTIVE)
import { BACKGROUND_IMAGES } from '../utils/imageHelpers';
thumbnailUrl: BACKGROUND_IMAGES.surgicalRoom

// Option 3: As section background
style={{ backgroundImage: `url(${BACKGROUND_IMAGES.surgicalRoom})` }}

// Option 4: For medical projects specifically
thumbnailUrl: BACKGROUND_IMAGES.surgicalRoom, // ✅ Currently implemented
```

**Implementation Example:**
```tsx
// In WorkSection.tsx - All projects now working
{
  id: 'security-screening-platform',
  thumbnailUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop&q=80', // ✅ Working fallback
},
{
  id: 'surgical-technology-interface',
  thumbnailUrl: BACKGROUND_IMAGES.surgicalRoom, // ✅ High-quality surgical scene
},
{
  id: 'ai-pathology-platform', 
  thumbnailUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop&q=80', // ✅ Working fallback
}
```

### Profile Images
**Before:**
```tsx
<img src="https://external-site.com/profile.jpg" />
```

**After:**
```tsx
<ImageWithFallback 
  src="/assets/images/profile/melissa-hero.jpg"
  alt="Melissa Casole"
  className="rounded-full w-32 h-32"
/>
```

### Background Images
**Before:**
```tsx
style={{ backgroundImage: 'url(https://external-site.com/bg.jpg)' }}
```

**After:**
```tsx
style={{ backgroundImage: 'url(/assets/images/backgrounds/hero-bg.jpg)' }}
```

## 📱 File Naming Convention

```
✅ Good Examples:
- security-platform.jpg
- melissa-profile-hero.jpg  
- surgical-interface-mockup.jpg
- ai-pathology-screenshot.jpg

❌ Avoid:
- Image1.JPG (use lowercase)
- my image file.jpg (no spaces)
- veryLongFileNameThatIsHardToRead.jpg (use hyphens)
```

## 🎯 Recommended Image Sizes

```
Project Thumbnails:    400x300px  (4:3 ratio)
Profile Photos:        400x400px  (1:1 ratio)  
Hero Backgrounds:      1200x800px (3:2 ratio)
Section Backgrounds:   1920x1080px (16:9 ratio)
Icons/Logos:          SVG or 200x200px PNG
```

## 🚀 Performance Tips

1. **Optimize before uploading:**
   - Use tools like TinyPNG or ImageOptim
   - Target under 200KB for project images
   - Target under 500KB for backgrounds

2. **Use appropriate formats:**
   - JPEG for photos
   - PNG for graphics with transparency
   - SVG for logos and simple graphics
   - WebP for modern browsers (optional)

3. **Preload critical images:**
   ```tsx
   import { preloadImages } from '../utils/imageHelpers';
   
   useEffect(() => {
     preloadImages([
       '/assets/images/projects/security-platform.jpg',
       '/assets/images/profile/melissa-hero.jpg'
     ]);
   }, []);
   ```

## 🔧 Testing Your Images

1. **Direct URL test:**
   Visit: `http://localhost:3000/assets/images/projects/your-image.jpg`

2. **Component test:**
   Check browser DevTools Network tab to see if images load

3. **Mobile test:**
   Verify images display correctly on different screen sizes

## ⚡ Quick Commands

```bash
# Create all directories at once (if needed)
mkdir -p public/assets/images/{projects,profile,backgrounds,icons,placeholders}

# Optimize images (if you have imagemagick)
magick your-image.jpg -quality 85 -resize 400x300^ optimized-image.jpg
```

## 🆘 Troubleshooting

**Image not showing?**
1. Check file path spelling
2. Verify file exists in `/public/assets/images/`
3. Check browser DevTools Console for 404 errors
4. Ensure correct file extension (.jpg vs .jpeg)

**Slow loading?**
1. Compress images before uploading
2. Use appropriate file formats
3. Consider lazy loading for non-critical images

**Need fallbacks?**
```tsx
<ImageWithFallback 
  src="/assets/images/projects/my-project.jpg"
  fallbackSrc="https://via.placeholder.com/400x300"
  alt="My Project"
/>
```