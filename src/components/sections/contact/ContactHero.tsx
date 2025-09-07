// src/components/sections/contact/ContactHero.tsx
'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, MapPin, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showQuickInfo?: boolean;
  className?: string;
}

export default function ContactHero({
  title = 'בואו נדבר',
  subtitle = 'צור קשר',
  description = 'יש לכם פרויקט בראש? רוצים להתייעץ? נשמח לשמוע מכם ולעזור להגשים את החזון שלכם',
  showQuickInfo = true,
  className
}: ContactHeroProps) {
  
  const quickInfo = [
    {
      icon: Phone,
      label: 'טלפון',
      value: '054-499-4417',
      link: 'tel:054-499-4417'
    },
    {
      icon: Mail,
      label: 'אימייל',
      value: 'itay@itayost.com',
      link: 'mailto:itay@itayost.com'
    },
    {
      icon: Clock,
      label: 'זמן תגובה',
      value: 'עד 24 שעות'
    },
    {
      icon: MapPin,
      label: 'מיקום',
      value: 'ישראל'
    }
  ];

  return (
    <section className={cn(
      'relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 overflow-hidden',
      className
    )}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-hero-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-4 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-3xl mb-6"
          >
            <div className="p-3 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-2xl">
              <MessageSquare className="h-12 w-12 text-teal-400" />
            </div>
          </motion.div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-teal-400 font-medium mb-2 text-sm sm:text-base"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8"
            >
              {description}
            </motion.p>
          )}

          {/* Quick Info */}
          {showQuickInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto"
            >
              {quickInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="group"
                  >
                    {info.link ? (
                      <a
                        href={info.link}
                        className="block p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-teal-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        <Icon className="h-6 w-6 text-teal-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 mb-1">{info.label}</p>
                        <p className="text-sm text-gray-300 font-medium group-hover:text-teal-400 transition-colors">
                          {info.value}
                        </p>
                      </a>
                    ) : (
                      <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/30">
                        <Icon className="h-6 w-6 text-teal-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 mb-1">{info.label}</p>
                        <p className="text-sm text-gray-300 font-medium">{info.value}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="inline-flex items-center gap-2 mt-8 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-sm font-medium">זמינים לפרויקטים חדשים</span>
            <Sparkles className="h-4 w-4 text-green-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}