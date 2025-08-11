import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  ArrowRight, Users, Target, Zap, TrendingUp, Brain, Eye, Lightbulb, 
  Search, MousePointer, Play, Pause, RotateCcw, ChevronRight, 
  BarChart3, Layers, Code, Sparkles, Heart, Shield, 
  Timer, Award, Users2, CheckCircle2, ArrowUpRight, ExternalLink,
  Calendar, Clock, Star, TrendingDown, Activity, Cpu, Database
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useInView } from 'framer-motion';

// Enhanced case study data with more interactive elements
const caseStudies = [
  {
    id: 1,
    title: "MedFlow: Surgical Interface Redesign",
    subtitle: "Reducing cognitive load in high-stakes medical environments",
    overview: "Complete redesign of a surgical planning interface used in over 200 hospitals worldwide.",
    challenge: "Surgeons reported high cognitive load and inefficient workflows during critical procedures, leading to increased procedure times and potential safety concerns.",
    methodology: [
      "Contextual inquiries in 15+ operating rooms",
      "Cognitive task analysis with surgical teams", 
      "Heuristic evaluation of existing interfaces",
      "Co-design sessions with healthcare professionals"
    ],
    process: [
      "User research revealed 47% of errors occurred during information handoff",
      "Created user journey maps for 8 different surgical specialties",
      "Prototyped solutions using ProtoPie for realistic interactions",
      "Conducted usability testing in simulated OR environments"
    ],
    aiTools: [
      "Lovable AI for rapid wireframe generation",
      "Figma AI for design system automation", 
      "Custom Arduino sensors for ergonomic testing"
    ],
    outcomes: [
      "35% reduction in average procedure time",
      "89% improvement in surgeon confidence scores",
      "Zero safety incidents reported post-implementation", 
      "Deployed across 50+ new hospitals in first quarter"
    ],
    tags: ["Medical UX", "Safety Critical", "Embedded Systems"],
    gradient: "from-fuchsia-500 to-pink-600",
    icon: Heart,
    color: "fuchsia",
    preview: "Transformed surgical workflows across 200+ hospitals with cognitive load reduction techniques.",
    metrics: [
      { 
        label: "Procedure Time Reduction", 
        value: 35, 
        suffix: "%", 
        baseline: 100,
        description: "Average reduction in surgical procedure duration",
        impact: "Critical time savings during operations",
        icon: Timer,
        trend: "up"
      },
      { 
        label: "Surgeon Confidence", 
        value: 89, 
        suffix: "%", 
        baseline: 100,
        description: "Improvement in surgeon confidence scores",
        impact: "Enhanced decision-making capability",
        icon: Star,
        trend: "up"
      },
      { 
        label: "Safety Incidents", 
        value: 0, 
        suffix: "", 
        baseline: 5,
        description: "Zero safety incidents post-implementation",
        impact: "Perfect safety record maintained",
        icon: Shield,
        trend: "down"
      },
      { 
        label: "Hospital Deployments", 
        value: 50, 
        suffix: "+", 
        baseline: 200,
        description: "New hospitals adopting the system",
        impact: "Rapid expansion and adoption",
        icon: Users2,
        trend: "up"
      }
    ],
    processSteps: [
      { name: "Research", icon: Search, description: "15+ OR observations", duration: "3 weeks", status: "completed" },
      { name: "Analysis", icon: Brain, description: "Cognitive task mapping", duration: "2 weeks", status: "completed" },
      { name: "Design", icon: Lightbulb, description: "8 specialty workflows", duration: "4 weeks", status: "completed" },
      { name: "Prototype", icon: Code, description: "ProtoPie interactions", duration: "3 weeks", status: "completed" },
      { name: "Test", icon: Eye, description: "Simulated OR testing", duration: "2 weeks", status: "completed" }
    ],
    timeline: [
      { month: "Jan", milestone: "Project Kickoff", status: "completed" },
      { month: "Feb", milestone: "Research Phase", status: "completed" },
      { month: "Mar", milestone: "Design Iterations", status: "completed" },
      { month: "Apr", milestone: "Prototype Development", status: "completed" },
      { month: "May", milestone: "Testing & Validation", status: "completed" },
      { month: "Jun", milestone: "Deployment", status: "completed" }
    ]
  },
  {
    id: 2,
    title: "CyberShield: AI-Powered Security Dashboard",
    subtitle: "Making complex threat data actionable for security teams", 
    overview: "Designed an intelligent security operations center dashboard that processes millions of threat indicators daily.",
    challenge: "Security analysts were overwhelmed by data volume, with 78% of alerts going uninvestigated due to interface complexity and information overload.",
    methodology: [
      "Ethnographic studies of SOC environments",
      "Card sorting for information hierarchy",
      "Cognitive walkthroughs with security analysts",
      "A/B testing of dashboard layouts"
    ],
    process: [
      "Mapped 12 different analyst workflows and pain points",
      "Created information architecture for 50+ data sources",
      "Built interactive prototypes with real threat data",
      "Conducted usability testing with 25+ security professionals"
    ],
    aiTools: [
      "ChatGPT for user persona development",
      "Midjourney for dashboard concept visualization",
      "Custom ML models for threat pattern recognition"
    ],
    outcomes: [
      "65% faster threat detection and response",
      "78% reduction in analyst burnout",
      "94% improvement in alert investigation rate",
      "Deployed to 15 Fortune 500 companies"
    ],
    tags: ["Enterprise UX", "Data Visualization", "AI/ML"],
    gradient: "from-cyan-500 to-blue-600",
    icon: Shield,
    color: "cyan",
    preview: "AI-powered security dashboard processing millions of threat indicators with 65% faster detection.",
    metrics: [
      { 
        label: "Threat Detection Speed", 
        value: 65, 
        suffix: "%", 
        baseline: 100,
        description: "Faster threat detection and response",
        impact: "Critical security improvements",
        icon: Zap,
        trend: "up"
      },
      { 
        label: "Analyst Burnout Reduction", 
        value: 78, 
        suffix: "%", 
        baseline: 100,
        description: "Reduction in analyst burnout rates",
        impact: "Improved team retention",
        icon: TrendingDown,
        trend: "down"
      },
      { 
        label: "Alert Investigation Rate", 
        value: 94, 
        suffix: "%", 
        baseline: 100,
        description: "Improvement in alert investigation",
        impact: "Better security coverage",
        icon: Activity,
        trend: "up"
      },
      { 
        label: "Enterprise Deployments", 
        value: 15, 
        suffix: "", 
        baseline: 0,
        description: "Fortune 500 companies deployed",
        impact: "Enterprise adoption success",
        icon: Award,
        trend: "up"
      }
    ],
    processSteps: [
      { name: "Research", icon: Search, description: "SOC ethnography", duration: "4 weeks", status: "completed" },
      { name: "Analysis", icon: Brain, description: "Workflow mapping", duration: "3 weeks", status: "completed" },
      { name: "Design", icon: Lightbulb, description: "Dashboard concepts", duration: "5 weeks", status: "completed" },
      { name: "Prototype", icon: Code, description: "Interactive demos", duration: "4 weeks", status: "completed" },
      { name: "Test", icon: Eye, description: "Analyst validation", duration: "3 weeks", status: "completed" }
    ],
    timeline: [
      { month: "Jul", milestone: "Discovery", status: "completed" },
      { month: "Aug", milestone: "Research", status: "completed" },
      { month: "Sep", milestone: "Design", status: "completed" },
      { month: "Oct", milestone: "Development", status: "completed" },
      { month: "Nov", milestone: "Testing", status: "completed" },
      { month: "Dec", milestone: "Launch", status: "completed" }
    ]
  }
];

