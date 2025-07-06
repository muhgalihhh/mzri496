import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

const FloatingNavbar = ({ activeSection, onNavigate }) => {
  const { isDarkMode, theme } = useTheme();
  const [isHidden, setIsHidden] = useState(false);

  const navItems = [
    { id: 'home', label: "Hi, I'm Galih", icon: 'bx-home' },
    { id: 'about', label: 'About Me', icon: 'bx-user' },
    { id: 'experience', label: 'Experience', icon: 'bx-briefcase' },
    { id: 'contact', label: 'Contact Me', icon: 'bx-envelope' },
  ];

  const handleItemClick = (id) => {
    // Gunakan onNavigate prop untuk scroll ke section yang tepat
    if (onNavigate) {
      onNavigate(id);
    }
  };

  const toggleHide = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <nav className="fixed z-50">
        {/* Desktop: Left side vertical */}
        <div
          className={`hidden md:flex md:flex-col md:fixed md:left-6 md:top-1/2 md:transform md:-translate-y-1/2 transition-all duration-700 ease-in-out ${
            isHidden ? 'md:-translate-x-full md:opacity-0 md:scale-75 md:rotate-12' : 'md:translate-x-0 md:opacity-100 md:scale-100 md:rotate-0'
          }`}
          style={{
            transformOrigin: 'center right',
          }}
        >
          {/* Navigation Items */}
          <div className={`relative flex flex-col p-4 space-y-3 border shadow-2xl rounded-2xl ${theme.navBackground}`}>
            {/* Hide Toggle Button - positioned absolutely in top-right corner */}
            <button
              onClick={toggleHide}
              className={`absolute -top-2 -right-2 p-1.5 transition-all duration-300 border shadow-lg rounded-lg hover:scale-110 ${
                isDarkMode
                  ? 'text-orange-200 bg-gradient-to-r from-orange-500/80 to-pink-500/80 backdrop-blur-xl border-orange-500/30 hover:bg-gradient-to-r hover:from-orange-500/90 hover:to-pink-500/90'
                  : 'text-white bg-gradient-to-r from-orange-500/90 to-pink-500/90 backdrop-blur-xl border-orange-300/40 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500'
              }`}
            >
              <i className="text-sm bx bx-x"></i>
            </button>

            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  group relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300
                  ${activeSection === item.id ? `${theme.navActive} shadow-lg transform scale-105` : `${theme.navText} ${theme.navHover} hover:transform hover:scale-105`}
                `}
                style={{
                  transitionDelay: isHidden ? '0ms' : `${index * 50}ms`,
                }}
              >
                <div className="flex items-center space-x-3">
                  <i className={`bx ${item.icon} text-lg`}></i>
                </div>

                {/* Glow effect */}
                <div
                  className={`
                  absolute inset-0 rounded-xl blur-xl transition-opacity duration-300 -z-10
                  ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-orange-400/50 to-pink-400/50 opacity-100'
                      : `bg-gradient-to-r ${isDarkMode ? 'from-orange-500/20 to-pink-500/20' : 'from-orange-300/30 to-pink-300/30'} opacity-0 group-hover:opacity-100`
                  }
                `}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: Bottom center horizontal */}
        <div
          className={`md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-in-out ${
            isHidden ? 'translate-y-full opacity-0 scale-75 rotate-6' : 'translate-y-0 opacity-100 scale-100 rotate-0'
          }`}
          style={{
            transformOrigin: 'center bottom',
          }}
        >
          {/* Navigation Items */}
          <div className={`relative flex p-3 space-x-2 border shadow-2xl rounded-2xl ${theme.navBackground}`}>
            {/* Hide Toggle Button - positioned absolutely in top-right corner */}
            <button
              onClick={toggleHide}
              className={`absolute -top-2 -right-2 p-1.5 transition-all duration-300 border shadow-lg rounded-lg hover:scale-110 ${
                isDarkMode
                  ? 'text-orange-200 bg-gradient-to-r from-orange-500/80 to-pink-500/80 backdrop-blur-xl border-orange-500/30 hover:bg-gradient-to-r hover:from-orange-500/90 hover:to-pink-500/90'
                  : 'text-white bg-gradient-to-r from-orange-500/90 to-pink-500/90 backdrop-blur-xl border-orange-300/40 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500'
              }`}
            >
              <i className="text-sm bx bx-x"></i>
            </button>

            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  group relative px-3 py-2 rounded-xl font-medium text-xs transition-all duration-300
                  ${activeSection === item.id ? `${theme.navActive} shadow-lg transform scale-105` : `${theme.navText} ${theme.navHover} hover:transform hover:scale-105`}
                `}
                style={{
                  transitionDelay: isHidden ? '0ms' : `${index * 50}ms`,
                }}
              >
                <div className="flex flex-col items-center space-y-1">
                  <i className={`bx ${item.icon} text-base`}></i>
                  <span className="text-xs leading-tight whitespace-nowrap">{item.label.includes("I'm") ? 'Galih' : item.label.split(' ')[0]}</span>
                </div>

                {/* Glow effect */}
                <div
                  className={`
                  absolute inset-0 rounded-xl blur-xl transition-opacity duration-300 -z-10
                  ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-orange-400/50 to-pink-400/50 opacity-100'
                      : `bg-gradient-to-r ${isDarkMode ? 'from-orange-500/20 to-pink-500/20' : 'from-orange-300/30 to-pink-300/30'} opacity-0 group-hover:opacity-100`
                  }
                `}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Show Button when hidden - Desktop */}
        {isHidden && (
          <button
            onClick={toggleHide}
            className={`fixed hidden p-3 transition-all duration-700 ease-out transform -translate-y-1/2 border shadow-lg md:block left-2 top-1/2 rounded-xl hover:scale-110 animate-pulse ${
              isDarkMode
                ? 'text-orange-200 bg-gradient-to-r from-orange-500/90 to-pink-500/90 backdrop-blur-xl border-orange-500/30 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500'
                : 'text-white bg-gradient-to-r from-orange-500/90 to-pink-500/90 backdrop-blur-xl border-orange-300/40 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500'
            }`}
            style={{
              animation: 'slideInLeft 0.7s ease-out',
            }}
          >
            <i className="text-lg bx bx-menu"></i>
          </button>
        )}

        {/* Show Button when hidden - Mobile */}
        {isHidden && (
          <button
            onClick={toggleHide}
            className={`fixed p-3 transition-all duration-700 ease-out transform -translate-x-1/2 border shadow-lg md:hidden bottom-4 left-1/2 rounded-xl hover:scale-110 animate-pulse ${
              isDarkMode
                ? 'text-orange-200 bg-gradient-to-r from-orange-500/90 to-pink-500/90 backdrop-blur-xl border-orange-500/30 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500'
                : 'text-white bg-gradient-to-r from-orange-500/90 to-pink-500/90 backdrop-blur-xl border-orange-300/40 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500'
            }`}
            style={{
              animation: 'slideInUp 0.7s ease-out',
            }}
          >
            <i className="text-lg bx bx-menu"></i>
          </button>
        )}
      </nav>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%) translateY(-50%);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingNavbar;
