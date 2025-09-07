// components/sections/home/Hero.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Zap, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (clientY - window.innerHeight / 2) / window.innerHeight;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-dark-950">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900" />
      
      {/* Grid pattern - very subtle */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Floating geometric shapes -  */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute top-20 right-10 w-96 h-96"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-indigo opacity-10 blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-indigo/20 shape-hexagon backdrop-blur-sm" />
          </div>
        </motion.div>
        
        <motion.div
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
          className="absolute bottom-20 left-10 w-80 h-80"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-cyan opacity-10 blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-cyan/20 shape-diamond" />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Main content */}
      <div className="container relative z-10 min-h-screen flex flex-col">
        
        {/* Hero content */}
        <div className="flex-1 flex items-center py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full card-glass mb-8"
              >
                <span className="w-2 h-2 bg-accent-purple rounded-full animate-pulse" />
                <span className="text-sm font-medium">פיתוח דיגיטלי מתקדם</span>
              </motion.div>
              
              {/* Heading */}
              <h1 className="text-display-massive heading-display mb-6">
                <span className="block">בונים את</span>
                <span className="block heading-gradient">העתיד הדיגיטלי</span>
                <span className="block">שלך</span>
              </h1>
              
              {/* Description */}
              <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
                פתרונות תוכנה מותאמים אישית ברמה הגבוהה ביותר. 
                טכנולוגיות מתקדמות, עיצוב מינימליסטי וחוויית משתמש מושלמת.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/contact">
                  <button className="btn-primary group">
                    <span className="flex items-center gap-2">
                      התחל עכשיו
                      <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                
                <Link href="/portfolio">
                  <button className="btn-outline">
                    צפה בעבודות
                  </button>
                </Link>
              </div>
              
              {/* Stats -  */}
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold">150+</div>
                  <div className="text-sm text-gray-500">פרויקטים</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <div className="text-3xl font-bold">5★</div>
                  <div className="text-sm text-gray-500">דירוג</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-gray-500">תמיכה</div>
                </div>
              </div>
            </motion.div>
            
            {/* Visual side - Layered cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative">
                {/* Background blur */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-indigo/20 blur-3xl" />
                
                {/* Stacked cards */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  {/* Card 1 - Back */}
                  <div className="absolute top-8 left-8 right-0 card-glass-heavy p-8 rounded-3xl">
                    <div className="h-40 bg-gradient-to-br from-white/5 to-white/10 rounded-xl" />
                  </div>
                  
                  {/* Card 2 - Middle */}
                  <div className="absolute top-4 left-4 right-4 card-glass-heavy p-8 rounded-3xl">
                    <div className="h-40 bg-gradient-to-br from-white/10 to-white/5 rounded-xl" />
                  </div>
                  
                  {/* Card 3 - Front */}
                  <div className="relative card-glass-heavy p-8 rounded-3xl backdrop-blur-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-accent-purple to-accent-indigo rounded-2xl flex items-center justify-center">
                        <Zap className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">ביצועים מהירים</div>
                        <div className="text-sm text-gray-400">אופטימיזציה מקסימלית</div>
                      </div>
                    </div>
                    
                    {/* Progress bars */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">מהירות</span>
                          <span className="text-xs text-gray-400">98%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "98%" }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className="h-full bg-gradient-to-r from-accent-purple to-accent-indigo"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">SEO</span>
                          <span className="text-xs text-gray-400">100%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                            className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">נגישות</span>
                          <span className="text-xs text-gray-400">100%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 1.4 }}
                            className="h-full bg-gradient-to-r from-accent-emerald to-accent-cyan"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="pb-8 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">גלול</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}