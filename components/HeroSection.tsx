import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Zap, Target, Award } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

// React Bits Floating Orb Component
const FloatingOrb = ({ size, color, delay, duration, position }: {
  size: number;
  color: string;
  delay: number;
  duration: number;
  position: { x: string; y: string };
}) => {
  return (
    <motion.div
      className={`absolute ${color} rounded-full blur-xl opacity-20`}
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -15, 0],
        scale: [1, 1.2, 0.8, 1],
        opacity: [0.2, 0.4, 0.1, 0.2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

// Morphing Text Component
const MorphingText = ({ words, className }: { words: string[]; className?: string }) => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <motion.span
      key={currentWord}
      className={className}
      initial={{ y: 20, opacity: 0, rotateX: 90 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      exit={{ y: -20, opacity: 0, rotateX: -90 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {words[currentWord]}
    </motion.span>
  );
};

// Enhanced Stats Component
const AnimatedStat = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center group cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <motion.div 
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
        {label}
      </div>
      
      {/* Hover effect particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
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
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// Particle System Component
const ParticleSystem = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Parallax transforms
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  // Spring animations
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      (container as HTMLElement).addEventListener('mousemove', handleMouseMove);
      return () => (container as HTMLElement).removeEventListener('mousemove', handleMouseMove);
    }
    return undefined;
  }, []);

  const morphingWords = ['Designer', 'Strategist', 'Innovator', 'Leader'];

  return (
    <motion.section 
      ref={containerRef}
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      style={{ y: springY, opacity, scale: springScale }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <FloatingOrb
          size={300}
          color="bg-gradient-to-r from-cyan-400/20 to-blue-400/20"
          delay={0}
          duration={8}
          position={{ x: "10%", y: "20%" }}
        />
        <FloatingOrb
          size={200}
          color="bg-gradient-to-r from-blue-400/15 to-indigo-400/15"
          delay={2}
          duration={10}
          position={{ x: "80%", y: "60%" }}
        />
        <FloatingOrb
          size={150}
          color="bg-gradient-to-r from-indigo-400/10 to-purple-400/10"
          delay={4}
          duration={12}
          position={{ x: "60%", y: "10%" }}
        />

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-200/30 dark:border-cyan-700/30 rounded-lg"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Particle System */}
      <ParticleSystem />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Animated Badge */}
        <motion.div
          className="inline-flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-cyan-500" />
          </motion.div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            20+ Years of Psychologix
          </span>
        </motion.div>

        {/* Hero Title with Morphing Text */}
        <motion.div 
          className="mb-8"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
          >
            <motion.span 
              className="block text-gray-900 dark:text-white mb-2"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(6, 182, 212, 0)",
                  "0 0 20px rgba(6, 182, 212, 0.3)",
                  "0 0 0px rgba(6, 182, 212, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Hi, I'm Melissa
            </motion.span>
            
            <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              UX{' '}
              <MorphingText 
                words={morphingWords}
                className="inline-block"
              />
            </span>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Transforming complex problems into{' '}
            <motion.span 
              className="text-cyan-600 dark:text-cyan-400 font-semibold"
              animate={{ color: ["#0891b2", "#3b82f6", "#0891b2"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              intuitive experiences
            </motion.span>{' '}
            that delight users and drive business results.
          </motion.p>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {/* Download Resume Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg"
              disabled={isDownloading}
              onClick={async () => {
                try {
                  setIsDownloading(true);
                  toast.success('Starting download...', {
                    description: 'Your PDF resume is being prepared for download.',
                    duration: 3000,
                  });
                  
                  // Create a temporary link element to trigger download
                  const link = document.createElement('a');
                  link.href = '/Melissa_Casole_UXResume2025.pdf';
                  link.download = 'Melissa_Casole_UXResume2025.pdf';
                  
                  // Append to body, click, and remove
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  
                  // Show success toast and reset loading state
                  setTimeout(() => {
                    setIsDownloading(false);
                    toast.success('Download complete!', {
                      description: 'Your PDF resume has been downloaded successfully.',
                      duration: 4000,
                    });
                  }, 1000);
                } catch (error) {
                  console.error('Download failed:', error);
                  setIsDownloading(false);
                  toast.error('Download failed', {
                    description: 'There was an issue downloading your PDF resume. Please try again.',
                    duration: 5000,
                  });
                }
              }}
              className="relative group border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-cyan-500 dark:hover:border-cyan-400 px-8 py-4 rounded-full text-lg font-semibold overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center">
                {isDownloading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Download size={20} />
                    </motion.div>
                    <span className="animate-pulse">Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download size={20} className="mr-2" />
                    Download Resume
                  </>
                )}
              </span>
              
              {/* Hover background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>

          {/* View Dribbble Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                window.open('https://dribbble.com/melissacasole', '_blank');
              }}
              className="relative group border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-cyan-500 dark:hover:border-cyan-400 px-8 py-4 rounded-full text-lg font-semibold overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center">
                <img 
                  src="/social/dribbble.svg" 
                  alt="Dribbble" 
                  className="w-5 h-5 mr-2"
                />
                View my Dribbble
              </span>
              
              {/* Hover background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <AnimatedStat value="20+" label="Years Experience" delay={0} />
          <AnimatedStat value="25+" label="Designers Mentored" delay={0.2} />
          <AnimatedStat value="5+" label="Design Systems Created" delay={0.4} />
          <AnimatedStat value="10+" label="Cross-functional Teams Led" delay={0.6} />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">Scroll to explore</span>
            <motion.div 
              className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full p-1"
              whileHover={{ borderColor: "#06b6d4" }}
            >
              <motion.div 
                className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mx-auto"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}