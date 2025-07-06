import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

const Experience = () => {
  const { isDarkMode, theme } = useTheme();
  const [activeTab, setActiveTab] = useState('education');
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedItems, setExpandedItems] = useState({});

  // Data untuk setiap tab
  const educationData = [
    {
      id: 1,
      title: 'Bachelor of Informatics',
      institution: 'Universitas Jenderal Soedirman',
      period: '2022-2026 (expected)',
      description: 'Focused on Design Graphics, Web Development, and Machine Learning',
      grade: 'GPA: 3.78/4.0 (Semester 1-5)',
      achievements: [],
      icon: 'bx-graduation',
      logo: '/images/Unsoed.png',
      website: 'https://unsoed.ac.id',
      programLink: 'https://if.unsoed.ac.id/',
    },
    {
      id: 2,
      title: 'Jurusan IPA (Science)',
      institution: 'Madrasah Aliyah Negeri 2 Cilacap',
      period: '2019-2022',
      description: 'High school education with a focus on science and mathematics',
      grade: 'Vice chairman of fine arts extracurricular',
      achievements: ['3 Years Scholarship', 'Vice Chairman of Fine Arts Extracurricular'],
      icon: 'bx-graduation',
      logo: '/images/MAN.jpeg',
      website: 'https://man2cilacap.sch.id',
    },
    {
      id: 3,
      title: 'Machine Learning and Web Development Courses',
      institution: 'Multiple Online Platforms',
      period: '2022 - Present',
      description: 'Completed various online courses in Machine Learning and Web Development',
      grade: 'Multiple Certifications',
      achievements: ['Capstone Projects', 'Industry Certifications'],
      icon: 'bx-brain',
      courses: [
        { name: 'Machine Learning Specialization', platform: 'Coursera', link: 'https://coursera.org/specializations/machine-learning' },
        { name: 'Full Stack Web Development', platform: 'freeCodeCamp', link: 'https://freecodecamp.org/learn' },
        { name: 'Python for Data Science', platform: 'Udemy', link: 'https://udemy.com/course/python-for-data-science-and-machine-learning-bootcamp' },
        { name: 'React Development', platform: 'Udacity', link: 'https://udacity.com/course/react-nanodegree--nd019' },
      ],
    },
  ];

  const projectsData = [
    {
      id: 1,
      title: 'Optimalisasi Pemenuhan Gizi dengan Algoritma Genetika untuk RDA',
      tech: ['Python', 'NumPy', 'Pandas'],
      period: '2025',
      description: 'Membuat model Algoritma Genetika untuk solusi optimum dari masalah pemenuhan Angka Kecukupan Gizi AKG atau Recommended Dietary Allowances RDA',
      status: 'Completed',
      liveLink: 'https://drive.google.com/file/d/1QmFOcjxWSZfAD4BUlVoWUTTG5un7Qws9/view?usp=sharing',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
      icon: 'bx-food-menu',
      features: ['Data Analysis', 'Genetic Algorithm', 'Optimization', 'Visualization'],
    },
    {
      id: 2,
      title: 'Optimalisasi Portofolio Saham dengan Algoritma Genetika',
      tech: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
      period: '2025',
      description: 'Implementasi Algoritma Genetika untuk Penentuan Komposisi Portofolio Saham Optimal dengan Pendekatan Multi-Objektif',
      status: 'Completed',
      githubLink: 'https://github.com/muhgalihhh/optimalisasi_portofolio_saham',
      liveLink: 'https://github.com/muhgalihhh/optimalisasi_portofolio_saham/blob/Muhamad-galih/Laporan%20Algoritma%20Genetika.pdf',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=80',
      icon: 'bx-chart',
      features: ['Portfolio Optimization', 'Multi-Objective Genetic Algorithm', 'Data Visualization', 'Financial Analysis'],
    },
    {
      id: 3,
      title: 'Profiling Cluster Data Pengguna Spotify',
      tech: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib'],
      period: '2025',
      description: 'Pemodelan Pengguna Spotify Menggunakan Machine Learning: Reduksi Dimensi, Klasterisasi, dan Analisis Aturan Asosiasi',
      status: 'Completed',
      githubLink: 'https://colab.research.google.com/drive/1Y92CbYR5-mOt1WWy_2psRj_mJJHGh5K2?usp=sharing',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&q=80',
      icon: 'bx-music',
      features: ['User Profiling', 'Clustering', 'Dimensionality Reduction', 'Association Rule Mining'],
    },
    {
      id: 4,
      title: 'Prediksi Harga Emas dengan Klasifikasi dan Regresi',
      tech: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib'],
      period: '2025',
      description: 'Membuat Model Klasifikasi dan Regresi untuk Prediksi Harga Emas Menggunakan Data Historis',
      status: 'Completed',
      githubLink: 'https://github.com/muhgalihhh/imageprocessing',
      liveLink: 'https://drive.google.com/file/d/1bpo_tR_wDL9rPyAiDGIsM2OPamfrLMye/view?usp=sharing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
      icon: 'bx-stats',
      features: ['Price Prediction', 'Classification', 'Regression', 'Data Visualization'],
    },
    {
      id: 5,
      title: 'Aplikasi Pengolahan Citra Digital',
      tech: ['Python', 'NumPy', 'OpenCV'],
      period: '2025',
      description: 'Aplikasi untuk pengolahan citra digital dengan berbagai fitur pengolahan gambar dasar seperti filter, deteksi tepi, segmentasi, dan transformasi geometris',
      status: 'Completed',
      githubLink: 'https://colab.research.google.com/drive/12vtbRDqh-dh7SUZB6TaKizkskUYq9N_d?usp=sharing',
      liveLink: 'https://drive.google.com/file/d/122jc4176u8IcGMVdxhbX3fJF7JkrDzIc/view?usp=sharing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
      icon: 'bx-image',
      features: ['Image Filtering', 'Edge Detection', 'Segmentation', 'Geometric Transformations'],
    },
  ];

  const workData = [
    {
      id: 1,
      title: 'Website Developer',
      company: 'BKPSDM Kota Banjar',
      period: 'Jul 2024 - Sep 2024',
      description: 'Developing responsive web applications using Laravel and Filament UI',
      responsibilities: ['UI/UX Implementation', 'Code Review', 'Performance Optimization', 'Team Collaboration', 'Web Dev'],
      type: 'Full-time intern',
      location: 'West Java, Indonesia',
      icon: 'bx-code-block',
      companyWebsite: 'https://banjarkota.go.id/pengumuman/',
      portfolio: [
        { name: 'Company Dashboard', link: 'https://dashboard.techsolutions.com' },
        { name: 'Client Portal', link: 'https://portal.techsolutions.com' },
      ],
    },
  ];

  const tabs = [
    { id: 'education', label: 'Education', icon: 'bx-graduation', data: educationData },
    { id: 'projects', label: 'Projects', icon: 'bx-code-alt', data: projectsData },
    { id: 'work', label: 'Work & Organization', icon: 'bx-briefcase', data: workData },
  ];

  const currentData = tabs.find((tab) => tab.id === activeTab)?.data || [];
  const itemsPerPage = 2;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = currentData.slice(startIndex, startIndex + itemsPerPage);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(0);
    setExpandedItems({});
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpandedItems({});
  };

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const tabVariants = {
    inactive: { scale: 0.95, opacity: 0.7 },
    active: { scale: 1, opacity: 1 },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const expandVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] lg:px-20 p-2">
      <motion.div className="w-full max-w-6xl" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}

        {/* Tabs */}
        <motion.div className="flex justify-center mb-6" variants={itemVariants}>
          <div className={`flex p-1 rounded-2xl ${theme.navBackground}`}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center px-2 py-1 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.id ? `${theme.navActive} ` : `${theme.textSecondary} hover:${theme.textPrimary}`
                }`}
                variants={tabVariants}
                animate={activeTab === tab.id ? 'active' : 'inactive'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`bx ${tab.icon} mr-2 text-lg`}></i>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <div className="min-h-[350px] mb-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="grid grid-cols-1 gap-4 lg:grid-cols-2" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              {currentItems.map((item) => (
                <motion.div
                  key={`${activeTab}-${item.id}`}
                  variants={cardVariants}
                  className={`p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200/50'}`}
                >
                  {/* Header - Always visible */}
                  <div
                    className="flex flex-col p-3 transition-all duration-200 rounded-lg cursor-pointer sm:flex-row sm:items-center sm:justify-between sm:p-4 group hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-pink-500/5"
                    onClick={() => toggleExpanded(item.id)}
                  >
                    {/* Main Content */}
                    <div className="flex items-center flex-1 min-w-0 gap-3 sm:gap-4">
                      {/* Icon/Logo Container */}
                      <div className="flex-shrink-0 p-2 rounded-lg sm:p-3 bg-gradient-to-r from-orange-500/20 to-pink-500/20">
                        {activeTab === 'education' && item.logo ? (
                          <img src={item.logo} alt="Institution Logo" className="object-contain w-6 h-6 sm:w-8 sm:h-8" />
                        ) : (
                          <i className={`bx ${item.icon} text-base sm:text-lg`}></i>
                        )}
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base sm:text-lg font-semibold ${theme.textPrimary} truncate`}>{item.title}</h3>
                        <p className={`text-xs sm:text-sm ${theme.textSecondary} truncate mt-0.5`}>
                          {activeTab === 'education' ? item.institution : activeTab === 'work' ? item.company : item.period}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge and Chevron */}
                    <div className="flex items-center justify-between flex-shrink-0 mt-2 sm:justify-end sm:mt-0 sm:ml-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${theme.textPrimary} bg-gradient-to-r from-orange-500/10 to-pink-500/10 whitespace-nowrap`}>
                        {activeTab === 'education' ? item.period : activeTab === 'projects' ? item.status : item.type}
                      </span>

                      {/* Chevron with Animation */}
                      <motion.div
                        animate={{ rotate: expandedItems[item.id] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`${theme.textSecondary} group-hover:${theme.textPrimary} transition-colors duration-200 ml-2 sm:ml-3 flex-shrink-0`}
                      >
                        <i className="text-sm bx bx-chevron-down sm:text-base"></i>
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedItems[item.id] && (
                      <motion.div variants={expandVariants} initial="hidden" animate="visible" exit="hidden" className="overflow-hidden">
                        <div className="pt-4 space-y-3">
                          <p className={`text-sm ${theme.textSecondary}`}>{item.description}</p>

                          {/* Education Details */}
                          {activeTab === 'education' && (
                            <>
                              <div className="flex items-center justify-between">
                                <span className={`text-sm font-medium ${theme.textPrimary}`}>{item.grade}</span>
                                <div className="flex flex-wrap gap-1">
                                  {item.achievements.map((achievement, i) => (
                                    <span key={i} className={`text-xs px-2 py-1 rounded-full ${theme.textPrimary} bg-gradient-to-r from-orange-500/10 to-pink-500/10`}>
                                      {achievement}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/20">
                                {item.website && (
                                  <motion.a
                                    href={item.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <i className="bx bx-globe"></i>
                                    Website
                                  </motion.a>
                                )}
                                {item.programLink && (
                                  <motion.a
                                    href={item.programLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <i className="bx bx-book-open"></i>
                                    Program
                                  </motion.a>
                                )}
                                {item.courses &&
                                  item.courses.map((course, i) => (
                                    <motion.a
                                      key={i}
                                      href={course.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      <i className="bx bx-link-external"></i>
                                      {course.name}
                                    </motion.a>
                                  ))}
                              </div>
                            </>
                          )}

                          {/* Projects Details */}
                          {activeTab === 'projects' && (
                            <>
                              <div className="flex flex-wrap gap-2">
                                {item.tech.map((tech, i) => (
                                  <span key={i} className={`text-xs px-2 py-1 rounded-full ${theme.textPrimary} bg-gradient-to-r from-orange-500/10 to-pink-500/10`}>
                                    {tech}
                                  </span>
                                ))}
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {item.features.map((feature, i) => (
                                  <span key={i} className={`text-xs px-2 py-1 rounded-full ${theme.textSecondary} bg-gradient-to-r from-gray-500/10 to-gray-500/10`}>
                                    {feature}
                                  </span>
                                ))}
                              </div>

                              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/20">
                                {item.githubLink && (
                                  <motion.a
                                    href={item.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <i className="bx bx-code"></i>
                                    Source Code
                                  </motion.a>
                                )}
                                {item.liveLink && (
                                  <motion.a
                                    href={item.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <i className="bx bx-link-external"></i>
                                  </motion.a>
                                )}
                              </div>
                            </>
                          )}

                          {/* Work Details */}
                          {activeTab === 'work' && (
                            <>
                              <div className="flex items-center justify-between text-sm">
                                <span className={`${theme.textSecondary}`}>{item.period}</span>
                                <span className={`${theme.textSecondary}`}>{item.location}</span>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {item.responsibilities.map((resp, i) => (
                                  <span key={i} className={`text-xs px-2 py-1 rounded-full ${theme.textPrimary} bg-gradient-to-r from-orange-500/10 to-pink-500/10`}>
                                    {resp}
                                  </span>
                                ))}
                              </div>

                              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/20">
                                {item.companyWebsite && (
                                  <motion.a
                                    href={item.companyWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <i className="bx bx-globe"></i>
                                    Company
                                  </motion.a>
                                )}
                                {item.companyLinkedIn && (
                                  <motion.a
                                    href={item.companyLinkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <i className="bx bxl-linkedin"></i>
                                    LinkedIn
                                  </motion.a>
                                )}
                                {item.portfolioLink && (
                                  <motion.a
                                    href={item.portfolioLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <i className="bx bx-palette"></i>
                                    Portfolio
                                  </motion.a>
                                )}
                                {item.certificate && (
                                  <motion.a
                                    href={item.certificate}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <i className="bx bx-certificate"></i>
                                    Certificate
                                  </motion.a>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div className="flex items-center justify-center space-x-2" variants={itemVariants} initial="hidden" animate="visible">
            <motion.button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                currentPage === 0
                  ? `${theme.textSecondary} opacity-100 cursor-not-allowed border-gray-300/50`
                  : `${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-500/10 border-gray-300/50 hover:border-orange-500/30`
              } ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200/50'} z-10`} // z-10 added here
              whileHover={{ scale: currentPage === 0 ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === 0 ? 1 : 0.9 }}
            >
              <i className="text-lg bx bx-chevron-left"></i>
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`min-w-10 h-10 rounded-lg font-medium text-sm border transition-all duration-300 ${
                  currentPage === i
                    ? `${theme.navActive} border-orange-500/30`
                    : `${theme.textSecondary} hover:${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-500/10 border-gray-300/50 hover:border-orange-500/30`
                } ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200/50'} z-10`} // z-10 added here
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {i + 1}
              </motion.button>
            ))}

            <motion.button
              onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                currentPage === totalPages - 1
                  ? `${theme.textSecondary} opacity-100 cursor-not-allowed border-gray-300/50`
                  : `${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-500/10 border-gray-300/50 hover:border-orange-500/30`
              } ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200/50'} z-10`} // z-10 added here
              whileHover={{ scale: currentPage === totalPages - 1 ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === totalPages - 1 ? 1 : 0.9 }}
            >
              <i className="text-lg bx bx-chevron-right"></i>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
};

export default Experience;
