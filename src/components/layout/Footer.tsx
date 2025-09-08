// src/components/layout/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  locale?: 'en' | 'he';
}

export default function Footer({ locale = 'en' }: FooterProps) {
  const isRTL = locale === 'he';
  const currentYear = new Date().getFullYear();

  const content = {
    en: {
      logo: 'ITAYOST',
      tagline: 'Building digital futures through innovative technology and generative design.',
      sections: {
        services: {
          title: 'Services',
          links: [
            { label: 'Web Development', href: '/services#web' },
            { label: 'Mobile Apps', href: '/services#mobile' },
            { label: 'UI/UX Design', href: '/services#design' },
            { label: 'Cloud Solutions', href: '/services#cloud' }
          ]
        },
        company: {
          title: 'Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Portfolio', href: '/portfolio' },
            { label: 'Process', href: '/services#process' },
            { label: 'Contact', href: '/contact' }
          ]
        },
        resources: {
          title: 'Resources',
          links: [
            { label: 'Blog', href: '/blog' },
            { label: 'FAQ', href: '/contact#faq' },
            { label: 'Support', href: '/support' },
            { label: 'Careers', href: '/careers' }
          ]
        }
      },
      contact: {
        title: 'Get in Touch',
        email: 'itay@itayost.com',
        phone: '+972 54-499-4417',
        address: 'Tel Aviv, Israel'
      },
      social: {
        title: 'Follow Us'
      },
      newsletter: {
        title: 'Stay Updated',
        placeholder: 'Enter your email',
        button: 'Subscribe'
      },
      copyright: `© ${currentYear} ITAYOST. All rights reserved.`,
      legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' }
      ],
      backToTop: 'Back to Top'
    },
    he: {
      logo: 'ITAYOST',
      tagline: 'בונים עתידים דיגיטליים דרך טכנולוגיה חדשנית ועיצוב גנרטיבי.',
      sections: {
        services: {
          title: 'שירותים',
          links: [
            { label: 'פיתוח אתרים', href: '/services#web' },
            { label: 'אפליקציות', href: '/services#mobile' },
            { label: 'עיצוב UI/UX', href: '/services#design' },
            { label: 'פתרונות ענן', href: '/services#cloud' }
          ]
        },
        company: {
          title: 'החברה',
          links: [
            { label: 'אודות', href: '/about' },
            { label: 'תיק עבודות', href: '/portfolio' },
            { label: 'תהליך', href: '/services#process' },
            { label: 'צור קשר', href: '/contact' }
          ]
        },
        resources: {
          title: 'משאבים',
          links: [
            { label: 'בלוג', href: '/blog' },
            { label: 'שאלות נפוצות', href: '/contact#faq' },
            { label: 'תמיכה', href: '/support' },
            { label: 'קריירה', href: '/careers' }
          ]
        }
      },
      contact: {
        title: 'צור קשר',
        email: 'itay@itayost.com',
        phone: '054-499-4417',
        address: 'תל אביב, ישראל'
      },
      social: {
        title: 'עקבו אחרינו'
      },
      newsletter: {
        title: 'הישארו מעודכנים',
        placeholder: 'הכניסו את האימייל שלכם',
        button: 'הרשמה'
      },
      copyright: `© ${currentYear} ITAYOST. כל הזכויות שמורות.`,
      legal: [
        { label: 'מדיניות פרטיות', href: '/privacy' },
        { label: 'תנאי שימוש', href: '/terms' },
        { label: 'מדיניות עוגיות', href: '/cookies' }
      ],
      backToTop: 'חזרה למעלה'
    }
  };

  const currentContent = content[locale];

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative bg-black border-t border-cyan-400/10 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Main Footer Content */}
        <div className="py-20">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Logo */}
                <Link href="/" className="inline-block mb-6">
                  <h3 
                    className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors duration-300"
                    style={{
                      fontFamily: 'Space Grotesk, Inter, sans-serif',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {currentContent.logo}
                  </h3>
                </Link>
                
                {/* Tagline */}
                <p 
                  className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm"
                  style={{
                    fontFamily: isRTL 
                      ? 'Heebo, Rubik, -apple-system, sans-serif' 
                      : 'Inter, -apple-system, sans-serif',
                    lineHeight: isRTL ? '1.8' : '1.7'
                  }}
                >
                  {currentContent.tagline}
                </p>

                {/* Social Links */}
                <div>
                  <h4 className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">
                    {currentContent.social.title}
                  </h4>
                  <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative w-10 h-10 border border-cyan-400/20 flex items-center justify-center hover:border-cyan-400 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                          <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-medium mb-6">
                  {currentContent.sections.services.title}
                </h4>
                <ul className="space-y-3">
                  {currentContent.sections.services.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-300"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-medium mb-6">
                  {currentContent.sections.company.title}
                </h4>
                <ul className="space-y-3">
                  {currentContent.sections.company.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-300"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-medium mb-6">
                  {currentContent.sections.resources.title}
                </h4>
                <ul className="space-y-3">
                  {currentContent.sections.resources.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-300"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Contact Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="py-8 border-y border-cyan-400/10 mb-8"
          >
            <div className={`flex flex-wrap gap-8 md:gap-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-4 h-4 text-cyan-400" />
                <a href={`mailto:${currentContent.contact.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                  {currentContent.contact.email}
                </a>
              </div>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-4 h-4 text-cyan-400" />
                <a href={`tel:${currentContent.contact.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                  {currentContent.contact.phone}
                </a>
              </div>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-400">
                  {currentContent.contact.address}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${
              isRTL ? 'md:flex-row-reverse' : ''
            }`}>
              {/* Copyright */}
              <p className="text-gray-500 text-sm">
                {currentContent.copyright}
              </p>

              {/* Legal Links */}
              <div className={`flex flex-wrap gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {currentContent.legal.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-500 text-sm hover:text-cyan-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Back to Top */}
              <motion.button
                onClick={handleScrollToTop}
                className="group flex items-center gap-2 text-gray-500 text-sm hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{currentContent.backToTop}</span>
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="rotate-180"
                >
                  ↓
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
    </footer>
  );
}