// src/components/portfolio/PortfolioGrid.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PortfolioGridProps {
  locale?: 'en' | 'he';
  selectedCategory: string;
  selectedProject: number | null;
  setSelectedProject: (id: number | null) => void;
  viewMode: 'grid' | 'list';
}

export default function PortfolioGrid({ 
  locale = 'en', 
  selectedCategory,
  setSelectedProject,
  viewMode
}: PortfolioGridProps) {
  const isRTL = locale === 'he';
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  const projects = [
    {
      id: 1,
      title: 'FinFlow Dashboard',
      client: 'FinTech Innovations',
      category: 'fintech',
      year: '2024',
      description: 'Revolutionary financial dashboard with real-time analytics and AI predictions',
      tech: ['React', 'Three.js', 'Node.js', 'AI/ML'],
      image: '/portfolio/finflow.jpg',
      color: '#00D9FF',
      awards: ['Awwwards', 'FWA'],
      stats: { users: '50K+', performance: '99.9%', loadTime: '1.2s' }
    },
    {
      id: 2,
      title: 'HealthHub Platform',
      client: 'MediCare Solutions',
      category: 'healthcare',
      year: '2024',
      description: 'Telemedicine platform connecting patients with healthcare providers globally',
      tech: ['Next.js', 'WebRTC', 'PostgreSQL', 'Docker'],
      image: '/portfolio/healthhub.jpg',
      color: '#00B8D4',
      awards: ['Red Dot Design'],
      stats: { users: '100K+', consultations: '500K+', uptime: '99.99%' }
    },
    {
      id: 3,
      title: 'ShopSphere E-Commerce',
      client: 'Global Retail Co.',
      category: 'ecommerce',
      year: '2024',
      description: '3D shopping experience with AR try-on and AI recommendations',
      tech: ['React', 'Three.js', 'AR.js', 'Python'],
      image: '/portfolio/shopsphere.jpg',
      color: '#0097A7',
      awards: ['CSS Design Awards'],
      stats: { revenue: '+240%', conversion: '+65%', loadTime: '0.9s' }
    },
    {
      id: 4,
      title: 'TaskFlow SaaS',
      client: 'ProductivityLabs',
      category: 'saas',
      year: '2024',
      description: 'Project management tool with AI-powered workflow automation',
      tech: ['Vue.js', 'GraphQL', 'MongoDB', 'AWS'],
      image: '/portfolio/taskflow.jpg',
      color: '#00E5FF',
      awards: ['Product Hunt #1'],
      stats: { teams: '5K+', tasks: '10M+', efficiency: '+45%' }
    },
    {
      id: 5,
      title: 'CryptoVault Mobile',
      client: 'BlockChain Ventures',
      category: 'mobile',
      year: '2023',
      description: 'Secure cryptocurrency wallet with biometric authentication',
      tech: ['React Native', 'Blockchain', 'Node.js', 'Web3'],
      image: '/portfolio/cryptovault.jpg',
      color: '#00D9FF',
      awards: ['App Store Featured'],
      stats: { downloads: '500K+', transactions: '$1B+', security: '100%' }
    },
    {
      id: 6,
      title: 'EduLearn Platform',
      client: 'Education First',
      category: 'web',
      year: '2023',
      description: 'Interactive learning platform with gamification and AI tutoring',
      tech: ['Angular', 'Firebase', 'TensorFlow', 'WebGL'],
      image: '/portfolio/edulearn.jpg',
      color: '#00B8D4',
      awards: ['EdTech Award'],
      stats: { students: '200K+', courses: '1K+', completion: '85%' }
    },
    {
      id: 7,
      title: 'FoodDelivery App',
      client: 'QuickBite Inc.',
      category: 'mobile',
      year: '2023',
      description: 'Food delivery app with real-time tracking and AI meal suggestions',
      tech: ['Flutter', 'Node.js', 'Redis', 'ML Kit'],
      image: '/portfolio/fooddelivery.jpg',
      color: '#0097A7',
      awards: ['Mobile Excellence'],
      stats: { orders: '1M+', restaurants: '10K+', rating: '4.9★' }
    },
    {
      id: 8,
      title: 'RealEstate VR',
      client: 'PropertyVision',
      category: 'web',
      year: '2023',
      description: 'Virtual reality real estate tours with 360° property viewing',
      tech: ['A-Frame', 'Three.js', 'WebXR', 'Node.js'],
      image: '/portfolio/realestate.jpg',
      color: '#00E5FF',
      awards: ['Innovation Award'],
      stats: { properties: '50K+', tours: '1M+', sales: '+180%' }
    }
  ];

  // Filter projects based on category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1.0]
      }
    }
  };

  return (
    <section 
      className="py-20 px-8 md:px-16 lg:px-32 max-w-[1400px] mx-auto min-h-screen"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          // Grid View
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(project.id)}
                style={{
                  gridColumn: index === 0 || index === 5 ? 'span 2' : 'span 1',
                  gridRow: index === 0 ? 'span 2' : 'span 1'
                }}
              >
                <div className="relative h-full min-h-[400px] bg-gray-900 overflow-hidden">
                  {/* Project Image Placeholder */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br opacity-20"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${project.color}40, transparent)`
                    }}
                  />
                  
                  {/* Project Number */}
                  <div className="absolute top-6 left-6 text-6xl font-bold text-gray-800/30 select-none">
                    {String(project.id).padStart(2, '0')}
                  </div>

                  {/* Awards Badge */}
                  {project.awards.length > 0 && (
                    <div className="absolute top-6 right-6 flex gap-2">
                      {project.awards.map((award, i) => (
                        <div 
                          key={i}
                          className="px-2 py-1 bg-black/50 backdrop-blur text-cyan-400 text-xs uppercase tracking-wider"
                        >
                          {award}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                    {/* Category & Year */}
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-cyan-400 text-xs uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* Client */}
                    <p className="text-gray-400 text-sm mb-3">
                      {project.client}
                    </p>

                    {/* Description - Shows on hover */}
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredProject === project.id ? 1 : 0,
                        height: hoveredProject === project.id ? 'auto' : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-300 text-sm mb-4"
                    >
                      {project.description}
                    </motion.p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 text-xs bg-gray-800/50 text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-400">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* View Project Indicator */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0,
                      scale: hoveredProject === project.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-black/80 backdrop-blur px-6 py-3 border border-cyan-400">
                      <span className="text-cyan-400 text-sm uppercase tracking-wider">
                        View Project
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // List View
          <motion.div
            key="list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group bg-gray-900/30 backdrop-blur border border-gray-800 p-8 cursor-pointer transition-all hover:border-cyan-400/50"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left - Project Info */}
                  <div className="lg:col-span-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-5xl font-bold text-gray-800/50">
                            {String(project.id).padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-gray-400">
                              {project.client} • {project.year}
                            </p>
                          </div>
                        </div>
                      </div>
                      {project.awards.length > 0 && (
                        <div className="flex gap-2">
                          {project.awards.map((award, i) => (
                            <span 
                              key={i}
                              className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs uppercase tracking-wider"
                            >
                              {award}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 text-xs bg-gray-800 text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right - Stats */}
                  <div className="lg:col-span-4">
                    <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center lg:text-right">
                          <div className="text-2xl font-bold text-cyan-400">
                            {value}
                          </div>
                          <div className="text-xs uppercase tracking-wider text-gray-500">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 border border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider text-sm hover:bg-cyan-400 hover:text-black transition-all"
        >
          Load More Projects
        </motion.button>
      </motion.div>
    </section>
  );
}