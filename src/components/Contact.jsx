import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

const Contact = () => {
  const { isDarkMode, theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 3000);
    }, 2000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'bxl-github',
      url: 'https://github.com/muhgalihhh',
      color: 'hover:text-gray-400',
    },
    {
      name: 'LinkedIn',
      icon: 'bxl-linkedin',
      url: 'https://linkedin.com/in/muhamadgalih0803',
      color: 'hover:text-blue-400',
    },
    {
      name: 'Email',
      icon: 'bx-envelope',
      url: 'mailto:muhamadgalih0803@gmail.com',
      color: 'hover:text-red-400',
    },
    {
      name: 'WhatsApp',
      icon: 'bxl-whatsapp',
      url: 'https://wa.me/6285799196683',
      color: 'hover:text-green-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const socialVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.main className="flex items-center justify-center min-h-screen px-3 py-4 md:px-4 md:py-8" variants={containerVariants} initial="hidden" animate="visible">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div className="space-y-4 text-center md:space-y-8" variants={itemVariants}>
          {/* Header */}
          <motion.div className="space-y-1 md:space-y-3" variants={itemVariants}>
            <motion.h1
              className={`text-2xl md:text-3xl lg:text-4xl font-bold ${theme.textPrimary}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              Let's Connect
            </motion.h1>
            <motion.p className={`text-sm md:text-lg ${theme.textSecondary} max-w-2xl mx-auto px-2`} variants={itemVariants}>
              Ready to discuss opportunities and collaborate on projects.
            </motion.p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div className="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-3" variants={itemVariants}>
            {[
              { icon: 'bx-map', title: 'Location', content: 'Purwokerto, Central Java' },
              { icon: 'bx-envelope', title: 'Email', content: 'muhamadgalih0803@gmail.com' },
              { icon: 'bx-time', title: 'Response', content: 'Within 24 hours' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className={`p-2 md:p-4 rounded-lg md:rounded-xl ${theme.cardBackground} border ${theme.border}`}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`inline-flex p-1.5 md:p-2 rounded-md md:rounded-lg ${theme.buttonPrimary} mb-1 md:mb-3`}
                  whileHover={{ rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <i className={`text-sm md:text-lg bx ${item.icon}`}></i>
                </motion.div>
                <h3 className={`font-semibold ${theme.textPrimary} mb-0.5 md:mb-1 text-sm md:text-base`}>{item.title}</h3>
                <p className={`text-xs md:text-sm ${theme.textSecondary}`}>{item.content}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div className="space-y-2 md:space-y-4" variants={itemVariants}>
            <motion.h3
              className={`text-base md:text-lg font-semibold ${theme.textPrimary}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              Social Media
            </motion.h3>
            <motion.div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-3" variants={containerVariants}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex items-center justify-center md:justify-start space-x-1 md:space-x-2 
                    px-2 md:px-3 py-1.5 md:py-2 rounded-md md:rounded-lg border transition-all duration-300
                    ${theme.socialBackground} ${theme.socialText} ${theme.socialHover}
                  `}
                  variants={socialVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.i className={`text-base md:text-lg bx ${social.icon}`} whileHover={{ rotate: 10 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} />
                  <span className="text-xs font-medium md:text-sm">{social.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default Contact;
