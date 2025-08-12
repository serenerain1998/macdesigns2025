import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { 
  ExternalLink, Github, Sparkles, TrendingUp, Users, Zap, Award, 
  ArrowLeft, ArrowRight, X, Eye, Play, Calendar, Clock, Star,
  ChevronRight, CheckCircle2, Target, Brain, Code, Layers
} from 'lucide-react';

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from './ui/dialog';
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

// Enhanced project data with more details for carousel
const carouselProjects = [
  {
    id: 'security-screening-platform',
    title: 'Security Screening Platform',
    subtitle: 'Comprehensive Design System',
    description: 'Coded v.1 of comprehensive design system for background screening platform. Built library in 4 different front-end tech stacks for maximum flexibility.',
    fullDescription: 'Led the development of a comprehensive design system that unified the user experience across 15+ products in the background screening industry. The system was built to support multiple front-end technologies including React, Vue, Angular, and Web Components, ensuring maximum flexibility for different development teams.',
    technologies: ['Figma', 'HTML', 'CSS', 'jQuery', 'Web Components', 'React', 'Vue', 'Angular'],
    category: 'Design System',
    year: 2023,
    status: 'completed' as const,
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop&q=80',
    demoUrl: '',
    highlights: [
      'Reduced design-to-development time by 40%',
      'Achieved 95% adoption across product teams',
      'Improved accessibility compliance to WCAG 2.1 AA',
      'Created 200+ reusable components'
    ],
    metrics: {
      userIncrease: '40%',
      performanceImprovement: '25%',
      timeToMarket: '6 weeks',
      adoptionRate: '95%'
    },
    process: [
      'Audited existing design patterns across 15+ products',
      'Created comprehensive design tokens and component library',
      'Built documentation and governance model',
      'Implemented automated testing and quality assurance'
    ],
    challenges: [
      'Inconsistent design patterns across products',
      'Slow development cycles due to design debt',
      'Lack of accessibility standards',
      'Multiple technology stacks to support'
    ],
    solutions: [
      'Centralized design system with clear governance',
      'Automated component generation and testing',
      'Comprehensive documentation and training',
      'Cross-platform compatibility strategy'
    ]
  },
  {
    id: 'surgical-technology-interface',
    title: 'Surgical Technology Interface',
    subtitle: 'Medical Device UX Design',
    description: 'Designed UI for multiple OR embedded software consoles using ProtoPie to simulate multi-device interactivity with custom design system libraries.',
    fullDescription: 'Redesigned the user interface for surgical technology consoles used in operating rooms worldwide. The project focused on reducing cognitive load during critical procedures while maintaining safety and efficiency. Used ProtoPie for advanced prototyping to simulate multi-device interactions and complex surgical workflows.',
    technologies: ['Figma', 'ProtoPie', 'ProtoPie Studio', 'QT', 'Design Systems'],
    category: 'Medical Technology',
    year: 2022,
    status: 'completed' as const,
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&q=80',
    demoUrl: '',
    highlights: [
      'Increased surgical workflow efficiency by 60%',
      'Reduced training time for OR staff by 50%',
      'Zero safety incidents reported post-implementation',
      'Deployed across 200+ hospitals worldwide'
    ],
    metrics: {
      performanceImprovement: '60%',
      userIncrease: '35%',
      conversionRate: '22%',
      safetyScore: '100%'
    },
    process: [
      'Conducted contextual inquiries in 15+ operating rooms',
      'Performed cognitive task analysis with surgical teams',
      'Created user journey maps for 8 surgical specialties',
      'Prototyped solutions using ProtoPie for realistic interactions'
    ],
    challenges: [
      'High cognitive load during critical procedures',
      'Complex multi-device interactions',
      'Safety-critical environment requirements',
      'Diverse surgical team needs'
    ],
    solutions: [
      'Simplified interface design with clear information hierarchy',
      'Multi-device synchronization and coordination',
      'Comprehensive safety protocols and fail-safes',
      'Customizable workflows for different surgical specialties'
    ]
  },
  {
    id: 'ai-pathology-platform',
    title: 'AI Pathology Platform',
    subtitle: 'Healthcare AI Interface',
    description: 'Designed AI-powered pathology tool enabling pathologists to create accurate prognosis based on machine learning data analysis and insights.',
    fullDescription: 'Designed the user interface for an AI-powered pathology platform that helps pathologists analyze medical images and create accurate prognoses. The platform integrates machine learning algorithms with traditional pathology workflows, providing intelligent insights while maintaining the critical human oversight required in medical diagnosis.',
    technologies: ['Figma', 'HTML', 'CSS', 'jQuery', 'Rapid Prototyping'],
    category: 'Healthcare AI',
    year: 2023,
    status: 'completed' as const,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop&q=80',
    demoUrl: '',
    highlights: [
      'Improved diagnostic accuracy by 15%',
      'Reduced pathology review time by 45%',
      'Enhanced collaboration between pathologists',
      'Streamlined reporting and documentation'
    ],
    metrics: {
      performanceImprovement: '45%',
      userIncrease: '15%',
      timeToMarket: '8 months',
      accuracyImprovement: '15%'
    },
    process: [
      'Researched pathology workflows and pain points',
      'Designed AI integration points and user feedback loops',
      'Created intuitive data visualization and reporting tools',
      'Conducted usability testing with practicing pathologists'
    ],
    challenges: [
      'Complex medical data visualization requirements',
      'Integration with existing pathology workflows',
      'Ensuring AI transparency and explainability',
      'Maintaining diagnostic accuracy and reliability'
    ],
    solutions: [
      'Intuitive data visualization and reporting interface',
      'Seamless integration with existing pathology systems',
      'Clear AI confidence indicators and explanations',
      'Comprehensive quality assurance and validation processes'
    ]
  }
];

