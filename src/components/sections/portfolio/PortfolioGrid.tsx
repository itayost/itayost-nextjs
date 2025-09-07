// src/components/sections/portfolio/PortfolioGrid.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Project, ProjectCategory } from '@/types/portfolio';
import { ArrowRight, ExternalLink, Github, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStatusColor, getStatusLabel } from '@/lib/portfolio';

interface PortfolioGridProps {
  projects: Project[];
  categories?: { id: ProjectCategory; name: string; count: number }[];
  showCategories?: boolean;
  showFilters?: boolean;
  variant?: 'grid' | 'masonry' | 'list';
  columns?: 2 | 3 | 4;
  showStatus?: boolean;
  className?: string;
}

export default function PortfolioGrid({
  projects,
  categories,
  showCategories = true,
  showFilters = true,
  variant = 'grid',
  columns = 3,
  showStatus = true,
  className
}: PortfolioGridProps) {
  
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const getGridColumns = () => {
    switch (columns) {
      case 2: return 'lg:grid-cols-2';
      case 4: return 'lg:grid-cols-4';
      default: return 'lg:grid-cols-3';
    }
  };

  const renderGridItem = (project: Project) => (
    <motion.div
      key={project.id}
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseEnter={() => { setHoveredProject(project.id); }}
      onMouseLeave={() => { setHoveredProject(null); }}
      className="group relative"
    >
      <Link href={`/portfolio/${project.slug}`}>
        <div className="relative overflow-hidden rounded-3xl bg-gray-800/50 border border-gray-700/30 hover:border-teal-500/30 transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            {project.thumbnail && (
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent z-10" />
            )}
            
            {/* Placeholder gradient if no image */}
            <div 
              className="absolute inset-0" 
              style={{
                background: project.gradient || `linear-gradient(135deg, ${project.color || '#14B8A6'}33, ${project.color || '#14B8A6'}11)`
              }}
            />
            
            {/* Hover Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40 z-20 flex items-center justify-center"
            >
              <div className="flex gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                >
                  <ArrowRight className="h-6 w-6 text-white" />
                </motion.div>
                {project.liveUrl && (
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                    aria-label="View live site"
                  >
                    <ExternalLink className="h-6 w-6 text-white" />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Status Badge */}
            {showStatus && (
              <div className="absolute top-4 right-4 z-30">
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm',
                  getStatusColor(project.status)
                )}>
                  {getStatusLabel(project.status)}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-teal-400 font-medium">
                {categories?.find(c => c.id === project.category)?.name || project.category}
              </span>
              {project.year && (
                <>
                  <span className="text-gray-600">•</span>
                  <span className="text-xs text-gray-400">{project.year}</span>
                </>
              )}
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-sm text-teal-400 mb-2">{project.subtitle}</p>
            )}
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-gray-700/50 text-xs rounded-full text-gray-300"
                >
                  {tech.name}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gray-700/50 text-xs rounded-full text-gray-300">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  const renderListItem = (project: Project) => (
    <motion.div
      key={project.id}
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Link href={`/portfolio/${project.slug}`}>
        <div className="group bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/30 hover:border-teal-500/30 transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Thumbnail */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: project.gradient || `linear-gradient(135deg, ${project.color || '#14B8A6'}33, ${project.color || '#14B8A6'}11)`
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-teal-400 font-medium">
                      {categories?.find(c => c.id === project.category)?.name || project.category}
                    </span>
                    {showStatus && (
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        getStatusColor(project.status)
                      )}>
                        {getStatusLabel(project.status)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-teal-400 mb-2">{project.subtitle}</p>
                  )}
                </div>
                <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-teal-400 transition-all duration-300 group-hover:translate-x-2" />
              </div>

              <p className="text-gray-400 mb-4 line-clamp-2">
                {project.longDescription || project.description}
              </p>

              {/* Features */}
              {project.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-sm text-gray-300">
                      • {feature.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Info */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-700/50 text-xs rounded-full text-gray-300"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
                {project.client && (
                  <span className="text-sm text-gray-500">{project.client}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <section className={cn(
      'py-16 sm:py-20 lg:py-24 bg-gray-900',
      className
    )}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Category Filter */}
          {showCategories && categories && (
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
            >
              <button
                onClick={() => { setSelectedCategory('all'); }}
                className={cn(
                  'px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300',
                  'text-sm sm:text-base font-medium',
                  selectedCategory === 'all'
                    ? 'bg-teal-500 text-gray-900'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                )}
              >
                הכל ({projects.length})
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => { setSelectedCategory(category.id); }}
                  className={cn(
                    'px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300',
                    'text-sm sm:text-base font-medium',
                    selectedCategory === category.id
                      ? 'bg-teal-500 text-gray-900'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  )}
                >
                  {category.name}
                  <span className="mr-2 text-xs">({category.count})</span>
                </button>
              ))}
            </motion.div>
          )}

          {/* Projects Grid/List */}
          <AnimatePresence mode="wait">
            {variant === 'list' ? (
              <div className="space-y-6">
                {filteredProjects.map(project => renderListItem(project))}
              </div>
            ) : (
              <div className={cn(
                'grid sm:grid-cols-2 gap-6 lg:gap-8',
                getGridColumns()
              )}>
                {filteredProjects.map(project => renderGridItem(project))}
              </div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400">אין פרויקטים בקטגוריה זו</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}