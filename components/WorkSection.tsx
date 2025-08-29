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
    title: 'Creating ELEMENTS',
    subtitle: 'Comprehensive Design System',
    description: 'Coded v.1 of comprehensive design system for background screening platform. Built library in 4 different front-end tech stacks for maximum flexibility.',
    fullDescription: 'Led the development of a comprehensive design system that unified the user experience across 15+ products in the background screening industry. The system was built to support multiple front-end technologies including React, Vue, Angular, and Web Components, ensuring maximum flexibility for different development teams.',
    technologies: ['Figma', 'HTML', 'CSS', 'jQuery', 'Web Components', 'React', 'Vue', 'Angular'],
    category: 'Design System',
    year: 2023,
    status: 'completed' as const,
    thumbnailUrl: 'https://media.graphassets.com/PXjGQYOBSrq6LZIl8oom',
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
    subtitle: 'Arthroscopy Embedded Medical Software',
    description: 'Pioneered realistic prototyping for embedded medical software in arthroscopy by connecting Arduino boards to real medical cameras for surgeon usability testing.',
    fullDescription: 'Led the first-ever integration of Arduino boards with real medical cameras to create realistic prototypes for embedded arthroscopy software. This breakthrough approach enabled authentic usability testing with surgeons to understand ergonomics, motion handling, and interface transitions in real surgical environments.',
    technologies: ['Figma', 'ProtoPie', 'ProtoPie Studio', 'Arduino', 'Python', 'QT'],
    category: 'Medical Technology',
    year: 2022,
    status: 'completed' as const,
    thumbnailUrl: 'https://t4.ftcdn.net/jpg/03/99/12/51/360_F_399125183_HUy4uv9tzzMq5Kauk1wCl0WVyhVqomLv.jpg',
    demoUrl: '',
    highlights: [
      'First-ever Arduino-medical camera integration for realistic prototyping',
      'Conducted usability tests with real surgeons in operating rooms',
      'Improved interface ergonomics through motion analysis',
      'Enhanced surgical workflow efficiency through iterative testing'
    ],
    metrics: {
      prototypeRealism: '100%',
      surgeonFeedback: '15+',
      testingSessions: '25+',
      iterationCycles: '8'
    },
    process: [
      'Connected Arduino boards to real medical cameras for authentic functionality',
      'Created UI designs in Figma for embedded surgical interfaces',
      'Built interactive logic and motion handling in ProtoPie',
      'Integrated Arduino logic through ProtoPie Studio for hardware simulation',
      'Conducted usability testing with surgeons to validate ergonomics and transitions'
    ],
    challenges: [
      'No existing precedent for Arduino-medical camera integration',
      'Complex motion handling and transition requirements',
      'Safety-critical medical environment constraints',
      'Need for realistic prototyping in surgical context'
    ],
    solutions: [
      'Pioneered Arduino-medical camera integration methodology',
      'Developed comprehensive motion and transition testing protocols',
      'Created realistic surgical environment simulation',
      'Implemented iterative design based on surgeon feedback'
    ]
  },
  {
    id: 'ai-pathology-platform',
    title: 'AI Pathology Platform',
    subtitle: 'Digital Pathology AI Integration',
    description: 'Created front-end coded interactive prototype for AI-powered pathology platform that converts analog methods to digital workflows.',
    fullDescription: 'Developed a front-end coded interactive prototype for an AI pathology platform that digitizes traditional analog pathology methods. The platform integrates AI algorithms to analyze medical images and suggest improved patient prognoses by identifying patterns, anomalies, and correlations that human pathologists might miss, while maintaining critical human oversight in medical diagnosis.',
    technologies: ['Figma', 'HTML', 'CSS', 'JavaScript', 'AI Integration'],
    category: 'Healthcare AI',
    year: 2023,
    status: 'completed' as const,
    thumbnailUrl: 'https://media.istockphoto.com/id/1934720224/video/black-female-scientist-analyzing-samples-using-a-microscope-at-the-hospitals-lab.jpg?s=640x640&k=20&c=e_UiXodNqh2dnodbIEc1zjo0y6Btg8A3d0VDTqTZkrU=',
    demoUrl: '',
    highlights: [
      'Created front-end coded interactive prototype from design specs',
      'Collaborated with front-end developers for seamless integration',
      'Worked with data scientists and pathologists for testing',
      'Converted analog pathology methods to digital workflows'
    ],
    metrics: {
      prototypeAccuracy: '100%',
      stakeholderFeedback: '12+',
      testingSessions: '20+',
      integrationSuccess: '95%'
    },
    process: [
      'Designed UI in Figma based on pathology workflow requirements',
      'Coded interactive prototype using HTML, CSS, and JavaScript',
      'Collaborated with front-end developers for code integration',
      'Worked with data scientists on AI algorithm integration',
      'Conducted testing with pathologists to validate interface usability'
    ],
    challenges: [
      'Converting complex analog pathology workflows to digital interfaces',
      'Integrating AI suggestions while maintaining human oversight',
      'Ensuring prototype accuracy matches final development specs',
      'Coordinating between design, development, and data science teams'
    ],
    solutions: [
      'Created pixel-perfect coded prototypes that honor design specifications',
      'Implemented AI integration that enhances rather than replaces human judgment',
      'Established clear communication protocols between cross-functional teams',
      'Developed iterative testing process with medical professionals'
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
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  onClick={() => setShowModal(true)}
                >
                  <Eye size={16} className="mr-2" />
                  Learn More
                </Button>
              </motion.div>
              {project.demoUrl && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                  size="sm"
                  variant="secondary"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <ExternalLink size={16} className="mr-2" />
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
          <DialogContent className="w-[95vw] h-[90vh] max-w-none overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 dark:border-gray-700 shadow-2xl !fixed !top-[50%] !left-[50%] !transform !-translate-x-1/2 !-translate-y-1/2">
            {/* Hero Section with Project Header */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-t-lg"></div>
              <DialogHeader className="relative z-10 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                      {project.title}
                    </DialogTitle>
                    <p className="text-cyan-200 text-xl font-medium mb-4">{project.subtitle}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                        {project.year}
                      </span>
                      <span className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                        {project.status}
                      </span>
                      <span className="flex items-center">
                        <Layers className="w-4 h-4 mr-2 text-blue-400" />
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="bg-cyan-900/30 border-cyan-500 text-cyan-300 px-4 py-2">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Case Study
                    </Badge>
                  </div>
                </div>
              </DialogHeader>
            </div>
            
            <div className="space-y-8 px-2">
              {/* Executive Summary - Impact First */}
              <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl p-6 border border-cyan-700/30">
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-cyan-400" />
                  Executive Summary
                </h3>
                <p className="text-gray-200 leading-relaxed text-lg mb-4">
                  {project.fullDescription}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {Object.entries(project.metrics).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      className="flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-cyan-800/40 to-blue-800/40 rounded-lg border border-cyan-600/50 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="text-2xl font-bold text-cyan-300 mb-2">
                        {value}
                      </div>
                      <div className="text-xs text-cyan-100 capitalize leading-tight font-medium">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Project-Specific Case Study Visuals */}
              {project.id === 'surgical-technology-interface' ? (
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-700/30">
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-purple-400" />
                    Horizon Control System Visuals
                  </h3>
                                    <div className="space-y-6">
                    {/* First Row: 9:16 ratio videos (2 videos) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Arduino Integration Video - 9:16 */}
                      <motion.div
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="aspect-[9/16] bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                          <video 
                            className="w-full h-full object-cover"
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                          >
                            <source src="/assets/videos/HorizonControl/hc_arduino.MOV" type="video/quicktime" />
                            <source src="/assets/videos/HorizonControl/hc_arduino.MOV" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <div className="p-4 bg-purple-900/50">
                          <p className="text-purple-200 text-sm font-medium">Arduino Integration</p>
                          <p className="text-purple-300 text-xs">Real-time Arduino board connection to medical cameras</p>
                        </div>
                      </motion.div>

                      {/* New Arduino Video - 9:16 */}
                      <motion.div
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-600/20 to-blue-600/20 border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="aspect-[9/16] bg-gradient-to-br from-teal-500/30 to-blue-500/30 flex items-center justify-center">
                          <video 
                            className="w-full h-full object-cover"
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                          >
                            <source src="/assets/videos/HorizonControl/arduino.MOV" type="video/quicktime" />
                            <source src="/assets/videos/HorizonControl/arduino.MOV" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <div className="p-4 bg-teal-900/50">
                          <p className="text-teal-200 text-sm font-medium">Arduino Setup</p>
                          <p className="text-teal-300 text-xs">Arduino board configuration and testing</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Second Row: 9:16 ratio videos (2 videos) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Wheel Control Video - 9:16 */}
                      <motion.div
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 hover:border-green-400/50 transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="aspect-[9/16] bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center">
                          <video 
                            className="w-full h-full object-cover"
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                          >
                            <source src="/assets/videos/HorizonControl/hc_wheel.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <div className="p-4 bg-green-900/50">
                          <p className="text-green-200 text-sm font-medium">Control Interface</p>
                          <p className="text-green-300 text-xs">Ergonomic wheel control for surgical precision</p>
                        </div>
                      </motion.div>

                      {/* Trimmed Demo Video - 9:16 */}
                      <motion.div
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="aspect-[9/16] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center">
                          <video 
                            className="w-full h-full object-cover"
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                          >
                            <source src="/assets/videos/HorizonControl/hd_trimmed.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <div className="p-4 bg-indigo-900/50">
                          <p className="text-indigo-200 text-sm font-medium">System Demo</p>
                          <p className="text-indigo-300 text-xs">Complete system demonstration and workflow</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Second Row: 16:9 ratio videos side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 3D Model Video - 16:9 */}
                      <motion.div
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="aspect-video bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center">
                          <video 
                            className="w-full h-full object-cover"
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                          >
                            <source src="/assets/videos/HorizonControl/3dModel.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <div className="p-4 bg-blue-900/50">
                          <p className="text-blue-200 text-sm font-medium">3D Model Visualization</p>
                          <p className="text-blue-300 text-xs">Interactive 3D model for surgical planning</p>
                        </div>
                      </motion.div>

                      {/* Live Case Monitor Image - 16:9 */}
                      <motion.div
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="aspect-video bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center">
                          <img 
                            src="/assets/videos/HorizonControl/Monitor - LIVE CASE - HC_ Unlocked, Recording_ On, Nano.jpg"
                            alt="Live Case Monitor Interface"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 bg-orange-900/50">
                          <p className="text-orange-200 text-sm font-medium">Live Case Monitor</p>
                          <p className="text-orange-300 text-xs">Real-time surgical interface during procedures</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-700/30">
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-purple-400" />
                    Case Study Visuals
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder 1 */}
                    <motion.div
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <Eye className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-purple-200 font-medium text-sm">Case Study Image/Video 1</p>
                          <p className="text-purple-300 text-xs mt-1">Click to add your content</p>
                        </div>
                      </div>
                      <div className="p-4 bg-purple-900/50">
                        <p className="text-purple-200 text-sm font-medium">Project Overview</p>
                        <p className="text-purple-300 text-xs">Add your custom photography or MP4 video</p>
                      </div>
                    </motion.div>

                    {/* Placeholder 2 */}
                    <motion.div
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                            <Code className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-blue-200 font-medium text-sm">Case Study Image/Video 2</p>
                          <p className="text-blue-300 text-xs mt-1">Click to add your content</p>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-900/50">
                        <p className="text-blue-200 text-sm font-medium">Process & Methodology</p>
                        <p className="text-blue-300 text-xs">Add your custom photography or MP4 video</p>
                      </div>
                    </motion.div>

                    {/* Placeholder 3 */}
                    <motion.div
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 hover:border-green-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                            <Target className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-green-200 font-medium text-sm">Case Study Image/Video 3</p>
                          <p className="text-green-300 text-xs mt-1">Click to add your content</p>
                        </div>
                      </div>
                      <div className="p-4 bg-green-900/50">
                        <p className="text-green-200 text-sm font-medium">Results & Impact</p>
                        <p className="text-green-300 text-xs">Add your custom photography or MP4 video</p>
                      </div>
                    </motion.div>

                    {/* Placeholder 4 */}
                    <motion.div
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-orange-200 font-medium text-sm">Case Study Image/Video 4</p>
                          <p className="text-orange-300 text-xs mt-1">Click to add your content</p>
                        </div>
                      </div>
                      <div className="p-4 bg-orange-900/50">
                        <p className="text-orange-200 text-sm font-medium">User Testing & Feedback</p>
                        <p className="text-orange-300 text-xs">Add your custom photography or MP4 video</p>
                      </div>
                    </motion.div>

                    {/* Placeholder 5 */}
                    <motion.div
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                            <Zap className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-indigo-200 font-medium text-sm">Case Study Image/Video 5</p>
                          <p className="text-indigo-300 text-xs mt-1">Click to add your content</p>
                        </div>
                      </div>
                      <div className="p-4 bg-indigo-900/50">
                        <p className="text-indigo-200 text-sm font-medium">Technical Implementation</p>
                        <p className="text-indigo-300 text-xs">Add your custom photography or MP4 video</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* UX Process & Methodology */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-blue-400" />
                  UX Process & Methodology
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-cyan-300 border-b border-cyan-700/50 pb-2">Design Process</h4>
                    <div className="space-y-3">
                      {project.process.map((step, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors border-l-4 border-cyan-500"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex-shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold text-white">
                            {index + 1}
                          </div>
                          <span className="text-gray-200">{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-cyan-300 border-b border-cyan-700/50 pb-2">Challenges & Solutions</h4>
                    <div className="space-y-4">
                      {project.challenges.map((challenge, index) => (
                        <motion.div
                          key={index}
                          className="p-3 bg-red-900/20 border border-red-700/30 rounded-lg"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="text-sm text-red-300 font-medium mb-2">Challenge {index + 1}</div>
                          <div className="text-gray-300 text-sm">{challenge}</div>
                          <div className="text-sm text-green-300 font-medium mt-2">Solution:</div>
                          <div className="text-gray-300 text-sm">{project.solutions[index]}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Achievements & Impact */}
              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-700/30">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <Award className="w-6 h-6 mr-3 text-green-400" />
                  Key Achievements & Impact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start space-x-3 p-4 bg-green-800/20 border border-green-700/40 rounded-lg hover:bg-green-800/30 transition-all duration-300 hover:scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-200 font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Case Study Visuals */}
              <div className="bg-gradient-to-r from-amber-900/20 to-yellow-900/20 rounded-xl p-6 border border-amber-700/30">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-amber-400" />
                  Additional Visual Evidence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Placeholder 6 */}
                  <motion.div
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-600/20 to-yellow-600/20 border border-amber-500/30 hover:border-amber-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="aspect-square bg-gradient-to-br from-amber-500/30 to-yellow-500/30 flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-amber-200 font-medium text-xs">Metrics & Data</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Placeholder 7 */}
                  <motion.div
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-rose-600/20 to-pink-600/20 border border-rose-500/30 hover:border-rose-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="aspect-square bg-gradient-to-br from-rose-500/30 to-pink-500/30 flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center">
                          <Layers className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-rose-200 font-medium text-xs">Design System</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Placeholder 8 */}
                  <motion.div
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-sky-600/20 to-blue-600/20 border border-sky-500/30 hover:border-sky-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="aspect-square bg-gradient-to-br from-sky-500/30 to-blue-500/30 flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-sky-400 to-blue-400 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sky-200 font-medium text-xs">Timeline</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Technical Implementation */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <Code className="w-6 h-6 mr-3 text-purple-400" />
                  Technical Implementation
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {project.technologies.map((tech) => (
                      <Badge 
                        key={tech}
                        variant="outline"
                        className="bg-purple-900/30 border-purple-600 text-purple-300 hover:bg-purple-800/40 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600/50">
                    <h4 className="text-lg font-semibold mb-3 text-purple-300">Technology Stack Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                      {project.id === 'security-screening-platform' ? (
                        <>
                          <div>
                            <div className="font-medium text-purple-300 mb-2">Frontend Technologies</div>
                            <div className="space-y-1">
                              <div>• React, Vue, Angular for component libraries</div>
                              <div>• Web Components for cross-framework compatibility</div>
                              <div>• Responsive design with modern CSS frameworks</div>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-purple-300 mb-2">Design Tools</div>
                            <div className="space-y-1">
                              <div>• Figma for design system creation</div>
                              <div>• Component-driven design methodology</div>
                              <div>• Design token implementation</div>
                            </div>
                          </div>
                        </>
                      ) : project.id === 'surgical-technology-interface' ? (
                        <>
                          <div>
                            <div className="font-medium text-purple-300 mb-2">Prototyping Tools</div>
                            <div className="space-y-1">
                              <div>• Figma for UI design and interface layouts</div>
                              <div>• ProtoPie for interactive logic and motion handling</div>
                              <div>• ProtoPie Studio for Arduino integration</div>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-purple-300 mb-2">Development & Hardware</div>
                            <div className="space-y-1">
                              <div>• Python for embedded software logic</div>
                              <div>• QT framework for medical device interfaces</div>
                              <div>• Arduino boards for hardware simulation</div>
                            </div>
                          </div>
                        </>
                      ) : project.id === 'ai-pathology-platform' ? (
                        <>
                          <div>
                            <div className="font-medium text-purple-300 mb-2">Prototyping & Design</div>
                            <div className="space-y-1">
                              <div>• Figma for UI design and pathology workflows</div>
                              <div>• HTML/CSS/JavaScript for interactive prototypes</div>
                              <div>• Front-end coded prototypes for seamless integration</div>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-purple-300 mb-2">AI Integration & Testing</div>
                            <div className="space-y-1">
                              <div>• AI algorithm integration for medical image analysis</div>
                              <div>• Collaboration with data scientists and pathologists</div>
                              <div>• Usability testing with medical professionals</div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <div className="font-medium text-purple-300 mb-2">Prototyping Tools</div>
                            <div className="space-y-1">
                              <div>• Figma for UI design and interface layouts</div>
                              <div>• ProtoPie for interactive logic and motion handling</div>
                              <div>• ProtoPie Studio for Arduino integration</div>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-purple-300 mb-2">Development & Hardware</div>
                            <div className="space-y-1">
                              <div>• Python for embedded software logic</div>
                              <div>• QT framework for medical device interfaces</div>
                              <div>• Arduino boards for hardware simulation</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project-Specific Preview Section */}
              {project.id === 'security-screening-platform' ? (
                <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl p-6 border border-blue-700/30">
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-blue-400" />
                    Design System Preview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                        <Layers className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-blue-300 mb-2">Component Library</h4>
                      <p className="text-gray-300 text-sm">200+ reusable components with consistent design patterns</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Target className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-green-300 mb-2">Design Tokens</h4>
                      <p className="text-gray-300 text-sm">Centralized design system with scalable design tokens</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">Team Adoption</h4>
                      <p className="text-gray-300 text-sm">95% adoption rate across 15+ product teams</p>
                    </div>
                  </div>
                </div>
              ) : project.id === 'surgical-technology-interface' ? (
                <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl p-6 border border-blue-700/30">
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-blue-400" />
                    Prototyping & Testing Preview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                        <Code className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-blue-300 mb-2">Arduino Integration</h4>
                      <p className="text-gray-300 text-sm">First-ever connection of Arduino boards to real medical cameras</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-green-300 mb-2">Surgeon Testing</h4>
                      <p className="text-gray-300 text-sm">Real usability testing with surgeons in operating room environments</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                        <Zap className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">Motion Analysis</h4>
                      <p className="text-gray-300 text-sm">Comprehensive ergonomics and transition testing for surgical workflows</p>
                    </div>
                  </div>
                </div>
              ) : project.id === 'ai-pathology-platform' ? (
                <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl p-6 border border-blue-700/30">
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-blue-400" />
                    AI Pathology Integration Preview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                        <Code className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-blue-300 mb-2">Front-End Prototype</h4>
                      <p className="text-gray-300 text-sm">Coded interactive prototype using HTML, CSS, and JavaScript</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Brain className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-green-300 mb-2">AI Integration</h4>
                      <p className="text-gray-300 text-sm">Machine learning algorithms for medical image analysis and prognosis</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">Medical Validation</h4>
                      <p className="text-gray-300 text-sm">Testing with pathologists and data scientists for accuracy</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl p-6 border border-blue-700/30">
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-blue-400" />
                    Project Preview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                        <Code className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-blue-300 mb-2">Development</h4>
                      <p className="text-gray-300 text-sm">Custom development and implementation</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Target className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-green-300 mb-2">Testing</h4>
                      <p className="text-gray-300 text-sm">Comprehensive testing and validation</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">Deployment</h4>
                      <p className="text-gray-300 text-sm">Successful project delivery and launch</p>
                    </div>
                  </div>
                </div>
              )}


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