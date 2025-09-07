'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Star, 
  Target,
  Zap,
  Award,
  Clock,
  Globe
} from 'lucide-react';

interface Stat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  gradient: string;
  delay: number;
}

const stats: Stat[] = [
  {
    id: 'clients',
    value: 150,
    suffix: '+',
    label: 'לקוחות מרוצים',
    sublabel: 'ברחבי העולם',
    icon: Users,
    gradient: 'from-accent-purple to-accent-indigo',
    delay: 0,
  },
  {
    id: 'projects',
    value: 300,
    suffix: '+',
    label: 'פרויקטים הושלמו',
    sublabel: 'בהצלחה מוחלטת',
    icon: Target,
    gradient: 'from-accent-blue to-accent-cyan',
    delay: 0.1,
  },
  {
    id: 'rating',
    value: 4.9,
    suffix: '★',
    label: 'דירוג ממוצע',
    sublabel: 'מלקוחותינו',
    icon: Star,
    gradient: 'from-accent-amber to-accent-yellow',
    delay: 0.2,
  },
  {
    id: 'uptime',
    value: 99.9,
    suffix: '%',
    label: 'זמינות',
    sublabel: 'אמינות מוחלטת',
    icon: TrendingUp,
    gradient: 'from-accent-emerald to-accent-cyan',
    delay: 0.3,
  },
];

function CountUpAnimation({ 
  end, 
  duration = 2.5,
  prefix = '',
  suffix = '',
  decimals = 1 
}: { 
  end: number; 
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    const startTime = Date.now();
    const startValue = 0;
    
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Smooth easing function
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = startValue + (end - startValue) * easeOutExpo;
      
      setCount(Number(currentCount.toFixed(decimals)));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [end, duration, isInView, decimals]);
  
  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
  
  return (
    <section ref={containerRef} className="relative py-32 lg:py-40 bg-dark-950 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-indigo/5" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        {/* Animated geometric shapes */}
        <motion.div style={{ y: parallaxY, opacity }} className="absolute inset-0 pointer-events-none">
          {/* Large hexagon */}
          <motion.div
            animate={{
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
              rotate: [0, 360],
            }}
            transition={{ 
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            className="absolute -top-32 -right-32 w-96 h-96"
          >
            <div className="w-full h-full shape-hexagon bg-gradient-to-br from-accent-purple/10 to-accent-indigo/10 blur-3xl" />
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
            <div className="w-full h-full shape-diamond bg-gradient-to-tr from-accent-blue/10 to-accent-cyan/10 blur-3xl" />
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
            <Zap className="w-5 h-5 text-accent-purple" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              מספרים ועובדות
            </span>
          </motion.div>
          
          <h2 className="text-display-xl lg:text-display-2xl font-display font-bold mb-8">
            <span className="block text-white">תוצאות שמדברות</span>
            <span className="block heading-gradient">בעד עצמן</span>
          </h2>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            כל מספר מספר סיפור של הצלחה. כל סטטיסטיקה מייצגת לקוח מרוצה, 
            פרויקט מוצלח וחדשנות טכנולוגית שמניעה את העסק שלכם קדימה.
          </p>
        </motion.div>
        
        {/* Stats grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.delay }}
            >
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </div>
        
        {/* Bottom badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Award, text: 'מוסמך Google Partner' },
            { icon: Globe, text: 'שירות בינלאומי' },
            { icon: Clock, text: 'תמיכה 24/7' }
          ].map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <badge.icon className="w-4 h-4 text-accent-purple" />
              <span className="text-sm font-medium text-white/70">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = stat.icon;
  const decimals = stat.id === 'rating' || stat.id === 'uptime' ? 1 : 0;
  
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => { setIsHovered(true); }}
      onMouseLeave={() => { setIsHovered(false); }}
      className="relative group h-full"
    >
      <div className="card-glass-heavy rounded-3xl p-8 h-full text-center backdrop-blur-2xl">
        {/* Background gradient on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} opacity-10`}
        />
        
        {/* Icon container */}
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
          className={`
            w-20 h-20 mx-auto mb-6 rounded-2xl 
            bg-gradient-to-r ${stat.gradient} p-5 
            shadow-xl relative
          `}
        >
          <Icon className="w-full h-full text-white" />
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} blur-xl opacity-50`} />
        </motion.div>
        
        {/* Counter */}
        <div className="relative z-10">
          <div className="text-5xl font-bold mb-3 heading-gradient">
            <CountUpAnimation 
              end={stat.value} 
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={decimals}
            />
          </div>
          
          {/* Labels */}
          <div className="text-xl font-semibold text-white mb-2">
            {stat.label}
          </div>
          <div className="text-sm text-gray-500">
            {stat.sublabel}
          </div>
        </div>
      </div>
    </motion.div>
  );
}