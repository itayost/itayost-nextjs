'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Sparkles,
  Code2,
  Smartphone,
  ShoppingBag,
  Palette,
  Search,
  Shield,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function ServicesHero() {
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
    <section ref={containerRef} className="relative min-h-screen pt-32 pb-20 bg-dark-950 overflow-hidden flex items-center">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-indigo/10" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        {/* Animated geometric shapes */}
        <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
          {/* Large hexagon */}
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
          
          {/* Diamond shape */}
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
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full card-glass mb-10"
          >
            <Sparkles className="w-5 h-5 text-accent-purple animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              השירותים שלנו
            </span>
            <Sparkles className="w-5 h-5 text-accent-purple animate-pulse" />
          </motion.div>
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display-xl lg:text-display-2xl font-display font-bold mb-8"
          >
            <span className="block text-white">פתרונות דיגיטליים</span>
            <span className="block heading-gradient">מקצה לקצה</span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            מגוון רחב של שירותים דיגיטליים מותאמים אישית להצלחת העסק שלכם. 
            טכנולוגיות מתקדמות, עיצוב מרהיב וחוויית משתמש מושלמת.
          </motion.p>
          
          {/* Service Icons Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12"
          >
            {[
              { icon: Code2, label: 'אתרים', color: 'from-accent-purple to-accent-indigo' },
              { icon: Smartphone, label: 'אפליקציות', color: 'from-accent-blue to-accent-cyan' },
              { icon: ShoppingBag, label: 'מסחר', color: 'from-accent-emerald to-accent-cyan' },
              { icon: Palette, label: 'עיצוב', color: 'from-accent-rose to-accent-amber' },
              { icon: Search, label: 'SEO', color: 'from-accent-amber to-accent-yellow' },
              { icon: Shield, label: 'תחזוקה', color: 'from-accent-violet to-accent-purple' },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.color} shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300">
                  {service.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <Link href="#services">
              <button className="btn-primary group">
                <span className="flex items-center gap-3">
                  גלה את השירותים
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
            
            <Link href="/contact">
              <button className="btn-glass">
                קבל ייעוץ חינם
              </button>
            </Link>
            
            <Link href="/portfolio">
              <button className="btn-outline">
                צפה בעבודות
              </button>
            </Link>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: '150+', label: 'פרויקטים' },
              { value: '98%', label: 'שביעות רצון' },
              { value: '24/7', label: 'תמיכה' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold heading-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">גלול למטה</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}