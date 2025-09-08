// Src/components/sections/About.tsx
"use client";

import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import dynamic from "next/dynamic";

// Dynamic 3D Scene import for About section
const AboutMesh = dynamic(
  () => import('../three/AboutMesh'),
  { ssr: false }
);

interface AboutProps {
  locale?: 'en' | 'he';
}

export default function About({ locale = 'en' }: AboutProps) {
  const isRTL = locale === 'he';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const content = {
    en: {
      label: '03 — Who We Are',
      title1: 'Innovation',
      title2: 'Through', // Outline text
      title3: 'Technology',
      description1: 'We are a team of creative technologists, designers, and strategists passionate about building the future of digital experiences. Our approach combines cutting-edge technology with human-centered design to create solutions that matter.',
      description2: 'From startups to enterprises, we partner with forward-thinking companies to transform their digital presence and create lasting impact.',
      stats: [
        { value: '500+', label: 'Projects Completed' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '7+', label: 'Years Experience' },
        { value: '24/7', label: 'Support Available' }
      ],
      expertise: [
        'Technical Architecture',
        'Product Strategy',
        'User Experience',
        'Performance Optimization',
        'Cloud Infrastructure',
        'Digital Transformation'
      ]
    },
    he: {
      label: '03 — מי אנחנו',
      title1: 'חדשנות',
      title2: 'דרך', // Outline text
      title3: 'טכנולוגיה',
      description1: 'אנחנו צוות של טכנולוגים יצירתיים, מעצבים ואסטרטגים עם תשוקה לבניית העתיד של חוויות דיגיטליות. הגישה שלנו משלבת טכנולוגיה חדשנית עם עיצוב ממוקד אדם ליצירת פתרונות משמעותיים.',
      description2: 'מסטארטאפים ועד ארגונים גדולים, אנו שותפים לחברות חדשניות כדי לשנות את הנוכחות הדיגיטלית שלהן וליצור השפעה מתמשכת.',
      stats: [
        { value: '500+', label: 'פרויקטים הושלמו' },
        { value: '98%', label: 'שביעות רצון' },
        { value: '7+', label: 'שנות ניסיון' },
        { value: '24/7', label: 'תמיכה זמינה' }
      ],
      expertise: [
        'ארכיטקטורה טכנית',
        'אסטרטגיית מוצר',
        'חוויית משתמש',
        'אופטימיזציית ביצועים',
        'תשתיות ענן',
        'טרנספורמציה דיגיטלית'
      ]
    }
  };

  const text = content[locale];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Section Label */}
            <motion.span 
              variants={itemVariants}
              className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium"
            >
              {text.label}
            </motion.span>

            {/* Title */}
            <motion.h2 
              variants={itemVariants}
              className={`mt-4 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <span 
                className="block text-white font-bold"
                style={{
                  fontFamily: isRTL 
                    ? 'Heebo, Rubik, -apple-system, sans-serif' 
                    : 'Space Grotesk, Inter, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: isRTL ? '0' : '-0.02em',
                  lineHeight: '1.1'
                }}
              >
                {text.title1}
              </span>
              <span 
                className="block font-bold"
                style={{
                  fontFamily: isRTL 
                    ? 'Heebo, Rubik, -apple-system, sans-serif' 
                    : 'Space Grotesk, Inter, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: isRTL ? '0' : '-0.02em',
                  lineHeight: '1.1',
                  WebkitTextStroke: '2px rgba(0, 217, 255, 0.5)',
                  WebkitTextFillColor: 'transparent',                  color: 'transparent'
                }}
              >
                {text.title2}
              </span>
              <span 
                className="block text-white font-bold"
                style={{
                  fontFamily: isRTL 
                    ? 'Heebo, Rubik, -apple-system, sans-serif' 
                    : 'Space Grotesk, Inter, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: isRTL ? '0' : '-0.02em',
                  lineHeight: '1.1'
                }}
              >
                {text.title3}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p 
                className="text-gray-300 leading-relaxed"
                style={{
                  fontFamily: isRTL 
                    ? 'Heebo, Rubik, -apple-system, sans-serif' 
                    : 'Inter, -apple-system, sans-serif',
                  lineHeight: isRTL ? '1.8' : '1.7'
                }}
              >
                {text.description1}
              </p>
              <p 
                className="text-gray-300 leading-relaxed"
                style={{
                  fontFamily: isRTL 
                    ? 'Heebo, Rubik, -apple-system, sans-serif' 
                    : 'Inter, -apple-system, sans-serif',
                  lineHeight: isRTL ? '1.8' : '1.7'
                }}
              >
                {text.description2}
              </p>
            </motion.div>

            {/* Expertise Tags */}
            <motion.div 
              variants={itemVariants}
              className={`mt-12 flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {text.expertise.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-cyan-400 border border-cyan-400/20 transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400/40"
                  style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* 3D Mesh Container */}
            <div className="relative h-[500px] lg:h-[600px]">
              <AboutMesh />
              
              {/* Stats Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-8">
                  {text.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="text-center group"
                    >
                      <div 
                        className="text-4xl font-bold text-cyan-400 mb-2 transition-transform duration-300 group-hover:scale-110"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                      >
                        {stat.value}
                      </div>
                      <div 
                        className="text-xs uppercase tracking-wider text-gray-500"
                        style={{
                          fontFamily: isRTL 
                            ? 'Heebo, Rubik, -apple-system, sans-serif' 
                            : 'Inter, -apple-system, sans-serif'
                        }}
                      >
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
          animate={{ opacity: [0, 1, 0], y: [0, 50, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
          animate={{ opacity: [0, 1, 0], y: [0, -50, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 3 }}
        />
      </div>
    </section>
  );
}