// src/components/sections/portfolio/ProjectDetails.tsx
'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types/portfolio';
import { 
  Clock, Users, TrendingUp, CheckCircle, ExternalLink, 
  Github, Play, Calendar, Package, Zap
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatProjectDuration, getStatusColor, getStatusLabel } from '@/lib/portfolio';

interface ProjectDetailsProps {
  project: Project;
  showChallenge?: boolean;
  showProcess?: boolean;
  showResults?: boolean;
  showTestimonial?: boolean;
  className?: string;
}

export default function ProjectDetails({
  project,
  showChallenge = true,
  showProcess = true,
  showResults = true,
  showTestimonial = true,
  className
}: ProjectDetailsProps) {
  
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
    }
  };

  return (
    <div className={cn('space-y-16 sm:space-y-20', className)}>
      {/* Overview Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gray-800/30 rounded-3xl p-8 sm:p-12"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Project Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">סקירת הפרויקט</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {project.longDescription}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {project.stats?.duration && (
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <Clock className="h-5 w-5 text-teal-400 mb-2" />
                  <p className="text-xs text-gray-500 mb-1">משך הפרויקט</p>
                  <p className="text-white font-medium">{project.stats.duration}</p>
                </div>
              )}
              {project.stats?.teamSize && (
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <Users className="h-5 w-5 text-teal-400 mb-2" />
                  <p className="text-xs text-gray-500 mb-1">גודל צוות</p>
                  <p className="text-white font-medium">{project.stats.teamSize} אנשים</p>
                </div>
              )}
              {project.stats?.features && (
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <Package className="h-5 w-5 text-teal-400 mb-2" />
                  <p className="text-xs text-gray-500 mb-1">פיצ׳רים</p>
                  <p className="text-white font-medium">{project.stats.features}</p>
                </div>
              )}
              {project.stats?.users && (
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <TrendingUp className="h-5 w-5 text-teal-400 mb-2" />
                  <p className="text-xs text-gray-500 mb-1">משתמשים</p>
                  <p className="text-white font-medium">{project.stats.users}</p>
                </div>
              )}
            </div>
          </div>

          {/* Project Meta */}
          <div className="space-y-6">
            {/* Client Info */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">פרטי הלקוח</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">לקוח:</span>
                  <span className="text-white">{project.client}</span>
                </div>
                {project.clientIndustry && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">תעשייה:</span>
                    <span className="text-white">{project.clientIndustry}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">סטטוס:</span>
                  <span className={cn('px-3 py-1 rounded-full text-xs', getStatusColor(project.status))}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">תקופה:</span>
                  <span className="text-white">
                    {new Date(project.startDate).toLocaleDateString('he-IL', { month: 'short', year: 'numeric' })}
                    {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('he-IL', { month: 'short', year: 'numeric' })}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">קישורים</h3>
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 text-teal-400 rounded-full hover:bg-teal-500/20 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    אתר חי
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full hover:bg-purple-500/20 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    דמו
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      {project.features.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">תכונות עיקריות</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30"
              >
                <Zap className="h-8 w-8 text-teal-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Challenge & Solution */}
      {showChallenge && (project.challenge || project.solution) && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {project.challenge && (
            <motion.div variants={itemVariants}>
              <div className="h-full bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl p-8 border border-red-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">האתגר</h3>
                <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
              </div>
            </motion.div>
          )}
          {project.solution && (
            <motion.div variants={itemVariants}>
              <div className="h-full bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-3xl p-8 border border-teal-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">הפתרון</h3>
                <p className="text-gray-300 leading-relaxed">{project.solution}</p>
              </div>
            </motion.div>
          )}
        </motion.section>
      )}

      {/* Process */}
      {showProcess && project.process && project.process.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">תהליך העבודה</h2>
          <div className="max-w-3xl mx-auto">
            {project.process.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-4 mb-6 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-gray-900 font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-white">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Results */}
      {showResults && project.results && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-3xl p-8 sm:p-12 border border-teal-500/20"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">תוצאות</h2>
          <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            {project.results}
          </p>
        </motion.section>
      )}

      {/* Technologies */}
      {project.technologies.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">טכנולוגיות</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="px-6 py-3 bg-gray-800/50 border border-gray-700/30 rounded-full"
              >
                <span className="text-gray-300">{tech.name}</span>
                <span className="ml-2 text-xs text-gray-500">({tech.type})</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Testimonial */}
      {showTestimonial && project.testimonial && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-700/30 text-center">
            <div className="mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={cn(
                  'text-2xl',
                  i < (project.testimonial?.rating || 5) ? 'text-yellow-400' : 'text-gray-600'
                )}>
                  ★
                </span>
              ))}
            </div>
            <blockquote className="text-xl text-gray-300 italic mb-6">
              "{project.testimonial.content}"
            </blockquote>
            <div>
              <p className="text-white font-medium">{project.testimonial.author}</p>
              {project.testimonial.role && (
                <p className="text-gray-400 text-sm">
                  {project.testimonial.role}
                  {project.testimonial.company && `, ${project.testimonial.company}`}
                </p>
              )}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}