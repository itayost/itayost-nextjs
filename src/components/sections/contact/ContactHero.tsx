// src/components/sections/contact/ContactHero.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Phone, Mail, MapPin, Clock, Sparkles, Zap, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showQuickInfo?: boolean;
  className?: string;
}

export default function ContactHero({
  title = 'בואו ניצור יחד',
  subtitle = 'צור קשר',
  description = 'יש לכם חזון? אנחנו כאן להפוך אותו למציאות דיגיטלית מרהיבה',
  showQuickInfo = true,
  className
}: ContactHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 0.02;
      const y = (clientY / window.innerHeight - 0.5) * 0.02;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const quickInfo = [
    {
      icon: Phone,
      label: 'טלפון',
      value: '054-499-4417',
      link: 'tel:054-499-4417',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Mail,
      label: 'אימייל',
      value: 'itay@itayost.com',
      link: 'mailto:itay@itayost.com',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Clock,
      label: 'זמן תגובה',
      value: 'עד 2 שעות',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      icon: MapPin,
      label: 'מיקום',
      value: 'תל אביב',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <section className={cn(
      'relative min-h-[80vh] py-20 sm:py-24 lg:py-32 bg-dark-950 overflow-hidden',
      className
    )}>
      {/*  Background Effects */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        {/* Gradient Orbs */}
        <motion.div 
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
          transition={{ type: "spring", damping: 30 }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
          }}
          transition={{ type: "spring", damping: 30 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]" 
        />
        
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-[10%] w-32 h-32"
        >
          <div className="shape-hexagon w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent blur-xl" />
        </motion.div>
        
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-32 right-[15%] w-40 h-40"
        >
          <div className="shape-diamond w-full h-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-xl" />
        </motion.div>

        {/* Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className={`absolute ${
              i % 2 === 0 ? 'top-1/4' : 'bottom-1/4'
            } ${
              i % 3 === 0 ? 'left-1/4' : 'right-1/3'
            }`}
          >
            <Star className="w-4 h-4 text-purple-400/30" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          {/*  Icon with Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl blur-2xl opacity-50" />
              <div className="relative p-6 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl card-glass-heavy">
                <MessageSquare className="h-16 w-16 text-white" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Subtitle with Gradient */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-medium mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Massive Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-display-xl lg:text-display-massive font-display font-bold text-white mb-8 leading-tight"
          >
            <span className="heading-gradient">{title}</span>
          </motion.h1>

          {/*  Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12"
            >
              {description}
            </motion.p>
          )}

          {/*  Quick Info Cards */}
          {showQuickInfo && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
            >
              {quickInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: [0, -2, 2, 0],
                      transition: { duration: 0.3 }
                    }}
                    className="group"
                  >
                    {info.link ? (
                      <a
                        href={info.link}
                        className="block p-6 card-glass-heavy rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
                      >
                        <div className={`p-3 bg-gradient-to-br ${info.gradient} rounded-2xl mb-4 mx-auto w-fit`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                        <p className="text-lg text-white font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                          {info.value}
                        </p>
                      </a>
                    ) : (
                      <div className="p-6 card-glass-heavy rounded-3xl border border-white/10">
                        <div className={`p-3 bg-gradient-to-br ${info.gradient} rounded-2xl mb-4 mx-auto w-fit`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                        <p className="text-lg text-white font-semibold">{info.value}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/*  CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact-form"
              className="btn-primary rounded-full px-10 py-5 text-lg font-semibold flex items-center gap-3 group"
            >
              <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              התחילו עכשיו
            </a>
            <a
              href="https://wa.me/972544994417"
              className="btn-glass rounded-full px-10 py-5 text-lg font-semibold flex items-center gap-3 group"
            >
              שלחו WhatsApp
              <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
          </motion.div>

          {/*  Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
            className="inline-flex items-center gap-3 mt-12 px-6 py-3 card-glass rounded-full border border-green-500/20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-400 font-medium">זמינים לפרויקטים חדשים</span>
            <Sparkles className="h-5 w-5 text-green-400 animate-pulse" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-dark-900/50">
          <path d="M0,64 C480,150 960,-30 1440,64 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}