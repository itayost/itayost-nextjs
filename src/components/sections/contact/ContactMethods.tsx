// src/components/sections/contact/ContactMethods.tsx
'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Video, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactMethodsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export default function ContactMethods({
  title = 'דרכי יצירת קשר',
  subtitle = 'בחרו את הדרך הנוחה לכם',
  description = 'אנחנו זמינים במגוון ערוצים כדי לתת לכם את השירות הטוב ביותר',
  className
}: ContactMethodsProps) {
  
  const methods = [
    {
      icon: Phone,
      title: 'טלפון',
      description: 'דברו איתנו ישירות',
      action: '054-499-4417',
      link: 'tel:054-499-4417',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      available: true,
      bestFor: 'לשאלות דחופות'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'שלחו הודעה בוואטסאפ',
      action: 'התחילו צ׳אט',
      link: 'https://wa.me/972544994417',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      available: true,
      bestFor: 'לתקשורת מהירה'
    },
    {
      icon: Mail,
      title: 'אימייל',
      description: 'שלחו לנו מייל מפורט',
      action: 'itay@itayost.com',
      link: 'mailto:itay@itayost.com',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      available: true,
      bestFor: 'לפניות מפורטות'
    },
    {
      icon: Video,
      title: 'פגישת Zoom',
      description: 'קבעו פגישת ייעוץ',
      action: 'תיאום פגישה',
      link: '/contact#book',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      available: true,
      bestFor: 'לדיונים מעמיקים'
    },
    {
      icon: Calendar,
      title: 'פגישה פנים אל פנים',
      description: 'נפגש במשרדנו או אצלכם',
      action: 'תיאום פגישה',
      link: '/contact#book',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      available: true,
      bestFor: 'לפרויקטים גדולים'
    },
    {
      icon: Clock,
      title: 'תמיכה 24/7',
      description: 'ללקוחות קיימים',
      action: 'פורטל לקוחות',
      link: '/support',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20',
      available: true,
      bestFor: 'תמיכה טכנית'
    }
  ];

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
    <section className={cn('py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900 to-gray-800', className)}>
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

          {/* Methods Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {methods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <a
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={cn(
                      "block h-full p-6 rounded-3xl",
                      "bg-gray-800/50 backdrop-blur-sm",
                      "border transition-all duration-300",
                      method.borderColor,
                      "hover:shadow-xl hover:shadow-gray-900/50"
                    )}
                  >
                    {/* Icon */}
                    <div className={cn(
                      "inline-flex p-3 rounded-2xl mb-4",
                      "bg-gradient-to-br",
                      method.color
                    )}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {method.description}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {method.bestFor}
                    </p>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-sm font-medium",
                        "bg-gradient-to-r bg-clip-text text-transparent",
                        method.color
                      )}>
                        {method.action}
                      </span>
                      
                      {method.available && (
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          זמין
                        </span>
                      )}
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Response Time Notice */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50">
              <Clock className="h-5 w-5 text-teal-400" />
              <span className="text-gray-300">
                זמן תגובה ממוצע: <span className="text-teal-400 font-medium">עד 2 שעות</span> בשעות העבודה
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}