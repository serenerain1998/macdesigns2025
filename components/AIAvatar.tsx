import { useState, useEffect } from 'react';
import { X, MessageCircle, Lightbulb, Brain, Eye, Users, Zap, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { EmailContactForm } from './EmailContactForm';

const uxInsights = [
  {
    icon: Brain,
    title: "Cognitive Load Theory",
    message: "The human brain can only process 7±2 pieces of information simultaneously. Melissa designs with this in mind to reduce mental effort.",
    color: "text-purple-500"
  },
  {
    icon: Eye,
    title: "Visual Hierarchy",
    message: "Users read in an F-pattern. Notice how Melissa structures content to guide your eye naturally through the most important information first.",
    color: "text-blue-500"
  },
  {
    icon: Users,
    title: "Gestalt Principles",
    message: "Elements that are close together are perceived as related. See how Melissa groups related content to create clear mental models.",
    color: "text-cyan-500"
  },
  {
    icon: Zap,
    title: "Fitts's Law",
    message: "Larger, closer targets are easier to click. Watch how button sizes and spacing make interactions effortless throughout this portfolio.",
    color: "text-green-500"
  },
  {
    icon: Lightbulb,
    title: "Progressive Disclosure",
    message: "Complex information is revealed in layers. Melissa shows just enough to keep you engaged without overwhelming your working memory.",
    color: "text-yellow-500"
  },
  {
    icon: Brain,
    title: "Hick's Law",
    message: "More choices = longer decision time. Notice how Melissa limits options and guides you toward clear next steps.",
    color: "text-indigo-500"
  }
];

const avatarPersonalities = [
  "Hi! I'm your UX guide. Click me to explore UX principles behind Melissa's design decisions! 🧠",
  "Welcome! I'm here to reveal the UX psychology behind what you're seeing. Click to learn! ✨",
  "Curious about UX? Click me to discover the science behind great design! 🔬",
  "Did you know? Click me to learn how Melissa applies cognitive psychology in every design! 🎯"
];

export function AIAvatar() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [greeting, setGreeting] = useState('');
  const [showingInsight, setShowingInsight] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setGreeting(avatarPersonalities[Math.floor(Math.random() * avatarPersonalities.length)]);
      setTimeout(() => setHasGreeted(true), 4000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle following behavior - adjust for mobile
      const isMobile = window.innerWidth < 768;
      const maxX = isMobile ? window.innerWidth - 100 : window.innerWidth - 300;
      const maxY = isMobile ? window.innerHeight - 100 : window.innerHeight - 200;
      const targetX = Math.min(e.clientX * 0.05 + 20, maxX);
      const targetY = Math.min(e.clientY * 0.03 + 20, maxY);
      setPosition({ x: targetX, y: targetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleAvatarClick = () => {
    if (!hasGreeted) {
      setIsExpanded(!isExpanded);
      return;
    }

    if (!showingInsight) {
      // Show a random UX insight when clicked
      const randomIndex = Math.floor(Math.random() * uxInsights.length);
      setCurrentInsight(randomIndex);
      setShowingInsight(true);
      setIsExpanded(true);
      
      // Auto-hide insight after 8 seconds
      setTimeout(() => {
        setIsExpanded(false);
        setTimeout(() => setShowingInsight(false), 300);
      }, 8000);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    if (showingInsight) {
      setTimeout(() => setShowingInsight(false), 300);
    }
  };

  const handleNextInsight = () => {
    const nextIndex = (currentInsight + 1) % uxInsights.length;
    setCurrentInsight(nextIndex);
  };

  const handlePrevInsight = () => {
    const prevIndex = currentInsight === 0 ? uxInsights.length - 1 : currentInsight - 1;
    setCurrentInsight(prevIndex);
  };

  const insight = uxInsights[currentInsight];
  const IconComponent = insight.icon;

  if (!isVisible) return null;

  return (
    <div 
      className="fixed z-50 transition-all duration-700 ease-out"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: isExpanded ? 'scale(1)' : 'scale(0.9)'
      }}
    >
      {/* Avatar Base */}
      <div className="relative">
        {/* Glowing Ring */}
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 animate-pulse"></div>
        
        {/* Avatar Circle */}
        <Button
          onClick={handleAvatarClick}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-0 relative overflow-hidden group"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          
          {/* Brain Icon */}
          <Brain size={24} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
          
          {/* Notification Dot */}
          {!hasGreeted && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}

          {/* Click Indicator */}
          {hasGreeted && !showingInsight && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          )}
        </Button>

        {/* Insight Bubble */}
        {(isExpanded && (showingInsight || !hasGreeted)) && (
          <Card className="absolute left-20 top-0 w-72 sm:w-80 shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm animate-fade-in-up">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <IconComponent size={20} className={showingInsight ? insight.color : "text-cyan-500"} />
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {showingInsight ? insight.title : "UX Assistant"}
                  </h4>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-6 w-6 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {showingInsight ? insight.message : greeting}
              </p>
              
              {showingInsight && (
                <div className="mt-4 space-y-3">
                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePrevInsight}
                        className="h-7 px-2 text-xs"
                      >
                        ← Prev
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNextInsight}
                        className="h-7 px-2 text-xs"
                      >
                        Next →
                      </Button>
                    </div>
                    <span className="text-xs text-gray-400">
                      {currentInsight + 1} of {uxInsights.length}
                    </span>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex space-x-1">
                    {uxInsights.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentInsight(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${ 
                          index === currentInsight 
                            ? 'bg-cyan-500 scale-125' 
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!showingInsight && hasGreeted && (
                <div className="mt-3 space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAvatarClick()}
                    className="text-xs h-7 w-full"
                  >
                    Show UX Insight
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="text-xs h-7 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    <Mail size={12} className="mr-1" />
                    Contact Melissa
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Email Contact Form */}
        {showEmailForm && (
          <EmailContactForm onClose={() => setShowEmailForm(false)} />
        )}
      </div>
    </div>
  );
}