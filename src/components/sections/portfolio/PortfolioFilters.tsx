// src/components/portfolio/PortfolioFilters.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface PortfolioFiltersProps {
  locale?: 'en' | 'he';
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export default function PortfolioFilters({ 
  locale = 'en', 
  selectedCategory, 
  setSelectedCategory,
  viewMode,
  setViewMode
}: PortfolioFiltersProps) {
  const isRTL = locale === 'he';
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const content = {
    en: {
      filterLabel: 'Filter by',
      viewLabel: 'View',
      categories: [
        { id: 'all', label: 'All Projects', count: 127 },
        { id: 'web', label: 'Web Development', count: 45 },
        { id: 'mobile', label: 'Mobile Apps', count: 32 },
        { id: 'ecommerce', label: 'E-Commerce', count: 18 },
        { id: 'saas', label: 'SaaS Platforms', count: 15 },
        { id: 'fintech', label: 'FinTech', count: 10 },
        { id: 'healthcare', label: 'Healthcare', count: 7 }
      ],
      sorting: [
        { id: 'recent', label: 'Most Recent' },
        { id: 'popular', label: 'Most Popular' },
        { id: 'awards', label: 'Award Winners' }
      ]
    },
    he: {
      filterLabel: 'סנן לפי',
      viewLabel: 'תצוגה',
      categories: [
        { id: 'all', label: 'כל הפרויקטים', count: 127 },
        { id: 'web', label: 'פיתוח ווב', count: 45 },
        { id: 'mobile', label: 'אפליקציות מובייל', count: 32 },
        { id: 'ecommerce', label: 'מסחר אלקטרוני', count: 18 },
        { id: 'saas', label: 'פלטפורמות SaaS', count: 15 },
        { id: 'fintech', label: 'פינטק', count: 10 },
        { id: 'healthcare', label: 'בריאות', count: 7 }
      ],
      sorting: [
        { id: 'recent', label: 'הכי חדש' },
        { id: 'popular', label: 'הכי פופולרי' },
        { id: 'awards', label: 'זוכי פרסים' }
      ]
    }
  };

  const text = content[locale];

  return (
    <section 
      className="sticky top-20 z-40 bg-black/80 backdrop-blur-lg border-b border-gray-800"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="px-8 md:px-16 lg:px-32 max-w-[1400px] mx-auto py-6">
        {/* Top Row - Categories */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-3">
            {text.categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-all duration-300
                  ${selectedCategory === category.id 
                    ? 'text-black bg-cyan-400' 
                    : 'text-gray-400 hover:text-white'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">
                  {category.label}
                  <span className="ml-2 text-xs opacity-60">
                    ({category.count})
                  </span>
                </span>
                
                {/* Hover Effect */}
                {hoveredCategory === category.id && selectedCategory !== category.id && (
                  <motion.div
                    layoutId="categoryHover"
                    className="absolute inset-0 border border-cyan-400/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                
                {/* Selected Indicator */}
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="categorySelected"
                    className="absolute inset-0 bg-cyan-400"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs uppercase tracking-wider mr-3">
              {text.viewLabel}:
            </span>
            <div className="flex gap-1 bg-gray-900 p-1 rounded">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-cyan-400' : 'text-gray-500'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="12" y="2" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="2" y="12" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="12" y="12" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-cyan-400' : 'text-gray-500'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="3" width="16" height="3" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="2" y="8.5" width="16" height="3" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="2" y="14" width="16" height="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Active Filter Indicator */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: selectedCategory !== 'all' ? 1 : 0,
            height: selectedCategory !== 'all' ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="text-gray-500 text-xs">Active filter:</span>
          <span className="text-cyan-400 text-sm font-medium">
            {text.categories.find(c => c.id === selectedCategory)?.label}
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className="ml-2 text-gray-500 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-800">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    </section>
  );
}