'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Zap,
  Shield,
  Rocket,
  Users,
  Clock,
  Award,
  TrendingUp,
  Headphones,
  Heart,
  Globe,
  Cpu,
  BarChart
} from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  stats?: string;
}

const features: Feature[] = [
  {
    id: 'tech',
    icon: Rocket,
    title: 'טכנולוגיות מתקדמות',
    description: 'Next.js 15, React 19, AI Integration וכל הטכנולוגיות החמות',
    gradient: 'from-accent-purple to-accent-indigo',
    stats: '50+ טכנולוגיות'
  },
  {
    id: 'security',
    icon: Shield,
    title: 'אבטחה ברמה הגבוהה',
    description: 'הצפנה מתקדמת, WAF, DDoS Protection ועמידה בתקנים',
    gradient: 'from-accent-emerald to-accent-cyan',
    stats: '100% מאובטח'
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'ביצועים בלתי מתפשרים',
    description: 'Core Web Vitals מושלמים, CDN גלובלי וטעינה מהירה',
    gradient: 'from-accent-amber to-accent-yellow',
    stats: '99.9% Uptime'
  },
  {
    id: 'team',
    icon: Users,
    title: 'צוות מומחים',
    description: 'מפתחים ומעצבים עם ניסיון של מעל 10 שנים בתעשייה',
    gradient: 'from-accent-blue to-accent-cyan',
    stats: '15+ מומחים'
  },
  {
    id: 'delivery',
    icon: Clock,
    title: 'עמידה בזמנים',
    description: 'ניהול פרויקטים אג׳ילי עם מעקב שוטף ושקיפות מלאה',
    gradient: 'from-accent-rose to-accent-amber',
    stats: '100% בזמן'
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'תמיכה 24/7',
    description: 'תמיכה טכנית מסביב לשעון עם SLA מובטח',
    gradient: 'from-accent-violet to-accent-purple',
    stats: '< 1hr תגובה'
  },
  {
    id: 'scalability',
    icon: TrendingUp,
    title: 'גמישות וסקיילביליות',
    description: 'ארכיטקטורה מודולרית שגדלה עם העסק שלכם',
    gradient: 'from-accent-indigo to-accent-blue',
    stats: '∞ סקיילביליות'
  },
  {
    id: 'analytics',
    icon: BarChart,
    title: 'אנליטיקס מתקדמת',
    description: 'מעקב ביצועים, A/B Testing ותובנות בזמן אמת',
    gradient: 'from-accent-purple to-accent-rose',
    stats: '360° תובנות'
  },
  {
    id: 'global',
    icon: Globe,
    title: 'נוכחות גלובלית',
    description: 'תמיכה רב-שפתית, CDN גלובלי ונגישות מכל מקום',
    gradient: 'from-accent-cyan to-accent-blue',
    stats: '195+ מדינות'
  }
];

const achievements = [
  { number: 150, suffix: '+', label: 'פרויקטים הושלמו', icon: Award },
  { number: 98, suffix: '%', label: 'לקוחות מרוצים', icon: Heart },
  { number: 50, suffix: '+', label: 'לקוחות פעילים', icon: Users },
  { number: 10, suffix: '+', label: 'שנות ניסיון', icon: TrendingUp }
];

export default function Features() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
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
        
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-dots opacity-10" />
        
        {/* Animated geometric shapes */}
        <motion.div style={{ y: parallaxY, opacity }} className="absolute inset-0 pointer-events-none">
          {/* Floating hexagon */}
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
            className="absolute top-1/4 -right-32 w-96 h-96"
          >
            <div className="w-full h-full shape-hexagon bg-gradient-to-br from-accent-purple/15 to-accent-indigo/15 blur-3xl" />
          </motion.div>
          
          {/* Triangle shape */}
          <motion.div
            animate={{
              x: mousePosition.x * -20,
              y: [0, 30, 0],
            }}
            transition={{ 
              x: { type: "spring", stiffness: 30, damping: 20 },
              y: { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-1/4 -left-32 w-80 h-80"
          >
            <div className="w-full h-full shape-triangle bg-gradient-to-tr from-accent-blue/15 to-accent-cyan/15 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full card-glass mb-10"
          >
            <Cpu className="w-5 h-5 text-accent-purple" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              היתרונות שלנו
            </span>
          </motion.div>
          
          <h2 className="text-display-xl lg:text-display-2xl font-display font-bold mb-8">
            <span className="block text-white">טכנולוגיה שמניעה</span>
            <span className="block heading-gradient">הצלחה עסקית</span>
          </h2>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            אנחנו לא רק בונים פרויקטים - אנחנו יוצרים חוויות דיגיטליות 
            שמשנות את הדרך שבה העסק שלכם פועל ומתקשר עם הלקוחות
          </p>
        </motion.div>
        
        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onMouseEnter={() => { setHoveredFeature(feature.id); }}
              onMouseLeave={() => { setHoveredFeature(null); }}
            >
              <FeatureCard 
                feature={feature} 
                isHovered={hoveredFeature === feature.id}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Achievements section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-accent-indigo/10 to-accent-purple/10 blur-3xl" />
          
          <div className="relative card-glass-heavy rounded-3xl p-8 lg:p-12 backdrop-blur-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-indigo/20 mb-4"
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className="text-4xl lg:text-5xl font-bold mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  >
                    <span className="heading-gradient">{stat.number}{stat.suffix}</span>
                  </motion.div>
                  
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, isHovered }: { feature: Feature; isHovered: boolean }) {
  const Icon = feature.icon;
  
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative h-full group"
    >
      <div className="card-glass-heavy rounded-3xl p-8 h-full backdrop-blur-2xl">
        {/* Background gradient on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-5`}
        />
        
        {/* Icon container */}
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6"
        >
          <div className={`
            w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} 
            p-4 shadow-xl relative
          `}>
            <Icon className="w-full h-full text-white" />
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} blur-xl opacity-50`} />
          </div>
          
          {/* Stats badge */}
          {feature.stats && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-dark-950 border border-accent-purple/30"
            >
              <span className="text-xs font-bold text-accent-purple">
                {feature.stats}
              </span>
            </motion.div>
          )}
        </motion.div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:heading-gradient transition-all duration-300">
          {feature.title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed">
          {feature.description}
        </p>
        
        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-purple to-transparent rounded-b-3xl"
        />
      </div>
    </motion.div>
  );
}