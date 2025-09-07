// src/components/sections/services/ServiceFeatures.tsx
'use client';

import { motion } from 'framer-motion';
import { ServiceFeature } from '@/types/service';
import { CheckCircle, Zap, Shield, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFeaturesProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features: ServiceFeature[];
  variant?: 'grid' | 'list' | 'cards';
  showIcons?: boolean;
  className?: string;
}

const defaultIcons = [CheckCircle, Zap, Shield, TrendingUp];

export default function ServiceFeatures({
  title = 'מה כולל השירות?',
  subtitle,
  description = 'כל מה שאתם צריכים כדי להצליח',
  features,
  variant = 'grid',
  showIcons = true,
  className
}: ServiceFeaturesProps) {
  
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

  const renderGrid = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const IconComponent = defaultIcons[index % defaultIcons.length];
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-teal-500/30 transition-all duration-300 hover:shadow-xl"
          >
            {showIcons && (
              <IconComponent className="h-8 w-8 text-teal-400 mb-4" />
            )}
            <h3 className="text-lg font-bold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {feature.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );

  const renderList = () => (
    <div className="max-w-3xl mx-auto space-y-4">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="flex gap-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 hover:border-teal-500/30 transition-all duration-300"
        >
          {showIcons && (
            <CheckCircle className="h-6 w-6 text-teal-400 flex-shrink-0 mt-1" />
          )}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderCards = () => (
    <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {features.map((feature, index) => {
        const IconComponent = defaultIcons[index % defaultIcons.length];
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                {showIcons && (
                  <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
                    <IconComponent className="h-6 w-6 text-teal-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderFeatures = () => {
    switch (variant) {
      case 'list':
        return renderList();
      case 'cards':
        return renderCards();
      default:
        return renderGrid();
    }
  };

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
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
          >
            {subtitle && (
              <p className="text-teal-400 font-medium mb-2 text-sm sm:text-base">
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-gray-400 text-base sm:text-lg">
                {description}
              </p>
            )}
          </motion.div>

          {/* Features */}
          {renderFeatures()}
        </motion.div>
      </div>
    </section>
  );
}