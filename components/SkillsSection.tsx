import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Badge } from './ui/badge';
import { 
  Code, Palette, Users, Brain, Zap, Target, Award, 
  Play, Eye, Lightbulb, Layers, 
  Smartphone, Globe, Shield, Heart, Calendar, TrendingUp,
  Star, Sparkles, MousePointer, ArrowRight, Plus, Minus
} from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  level: number;
  category: string;
  description: string;
  projects: string[];
}

const skillCategories = [
  {
    name: 'Design Tools',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    description: 'Advanced proficiency in industry-standard design software',
    skills: [
      { name: 'Figma', level: 98, description: 'Advanced prototyping and design system creation', projects: ['First Advantage Design System', 'MarineMax POS Interface'] },
      { name: 'Sketch', level: 85, description: 'Vector design and interface creation', projects: ['Legacy Design Systems', 'Brand Identity Work'] },
      { name: 'Photoshop', level: 90, description: 'Image editing and visual design', projects: ['Marketing Materials', 'UI Asset Creation'] }
    ]
  },
  {
    name: 'AI Tools',
    icon: Sparkles,
    color: 'from-cyan-500 to-blue-500',
    description: 'Cutting-edge AI-powered design and development workflows',
    skills: [
      { name: 'Figma Make', level: 95, description: 'AI-powered design and development workflows', projects: ['Rapid Prototyping', 'Design-to-Code Automation'] },
      { name: 'Lovable', level: 92, description: 'AI-driven development and rapid prototyping', projects: ['Full-Stack Applications', 'MVP Development'] },
      { name: 'Cursor', level: 88, description: 'AI-powered code editor and development assistant', projects: ['Enhanced Coding Workflows', 'Smart Code Generation'] }
    ]
  },
  {
    name: 'Prototyping',
    icon: Play,
    color: 'from-green-500 to-teal-500',
    description: 'Interactive prototyping for complex user experiences',
    skills: [
      { name: 'Figma Make', level: 96, description: 'Interactive prototyping and user flows', projects: ['Complex User Journeys', 'Interactive Demos'] },
      { name: 'Lovable', level: 90, description: 'Rapid functional prototyping with real code', projects: ['Working MVPs', 'Functional Prototypes'] },
      { name: 'ProtoPie', level: 92, description: 'Advanced interactive prototyping for complex interactions', projects: ['Medical Device Interfaces', 'IoT Dashboard Prototypes'] }
    ]
  },
  {
    name: 'Strategy',
    icon: Layers,
    color: 'from-indigo-500 to-purple-500',
    description: 'Strategic design thinking and system architecture',
    skills: [
      { name: 'Design Systems', level: 96, description: 'Scalable design system architecture and governance', projects: ['First Advantage System', 'MarineMax Standards'] },
      { name: 'Front-End Tech', level: 88, description: 'Technical implementation strategy and architecture', projects: ['React Component Libraries', 'Angular Systems'] }
    ]
  },
  {
    name: 'Research',
    icon: Eye,
    color: 'from-orange-500 to-red-500',
    description: 'User research methodologies and data-driven insights',
    skills: [
      { name: 'Usability Testing', level: 94, description: 'User testing methodologies and analysis', projects: ['Cancer Diagnostic Workflows', 'Retail POS Studies'] },
      { name: 'Field Journals', level: 85, description: 'Ethnographic research and field studies', projects: ['Medical Professional Workflows', 'Retail Environment Studies'] },
      { name: 'Journey Mapping', level: 92, description: 'User journey analysis and story mapping techniques', projects: ['Customer Experience Maps', 'Service Design Blueprints'] }
    ]
  },
  {
    name: 'Emerging Tech',
    icon: Brain,
    color: 'from-violet-500 to-purple-500',
    description: 'Next-generation technology integration and UX',
    skills: [
      { name: 'AI/ML', level: 88, description: 'Designing interfaces for AI/ML systems', projects: ['Cancer Diagnostics AI', 'Dynamic Ad Generation'] },
      { name: 'Rive', level: 82, description: 'Interactive animation and motion design', projects: ['Animated UI Components', 'Interactive Illustrations'] },
      { name: 'Spline', level: 78, description: '3D design and interactive experiences', projects: ['3D Product Visualizations', 'Immersive Interfaces'] }
    ]
  },
  {
    name: 'Leadership',
    icon: Users,
    color: 'from-emerald-500 to-green-500',
    description: 'Team leadership and cross-functional collaboration',
    skills: [
      { name: 'Collaboration', level: 96, description: 'Cross-functional team leadership and coordination', projects: ['Multi-Team Initiatives', 'Stakeholder Alignment'] },
      { name: 'Communication', level: 94, description: 'Effective design communication and presentation', projects: ['Executive Presentations', 'Design Advocacy'] },
      { name: 'Creativity', level: 98, description: 'Creative problem-solving and innovative thinking', projects: ['Design Innovation', 'Creative Solutions'] },
      { name: 'Innovation', level: 92, description: 'Driving innovation and new design approaches', projects: ['Process Innovation', 'Technology Adoption'] }
    ]
  }
];

