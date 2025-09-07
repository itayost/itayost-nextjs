// src/components/layout/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface FooterProps {
  locale?: 'en' | 'he';
}

export default function Footer({ locale = 'en' }: FooterProps) {
  const isRTL = locale === 'he';
  const currentYear = new Date().getFullYear();

  const content = {
    en: {
      logo: 'ITAYOST',
      tagline: 'Building digital futures through innovative technology and design.',
      sections: {
        services: {
          title: 'Services',
          links: [
            { label: 'Web Development', href: '#' },
            { label: 'Mobile Apps', href: '#' },
            { label: 'UI/UX Design', href: '#' },
            { label: 'Digital Strategy', href: '#' }
          ]
        },
        company: {
          title: 'Company',
          links: [
            { label: 'About', href: '#about' },
            { label: 'Work', href: '#work' },
            { label: 'Blog', href: '#' },
            { label: 'Contact', href: '#contact' }
          ]
        },
        connect: {
          title: 'Connect',
          links: [
            { label: 'LinkedIn', href: '#' },
            { label: 'GitHub', href: '#' },
            { label: 'Dribbble', href: '#' },
            { label: 'Twitter', href: '#' }
          ]
        }
      },
      copyright: `© ${currentYear} ITAYOST. All rights reserved.`,
      legal: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' }
      ]
    },
    he: {
      logo: 'ITAYOST',
      tagline: 'בונים עתידים דיגיטליים דרך טכנולוגיה ועיצוב חדשניים.',
      sections: {
        services: {
          title: 'שירותים',
          links: [
            { label: 'פיתוח ווב', href: '#' },
            { label: 'אפליקציות מובייל', href: '#' },
            { label: 'עיצוב UI/UX', href: '#' },
            { label: 'אסטרטגיה דיגיטלית', href: '#' }
          ]
        },
        company: {
          title: 'החברה',
          links: [
            { label: 'אודות', href: '#about' },
            { label: 'עבודות', href: '#work' },
            { label: 'בלוג', href: '#' },
            { label: 'צור קשר', href: '#contact' }
          ]
        },
        connect: {
          title: 'התחברות',
          links: [
            { label: 'LinkedIn', href: '#' },
            { label: 'GitHub', href: '#' },
            { label: 'Dribbble', href: '#' },
            { label: 'Twitter', href: '#' }
          ]
        }
      },
      copyright: `© ${currentYear} ITAYOST. כל הזכויות שמורות.`,
      legal: [
        { label: 'פרטיות', href: '#' },
        { label: 'תנאים', href: '#' }
      ]
    }
  };

  const text = content[locale];

  return (
    <footer 
      className="py-16 bg-gray-900 border-t border-gray-700 relative"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-32">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 
                className="text-2xl font-bold text-white mb-4"
                style={{
                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                  letterSpacing: '-0.02em'
                }}
              >
                {text.logo}
              </h3>
              <p 
                className="text-gray-400 text-sm leading-relaxed"
                style={{
                  fontFamily: isRTL 
                    ? 'Heebo, Rubik, -apple-system, sans-serif' 
                    : 'Inter, -apple-system, sans-serif',
                  lineHeight: isRTL ? '1.8' : '1.7'
                }}
              >
                {text.tagline}
              </p>
            </motion.div>
          </div>

          {/* Services Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-medium mb-6">
                {text.sections.services.title}
              </h4>
              <ul className="space-y-3">
                {text.sections.services.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-300"
                      style={{
                        fontFamily: isRTL 
                          ? 'Heebo, Rubik, -apple-system, sans-serif' 
                          : 'Inter, -apple-system, sans-serif'
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-medium mb-6">
                {text.sections.company.title}
              </h4>
              <ul className="space-y-3">
                {text.sections.company.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-300"
                      style={{
                        fontFamily: isRTL 
                          ? 'Heebo, Rubik, -apple-system, sans-serif' 
                          : 'Inter, -apple-system, sans-serif'
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Connect Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-medium mb-6">
                {text.sections.connect.title}
              </h4>
              <ul className="space-y-3">
                {text.sections.connect.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-300"
                      style={{
                        fontFamily: 'Inter, -apple-system, sans-serif'
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-gray-700"
        >
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${
            isRTL ? 'md:flex-row-reverse' : ''
          }`}>
            {/* Copyright */}
            <p 
              className="text-gray-500 text-sm"
              style={{
                fontFamily: isRTL 
                  ? 'Heebo, Rubik, -apple-system, sans-serif' 
                  : 'Inter, -apple-system, sans-serif'
              }}
            >
              {text.copyright}
            </p>

            {/* Legal Links */}
            <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {text.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-500 text-sm hover:text-cyan-400 transition-colors duration-300"
                  style={{
                    fontFamily: isRTL 
                      ? 'Heebo, Rubik, -apple-system, sans-serif' 
                      : 'Inter, -apple-system, sans-serif'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-cyan-400/20" />
      </div>
    </footer>
  );
}