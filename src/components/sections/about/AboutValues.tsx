'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Target,
  Lightbulb,
  Users,
  Rocket,
  Shield,
  Heart,
  Zap,
  Award
} from 'lucide-react';

interface Value {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

const values: Value[] = [
  {
    id: 'innovation',
    title: 'חדשנות',
    description: 'תמיד מחפשים את הפתרון החדשני והיצירתי ביותר לכל אתגר',
    icon: Lightbulb,
    gradient: 'from-accent-purple to-accent-indigo'
  },
  {
    id: 'quality',
    title: 'איכות',
    description: 'מחויבות לסטנדרטים הגבוהים ביותר בכל שורת קוד',
    icon: Award,
    gradient: 'from-accent-amber to-accent-yellow'
  },
  {
    id: 'collaboration',
    title: 'שיתוף פעולה',
    description: 'עבודה צמודה עם הלקוחות להבנה מעמיקה של הצרכים',
    icon: Users,
    gradient: 'from-accent-blue to-accent-cyan'
  },
  {
    id: 'growth',
    title: 'צמיחה',
    description: 'למידה מתמדת והתפתחות עם הטכנולוגיות החדשות',
    icon: Rocket,
    gradient: 'from-accent-emerald to-accent-cyan'
  },
  {
    id: 'reliability',
    title: 'אמינות',
    description: 'עמידה בהתחייבויות ומתן שירות אמין לאורך זמן',
    icon: Shield,
    gradient: 'from-accent-violet to-accent-purple'
  },
  {
    id: 'passion',
    title: 'תשוקה',
    description: 'אהבה אמיתית לטכנולוגיה ויצירה דיגיטלית',
    icon: Heart,
    gradient: 'from-accent-rose to-accent-pink'
  }
];

export default function AboutValues() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
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
        
        {/* Animated shapes */}
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="absolute top-1/3 -left-32 w-96 h-96"
          >
            <div className="w-full h-full shape-diamond bg-gradient-to-br from-accent-purple/10 to-accent-indigo/10 blur-3xl" />
          </motion.div>
          
          <motion.div
            animate={{
              x: mousePosition.x * -20,
              rotate: [0, 360],
            }}
            transition={{ 
              x: { type: "spring", stiffness: 30, damping: 20 },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" }
            }}
            className="absolute bottom-1/3 -right-32 w-80 h-80"
          >
            <div className="w-full h-full shape-hexagon bg-gradient-to-tr from-accent-blue/10 to-accent-cyan/10 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container relative z-10">
        {/* Section Header */}
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
            <Target className="w-5 h-5 text-accent-purple" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              הערכים שלנו
            </span>
          </motion.div>
          
          <h2 className="text-display-xl lg:text-display-2xl font-display font-bold mb-8">
            <span className="block text-white">עקרונות</span>
            <span className="block heading-gradient">מנחים</span>
          </h2>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            הערכים שמנחים אותנו בכל פרויקט, בכל החלטה ובכל שורת קוד שאנחנו כותבים
          </p>
        </motion.div>
        
        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => { setHoveredValue(value.id); }}
              onMouseLeave={() => { setHoveredValue(null); }}
            >
              <ValueCard value={value} isHovered={hoveredValue === value.id} />
            </motion.div>
          ))}
        </div>
        
        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="card-glass-heavy rounded-3xl p-12 max-w-4xl mx-auto backdrop-blur-2xl">
            <Zap className="w-16 h-16 mx-auto mb-6 text-accent-purple" />
            <h3 className="text-3xl font-bold text-white mb-6">
              המשימה שלנו
            </h3>
            <p className="text-xl text-gray-400 leading-relaxed">
              ליצור פתרונות דיגיטליים חדשניים שמשנים את הדרך שבה עסקים פועלים ומתקשרים עם הלקוחות שלהם. 
              אנחנו מאמינים שטכנולוגיה צריכה להיות נגישה, יפה ופשוטה לשימוש.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ValueCard({ value, isHovered }: { value: Value; isHovered: boolean }) {
  const Icon = value.icon;
  
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
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.gradient} opacity-5`}
        />
        
        {/* Icon */}
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6"
        >
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.gradient} p-4 shadow-xl relative`}>
            <Icon className="w-full h-full text-white" />
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${value.gradient} blur-xl opacity-50`} />
          </div>
        </motion.div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-3 relative z-10">
          {value.title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed relative z-10">
          {value.description}
        </p>
        
        {/* Bottom line animation */}
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