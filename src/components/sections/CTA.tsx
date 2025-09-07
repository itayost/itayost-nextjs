'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {  
  Phone, 
  MessageCircle, 
  Calendar, 
  Sparkles, 
  Zap,
  Send,
  Clock,
  Shield,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setEmail('');
    // Add success toast/notification here
  };
  
  return (
    <section ref={containerRef} className="relative py-32 lg:py-40 bg-dark-950 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/10 via-transparent to-accent-indigo/10" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        {/* Animated geometric shapes */}
        <motion.div style={{ y: parallaxY, opacity }} className="absolute inset-0 pointer-events-none">
          {/* Rotating hexagon */}
          <motion.div
            animate={{
              rotate: 360,
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
            }}
            transition={{ 
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 }
            }}
            className="absolute -top-32 -right-32 w-96 h-96"
          >
            <div className="w-full h-full shape-hexagon bg-gradient-to-br from-accent-purple/20 to-accent-indigo/20 blur-3xl" />
          </motion.div>
          
          {/* Diamond shape */}
          <motion.div
            animate={{
              rotate: -360,
              x: mousePosition.x * -20,
              y: mousePosition.y * -20,
            }}
            transition={{ 
              rotate: { duration: 50, repeat: Infinity, ease: "linear" },
              x: { type: "spring", stiffness: 30, damping: 20 }
            }}
            className="absolute -bottom-32 -left-32 w-80 h-80"
          >
            <div className="w-full h-full shape-diamond bg-gradient-to-tr from-accent-blue/20 to-accent-cyan/20 blur-3xl" />
          </motion.div>
          
          {/* Floating circle */}
          <motion.div
            animate={{
              y: [0, -30, 0],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/4 w-64 h-64"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-emerald/10 to-accent-cyan/10 blur-2xl" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-5xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="card-glass-heavy rounded-3xl p-8 lg:p-16 backdrop-blur-2xl">
            {/* Top Section - Badge & Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              {/* Premium badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-accent-purple to-accent-indigo shadow-xl mb-10"
              >
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  מוכנים להתחיל?
                </span>
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </motion.div>
              
              {/* Main heading */}
              <h2 className="text-display-xl lg:text-display-2xl font-display font-bold mb-8">
                <span className="block text-white">הצטרפו למהפכה</span>
                <span className="block heading-gradient">הדיגיטלית</span>
              </h2>
              
              {/* Description */}
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                הצוות המומחה שלנו מוכן להפוך את החזון שלכם למציאות דיגיטלית מרהיבה. 
                קבלו ייעוץ מקצועי, אסטרטגיה מותאמת אישית ותמיכה מלאה לאורך כל הדרך.
              </p>
            </motion.div>
            
            {/* Email Form Section */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); }}
                  placeholder="השאירו את המייל שלכם..."
                  className="flex-1 px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:bg-white/10 focus:border-accent-purple focus:outline-none transition-all duration-300 text-lg"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary group whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        שולח...
                      </>
                    ) : (
                      <>
                        התחילו עכשיו
                        <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                ✅ ללא התחייבות • ✅ ייעוץ ראשוני חינם • ✅ מענה תוך 24 שעות
              </p>
            </motion.form>
            
            {/* Alternative Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <div className="text-center mb-6">
                <span className="text-gray-500 text-sm uppercase tracking-wider">או צרו קשר ישירות</span>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <Link href="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full btn-glass group"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Calendar className="w-5 h-5" />
                      קבעו פגישה
                    </span>
                  </motion.button>
                </Link>
                
                <a href="tel:0544994417">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full btn-glass group"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Phone className="w-5 h-5" />
                      054-499-4417
                    </span>
                  </motion.button>
                </a>
                
                <a href="https://wa.me/972544994417">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full btn-glass group"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </span>
                  </motion.button>
                </a>
              </div>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: Zap, text: 'מענה מהיר', subtext: 'תוך 24 שעות' },
                { icon: Shield, text: 'אמינות מוחלטת', subtext: '100% מאובטח' },
                { icon: CheckCircle, text: 'ללא התחייבות', subtext: 'ביטול בכל עת' },
                { icon: Clock, text: 'תמיכה מלאה', subtext: '24/7 זמינים' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-xl"
                >
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-accent-purple" />
                  <div className="text-sm font-semibold text-white">{item.text}</div>
                  <div className="text-xs text-gray-500">{item.subtext}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}