const certifications = [
  'Certified Usability Analyst (CUA)',
  'Google Analytics Certified',
  'Agile & Scrum Master Certified',
  'Accessibility (WCAG 2.1) Certified',
  'Human-Computer Interaction Specialist'
];

const uxInsights = [
  {
    title: 'Gestalt Principles',
    message: 'Notice how related skills are grouped together? This uses the Gestalt principle of proximity to reduce cognitive load.',
    icon: Brain,
    color: 'text-purple-500'
  },
  {
    title: 'Progressive Disclosure',
    message: 'Information is revealed gradually to prevent overwhelming users - a key UX principle for complex interfaces.',
    icon: Eye,
    color: 'text-blue-500'
  },
  {
    title: 'Fitts\'s Law',
    message: 'Larger, closer targets are easier to interact with - that\'s why category cards are prominently sized.',
    icon: MousePointer,
    color: 'text-green-500'
  }
];

// Tilted Card Component with React Bits style
const TiltedCard = ({ children, category, index }: { children: React.ReactNode; category: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.21, 1.11, 0.81, 0.99] }}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative h-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

// Enhanced Progress Ring Component with Scroll-Triggered Animation
const ProgressRing = ({ percentage, color, delay = 0, isInView = false }: { 
  percentage: number; 
  color: string; 
  delay?: number;
  isInView?: boolean;
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  
  // Counter animation effect - animates from 0 to percentage when in view
  useEffect(() => {
    if (!isInView) {
      setAnimatedPercentage(0);
      return;
    }
    
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = percentage / (duration / 16); // 60fps
      
      const counter = setInterval(() => {
        start += increment;
        if (start >= percentage) {
          setAnimatedPercentage(percentage);
          clearInterval(counter);
        } else {
          setAnimatedPercentage(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [percentage, delay, isInView]);

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <motion.div 
      ref={ringRef}
      className="relative w-24 h-24 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-400/10 blur-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />

      <svg className="transform -rotate-90 w-24 h-24 relative z-10" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke={`url(#gradient-${color})`}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ 
            strokeDashoffset: isInView ? strokeDashoffset : circumference,
          }}
          transition={{ 
            duration: 2.5, 
            ease: [0.16, 1, 0.3, 1], 
            delay: delay / 1000 
          }}
          strokeLinecap="round"
          className="drop-shadow-lg"
          style={{
            filter: isHovered ? 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))' : 'drop-shadow(0 0 2px rgba(6, 182, 212, 0.2))'
          }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center percentage display */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isInView ? 1 : 0,
          opacity: isInView ? 1 : 0
        }}
        transition={{ 
          delay: delay / 1000 + 0.8, 
          duration: 0.6, 
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
      >
        <motion.span 
          className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {animatedPercentage}%
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// Skill Detail Component
const SkillDetail = ({ skill, index, isVisible }: { skill: any; index: number; isVisible: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="group/skill bg-gray-50/70 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-cyan-200/30 dark:border-cyan-700/30 hover:border-cyan-300/50 dark:hover:border-cyan-600/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900 dark:text-white group-hover/skill:text-cyan-600 dark:group-hover/skill:text-cyan-400 transition-colors">
          {skill.name}
        </h4>
        <Badge 
          variant="outline" 
          className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 border-cyan-200/50 dark:border-cyan-700/50 text-cyan-700 dark:text-cyan-300"
        >
          {skill.level}%
        </Badge>
      </div>
      
      {/* Enhanced Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full relative"
            initial={{ width: 0 }}
            animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ delay: index * 0.15 + 0.2, duration: 1.2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/skill:opacity-100 animate-pulse transition-opacity duration-300" />
          </motion.div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        {skill.description}
      </p>
      
      <div className="flex items-center space-x-1">
        <Star size={12} className="text-yellow-500" />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {skill.projects.length} projects
        </span>
      </div>
    </motion.div>
  );
};

export function SkillsSection() {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [showInsights, setShowInsights] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % uxInsights.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionInView(true);
          }
        });
      },
      { 
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getOverallProficiency = () => {
    const allSkills = skillCategories.flatMap(cat => cat.skills);
    const average = allSkills.reduce((sum, skill) => sum + skill.level, 0) / allSkills.length;
    return Math.round(average);
  };

  const getCategoryAverage = (category: any) => {
    const average = category.skills.reduce((sum: number, skill: any) => sum + skill.level, 0) / category.skills.length;
    return Math.round(average);
  };

  const UXInsightBox = () => {
    const currentUXInsight = uxInsights[currentInsight];
    const IconComponent = currentUXInsight.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showInsights ? 1 : 0, y: showInsights ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-cyan-50/80 to-blue-50/80 dark:from-cyan-900/20 dark:to-blue-900/20 backdrop-blur-sm p-6 rounded-2xl border border-cyan-200/50 dark:border-cyan-800/50"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <motion.div 
              className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <IconComponent className="text-white" size={20} />
            </motion.div>
            <div className="flex-1">
              <h4 className="font-medium text-cyan-800 dark:text-cyan-200 mb-2">
                UX Insight: {currentUXInsight.title}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {currentUXInsight.message}
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => setShowInsights(!showInsights)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {showInsights ? <Minus size={16} /> : <Plus size={16} />}
          </motion.button>
        </div>
        
        <div className="flex justify-center space-x-2">
          {uxInsights.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentInsight 
                  ? 'bg-cyan-600 dark:bg-cyan-400' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50/50 via-white to-cyan-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Two decades of design evolution across {skillCategories.length} core areas, 
            from traditional design tools to cutting-edge AI workflows.
          </motion.p>
        </motion.div>

        {/* Enhanced Overall Stats */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
                          <div className="inline-flex items-center space-x-8 bg-gray-50/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ProgressRing 
                percentage={getOverallProficiency()} 
                color="cyan" 
                delay={200} 
                isInView={sectionInView}
              />
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Overall Proficiency</div>
            </motion.div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              >
                {skillCategories.length}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Skill Categories</div>
            </motion.div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              >
                20+
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Skills Grid with Tilted Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isHovered = hoveredCard === category.name;
            const isExpanded = expandedCard === category.name;
            
            return (
              <TiltedCard key={category.name} category={category} index={index}>
                <motion.div
                  className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                  onMouseEnter={() => setHoveredCard(category.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setExpandedCard(isExpanded ? null : category.name)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Floating Particles */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                          initial={{ 
                            x: Math.random() * 300, 
                            y: Math.random() * 400,
                            opacity: 0
                          }}
                          animate={{ 
                            y: Math.random() * 400 - 50,
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  <div className="p-6 relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div 
                        className={`p-4 rounded-xl bg-gradient-to-br ${category.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <IconComponent className="text-white" size={24} />
                      </motion.div>
                      
                      <div className="text-right">
                        <motion.div 
                          className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                        >
                          {getCategoryAverage(category)}%
                        </motion.div>
                        <Badge 
                          variant="outline" 
                          className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 border-cyan-200/50 dark:border-cyan-700/50 text-cyan-700 dark:text-cyan-300 group-hover:scale-105 transition-transform duration-300"
                        >
                          {category.skills.length} skills
                        </Badge>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Main Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span>Overall Proficiency</span>
                        <span>{getCategoryAverage(category)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full relative"
                          initial={{ width: 0 }}
                          animate={sectionInView ? { width: `${getCategoryAverage(category)}%` } : { width: 0 }}
                          transition={{ delay: index * 0.2 + 1, duration: 1.5, ease: "easeOut" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expandable Skills Detail */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? "auto" : "0",
                        opacity: isExpanded ? 1 : 0
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                        {category.skills.map((skill: any, skillIndex: number) => (
                          <SkillDetail 
                            key={skill.name}
                            skill={skill} 
                            index={skillIndex} 
                            isVisible={isExpanded}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Interactive Footer */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {isExpanded ? 'Click to collapse' : 'Click to explore'}
                        </span>
                        {!isExpanded && (
                          <ArrowRight size={12} className="text-cyan-500 group-hover:translate-x-1 transition-transform duration-300" />
                        )}
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Eye size={16} className="text-gray-400 group-hover:text-cyan-500 transition-colors duration-300" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </TiltedCard>
            );
          })}
        </div>

      
       
      </div>
    </section>
  );
}