// src/components/sections/contact/ContactLocation.tsx
'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

interface ContactLocationProps {
  locale: 'en' | 'he';
}

export default function ContactLocation({ locale }: ContactLocationProps) {
  const isRTL = locale === 'he';

  const content = {
    en: {
      label: '05 — Location',
      title: 'Visit Our',
      titleOutline: 'Office',
      subtitle: 'Located in the heart of Tel Aviv',
      address: {
        title: 'Address',
        line1: '50 Dizengoff Street',
        line2: 'Tel Aviv, Israel'
      },
      hours: {
        title: 'Office Hours',
        weekdays: 'Sunday - Thursday: 09:00 - 18:00',
        friday: 'Friday: 09:00 - 13:00'
      },
      contact: {
        title: 'Contact Details',
        phone: '+972 54-499-4417',
        email: 'itay@itayost.com'
      },
      mapCTA: 'Open in Maps'
    },
    he: {
      label: '05 — מיקום',
      title: 'בקרו',
      titleOutline: 'במשרד',
      subtitle: 'ממוקמים בלב תל אביב',
      address: {
        title: 'כתובת',
        line1: 'רחוב דיזנגוף 50',
        line2: 'תל אביב'
      },
      hours: {
        title: 'שעות פעילות',
        weekdays: 'ראשון - חמישי: 09:00 - 18:00',
        friday: 'שישי: 09:00 - 13:00'
      },
      contact: {
        title: 'פרטי התקשרות',
        phone: '054-499-4417',
        email: 'itay@itayost.com'
      },
      mapCTA: 'פתח במפות'
    }
  };

  const currentContent = content[locale];

  return (
    <section 
      id="location"
      className="relative py-32 bg-gray-900"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Office Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address Card */}
            <div className="relative p-6 bg-black border border-cyan-400/20 hover:border-cyan-400/40 transition-colors duration-300 group">
              <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-white font-bold mb-2">{currentContent.address.title}</h3>
                  <p className="text-gray-400">{currentContent.address.line1}</p>
                  <p className="text-gray-400">{currentContent.address.line2}</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300" />
            </div>

            {/* Hours Card */}
            <div className="relative p-6 bg-black border border-cyan-400/20 hover:border-cyan-400/40 transition-colors duration-300 group">
              <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <Clock className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-white font-bold mb-2">{currentContent.hours.title}</h3>
                  <p className="text-gray-400">{currentContent.hours.weekdays}</p>
                  <p className="text-gray-400">{currentContent.hours.friday}</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300" />
            </div>

            {/* Contact Card */}
            <div className="relative p-6 bg-black border border-cyan-400/20 hover:border-cyan-400/40 transition-colors duration-300 group">
              <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <Phone className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-white font-bold mb-2">{currentContent.contact.title}</h3>
                  <p className="text-gray-400">{currentContent.contact.phone}</p>
                  <p className="text-gray-400">{currentContent.contact.email}</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300" />
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[400px] lg:h-full min-h-[400px] bg-black border border-cyan-400/20 overflow-hidden group"
          >
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }} />
            </div>

            {/* Center Marker */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl" />
                <div className="relative p-4 border border-cyan-400/40 bg-black">
                  <MapPin className="w-8 h-8 text-cyan-400" />
                </div>
              </motion.div>
            </div>

            {/* Map CTA */}
            <motion.a
              href="https://maps.google.com/?q=Dizengoff+50+Tel+Aviv"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-cyan-400 text-black font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors duration-300"
            >
              {currentContent.mapCTA}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}