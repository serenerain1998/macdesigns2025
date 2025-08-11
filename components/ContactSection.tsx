import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Download, Star, Award, Zap, ArrowRight, CheckCircle, Clock, MessageSquare, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';


const achievements = [
  { icon: Star, text: '20+ Years Leadership', color: 'text-yellow-500' },
  { icon: Award, text: 'Design Systems Expert', color: 'text-blue-500' },
  { icon: Zap, text: 'AI-Powered Workflows', color: 'text-purple-500' }
];

const opportunityTypes = [
  'Senior UX Leadership Roles',
  'Design System Strategy',
  'Team Building & Mentorship', 
  'Product Design Direction',
  'UX Research & Strategy'
];

const quickFacts = [
  '20+ years UX leadership experience',
  'Proven track record in SaaS, medical, and enterprise',
  'Expert in design systems and team scaling',
  'Available for 100% remote opportunities'
];

export function ContactSection() {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);
  const [hoveredFact, setHoveredFact] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);


  const handleEmailClick = () => {
    try {
      // Create and click a temporary link to ensure compatibility
      const link = document.createElement('a');
      link.href = 'mailto:melissa.casole@yahoo.com?subject=UX Leadership Opportunity&body=Hi Melissa,%0D%0A%0D%0AI am interested in discussing potential UX leadership opportunities with you.%0D%0A%0D%0ABest regards,';
      link.target = '_blank';
      link.click();
      
      // Fallback for browsers that might block the above
      window.location.href = link.href;
    } catch (error) {
      // Fallback: copy email to clipboard
      navigator.clipboard.writeText('melissa.casole@yahoo.com').then(() => {
        alert('Email address copied to clipboard: melissa.casole@yahoo.com');
      }).catch(() => {
        alert('Please email me at: melissa.casole@yahoo.com');
      });
    }
  };

  const handlePhoneClick = () => {
    try {
      // Create and click a temporary link to ensure compatibility
      const link = document.createElement('a');
      link.href = 'tel:+16187954580';
      link.click();
      
      // Fallback for browsers that might block the above
      window.location.href = link.href;
    } catch (error) {
      // Fallback: copy phone number to clipboard
      navigator.clipboard.writeText('618.795.4580').then(() => {
        alert('Phone number copied to clipboard: 618.795.4580');
      }).catch(() => {
        alert('Please call me at: 618.795.4580');
      });
    }
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/melissacasole', '_blank');
  };

  const handleResumeDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Check if file exists first
      const response = await fetch('/assets/Melissa_Casole_UX_Resume.pdf', { method: 'HEAD' });
      
      if (response.ok) {
        // File exists, proceed with download
        const link = document.createElement('a');
        link.href = '/assets/Melissa_Casole_UX_Resume.pdf';
        link.download = 'Melissa_Casole_UX_Resume.pdf';
        link.target = '_blank';
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Resume download initiated');
      } else {
        // File doesn't exist, show helpful message
        alert('Resume file not found. Please contact Melissa directly for her latest resume.');
        console.log('Resume file not available at /assets/Melissa_Casole_UX_Resume.pdf');
      }
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: show contact information
      alert('Download unavailable. Please email melissa.casole@yahoo.com to request the latest resume.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-6 dark:opacity-12">
        {/* Primary large orbs */}
        <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply contact-bg-orb-1"></div>
        <div className="absolute bottom-16 right-16 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mix-blend-multiply contact-bg-orb-2"></div>
        
        {/* Secondary medium orbs */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full mix-blend-multiply contact-bg-orb-3"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full mix-blend-multiply contact-bg-orb-4"></div>
        
        {/* Small floating orbs */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full mix-blend-multiply contact-bg-orb-5"></div>
        </div>
        
        {/* Tiny accent orbs */}
        <div className="absolute top-24 right-1/3 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mix-blend-multiply contact-bg-orb-1"></div>
        <div className="absolute bottom-24 left-1/3 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mix-blend-multiply contact-bg-orb-3"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-100/20 to-blue-100/20 dark:from-transparent dark:via-cyan-900/10 dark:to-blue-900/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-24 contact-stagger-1">
          <h2 className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            Let's Work Together
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Ready to bring exceptional UX leadership to your team? 
              <span className="block mt-3 text-cyan-600 dark:text-cyan-400">
                Multiple ways to connect - choose what works best for you.
              </span>
            </p>
            
            {/* Achievement Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-14 contact-stagger-2">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div 
                    key={index}
                    className="contact-achievement-badge group flex items-center bg-gray-50/70 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-8 py-4 border border-cyan-200/50 dark:border-cyan-800/50 hover:bg-cyan-50/80 dark:hover:bg-cyan-900/40"
                  >
                    <IconComponent className={`${achievement.color} mr-4 transition-transform group-hover:scale-110 group-hover:rotate-6`} size={22} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{achievement.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Get In Touch Section - Side by Side Cards */}
        <div className="mb-24 contact-stagger-3">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
              Get In Touch
            </h3>
          </div>
          
          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Email */}
            <div 
              className="contact-method-item group cursor-pointer"
              onMouseEnter={() => setHoveredMethod('email')}
              onMouseLeave={() => setHoveredMethod(null)}
              onClick={handleEmailClick}
            >
              <div className="flex items-center space-x-5 p-8 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/50 dark:border-cyan-800/50 hover:shadow-xl group-hover:shadow-cyan-500/25 backdrop-blur-sm h-full">
                <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Mail className="text-white" size={26} />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 dark:text-white font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-500 text-lg">
                    melissa.casole@yahoo.com
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-cyan-500 transition-colors duration-500">Primary contact method</div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div 
              className="contact-method-item group cursor-pointer"
              onMouseEnter={() => setHoveredMethod('phone')}
              onMouseLeave={() => setHoveredMethod(null)}
              onClick={handlePhoneClick}
            >
              <div className="flex items-center space-x-5 p-8 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/50 dark:border-cyan-800/50 hover:shadow-xl group-hover:shadow-cyan-500/25 backdrop-blur-sm h-full">
                <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Phone className="text-white" size={26} />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 dark:text-white font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-500 text-lg">
                    618.795.4580
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-cyan-500 transition-colors duration-500">Call or text anytime</div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-2 xl:col-span-1">
              <div className="flex items-center space-x-5 p-8 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/50 dark:border-cyan-800/50 backdrop-blur-sm h-full">
                <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl">
                  <MapPin className="text-white" size={26} />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 dark:text-white font-semibold text-lg">
                    Bradenton, FL
                  </div>
                  <div className="text-sm text-gray-500">Available for 100% remote</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Enhanced Card Style */}
          <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
            {/* LinkedIn Button Card */}
            <div 
              className="contact-method-item group cursor-pointer flex-1 min-w-0"
              onClick={handleLinkedInClick}
            >
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/50 dark:border-cyan-800/50 hover:shadow-xl group-hover:shadow-cyan-500/25 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden relative">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-cyan-500/25 relative z-10">
                  <Linkedin className="text-white" size={20} />
                </div>
                <div className="flex-1 relative z-10">
                  <div className="text-gray-900 dark:text-white font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-500">
                    LinkedIn
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-cyan-500 transition-colors duration-500">Connect professionally</div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 relative z-10">
                  <ArrowRight className="text-cyan-500" size={16} />
                </div>
              </div>
            </div>

            {/* Resume Button Card */}
            <div 
              className={`contact-method-item group cursor-pointer flex-1 min-w-0 ${isDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={!isDownloading ? handleResumeDownload : undefined}
            >
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-xl group-hover:shadow-blue-500/25 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden relative">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-blue-500/25 relative z-10">
                  {isDownloading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="text-white" size={20} />
                  )}
                </div>
                <div className="flex-1 relative z-10">
                  <div className="text-gray-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">
                    {isDownloading ? 'Downloading...' : 'Resume'}
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-500">
                    {isDownloading ? 'Please wait...' : 'Download PDF'}
                  </div>
                </div>
                <div className={`transition-opacity duration-500 relative z-10 ${isDownloading ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                  <ArrowRight className="text-blue-500" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* For Recruiters Section - Wide Format */}
        <div className="mb-24 contact-stagger-4">
          <div className="contact-card bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 rounded-3xl p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-lg backdrop-blur-sm">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Header Section */}
              <div className="lg:col-span-1">
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse mr-4"></div>
                  For Recruiters
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                  I'm actively seeking my next leadership role where I can drive UX strategy, 
                  build high-performing design teams, and create user-centered solutions.
                </p>

                {/* Availability Status */}
                <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-2xl border border-green-200/50 dark:border-green-800/50 backdrop-blur-sm">
                  <div className="flex items-center mb-3">
                    <Clock size={18} className="text-green-600 mr-3" />
                    <span className="text-green-800 dark:text-green-200 font-semibold text-lg">Ready to Start Immediately</span>
                  </div>
                  <p className="text-green-700 dark:text-green-300 leading-relaxed">
                    Available for new opportunities. Can begin within 2-4 weeks notice period.
                  </p>
                </div>
              </div>

              {/* Quick Facts Section */}
              <div className="lg:col-span-2">
                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Quick Facts:</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {quickFacts.map((fact, index) => (
                    <div 
                      key={index}
                      className={`flex items-start space-x-4 p-6 rounded-xl transition-all duration-500 cursor-pointer ${
                        hoveredFact === index 
                          ? 'bg-cyan-50 dark:bg-cyan-900/30 transform translate-x-2 scale-102' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                      onMouseEnter={() => setHoveredFact(index)}
                      onMouseLeave={() => setHoveredFact(null)}
                    >
                      <CheckCircle 
                        size={20} 
                        className={`mt-1 transition-all duration-500 flex-shrink-0 ${
                          hoveredFact === index 
                            ? 'text-cyan-500 scale-110 rotate-12' 
                            : 'text-green-500'
                        }`} 
                      />
                      <span className="text-gray-700 dark:text-gray-300 flex-1 leading-relaxed text-lg">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity Types */}
        <div className="text-center mb-20 contact-stagger-5">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
            Open to These Opportunities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {opportunityTypes.map((type, index) => (
              <div 
                key={index}
                className="contact-opportunity-card group p-8 bg-gradient-to-br from-white/80 to-cyan-50/80 dark:from-gray-800/80 dark:to-cyan-900/30 rounded-2xl border border-cyan-200/50 dark:border-cyan-800/50 backdrop-blur-sm"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-cyan-500/25">
                    <ArrowRight className="text-white group-hover:translate-x-1 transition-transform duration-500" size={24} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-semibold leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-500 text-lg">
                    {type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center contact-stagger-5">
          <div className="inline-flex items-center space-x-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500">
            <Star className="text-yellow-500 animate-pulse" size={18} />
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Preferred contact: Email first, then phone follow-up for qualified opportunities
            </span>
          </div>
        </div>

        {/* Visual Case Studies Availability */}
        <motion.div 
          className="text-center mt-8 contact-stagger-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-50/80 to-blue-50/80 dark:from-cyan-900/20 dark:to-blue-900/20 backdrop-blur-sm rounded-full px-8 py-4 border border-cyan-200/30 dark:border-cyan-700/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 group">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Award className="text-cyan-500 group-hover:text-cyan-400 transition-colors" size={18} />
            </motion.div>
            <span className="text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                Visual case studies
              </span>
              {" "}available upon request for serious inquiries
            </span>
          </div>
        </motion.div>
      </div>


    </section>
  );
}