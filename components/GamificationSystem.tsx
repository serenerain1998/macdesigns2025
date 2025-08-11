import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Coffee, 
  Heart, 
  Zap, 
  Target, 
  Award, 
  Sparkles,
  BookOpen,
  Music,
  Camera,
  Palette,
  Brain,
  Code,
  Lightbulb,
  Globe,
  Users,
  X
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

// Achievement data
const achievements = [
  {
    id: 'explorer',
    title: 'Portfolio Explorer',
    description: 'Started exploring the portfolio',
    icon: Globe,
    trigger: 'hero',
    unlocked: false,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'learner',
    title: 'Story Seeker',
    description: 'Discovered the journey behind the designer',
    icon: BookOpen,
    trigger: 'about',
    unlocked: false,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'work-viewer',
    title: 'Work Admirer',
    description: 'Explored featured projects',
    icon: Trophy,
    trigger: 'work',
    unlocked: false,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'skill-master',
    title: 'Skill Spotter',
    description: 'Checked out the skill arsenal',
    icon: Target,
    trigger: 'skills',
    unlocked: false,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'case-study-fan',
    title: 'Deep Diver',
    description: 'Dived into detailed case studies',
    icon: Brain,
    trigger: 'case-studies',
    unlocked: false,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'connector',
    title: 'Future Collaborator',
    description: 'Ready to connect and collaborate',
    icon: Heart,
    trigger: 'contact',
    unlocked: false,
    color: 'from-red-500 to-pink-500'
  }
];

// Fun facts about Melissa
const funFacts = [
  {
    id: 'coffee-lover',
    title: 'Coffee Connoisseur',
    fact: 'Drinks 4+ cups of coffee daily and claims it\'s essential for creative problem-solving',
    icon: Coffee,
    trigger: 'hero',
    position: { top: '20%', right: '10%' }
  },
  {
    id: 'psychology-nerd',
    title: 'Psychology Geek',
    fact: 'Has a cognitive psychology minor and loves analyzing user behavior patterns',
    icon: Brain,
    trigger: 'about',
    position: { top: '30%', left: '15%' }
  },
  {
    id: 'design-challenge',
    title: 'Design Challenge Queen',
    fact: 'Completed 50+ design challenges in her spare time to stay sharp',
    icon: Palette,
    trigger: 'work',
    position: { top: '40%', right: '20%' }
  },
  {
    id: 'music-producer',
    title: 'Secret Music Producer',
    fact: 'Creates ambient music for focus - some tracks have 10k+ plays on Spotify',
    icon: Music,
    trigger: 'skills',
    position: { top: '25%', left: '10%' }
  },
  {
    id: 'photography-hobby',
    title: 'Macro Photography Enthusiast',
    fact: 'Captures insects and plants in macro detail - it helps with attention to design details',
    icon: Camera,
    trigger: 'case-studies',
    position: { top: '35%', right: '15%' }
  },
  {
    id: 'mentor',
    title: 'Design Mentor',
    fact: 'Mentors 20+ junior designers through industry bootcamps and online communities',
    icon: Users,
    trigger: 'contact',
    position: { top: '45%', left: '20%' }
  }
];

// Easter eggs
const easterEggs = [
  {
    id: 'konami-code',
    description: 'Konami code activated!',
    reward: 'You found the secret designer mode! 🎨'
  },
  {
    id: 'triple-click',
    description: 'Triple-click master!',
    reward: 'Fun fact: Melissa can solve a Rubik\'s cube in under 2 minutes! 🧩'
  }
];