// Custom hooks for enhanced interactions
const useAnimatedCounter = (targetValue: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = useCallback(() => {
    setIsAnimating(true);
    const startTime = Date.now();
    
    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * targetValue);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [targetValue, duration]);

  return { count, isAnimating, animate };
};

const useIntersectionObserver = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Enhanced interactive components
const InteractiveMetricCard = ({ metric, index, onHover }: {
  metric: any;
  index: number;
  onHover: (metric: any) => void;
}) => {
  const { count, animate } = useAnimatedCounter(metric.value, 2000);
  const { ref, isVisible } = useIntersectionObserver(0.3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      animate();
    }
  }, [isVisible, animate]);

  const IconComponent = metric.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => {
        setIsHovered(true);
        onHover(metric);
      }}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 border-0 shadow-xl hover:shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.trend === 'up' ? 'from-cyan-500 to-blue-500' : 'from-red-500 to-pink-500'} shadow-lg`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className={`${metric.trend === 'up' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-red-500 to-pink-500'} text-white border-0 shadow-md`}>
                {metric.trend === 'up' ? '↑' : '↓'}
              </Badge>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">{metric.label}</h3>
            <div className="text-2xl font-bold text-white">
              {count}{metric.suffix}
            </div>
            <p className="text-xs text-gray-400">{metric.description}</p>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-gradient-to-br from-cyan-900/95 to-blue-900/95 text-white p-6 rounded-lg flex items-center justify-center backdrop-blur-sm border border-cyan-500/30 shadow-2xl"
              >
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-cyan-100">{metric.label}</h4>
                  <p className="text-sm text-gray-200 leading-relaxed">{metric.impact}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const InteractiveTimeline = ({ timeline }: { timeline: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600" />
      
      {timeline.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative flex items-center mb-6"
          onHoverStart={() => setActiveIndex(index)}
        >
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
            item.status === 'completed' 
              ? 'bg-cyan-500 border-cyan-500 text-white' 
              : 'bg-gray-600 border-gray-500'
          }`}>
            {item.status === 'completed' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-gray-400" />
            )}
          </div>
          
          <div className="ml-6 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">{item.month}</span>
                              <Badge variant={item.status === 'completed' ? 'default' : 'secondary'} className={item.status === 'completed' ? 'bg-cyan-500 text-white' : 'bg-gray-600 text-gray-300'}>
                  {item.status}
                </Badge>
            </div>
            <p className="text-sm font-medium text-white">{item.milestone}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ProcessStepCard = ({ step, index }: { step: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 border-0 shadow-xl hover:shadow-2xl">
        <CardContent className="p-6 text-center">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
          >
            <IconComponent className="w-6 h-6 text-white" />
          </motion.div>
          
          <h3 className="font-semibold mb-2 text-white">{step.name}</h3>
          <p className="text-sm text-gray-300 mb-2">{step.description}</p>
          <Badge variant="outline" className="border-gray-500 text-gray-300">{step.duration}</Badge>
          
          {step.status === 'completed' && (
            <div className="absolute top-2 right-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export function CaseStudiesSection() {
  const [selectedStudy, setSelectedStudy] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredMetric, setHoveredMetric] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.2);

  const currentStudy = caseStudies[selectedStudy];

  const handleStudyChange = useCallback((index: number) => {
    setSelectedStudy(index);
    setActiveTab('overview');
    setHoveredMetric(null);
  }, []);

  const handleMetricHover = useCallback((metric: any) => {
    setHoveredMetric(metric);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative mb-8">
            {/* Decorative background elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
            </div>
            
            {/* Main title with enhanced typography */}
            <motion.h2 
              className="relative text-6xl font-black mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                Deep UX
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                Impact Stories
              </span>
            </motion.h2>
            
            {/* Subtitle with enhanced styling */}
            <motion.p 
              className="relative text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Exploring complex design challenges through{' '}
              <span className="text-cyan-300 font-semibold">methodical research</span>,{' '}
              <span className="text-blue-300 font-semibold">innovative solutions</span>, and{' '}
              <span className="text-fuchsia-300 font-semibold">measurable human-centered outcomes</span>
            </motion.p>
          </div>
          
          {/* Decorative line */}
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isVisible ? { width: "6rem" } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Study Navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex space-x-3 p-2 bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleStudyChange(index)}
                  className={`relative overflow-hidden transition-all duration-500 px-6 py-3 rounded-xl font-semibold ${
                    selectedStudy === index 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50 border border-transparent hover:border-gray-600'
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                    initial={false}
                    animate={{ opacity: selectedStudy === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">{study.title.split(':')[0]}</span>
                  
                  {/* Active indicator */}
                  {selectedStudy === index && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Study Overview */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Card className="h-full bg-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-2xl relative overflow-hidden">
                {/* Decorative background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
                
                <CardHeader className="border-b border-gray-700/50 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                      >
                        <CardTitle className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                          {currentStudy.title}
                        </CardTitle>
                      </motion.div>
                      <motion.p 
                        className="text-gray-300 text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                      >
                        {currentStudy.subtitle}
                      </motion.p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={togglePlay}
                        className="border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:border-transparent transition-all duration-300"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </motion.div>
                  </div>
                </CardHeader>
              
                              <CardContent className="p-6 relative z-10">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-xl">
                      <TabsTrigger 
                        value="overview" 
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:font-bold text-white hover:text-white hover:bg-gray-600 transition-colors font-medium rounded-lg"
                      >
                        <span className="data-[state=active]:text-white text-white">Overview</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="process"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:font-bold text-white hover:text-white hover:bg-gray-600 transition-colors font-medium rounded-lg"
                      >
                        <span className="data-[state=active]:text-white text-white">Process</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="outcomes"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:font-bold text-white hover:text-white hover:bg-gray-600 transition-colors font-medium rounded-lg"
                      >
                        <span className="data-[state=active]:text-white text-white">Outcomes</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="timeline"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:font-bold text-white hover:text-white hover:bg-gray-600 transition-colors font-medium rounded-lg"
                      >
                        <span className="data-[state=active]:text-white text-white">Timeline</span>
                      </TabsTrigger>
                    </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-white">Challenge</h3>
                      <p className="text-gray-300 leading-relaxed">{currentStudy.challenge}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-white">Methodology</h3>
                      <ul className="space-y-2">
                        {currentStudy.methodology.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="process" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentStudy.processSteps.map((step, index) => (
                        <ProcessStepCard key={index} step={step} index={index} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="outcomes" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentStudy.outcomes.map((outcome, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700/50 rounded-lg"
                        >
                          <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          <span className="text-sm text-gray-200">{outcome}</span>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="timeline" className="mt-6">
                    <InteractiveTimeline timeline={currentStudy.timeline} />
                  </TabsContent>
                </Tabs>
              </CardContent>
                          </Card>
            </motion.div>
          </div>

          {/* Right Column - Metrics */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-2xl relative overflow-hidden">
              {/* Decorative background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
              
              <CardHeader className="border-b border-gray-300/50 dark:border-gray-700/50 relative z-10">
                <CardTitle className="flex items-center space-x-3 text-gray-800 dark:text-white">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Key Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 relative z-10">
                {currentStudy.metrics.map((metric, index) => (
                  <InteractiveMetricCard
                    key={index}
                    metric={metric}
                    index={index}
                    onHover={handleMetricHover}
                  />
                ))}
              </CardContent>
            </Card>

            {hoveredMetric && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-4 bg-gradient-to-r from-cyan-900/80 to-blue-900/80 border border-cyan-700/50 rounded-lg text-white backdrop-blur-sm"
              >
                <h4 className="font-semibold mb-2 text-cyan-100">{hoveredMetric.label}</h4>
                <p className="text-sm text-gray-200">{hoveredMetric.impact}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}