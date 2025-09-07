// src/components/layout/Navigation.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavigationProps {
  locale?: 'en' | 'he';
}

export default function Navigation({ locale = 'en' }: NavigationProps) {
  const isRTL = locale === 'he';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    en: {
      logo: 'ITAYOST',
      menu: [
        { label: 'Work', href: '#work' },
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' }
      ],
      cta: 'Start Project'
    },
    he: {
      logo: 'ITAYOST',
      menu: [
        { label: 'עבודות', href: '#work' },
        { label: 'שירותים', href: '#services' },
        { label: 'אודות', href: '#about' },
        { label: 'צור קשר', href: '#contact' }
      ],
      cta: 'התחל פרויקט'
    }
  };

  const text = content[locale];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg' : ''
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ mixBlendMode: scrolled ? 'normal' : 'difference' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-32">
        <div className={`flex justify-between items-center py-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <motion.div 
            className={`text-2xl font-bold text-white ${isRTL ? 'order-3' : 'order-1'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              letterSpacing: '-0.02em'
            }}
          >
            <Link href="/">
              {text.logo}
            </Link>
          </motion.div>

          {/* Menu */}
          <div className={`hidden md:flex gap-12 ${isRTL ? 'flex-row-reverse order-2' : 'order-2'}`}>
            {text.menu.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="relative text-white text-sm uppercase tracking-wider font-medium hover-line"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  fontFamily: isRTL 
                    ? 'Heebo, Rubik, -apple-system, sans-serif' 
                    : 'Inter, -apple-system, sans-serif'
                }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className={`px-6 py-2 border border-white/20 text-white text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:bg-white hover:text-black ${
              isRTL ? 'order-1' : 'order-3'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              fontFamily: isRTL 
                ? 'Heebo, Rubik, -apple-system, sans-serif' 
                : 'Inter, -apple-system, sans-serif'
            }}
          >
            {text.cta}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden absolute top-8 right-8">
        <button className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
          <span className="w-6 h-px bg-white transition-all duration-300" />
          <span className="w-6 h-px bg-white transition-all duration-300" />
          <span className="w-4 h-px bg-white transition-all duration-300 ml-auto" />
        </button>
      </div>
    </motion.nav>
  );
}