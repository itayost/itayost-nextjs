'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  User, 
  CheckCircle, 
  Quote,
  Sparkles,
  Code2,
  Heart,
  Zap,
  Target
} from 'lucide-react';

const bioContent = {
  title: 'הסיפור שלי',
  subtitle: 'מתשוקה לטכנולוגיה למקצוע',
  paragraphs: [
    'המסע שלי בעולם הפיתוח התחיל לפני 5 שנים, כשגיליתי את הקסם שבהפיכת רעיונות לקוד חי ונושם. מה שהתחיל כסקרנות הפך במהרה לתשוקה אמיתית ליצירה דיגיטלית.',
    'לאורך השנים, עבדתי על מגוון רחב של פרויקטים - מסטארטאפים קטנים ועד חברות אנטרפרייז גדולות. כל פרויקט לימד אותי משהו חדש והוסיף עוד כלי לארגז הכלים המקצועי שלי.',
    'היום, אני מתמחה בפיתוח Full Stack עם דגש על React, Next.js ו-Node.js. אני מאמין שטכנולוגיה טובה היא כזו שלא מורגשת - היא פשוט עובדת, בצורה חלקה ואינטואיטיבית.',
    'מעבר לקוד, אני מאמין בבניית מערכות יחסים ארוכות טווח עם הלקוחות שלי. כל פרויקט הוא שותפות, וההצלחה שלכם היא ההצלחה שלי.'
  ],
  highlights: [
    'מומחה ב-React ו-Next.js',
    'ניסיון עם מערכות גדולות ומורכבות',
    'גישה מוכוונת משתמש',
    'עבודה צמודה עם צוותי עיצוב',
    'מחויבות לקוד נקי ואיכותי',
    'למידה והתפתחות מתמדת'
  ],
  quote: {
    text: 'הקוד הטוב ביותר הוא לא רק קוד שעובד, אלא קוד שמספר סיפור - סיפור של פתרון אלגנטי לבעיה אמיתית.',
    author: 'איתי אוסטרייכר'
  }
};

export default function AboutBio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
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
  
  return (
    <section ref={containerRef} className="relative py-32 lg:py-40 bg-dark-950 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-indigo/5" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        {/* Animated shapes */}
        <motion.div style={{ y: parallaxY, opacity }} className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
              rotate: [0, 360],
            }}
            transition={{ 
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" }
            }}
            className="absolute top-1/4 -left-32 w-80 h-80"
          >
            <div className="w-full h-full shape-hexagon bg-gradient-to-br from-accent-purple/10 to-accent-indigo/10 blur-3xl" />
          </motion.div>
          
          <motion.div
            animate={{
              x: mousePosition.x * -20,
              y: [0, 30, 0],
            }}
            transition={{ 
              x: { type: "spring", stiffness: 30, damping: 20 },
              y: { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-1/4 -right-32 w-96 h-96"
          >
            <div className="w-full h-full shape-diamond bg-gradient-to-tr from-accent-blue/10 to-accent-cyan/10 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full card-glass mb-10"
            >
              <User className="w-5 h-5 text-accent-purple" />
              <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                {bioContent.title}
              </span>
            </motion.div>
            
            <h2 className="text-display-lg lg:text-display-xl font-display font-bold mb-6">
              <span className="block text-white">{bioContent.subtitle.split(' ')[0]}</span>
              <span className="block heading-gradient">{bioContent.subtitle.split(' ').slice(1).join(' ')}</span>
            </h2>
          </motion.div>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Bio Content - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {bioContent.paragraphs.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {index === 0 && (
                      <span className="text-4xl font-bold text-accent-purple float-left mr-3 leading-none">
                        {paragraph[0]}
                      </span>
                    )}
                    {index === 0 ? paragraph.slice(1) : paragraph}
                  </p>
                </motion.div>
              ))}
              
              {/* Quote Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="relative mt-12"
              >
                <div className="card-glass-heavy rounded-3xl p-8 backdrop-blur-2xl border-r-4 border-accent-purple">
                  <Quote className="w-10 h-10 text-accent-purple mb-4" />
                  <blockquote className="text-xl lg:text-2xl font-medium text-white/90 italic mb-4">
                    &quot;{bioContent.quote.text}&quot;
                  </blockquote>
                  <cite className="block text-gray-400 not-italic">
                    — {bioContent.quote.author}
                  </cite>
                </div>
              </motion.div>
            </div>
            
            {/* Highlights Sidebar - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <div className="card-glass-heavy rounded-3xl p-8 backdrop-blur-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-accent-purple" />
                  <h3 className="text-xl font-bold text-white">נקודות חוזק</h3>
                </div>
                
                <ul className="space-y-4">
                  {bioContent.highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="mt-1 p-1 rounded-full bg-gradient-to-r from-accent-purple to-accent-indigo">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {highlight}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Decorative Elements */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <Code2 className="w-5 h-5 text-accent-purple" />
                      <Heart className="w-5 h-5 text-accent-rose" />
                      <Zap className="w-5 h-5 text-accent-amber" />
                    </div>
                    <Sparkles className="w-5 h-5 text-accent-purple animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}