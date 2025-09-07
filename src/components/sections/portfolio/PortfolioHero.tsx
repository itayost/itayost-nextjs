// src/components/sections/portfolio/PortfolioHero.tsx
'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PortfolioHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showStats?: boolean;
  stats?: {
    projects?: number;
    clients?: number;
    years?: number;
    satisfaction?: number;
  };
  showCTA?: boolean;
  className?: string;
}

export default function PortfolioHero({
  title = 'הפרויקטים שלנו',
  subtitle = 'פורטפוליו',
  description = 'צפו בעבודות האחרונות שלנו וגלו איך אנחנו הופכים רעיונות למציאות דיגיטלית',
  showStats = true,
  stats = {
    projects: 50,
    clients: 30,
    years: 5,
    satisfaction: 98
  },
  showCTA = true,
  className
}: PortfolioHeroProps) {
  
  const statsData = [
    { label: 'פרויקטים', value: `${stats.projects}+`, suffix: '' },
    { label: 'לקוחות מרוצים', value: `${stats.clients}+`, suffix: '' },
    { label: 'שנות ניסיון', value: stats.years, suffix: '' },
    { label: 'שביעות רצון', value: stats.satisfaction, suffix: '%' }
  ];

  return (
    <section className={cn(
      'relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 overflow-hidden',
      className
    )}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-hero-pattern opacity-5" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-teal-400 font-medium mb-2 text-sm sm:text-base"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8"
            >
              {description}
            </motion.p>
          )}

          {/* CTA Buttons */}
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/contact">
                <Button size="lg" variant="gradient">
                  התחילו פרויקט
                </Button>
              </Link>
              <Link href="#portfolio">
                <Button size="lg" variant="outline">
                  צפו בעבודות
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Stats */}
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-teal-400 mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}