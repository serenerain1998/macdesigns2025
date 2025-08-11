import { ArrowUp, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center text-2xl font-bold">
              <span className="text-white">MAC </span>
              <span className="text-gradient">DESIGNS</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Crafting exceptional user experiences through human-centered design, emerging technologies, and strategic thinking.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Mac Designs. All Rights Reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Designed and built with passion for great UX
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Linkedin size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Github size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Mail size={20} />
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            Built with React, Tailwind CSS, and thoughtful UX principles
          </div>
          
          <Button 
            onClick={scrollToTop}
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-800 mt-4 md:mt-0"
          >
            Back to Top
            <ArrowUp className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </footer>
  );
}