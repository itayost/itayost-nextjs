'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles,
  ExternalLink,
  Eye,
  Filter,
  Grid3x3,
  LayoutGrid,
  Zap,
  Code,
  Smartphone,
  ShoppingCart,
  Database,
  FileText,
  Globe,
  BarChart,
  Users,
  Clock,
  Award,
  Target,
  ChevronRight
} from 'lucide-react';
import { getAllProjects, getProjectCategories } from '@/data/portfolio';
import CTA from '@/components/sections/CTA';
import { ProjectCategory } from '@/types/portfolio';

export default function PortfolioPageClient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const projects = getAllProjects();
  const categories = getProjectCategories();
  
  // Filter projects by category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (clientY - window.innerHeight / 2) / window.innerHeight;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('mousemove', handleMouseMove); };
  }, []);
  
  // Get icon for category
  const getCategoryIcon = (category: ProjectCategory) => {
    const icons = {
      'web-development': Globe,
      'mobile-app': Smartphone,
      'e-commerce': ShoppingCart,
      'management-system': Database,
      'landing-page': FileText,
      'corporate-site': BarChart,
      'custom-system': Code
    };
    return icons[category] || Globe;
  };
  
  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] pt-32 pb-20 bg-dark-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900" />
          <div className="absolute inset-0 bg-grid opacity-10" />
          
          {/* Animated geometric shapes */}
          <motion.div style={{ y: parallaxY }} className="absolute inset-0">
            <motion.div
              animate={{
                x: mousePosition.x * 30,
                y: mousePosition.y * 30,
                rotate: 360,
              }}
              transition={{ 
                x: { type: "spring", stiffness: 50, damping: 20 },
                y: { type: "spring", stiffness: 50, damping: 20 },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
              className="absolute top-20 right-10 w-96 h-96"
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-indigo opacity-10 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-indigo/20 shape-hexagon backdrop-blur-sm" />
              </div>
            </motion.div>
            
            <motion.div
              animate={{
                x: mousePosition.x * -20,
                y: mousePosition.y * -20,
              }}
              transition={{ type: "spring", stiffness: 30, damping: 20 }}
              className="absolute bottom-20 left-10 w-80 h-80"
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-cyan opacity-10 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-cyan/20 shape-diamond" />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full card-glass mb-8"
            >
              <Sparkles className="w-5 h-5 text-accent-purple animate-pulse" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                תיק עבודות
              </span>
              <Sparkles className="w-5 h-5 text-accent-purple animate-pulse" />
            </motion.div>
            
            {/* Title */}
            <h1 className="text-display-xl lg:text-display-2xl font-display font-bold mb-6">
              <span className="block text-white">פרויקטים</span>
              <span className="block heading-gradient">שמניעים הצלחה</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              כל פרויקט הוא סיפור של חדשנות, יצירתיות ומצוינות טכנולוגית.
              צפו בעבודות שלנו וגלו איך אנחנו הופכים רעיונות למציאות דיגיטלית.
            </p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8"
            >
              {[
                { value: projects.length + '+', label: 'פרויקטים', icon: Target },
                { value: '98%', label: 'לקוחות מרוצים', icon: Award },
                { value: '24/7', label: 'תמיכה', icon: Clock },
                { value: '5★', label: 'דירוג', icon: Users }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent-purple" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">גלול</span>
            <Sparkles className="w-5 h-5 animate-bounce" />
          </div>
        </motion.div>
      </section>
      
      {/* Filter Bar */}
      <section className="sticky top-20 z-40 py-6 bg-dark-950/80 backdrop-blur-xl border-y border-white/10">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSelectedCategory('all'); }}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-accent-purple to-accent-indigo text-white shadow-xl'
                    : 'card-glass text-gray-400 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  הכל ({projects.length})
                </span>
              </motion.button>
              
              {categories.map((cat) => {
                const Icon = getCategoryIcon(cat.id);
                return (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSelectedCategory(cat.id); }}
                    className={`px-6 py-3 rounded-full transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-accent-purple to-accent-indigo text-white shadow-xl'
                        : 'card-glass text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {cat.name} ({cat.count})
                    </span>
                  </motion.button>
                );
              })}
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setViewMode('grid'); }}
                className={`p-3 rounded-full transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-accent-purple to-accent-indigo text-white'
                    : 'card-glass text-gray-400 hover:text-white'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setViewMode('masonry'); }}
                className={`p-3 rounded-full transition-all duration-300 ${
                  viewMode === 'masonry'
                    ? 'bg-gradient-to-r from-accent-purple to-accent-indigo text-white'
                    : 'card-glass text-gray-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-20 lg:py-32 bg-dark-950">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'md:grid-cols-2 lg:grid-cols-3' 
                : 'md:grid-cols-2 lg:grid-cols-3 auto-rows-auto'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onMouseEnter={() => { setHoveredProject(project.id); }}
                  onMouseLeave={() => { setHoveredProject(null); }}
                  className={`group relative ${
                    viewMode === 'masonry' && project.featured ? 'lg:col-span-2 lg:row-span-2' : ''
                  }`}
                >
                  <Link href={`/portfolio/${project.slug}`}>
                    <div className="relative h-full card-glass-heavy rounded-3xl overflow-hidden backdrop-blur-xl">
                      {/* Project Image */}
                      <div className={`relative overflow-hidden ${
                        viewMode === 'masonry' && project.featured ? 'h-96' : 'h-64'
                      }`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-900/80 z-10" />
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Hover Overlay */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent z-20 flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                            transition={{ duration: 0.3, type: "spring" }}
                            className="flex gap-4"
                          >
                            <button className="p-4 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors">
                              <Eye className="w-6 h-6 text-white" />
                            </button>
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => { e.stopPropagation(); }}
                                className="p-4 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors"
                              >
                                <ExternalLink className="w-6 h-6 text-white" />
                              </a>
                            )}
                          </motion.div>
                        </motion.div>
                        
                        {/* Featured Badge */}
                        {project.featured && (
                          <div className="absolute top-4 left-4 z-30">
                            <div className="px-3 py-1 bg-gradient-to-r from-accent-purple to-accent-indigo rounded-full">
                              <span className="text-xs font-bold text-white">מומלץ</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 z-30">
                          <div className="p-2 bg-white/10 backdrop-blur-xl rounded-full">
                            {(() => {
                              const Icon = getCategoryIcon(project.category);
                              return <Icon className="w-5 h-5 text-white" />;
                            })()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Project Info */}
                      <div className="p-8">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-accent-purple font-medium">{project.subtitle}</p>
                        </div>
                        
                        <p className="text-gray-400 mb-6 line-clamp-2">
                          {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full"
                            >
                              {tech.name}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                        
                        {/* Stats */}
                        {project.stats && (
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {project.stats.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {project.stats.duration}
                              </span>
                            )}
                            {project.stats.teamSize && (
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {project.stats.teamSize} אנשים
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* View Project Link */}
                        <div className="mt-6 flex items-center gap-2 text-accent-purple font-medium group-hover:gap-4 transition-all">
                          צפה בפרויקט
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-accent-purple to-accent-indigo rounded-full flex items-center justify-center">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                אין פרויקטים בקטגוריה זו
              </h3>
              <p className="text-gray-400 mb-8">
                נסו לבחור קטגוריה אחרת או צפו בכל הפרויקטים
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); }}
                className="btn-primary"
              >
                צפה בכל הפרויקטים
              </button>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <CTA />
    </>
  );
}