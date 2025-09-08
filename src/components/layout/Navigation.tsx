// Src/components/layout/Navigation.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from "react";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface NavigationProps {
  locale?: "en" | 'he';
}

export default function Navigation({ locale = 'en' }: NavigationProps) {
  const isRTL = locale === 'he';
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const content = {
    en: {
      logo: 'ITAYOST',
      menu: [
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/portfolio' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ],
      cta: 'Start Project'
    },
    he: {
      logo: 'ITAYOST',
      menu: [
        { label: 'בית', href: '/' },
        { label: 'עבודות', href: '/portfolio' },
        { label: 'שירותים', href: '/services' },
        { label: 'אודות', href: '/about' },
        { label: 'צור קשר', href: '/contact' }
      ],
      cta: 'התחל פרויקט'
    }
  };

  const currentContent = content[locale];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-cyan-400/10' 
            : 'bg-transparent'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="relative">
          {/* Background gradient on scroll */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <div className={`flex justify-between items-center py-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Logo */}
              <motion.div 
                className={`relative z-10 ${isRTL ? 'order-3' : 'order-1'}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/" className="relative group">
                  <span 
                    className="text-2xl md:text-3xl font-bold tracking-tight text-white"
                    style={{
                      fontFamily: 'Space Grotesk, Inter, sans-serif',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {currentContent.logo}
                  </span>
                  {/* Logo underline effect */}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-px bg-cyan-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>

              {/* Desktop Menu */}
              <div className={`hidden md:flex items-center gap-10 ${isRTL ? 'flex-row-reverse order-2' : 'order-2'}`}>
                {currentContent.menu.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        className={`
                          relative text-sm uppercase tracking-wider font-medium transition-colors duration-300
                          ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}
                        `}
                        style={{
                          fontFamily: isRTL 
                            ? 'Heebo, Rubik, -apple-system, sans-serif' 
                            : 'Inter, -apple-system, sans-serif'
                        }}
                      >
                        {/* Text */}
                        <motion.span
                          animate={{ y: hoveredIndex === index ? -2 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {item.label}
                        </motion.span>

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute -bottom-2 left-0 right-0 h-px bg-cyan-400"
                            layoutId="activeIndicator"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}

                        {/* Hover indicator */}
                        <AnimatePresence>
                          {hoveredIndex === index && !isActive && (
                            <motion.div
                              className="absolute -bottom-2 left-0 right-0 h-px bg-cyan-400/50"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Number indicator */}
                        <motion.span
                          className="absolute -top-3 -right-2 text-[8px] text-cyan-400/40"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: hoveredIndex === index ? 1 : 0,
                            scale: hoveredIndex === index ? 1 : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          0{index + 1}
                        </motion.span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.div
                className={`hidden md:block ${isRTL ? 'order-1' : 'order-3'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/contact">
                  <button className="relative group px-6 py-3 overflow-hidden">
                    {/* Button background */}
                    <div className="absolute inset-0 border border-cyan-400/40 bg-black transition-all duration-300 group-hover:border-cyan-400" />
                    
                    {/* Hover fill effect */}
                    <motion.div
                      className="absolute inset-0 bg-cyan-400"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Button text */}
                    <span className="relative z-10 text-sm uppercase tracking-wider font-medium text-cyan-400 group-hover:text-black transition-colors duration-300">
                      {currentContent.cta}
                    </span>
                  </button>
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-6 h-6">
                  <motion.span
                    className="absolute left-0 w-6 h-px bg-cyan-400"
                    animate={{
                      rotate: mobileMenuOpen ? 45 : 0,
                      y: mobileMenuOpen ? 0 : -8
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute left-0 w-6 h-px bg-cyan-400"
                    animate={{
                      opacity: mobileMenuOpen ? 0 : 1,
                      x: mobileMenuOpen ? 20 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute left-0 w-6 h-px bg-cyan-400"
                    animate={{
                      rotate: mobileMenuOpen ? -45 : 0,
                      y: mobileMenuOpen ? 0 : 8,
                      width: mobileMenuOpen ? 24 : 20
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-full sm:w-96 bg-black border-${isRTL ? 'r' : 'l'} border-cyan-400/20 z-40 md:hidden`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Mobile Menu Content */}
              <div className="h-full flex flex-col pt-24 pb-8 px-8">
                {/* Menu Items */}
                <nav className="flex-1">
                  <ul className="space-y-2">
                    {currentContent.menu.map((item, index) => {
                      const isActive = pathname === item.href;
                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`
                              group flex items-center justify-between py-4 
                              border-b border-gray-900 hover:border-cyan-400/40
                              transition-all duration-300
                            `}
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-cyan-400/40 text-xs">
                                0{index + 1}
                              </span>
                              <span className={`
                                text-lg uppercase tracking-wider font-medium
                                ${isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}
                                transition-colors duration-300
                              `}>
                                {item.label}
                              </span>
                            </div>
                            <ArrowRight className={`
                              w-4 h-4 transition-all duration-300
                              ${isActive ? 'text-cyan-400' : 'text-gray-600 group-hover:text-cyan-400'}
                              ${isRTL ? 'rotate-180' : ''}
                              group-hover:translate-x-1
                            `} />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <Link href="/contact">
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-4 bg-cyan-400 text-black font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors duration-300"
                    >
                      {currentContent.cta}
                    </button>
                  </Link>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 pt-8 border-t border-gray-900"
                >
                  <p className="text-gray-500 text-sm mb-2">
                    {locale === 'en' ? 'Get in touch' : 'צור קשר'}
                  </p>
                  <a href="tel:+972544994417" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    +972 54-499-4417
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}