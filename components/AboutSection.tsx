import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Brain, BookOpen, Users, Target, Lightbulb, TrendingUp, Heart, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function AboutSection() {
  // Remove conflicting intersection observer - let parent SectionTransition handle visibility
  const [isInView, setIsInView] = useState(true); // Always true now - parent handles transition
  const sectionRef = useRef<HTMLElement>(null);

  const achievements = [
    { metric: "20+", label: "Years Experience" },
    { metric: "25+", label: "Designers Mentored" },
    { metric: "5+", label: "Design Systems Created" },
    { metric: "10+", label: "Cross-functional Teams Led" }
  ];

  const leadershipSkills = [
    {
      category: 'Strategic Leadership',
      skills: [
        { name: 'Vision & Strategy', icon: Target, description: 'Defining long-term design strategy aligned with business goals' },
        { name: 'Innovation Culture', icon: Lightbulb, description: 'Fostering creative environments that drive breakthrough solutions' }
      ]
    },
    {
      category: 'People Leadership',
      skills: [
        { name: 'Team Development', icon: Users, description: 'Mentoring and growing design talent across all experience levels' },
        { name: 'Empathetic Management', icon: Heart, description: 'Leading with emotional intelligence and genuine care for team wellbeing' }
      ]
    },
    {
      category: 'Execution Excellence',
      skills: [
        { name: 'Process Optimization', icon: TrendingUp, description: 'Streamlining workflows and establishing scalable design systems' },
        { name: 'Change Management', icon: Zap, description: 'Successfully navigating organizational transformations and design maturity' }
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelors of Computer Science",
      field: "Interaction Design",
      school: "Missouri College",
      year: "2009",
      icon: GraduationCap
    },
    {
      degree: "Minor in Cognitive Psychology",
      field: "Social Sciences & Digital Interaction",
      school: "Southwestern Illinois College",
      year: "2003",
      icon: Brain
    },
    {
      degree: "Human Computer Interaction Certificate",
      field: "Human-Computer Interaction",
      school: "MIT Professional Education",
      year: "2019",
      icon: BookOpen
    }
  ];

  // Add a fallback visibility trigger after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden min-h-screen"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Leadership Philosophy Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-6xl mx-auto px-6 mb-12"
      >
        <div className="bg-gradient-to-r from-cyan-50/80 to-blue-50/80 dark:from-cyan-900/20 dark:to-blue-900/20 backdrop-blur-sm rounded-2xl p-8 border border-cyan-100/50 dark:border-cyan-800/30">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full px-4 py-2 mb-4"
            >
              <Users className="w-4 h-4 text-white" />
              <span className="text-white font-medium">Leadership Philosophy</span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto"
            >
              <span className="font-semibold text-cyan-600 dark:text-cyan-400">Leadership through empathy.</span> I believe the best design leaders don't just manage—they inspire, mentor, and create environments where creativity and human-centered thinking flourish. My approach combines strategic vision with genuine care for both the people I lead and the users we serve.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Leadership Skills Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto px-6 mb-20"
      >
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-cyan-600 border-cyan-200 dark:text-cyan-400 dark:border-cyan-800 text-sm px-3 py-1">
            Core Leadership Competencies
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Leading with <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Purpose & Impact</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {leadershipSkills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 + categoryIndex * 0.2 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  {category.category}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + categoryIndex * 0.2 + skillIndex * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="group bg-gray-50/70 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-300/50 dark:hover:border-cyan-600/50 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <IconComponent size={20} className="text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {skill.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header Section with Better Typography */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-6 text-cyan-600 border-cyan-200 dark:text-cyan-400 dark:border-cyan-800 text-base px-4 py-2">
            About Melissa
          </Badge>
          
          {/* Large, prominent heading following UX typography best practices */}
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Designing Experiences
          </motion.h1>
          
          {/* Larger, more readable intro copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              With over two decades of experience in UX design and a deep understanding of cognitive psychology, 
              I create digital experiences that not only look beautiful but fundamentally understand how people think, 
              feel, and interact with technology.
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
              Every pixel serves a purpose. Every interaction tells a story. Every design decision is rooted in 
              research, empathy, and a relentless focus on the human experience.
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Achievement Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Impact & Achievements
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Two decades of creating meaningful digital experiences
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                      {achievement.metric}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education Background */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Education & Credentials
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Academic foundation in design and human psychology
                </p>
              </div>

              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {education.map((edu, index) => {
                      const IconComponent = edu.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 2.6 + index * 0.1 }}
                          className="flex items-start space-x-4"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                              <IconComponent size={24} className="text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {edu.degree}
                            </h5>
                            <p className="text-base text-cyan-600 dark:text-cyan-400 mb-1">
                              {edu.field}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {edu.school} • {edu.year}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
        </div>
      </div>
    </section>
  );
}