// Carousel Item Component
const CarouselItemComponent = ({ project, index, isActive }: { 
  project: typeof carouselProjects[0]; 
  index: number; 
  isActive: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
              <Card className="h-full bg-gray-50/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        />

        {/* Project Image */}
        <div className="relative overflow-hidden h-64 md:h-72">
          <motion.img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            loading="lazy"
          />
          
          {/* Image Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Status Badge */}
          <motion.div
            className="absolute top-4 right-4"
            whileHover={{ scale: 1.1 }}
          >
            <Badge 
              variant="secondary"
              className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700 backdrop-blur-sm"
            >
              {project.status}
            </Badge>
          </motion.div>

          {/* Hover Actions */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
          >
            <div className="flex space-x-3">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm"
                  onClick={() => setShowModal(true)}
                >
                  <Eye size={16} className="mr-1" />
                  View Details
                </Button>
              </motion.div>
              {project.demoUrl && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <CardContent className="p-6 relative z-10">
          {/* Project Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.h3 
                className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                {project.title}
              </motion.h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {project.subtitle}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {project.category} • {project.year}
              </p>
            </div>
            
            <motion.div
              animate={isHovered ? { rotate: 180, scale: 1.2 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-5 h-5 text-cyan-500" />
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(showAllTech ? project.technologies : project.technologies.slice(0, 4)).map((tech: string, i: number) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: showAllTech ? 0 : index * 0.2 + i * 0.1 + 0.5,
                  duration: 0.3
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge 
                  variant="outline"
                  className="bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
            {project.technologies.length > 4 && !showAllTech && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant="secondary" 
                  className="text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-white"
                  onClick={() => setShowAllTech(true)}
                >
                  +{project.technologies.length - 4} more
                </Badge>
              </motion.div>
            )}
            {showAllTech && project.technologies.length > 4 && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 }}
              >
                <Badge 
                  variant="secondary" 
                  className="text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-white"
                  onClick={() => setShowAllTech(false)}
                >
                  show less
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {Object.entries(project.metrics).slice(0, 2).map(([key, value], i) => (
              <motion.div
                key={key}
                className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                  {value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </div>


        </CardContent>

        {/* Case Study Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto bg-gray-900 dark:bg-gray-900 border-gray-700 dark:border-gray-700 shadow-2xl">
            <DialogHeader className="relative">
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {project.title}
              </DialogTitle>
              <p className="text-gray-400 text-lg">{project.subtitle}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
                className="absolute top-0 right-0 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogHeader>
            
            <div className="space-y-8">
              {/* Project Overview */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.fullDescription}
                </p>
              </div>

              {/* Technologies Used */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech}
                      variant="outline"
                      className="bg-cyan-900/30 border-cyan-600 text-cyan-300 hover:bg-cyan-800/40 px-4 py-2 text-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Key Achievements */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
                  <Award className="w-5 h-5 mr-3 text-cyan-400" />
                  Key Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start space-x-3 p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Key Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(project.metrics).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      className="text-center p-6 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-700/50 hover:border-cyan-600 transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="text-3xl font-bold text-cyan-400 mb-2">
                        {value}
                      </div>
                      <div className="text-sm text-gray-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Process</h3>
                <div className="space-y-3">
                  {project.process.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex-shrink-0 mt-2" />
                      <span className="text-gray-300">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </motion.div>
  );
};

// Main WorkSection Component
export function WorkSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      if (api && typeof api.off === 'function') {
        api.off("select", handleSelect);
      }
    };
  }, [api]);

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
            whileInView={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Featured Work
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A showcase of impactful projects spanning design systems, enterprise software, 
            and innovative user experiences across various industries.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {carouselProjects.map((project, index) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <CarouselItemComponent 
                    project={project} 
                    index={index} 
                    isActive={currentIndex === index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            

          </Carousel>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-8 md:hidden">
            {carouselProjects.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => {
                  if (api) {
                    api.scrollTo(index);
                  }
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}