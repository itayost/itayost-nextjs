// src/components/sections/contact/ContactMethods.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Video, Calendar, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactMethodsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export default function ContactMethods({
  title = 'בחרו איך ליצור קשר',
  subtitle = 'ערוצי תקשורת',
  description = 'אנחנו זמינים בכל הפלטפורמות - בחרו את הדרך הנוחה לכם ביותר',
  className
}: ContactMethodsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const methods = [
    {
      icon: Phone,
      title: 'שיחת טלפון',
      description: 'לתשובות מיידיות',
      action: '054-499-4417',
      link: 'tel:054-499-4417',
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-500/10 to-indigo-600/10',
      shadowColor: 'shadow-purple-500/20',
      available: true,
      bestFor: 'דחוף',
      responseTime: 'מיידי'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'צ׳אט מהיר ונוח',
      action: 'התחילו שיחה',
      link: 'https://wa.me/972544994417',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-600/10',
      shadowColor: 'shadow-green-500/20',
      available: true,
      bestFor: 'פופולרי',
      responseTime: 'עד שעה'
    },
    {
      icon: Mail,
      title: 'דוא״ל',
      description: 'לפניות מפורטות',
      action: 'itay@itayost.com',
      link: 'mailto:itay@itayost.com',
      gradient: 'from-indigo-500 to-purple-600',
      bgGradient: 'from-indigo-500/10 to-purple-600/10',
      shadowColor: 'shadow-indigo-500/20',
      available: true,
      bestFor: 'מפורט',
      responseTime: 'עד 24 שעות'
    },
    {
      icon: Video,
      title: 'Zoom Meeting',
      description: 'פגישה וירטואלית',
      action: 'קבעו פגישה',
      link: '/contact#book',
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-500/10 to-cyan-600/10',
      shadowColor: 'shadow-blue-500/20',
      available: true,
      bestFor: 'ייעוץ',
      responseTime: 'בתיאום'
    },
    {
      icon: Calendar,
      title: 'פגישה אישית',
      description: 'במשרד או אצלכם',
      action: 'תיאום פגישה',
      link: '/contact#book',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/10 to-red-600/10',
      shadowColor: 'shadow-orange-500/20',
      available: true,
      bestFor: 'אישי',
      responseTime: 'בתיאום'
    },
    {
      icon: Clock,
      title: 'תמיכה 24/7',
      description: 'ללקוחות פעילים',
      action: 'פורטל תמיכה',
      link: '/support',
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-500/10 to-cyan-600/10',
      shadowColor: 'shadow-teal-500/20',
      available: true,
      bestFor: 'VIP',
      responseTime: '24/7'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className={cn('py-20 sm:py-24 lg:py-32 bg-dark-900 relative overflow-hidden', className)}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        {/* Animated Gradient Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />

        {/* Geometric Shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 right-20 w-24 h-24 shape-hexagon bg-gradient-to-br from-purple-500/5 to-transparent"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-32 w-32 h-32 shape-diamond bg-gradient-to-br from-cyan-500/5 to-transparent"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/*  Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16 max-w-4xl mx-auto"
          >
            {subtitle && (
              <p className="text-lg font-medium mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {subtitle}
              </p>
            )}
            <h2 className="text-display-md lg:text-display-lg font-display font-bold text-white mb-6">
              {title}
            </h2>
            {description && (
              <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>

          {/*  Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative"
                >
                  <a
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block h-full"
                  >
                    {/* Glow Effect on Hover */}
                    <div className={cn(
                      "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      `bg-gradient-to-br ${method.bgGradient} blur-xl`
                    )} />
                    
                    {/* Card */}
                    <div className={cn(
                      "relative h-full p-8 rounded-3xl",
                      "card-glass-heavy border border-white/5",
                      "transition-all duration-300",
                      "group-hover:border-white/10",
                      `group-hover:${method.shadowColor} group-hover:shadow-2xl`
                    )}>
                      {/* Top Badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        {method.available && (
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs text-green-400 font-medium">זמין</span>
                          </span>
                        )}
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          "bg-gradient-to-r bg-clip-text text-transparent",
                          method.gradient
                        )}>
                          {method.bestFor}
                        </span>
                      </div>

                      {/* Icon with  Design */}
                      <motion.div 
                        animate={hoveredIndex === index ? { rotate: [0, -10, 10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                      >
                        <div className={cn(
                          "inline-flex p-4 rounded-2xl",
                          "bg-gradient-to-br",
                          method.gradient,
                          "shadow-lg"
                        )}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:heading-gradient transition-all">
                        {method.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {method.description}
                      </p>
                      
                      {/* Response Time */}
                      <div className="flex items-center gap-2 mb-6 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-500">זמן תגובה:</span>
                        <span className="text-gray-300 font-medium">{method.responseTime}</span>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "text-lg font-semibold",
                          "bg-gradient-to-r bg-clip-text text-transparent",
                          method.gradient
                        )}>
                          {method.action}
                        </span>
                        
                        <motion.div
                          animate={hoveredIndex === index ? { x: 5, y: -5 } : { x: 0, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            "p-2 rounded-full",
                            "bg-gradient-to-br",
                            method.gradient,
                            "opacity-80 group-hover:opacity-100"
                          )}
                        >
                          <ArrowUpRight className="h-5 w-5 text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/*  Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-8 p-8 card-glass-heavy rounded-3xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold text-lg">מעדיפים שנחזור אליכם?</p>
                  <p className="text-gray-400 text-sm">השאירו פרטים ונחזור תוך 2 שעות</p>
                </div>
              </div>
              <a
                href="#contact-form"
                className="btn-primary rounded-full px-8 py-4 font-semibold flex items-center gap-2 group"
              >
                מלאו טופס
                <ArrowUpRight className="h-5 w-5 group-hover:rotate-45 transition-transform" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}