// src/components/sections/contact/ContactTestimonials.tsx
'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface ContactTestimonialsProps {
  locale: 'en' | 'he';
}

export default function ContactTestimonials({ locale }: ContactTestimonialsProps) {
  const isRTL = locale === 'he';

  const content = {
    en: {
      label: '03 — Testimonials',
      title: 'Client',
      titleOutline: 'Reviews',
      subtitle: 'Real feedback from satisfied clients',
      testimonials: [
        {
          name: 'Daniel Cohen',
          position: 'Tech Company CEO',
          content: 'Itay guided us from concept to finished product. His professionalism and creativity are exceptional!',
          rating: 5
        },
        {
          name: 'Sarah Levy',
          position: 'Marketing Manager',
          content: 'We received an amazing system that saved us thousands of work hours. Highly recommended!',
          rating: 5
        },
        {
          name: 'Michael Abraham',
          position: 'Entrepreneur',
          content: 'The most professional service I\'ve received. 24/7 support and results beyond expectations.',
          rating: 5
        }
      ]
    },
    he: {
      label: '03 — המלצות',
      title: 'ביקורות',
      titleOutline: 'לקוחות',
      subtitle: 'משוב אמיתי מלקוחות מרוצים',
      testimonials: [
        {
          name: 'דניאל כהן',
          position: 'מנכ״ל חברת טכנולוגיה',
          content: 'איתי ליווה אותנו מהרעיון ועד למוצר המוגמר. המקצועיות והיצירתיות שלו יוצאות דופן!',
          rating: 5
        },
        {
          name: 'שרה לוי',
          position: 'מנהלת שיווק',
          content: 'קיבלנו מערכת מדהימה שחסכה לנו אלפי שעות עבודה. ממליצה בחום!',
          rating: 5
        },
        {
          name: 'מיכאל אברהם',
          position: 'יזם',
          content: 'השירות המקצועי ביותר שקיבלתי. תמיכה 24/7 ותוצאות מעל הציפיות.',
          rating: 5
        }
      ]
    }
  };

  const currentContent = content[locale];

  return (
    <section 
      className="relative py-32 bg-black"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-40 h-40 border border-cyan-400/10 rotate-45" />
        <div className="absolute bottom-1/3 -right-20 w-40 h-40 border border-cyan-400/10 rotate-45" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`mb-20 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <span className="text-cyan-400 text-sm uppercase tracking-wider">
            {currentContent.label}
          </span>
          <h2 className="text-display mt-4">
            <span className="text-white">{currentContent.title} </span>
            <span className="text-outline">{currentContent.titleOutline}</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4">
            {currentContent.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {currentContent.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full p-8 bg-gray-900 border border-cyan-400/10 hover:border-cyan-400/30 transition-all duration-300">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-cyan-400/10" />
                
                {/* Rating */}
                <div className={`flex gap-1 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 italic leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 border border-cyan-400/40" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}