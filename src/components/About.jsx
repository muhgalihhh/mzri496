import React, { useState } from 'react';

import { useTheme } from '../../hooks/useTheme';
import Stack from '../blocks/Components/Stack/Stack';

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { theme, isDarkMode } = useTheme();

  const images = [
    { id: 1, img: '/images/1.png' },
    { id: 2, img: '/images/2.jpg' },
    { id: 3, img: '/images/3.png' },
    { id: 4, img: '/images/4.JPG' },
  ];

  const techStack = [
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      color: 'from-blue-600 to-blue-400',
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      color: 'from-cyan-500 to-teal-500',
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: 'from-green-600 to-green-400',
    },
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: 'from-yellow-500 to-yellow-400',
    },
    {
      name: 'PostgreSQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      color: 'from-purple-500 to-purple-400',
    },
    {
      name: 'PHP',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      color: 'from-blue-700 to-blue-500',
    },
    {
      name: 'Laravel',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
      color: 'from-red-500 to-red-400',
    },
    {
      name: 'Postman',
      icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
      color: 'from-orange-500 to-orange-400',
    },
    {
      name: 'Adobe Photoshop',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
      color: 'from-pink-500 to-pink-400',
    },
    {
      name: 'Adobe Illustrator',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
      color: 'from-blue-500 to-blue-400',
    },
    {
      name: 'Figma',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      color: 'from-purple-500 to-purple-400',
    },
  ];

  return (
    <main className={`flex items-center justify-center min-h-screen px-4 ${theme.backgroundGradient} lg:px-8`}>
      <div className="relative w-full max-w-7xl">
        <div className="grid items-center h-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Section - Stack Component */}
          <div className="flex items-center justify-center lg:justify-start">
            <div className="relative w-full h-56 max-w-md">
              <div className="relative flex justify-center w-full h-full">
                <Stack randomRotation={true} sensitivity={180} sendToBackOnClick={false} cardDimensions={{ width: 300, height: 200 }} cardsData={images} />
              </div>
            </div>
          </div>

          {/* Right Section - About Me */}
          <div className="space-y-3 text-center lg:text-left">
            <div className="space-y-6">
              <div
                className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full text-sm font-medium ${theme.textAccent} border ${theme.border} ${theme.borderHover}`}
              >
                <i className="mr-2 bx bx-user"></i>
                About Me
              </div>

              <h1 className={`text-xl font-bold leading-tight ${theme.textPrimary} md:text-2xl lg:text-3xl xl:text-3xl`}>
                Hi, I'm a
                <br />
                <span className={theme.gradientText}>Full Stack Developer</span>
              </h1>

              <p className={`max-w-lg mx-auto text-sm leading-relaxed md:text-md lg:text-md ${theme.textSecondary} lg:mx-0`}>
                Passionate about creating exceptional digital experiences through innovative web solutions. I bring ideas to life with modern technologies and clean, efficient code.
              </p>
            </div>

            {/* Tech Stack - Infinite Loop */}
            <div className="space-y-4">
              <h3 className={`text-md font-semibold ${theme.textPrimary}`}>Technologies I Work With</h3>
              <div className={`relative overflow-hidden rounded-xl ${theme.cardBackground} p-2`}>
                <div className="flex animate-scroll-infinite">
                  {/* First set of tech stack */}
                  {techStack.map((tech, index) => (
                    <div
                      key={`first-${index}`}
                      className={`flex-shrink-0 mx-1 px-3 py-2 rounded-lg bg-gradient-to-r ${tech.color} text-white shadow-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                        <span className="text-sm font-medium whitespace-nowrap">{tech.name}</span>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {techStack.map((tech, index) => (
                    <div
                      key={`second-${index}`}
                      className={`flex-shrink-0 mx-1 px-3 py-2 rounded-lg bg-gradient-to-r ${tech.color} text-white shadow-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                        <span className="text-sm font-medium whitespace-nowrap">{tech.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className={`flex items-center justify-center lg:justify-start space-x-8 text-sm ${theme.textSecondary}`}>
              <div className="flex items-center">
                <i className={`bx bx-code-curly ${theme.textAccent} mr-2`}></i>
                <span className={theme.textSecondary}>3+ Years Experience (Education)</span>
              </div>
              <div className="flex items-center">
                <i className={`bx bx-briefcase ${theme.textAccent} mr-2`}></i>
                <span className={theme.textSecondary}>5+ Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className={`absolute w-32 h-32 rounded-full top-1/4 left-1/4 bg-gradient-to-r ${isDarkMode ? 'from-orange-500/10 to-pink-500/10' : 'from-orange-200/30 to-pink-200/30'} blur-3xl`}></div>
        <div
          className={`absolute w-40 h-40 rounded-full bottom-1/4 right-1/4 bg-gradient-to-r ${isDarkMode ? 'from-pink-500/10 to-orange-500/10' : 'from-pink-200/30 to-orange-200/30'} blur-3xl`}
        ></div>
      </div>

      {/* Custom CSS for infinite scroll animation */}
      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 20s linear infinite;
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </main>
  );
};

export default About;
