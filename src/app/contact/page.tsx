// src/app/contact/page.tsx
'use client';

import ContactHero from '@/components/sections/contact/ContactHero';
import ContactMethods from '@/components/sections/contact/ContactMethods';
import ContactForm from '@/components/sections/contact/ContactForm';
import ContactFAQ from '@/components/sections/contact/ContactFAQ';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-dark-950 min-h-screen">
      {/*  Hero Section */}
      <ContactHero />
      
      {/*  Contact Methods */}
      <ContactMethods />
      
      {/* Statistics Bar */}
      <section className="py-16 bg-dark-900 border-y border-white/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { number: '2', label: 'שעות', suffix: 'זמן תגובה ממוצע', icon: Zap },
              { number: '98', label: '%', suffix: 'לקוחות מרוצים', icon: Star },
              { number: '500', label: '+', suffix: 'פרויקטים הושלמו', icon: Sparkles },
              { number: '24/7', label: '', suffix: 'תמיכה טכנית', icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl mb-4">
                  <stat.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold heading-gradient mb-2">
                  {stat.number}{stat.label}
                </div>
                <p className="text-gray-400">{stat.suffix}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/*  Contact Form */}
      <ContactForm />
      
      {/* Client Testimonials */}
      <ContactTestimonials />
      
      {/*  FAQ Section */}
      <ContactFAQ />
      
      {/* Office Location & Map */}
      <ContactMapSection />
      
      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          >
            <div className="w-full h-full bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full blur-2xl opacity-50" />
                <div className="relative p-6 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full card-glass-heavy">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <h2 className="text-display-md lg:text-display-lg font-display font-bold text-white mb-6">
              <span className="heading-gradient">מוכנים להתחיל?</span>
            </h2>
            
            {/* Description */}
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              אנחנו כאן כדי להפוך את הרעיון שלכם למציאות דיגיטלית מרהיבה. 
              בואו נבנה יחד משהו מדהים!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                href="tel:054-499-4417"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary rounded-full px-10 py-5 text-lg font-bold flex items-center gap-3 group"
              >
                <Zap className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                התקשרו עכשיו
                <span className="text-sm opacity-75">(054-499-4417)</span>
              </motion.a>
              
              <motion.a
                href="https://wa.me/972544994417"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glass rounded-full px-10 py-5 text-lg font-bold flex items-center gap-3 group"
              >
                שלחו WhatsApp
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </motion.a>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex flex-wrap justify-center gap-8"
            >
              {[
                { icon: Star, text: 'מעל 500 לקוחות מרוצים' },
                { icon: Zap, text: 'תגובה תוך 2 שעות' },
                { icon: Sparkles, text: 'אחריות ל-12 חודשים' }
              ].map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 card-glass rounded-full border border-white/10"
                >
                  <badge.icon className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-gray-300">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// src/components/sections/contact/ContactTestimonials.tsx
export function ContactTestimonials() {
  const testimonials = [
    {
      name: 'דני כהן',
      position: 'מנכ״ל חברת טכנולוגיה',
      content: 'איתי ליווה אותנו מהרעיון ועד למוצר המוגמר. המקצועיות והיצירתיות שלו יוצאות דופן!',
      rating: 5,
      image: '/testimonials/1.jpg'
    },
    {
      name: 'שרה לוי',
      position: 'מנהלת שיווק',
      content: 'קיבלנו מערכת מדהימה שחסכה לנו אלפי שעות עבודה. ממליצה בחום!',
      rating: 5,
      image: '/testimonials/2.jpg'
    },
    {
      name: 'מיכאל אברהם',
      position: 'יזם',
      content: 'השירות המקצועי ביותר שקיבלתי. תמיכה 24/7 ותוצאות מעל הציפיות.',
      rating: 5,
      image: '/testimonials/3.jpg'
    }
  ];

  return (
    <section className="py-20 bg-dark-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            מה הלקוחות שלנו אומרים
          </h2>
          <p className="text-gray-400 text-lg">
            ביקורות אמיתיות מלקוחות מרוצים
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-glass-heavy rounded-3xl p-8 border border-white/10"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">&quot;{testimonial.content}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// src/components/sections/contact/ContactMapSection.tsx
export function ContactMapSection() {
  return (
    <section className="py-20 bg-dark-950 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Office Info */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                בואו לבקר במשרד
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                אנחנו נמצאים בלב תל אביב, במרחק הליכה מתחבורה ציבורית ועם חניה נוחה באזור.
              </p>
              
              <div className="space-y-6">
                <div className="card-glass rounded-2xl p-6 border border-white/10">
                  <h3 className="text-white font-semibold mb-2">כתובת</h3>
                  <p className="text-gray-400">רחוב דיזנגוף 50, תל אביב</p>
                </div>
                
                <div className="card-glass rounded-2xl p-6 border border-white/10">
                  <h3 className="text-white font-semibold mb-2">שעות פעילות</h3>
                  <p className="text-gray-400">ראשון - חמישי: 09:00 - 18:00</p>
                  <p className="text-gray-400">שישי: 09:00 - 13:00</p>
                </div>
                
                <div className="card-glass rounded-2xl p-6 border border-white/10">
                  <h3 className="text-white font-semibold mb-2">פרטי התקשרות</h3>
                  <p className="text-gray-400">טלפון: 054-499-4417</p>
                  <p className="text-gray-400">אימייל: itay@itayost.com</p>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="relative h-[400px] lg:h-full min-h-[400px] rounded-3xl overflow-hidden card-glass-heavy border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xl mb-4 inline-block">
                    <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold">תל אביב</p>
                  <p className="text-gray-400 text-sm">לחצו לפתיחת המפה</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}