// Achievement notification component
const AchievementNotification = ({ achievement, onClose }: { 
  achievement: typeof achievements[0]; 
  onClose: () => void; 
}) => {
  const IconComponent = achievement.icon;
  
  return (
    <motion.div
      initial={{ x: 400, opacity: 0, scale: 0.8 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 400, opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-24 right-6 z-[100] max-w-sm"
    >
      <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className={`p-4 bg-gradient-to-r ${achievement.color} text-white relative`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <IconComponent size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Achievement Unlocked!</h4>
                  <p className="text-xs opacity-90">{achievement.title}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                <X size={12} />
              </Button>
            </div>
            
            {/* Sparkle effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {achievement.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Fun fact tooltip component
const FunFactTooltip = ({ fact, isVisible, onClose }: { 
  fact: typeof funFacts[0]; 
  isVisible: boolean; 
  onClose: () => void; 
}) => {
  const IconComponent = fact.icon;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed z-[90] max-w-xs"
          style={{
            top: fact.position.top,
            left: fact.position.left,
            right: fact.position.right,
          }}
        >
          <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/50 dark:border-cyan-700/50 shadow-xl backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex-shrink-0">
                  <IconComponent size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                    {fact.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {fact.fact}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                >
                  <X size={10} />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Floating sparkles around the tooltip */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  y: [0, -20, -40],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Progress bar with achievements
const ProgressBar = ({ progress, unlockedAchievements }: { 
  progress: number; 
  unlockedAchievements: string[]; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[80] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            
            return (
              <motion.div
                key={achievement.id}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isUnlocked 
                    ? `bg-gradient-to-r ${achievement.color}` 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
                animate={isUnlocked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <IconComponent 
                  size={12} 
                  className={isUnlocked ? 'text-white' : 'text-gray-400'} 
                />
              </motion.div>
            );
          })}
        </div>
        
        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {unlockedAchievements.length}/{achievements.length}
        </span>
      </div>
    </motion.div>
  );
};

// Easter egg notification
const EasterEggNotification = ({ easterEgg, onClose }: { 
  easterEgg: typeof easterEggs[0]; 
  onClose: () => void; 
}) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
    >
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-2xl max-w-sm">
        <CardContent className="p-6 text-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <Sparkles size={48} className="mx-auto" />
          </motion.div>
          
          <h3 className="text-xl font-bold mb-2">Easter Egg Found!</h3>
          <p className="text-sm opacity-90 mb-4">{easterEgg.reward}</p>
          
          <Button
            onClick={onClose}
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            Awesome!
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main gamification component
export function GamificationSystem() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('hero');
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [activeAchievement, setActiveAchievement] = useState<typeof achievements[0] | null>(null);
  const [visibleFunFact, setVisibleFunFact] = useState<typeof funFacts[0] | null>(null);
  const [activeEasterEgg, setActiveEasterEgg] = useState<typeof easterEggs[0] | null>(null);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Konami code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  // Track scroll progress and current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      // Detect current section
      const sections = ['hero', 'about', 'work', 'skills', 'case-studies', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
      
      for (const element of sectionElements) {
        const rect = element!.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          const sectionId = element!.id;
          if (sectionId !== currentSection) {
            setCurrentSection(sectionId);
            setVisitedSections(prev => new Set([...prev, sectionId]));
            
            // Check for achievements
            const achievement = achievements.find(a => a.trigger === sectionId && !unlockedAchievements.includes(a.id));
            if (achievement) {
              setUnlockedAchievements(prev => [...prev, achievement.id]);
              setActiveAchievement(achievement);
              
              // Auto-hide achievement after 5 seconds
              setTimeout(() => setActiveAchievement(null), 5000);
            }
            
            // Show fun fact with delay
            setTimeout(() => {
              const fact = funFacts.find(f => f.trigger === sectionId);
              if (fact && Math.random() > 0.3) { // 70% chance to show
                setVisibleFunFact(fact);
                // Auto-hide fun fact after 8 seconds
                setTimeout(() => setVisibleFunFact(null), 8000);
              }
            }, 2000);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, unlockedAchievements]);

  // Konami code easter egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiSequence(prev => {
        const newSequence = [...prev, e.code].slice(-konamiCode.length);
        
        if (newSequence.length === konamiCode.length && 
            newSequence.every((key, index) => key === konamiCode[index])) {
          setActiveEasterEgg(easterEggs[0]);
          setTimeout(() => setActiveEasterEgg(null), 5000);
          return [];
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Triple-click easter egg
  useEffect(() => {
    const handleClick = () => {
      setClickCount(prev => prev + 1);
      
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      
      clickTimeoutRef.current = setTimeout(() => {
        if (clickCount >= 2) { // Triple click detected
          setActiveEasterEgg(easterEggs[1]);
          setTimeout(() => setActiveEasterEgg(null), 5000);
        }
        setClickCount(0);
      }, 500);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [clickCount]);

  return (
    <>
      {/* Progress bar with achievements */}
      <ProgressBar 
        progress={scrollProgress} 
        unlockedAchievements={unlockedAchievements} 
      />

      {/* Achievement notifications */}
      <AnimatePresence>
        {activeAchievement && (
          <AchievementNotification
            achievement={activeAchievement}
            onClose={() => setActiveAchievement(null)}
          />
        )}
      </AnimatePresence>

      {/* Fun fact tooltips */}
      {visibleFunFact && (
        <FunFactTooltip
          fact={visibleFunFact}
          isVisible={!!visibleFunFact}
          onClose={() => setVisibleFunFact(null)}
        />
      )}

      {/* Easter egg notifications */}
      <AnimatePresence>
        {activeEasterEgg && (
          <EasterEggNotification
            easterEgg={activeEasterEgg}
            onClose={() => setActiveEasterEgg(null)}
          />
        )}
      </AnimatePresence>

      {/* Interactive floating elements */}
      <div className="fixed bottom-8 right-8 z-[70] pointer-events-none">
        {visitedSections.size >= 3 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="mb-4"
          >
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
              <Star size={16} className="text-white" />
            </div>
          </motion.div>
        )}
        
        {unlockedAchievements.length >= 4 && (
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg">
              <Award size={16} className="text-white" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating interaction hints */}
      {scrollProgress > 0.8 && unlockedAchievements.length < achievements.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-[70]"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Try the ↑↑↓↓←→←→BA code! 🎮
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}