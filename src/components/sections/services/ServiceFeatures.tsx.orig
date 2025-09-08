// src/components/sections/services/ServiceFeatures.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, TrendingUp, Code2, Smartphone, Palette, Cloud } from 'lucide-react';

interface ServiceFeaturesProps {
  locale: 'en' | 'he';
  selectedService?: string | null;
}

export default function ServiceFeatures({ locale, selectedService }: ServiceFeaturesProps) {
  const isRTL = locale === 'he';

  // Define features for each service or show general features
  const getFeatures = () => {
    if (!selectedService || selectedService === 'all') {
      // General features when no specific service is selected
      return {
        title: locale === 'en' ? 'Why Choose Us' : 'למה לבחור בנו',
        subtitle: locale === 'en' ? '04 — Features' : '04 — תכונות',
        items: [
          {
            icon: Code2,
            title: locale === 'en' ? 'Clean Code' : 'קוד נקי',
            description: locale === 'en' 
              ? 'Modern, maintainable code following best practices'
              : 'קוד מודרני וקל לתחזוקה לפי הסטנדרטים הגבוהים ביותר'
          },
          {
            icon: Zap,
            title: locale === 'en' ? 'Lightning Fast' : 'מהירות בזק',
            description: locale === 'en'
              ? 'Optimized performance for exceptional user experience'
              : 'ביצועים מותאמים לחוויית משתמש יוצאת דופן'
          },
          {
            icon: Shield,
            title: locale === 'en' ? 'Secure & Reliable' : 'מאובטח ואמין',
            description: locale === 'en'
              ? 'Enterprise-grade security and 99.9% uptime'
              : 'אבטחה ברמה ארגונית וזמינות של 99.9%'
          },
          {
            icon: TrendingUp,
            title: locale === 'en' ? 'Scalable Solutions' : 'פתרונות ניתנים להרחבה',
            description: locale === 'en'
              ? 'Built to grow with your business needs'
              : 'בנוי לגדול יחד עם הצרכים העסקיים שלכם'
          },
          {
            icon: Smartphone,
            title: locale === 'en' ? 'Mobile First' : 'מובייל תחילה',
            description: locale === 'en'
              ? 'Responsive design that works on all devices'
              : 'עיצוב רספונסיבי שעובד על כל המכשירים'
          },
          {
            icon: Cloud,
            title: locale === 'en' ? 'Cloud Native' : 'ענן מקורי',
            description: locale === 'en'
              ? 'Modern cloud infrastructure for maximum flexibility'
              : 'תשתית ענן מודרנית לגמישות מקסימלית'
          }
        ]
      };
    }

    // Specific features based on selected service
    const serviceFeatures = {
      web: {
        title: locale === 'en' ? 'Web Development Features' : 'תכונות פיתוח אתרים',
        subtitle: locale === 'en' ? '04 — Web Features' : '04 — תכונות אתרים',
        items: [
          {
            icon: Code2,
            title: locale === 'en' ? 'React & Next.js' : 'React & Next.js',
            description: locale === 'en'
              ? 'Built with modern frameworks for optimal performance'
              : 'בנוי עם פריימוורקים מודרניים לביצועים אופטימליים'
          },
          {
            icon: Palette,
            title: locale === 'en' ? 'Custom Design' : 'עיצוב מותאם אישית',
            description: locale === 'en'
              ? 'Unique designs tailored to your brand'
              : 'עיצובים ייחודיים המותאמים למותג שלכם'
          },
          {
            icon: Shield,
            title: locale === 'en' ? 'SEO Optimized' : 'מותאם לקידום אתרים',
            description: locale === 'en'
              ? 'Built-in SEO best practices for better visibility'
              : 'פרקטיקות SEO מובנות לנראות טובה יותר'
          }
        ]
      },
      mobile: {
        title: locale === 'en' ? 'Mobile App Features' : 'תכונות אפליקציות',
        subtitle: locale === 'en' ? '04 — Mobile Features' : '04 — תכונות מובייל',
        items: [
          {
            icon: Smartphone,
            title: locale === 'en' ? 'Cross Platform' : 'חוצה פלטפורמות',
            description: locale === 'en'
              ? 'One codebase for iOS and Android'
              : 'קוד אחד ל-iOS ו-Android'
          },
          {
            icon: Zap,
            title: locale === 'en' ? 'Native Performance' : 'ביצועים מקוריים',
            description: locale === 'en'
              ? 'Smooth 60fps animations and interactions'
              : 'אנימציות ואינטראקציות חלקות ב-60fps'
          },
          {
            icon: Cloud,
            title: locale === 'en' ? 'Offline Support' : 'תמיכה אופליין',
            description: locale === 'en'
              ? 'Works seamlessly without internet connection'
              : 'עובד בצורה חלקה גם ללא חיבור לאינטרנט'
          }
        ]
      },
      design: {
        title: locale === 'en' ? 'Design Features' : 'תכונות עיצוב',
        subtitle: locale === 'en' ? '04 — Design Features' : '04 — תכונות עיצוב',
        items: [
          {
            icon: Palette,
            title: locale === 'en' ? 'User Research' : 'מחקר משתמשים',
            description: locale === 'en'
              ? 'Data-driven design decisions'
              : 'החלטות עיצוב מבוססות נתונים'
          },
          {
            icon: Zap,
            title: locale === 'en' ? 'Rapid Prototyping' : 'אב טיפוס מהיר',
            description: locale === 'en'
              ? 'Quick iterations and feedback loops'
              : 'איטרציות מהירות ולולאות משוב'
          },
          {
            icon: CheckCircle,
            title: locale === 'en' ? 'Design Systems' : 'מערכות עיצוב',
            description: locale === 'en'
              ? 'Consistent and scalable design language'
              : 'שפת עיצוב עקבית וניתנת להרחבה'
          }
        ]
      },
      cloud: {
        title: locale === 'en' ? 'Cloud Features' : 'תכונות ענן',
        subtitle: locale === 'en' ? '04 — Cloud Features' : '04 — תכונות ענן',
        items: [
          {
            icon: Cloud,
            title: locale === 'en' ? 'Auto Scaling' : 'התאמה אוטומטית',
            description: locale === 'en'
              ? 'Automatically scale based on demand'
              : 'התאמה אוטומטית על פי הביקוש'
          },
          {
            icon: Shield,
            title: locale === 'en' ? 'Security First' : 'אבטחה תחילה',
            description: locale === 'en'
              ? 'Enterprise-grade security measures'
              : 'אמצעי אבטחה ברמה ארגונית'
          },
          {
            icon: TrendingUp,
            title: locale === 'en' ? 'Cost Optimization' : 'אופטימיזציית עלויות',
            description: locale === 'en'
              ? 'Pay only for what you use'
              : 'שלמו רק על מה שאתם משתמשים'
          }
        ]
      }
    };

    return serviceFeatures[selectedService as keyof typeof serviceFeatures] || getFeatures();
  };

  const features = getFeatures();

  return (
    <section 
      id="features"
      className="relative py-32 bg-black"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            #00D9FF 100px,
            #00D9FF 101px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`mb-20 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <span className="text-cyan-400 text-sm uppercase tracking-wider">
            {features.subtitle}
          </span>
          <h2 className="text-display mt-4">
            <span className="text-white">{features.title}</span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.items.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative p-8 bg-gray-900 border border-cyan-400/10 hover:border-cyan-400/30 transition-all duration-300">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-16 h-16 mb-6"
                  >
                    <div className="absolute inset-0 bg-cyan-400/20 blur-xl" />
                    <div className="relative w-full h-full border border-cyan-400/40 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="relative z-10 text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="relative z-10 text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Corner Decoration */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button className="px-8 py-4 border border-cyan-400/40 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 uppercase tracking-wider">
            {locale === 'en' ? 'See All Features' : 'ראה את כל התכונות'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}