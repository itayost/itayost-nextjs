'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  Sparkles, 
  Zap, 
  Star,
  Award,
  Coffee
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function AboutHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    return () => { window.removeEventListener('mousemove', handleMouseMove); };
  }, []);
  
  return (
    <section ref={containerRef} className="relative min-h-screen pt-32 pb-20 bg-dark-950 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-indigo/10" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        {/* Animated geometric shapes */}
        <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
          {/* Hexagon */}
          <motion.div
            animate={{
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
              rotate: 360,
            }}
            transition={{ 
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" }
            }}
            className="absolute -top-32 -right-32 w-96 h-96"
          >
            <div className="w-full h-full shape-hexagon bg-gradient-to-br from-accent-purple/20 to-accent-indigo/20 blur-3xl" />
          </motion.div>
          
          {/* Diamond */}
          <motion.div
            animate={{
              x: mousePosition.x * -20,
              y: mousePosition.y * -20,
            }}
            transition={{ type: "spring", stiffness: 30, damping: 20 }}
            className="absolute -bottom-32 -left-32 w-80 h-80"
          >
            <div className="w-full h-full shape-diamond bg-gradient-to-tr from-accent-blue/20 to-accent-cyan/20 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full card-glass mb-10"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-emerald"></span>
              </span>
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                זמין לפרויקטים
              </span>
            </motion.div>
            
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-display-xl lg:text-display-2xl font-display font-bold mb-6">
                <span className="block text-white">שלום, אני</span>
                <span className="block heading-gradient">איתי אוסטרייכר</span>
              </h1>
              
              <p className="text-2xl lg:text-3xl text-white font-semibold mb-4">
                Full Stack Developer
              </p>
              
              <p className="text-xl text-gray-400 leading-relaxed">
                מפתח תוכנה עם תשוקה ליצירת חוויות דיגיטליות מרהיבות. 
                מומחה בטכנולוגיות מתקדמות ועיצוב מודרני.
              </p>
            </motion.div>
            
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {[
                { value: '5+', label: 'שנות ניסיון', icon: Zap, gradient: 'from-accent-purple to-accent-indigo' },
                { value: '150+', label: 'פרויקטים', icon: Star, gradient: 'from-accent-amber to-accent-yellow' },
                { value: '98%', label: 'לקוחות מרוצים', icon: Award, gradient: 'from-accent-emerald to-accent-cyan' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="card-glass-heavy rounded-2xl p-4 backdrop-blur-2xl">
                    <stat.icon className={`w-6 h-6 mb-2 text-accent-purple`} />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <button className="btn-primary group">
                  <span className="flex items-center gap-3">
                    בואו נדבר
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              
              <Link href="/portfolio">
                <button className="btn-glass">
                  צפה בעבודות
                </button>
              </Link>
              
              <button className="btn-outline group">
                <span className="flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  הורד קורות חיים
                </span>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Visual Side - Code Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-indigo/20 blur-3xl" />
              
              {/* Code Card */}
              <div className="relative card-glass-heavy rounded-3xl p-8 backdrop-blur-2xl">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-gray-500 ml-4 font-mono">developer.tsx</span>
                </div>
                
                {/* Code Content */}
                <div className="font-mono text-sm lg:text-base space-y-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-accent-purple">const</span>{' '}
                    <span className="text-accent-blue">developer</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-gray-500">{'{'}</span>
                  </motion.div>
                  
                  {[
                    { key: 'name', value: '"איתי אוסטרייכר"', delay: 0.9 },
                    { key: 'role', value: '"Full Stack Developer"', delay: 1.0 },
                    { key: 'experience', value: '5', delay: 1.1 },
                    { key: 'location', value: '"תל אביב, ישראל"', delay: 1.2 },
                  ].map((line) => (
                    <motion.div
                      key={line.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: line.delay }}
                      className="pl-4"
                    >
                      <span className="text-accent-cyan">{line.key}</span>
                      <span className="text-white">:</span>{' '}
                      <span className="text-accent-amber">{line.value}</span>
                      <span className="text-gray-500">,</span>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                    className="pl-4"
                  >
                    <span className="text-accent-cyan">skills</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-gray-500">[</span>
                  </motion.div>
                  
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      className="pl-8"
                    >
                      <span className="text-accent-emerald">&quot;{skill}&quot;</span>
                      {index < 4 && <span className="text-gray-500">,</span>}
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <span className="pl-4 text-gray-500">],</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.1 }}
                    className="pl-4"
                  >
                    <span className="text-accent-cyan">coffee</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-accent-purple">Infinity</span>
                    <Coffee className="w-4 h-4 inline ml-2 text-accent-amber" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                  >
                    <span className="text-gray-500">{'}'}</span>
                    <span className="text-white">;</span>
                  </motion.div>
                </div>
                
                {/* Blinking Cursor */}
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-3 h-5 bg-accent-purple mt-2"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">גלול</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
