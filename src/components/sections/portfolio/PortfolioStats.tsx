// src/components/portfolio/PortfolioStats.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface PortfolioStatsProps {
  locale?: 'en' | 'he';
}

export default function PortfolioStats({ locale = 'en' }: PortfolioStatsProps) {
  const isRTL = locale === 'he';
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const content = {
    en: {
      label: 'Impact & Results',
      title: 'Numbers Speak',
      titleOutline: 'Louder',
      subtitle: 'Every project tells a story of transformation and success',
      stats: [
        {
          label: 'Total Projects Delivered',
          value: 127,
          suffix: '+',
          description: 'Across 15 countries',
          icon: '🚀'
        },
        {
          label: 'Client Retention Rate',
          value: 92,
          suffix: '%',
          description: 'They keep coming back',
          icon: '🤝'
        },
        {
          label: 'Average Performance Boost',
          value: 3.5,
          suffix: 'x',
          description: 'Faster than before',
          icon: '⚡'
        },
        {
          label: 'Revenue Generated',
          value: 450,
          suffix: 'M+',
          description: 'For our clients',
          icon: '💰'
        },
        {
          label: 'Lines of Code',
          value: 2.3,
          suffix: 'M',
          description: 'Clean & efficient',
          icon: '💻'
        },
        {
          label: 'Coffee Consumed',
          value: 47,
          suffix: 'K',
          description: 'Cups and counting',
          icon: '☕'
        }
      ],
      testimonial: {
        quote: "ITAYOST didn't just build our platform, they transformed our entire digital presence. The results speak for themselves - 300% growth in 6 months.",
        author: 'David Chen',
        role: 'CEO, TechVentures',
        company: 'Featured in Forbes 30 Under 30'
      }
    },
    he: {
      label: 'השפעה ותוצאות',
      title: 'מספרים מדברים',
      titleOutline: 'חזק יותר',
      subtitle: 'כל פרויקט מספר סיפור של טרנספורמציה והצלחה',
      stats: [
        {
          label: 'סך הפרויקטים שסופקו',
          value: 127,
          suffix: '+',
          description: 'ב-15 מדינות',
          icon: '🚀'
        },
        // ... Hebrew translations
      ],
      testimonial: {
        quote: "ITAYOST לא רק בנו את הפלטפורמה שלנו, הם שינו את כל הנוכחות הדיגיטלית שלנו. התוצאות מדברות בעד עצמן - צמיחה של 300% ב-6 חודשים.",
        author: 'דוד חן',
        role: 'מנכ"ל, TechVentures',
        company: 'הוצג בפורבס 30 מתחת ל-30'
      }
    }
  };

  const text = content[locale];

  // Counter animation component
  function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isInView) return;
      
      const steps = 60;
      const stepDuration = (duration * 1000) / steps;
      const increment = value / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCount(Math.min(increment * currentStep, value));
        } else {
          clearInterval(timer);
          setCount(value);
        }
      }, stepDuration);
      
      return () => clearInterval(timer);
    }, [isInView, value]);

    return (
      <span>
        {count % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}
        {suffix}
      </span>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-gray-900 relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 1, 0.2]
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>

      <div className="px-8 md:px-16 lg:px-32 max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium">
            {text.label}
          </span>
          <h2 className="mt-4 mb-4">
            <span className="text-white font-bold text-5xl md:text-6xl">
              {text.title}{' '}
            </span>
            <span 
              className="font-bold text-5xl md:text-6xl"
              style={{
                WebkitTextStroke: '2px rgba(0, 217, 255, 0.5)',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {text.titleOutline}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          {text.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-5xl mb-4"
              >
                {stat.icon}
              </motion.div>
              
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
                {isInView && (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                )}
              </div>
              
              <h4 className="text-white font-bold mb-1">
                {stat.label}
              </h4>
              
              <p className="text-gray-500 text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-black/50 backdrop-blur border border-gray-800 p-12 relative"
        >
          {/* Quote marks */}
          <div className="absolute top-4 left-8 text-6xl text-cyan-400/20">
            &quot;
          </div>
          <div className="absolute bottom-4 right-8 text-6xl text-cyan-400/20">
            &quot;
          </div>
          
          <blockquote className="text-2xl text-white font-light mb-8 relative z-10">
            {text.testimonial.quote}
          </blockquote>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-cyan-400" />
            <div>
              <p className="text-cyan-400 font-bold">
                {text.testimonial.author}
              </p>
              <p className="text-gray-400 text-sm">
                {text.testimonial.role}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {text.testimonial.company}
              </p>
            </div>
            <div className="w-16 h-px bg-cyan-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}