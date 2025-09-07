'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Code2,
  Smartphone,
  ShoppingBag,
  Palette,
  Search,
  Shield,
  Database,
  Cloud,
  ArrowRight,
  CheckCircle,
  Zap,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  description: string;
  icon: React.ElementType;
  category: string;
  features: string[];
  price: {
    from: number;
    type: 'fixed' | 'monthly' | 'hourly';
  };
  timeline: string;
  gradient: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: '1',
    slug: 'web-development',
    name: 'פיתוח אתרים',
    nameEn: 'Web Development',
    description: 'אתרים מותאמים אישית עם טכנולוגיות מתקדמות וביצועים מעולים',
    icon: Code2,
    category: 'development',
    features: [
      'React/Next.js',
      'עיצוב רספונסיבי',
      'SEO מובנה',
      'ביצועים מהירים'
    ],
    price: { from: 15000, type: 'fixed' },
    timeline: '2-4 שבועות',
    gradient: 'from-accent-purple to-accent-indigo',
    popular: true
  },
  {
    id: '2',
    slug: 'mobile-apps',
    name: 'אפליקציות מובייל',
    nameEn: 'Mobile Apps',
    description: 'אפליקציות native ו-cross platform לכל המכשירים',
    icon: Smartphone,
    category: 'development',
    features: [
      'React Native',
      'iOS & Android',
      'Push Notifications',
      'Offline Support'
    ],
    price: { from: 25000, type: 'fixed' },
    timeline: '4-8 שבועות',
    gradient: 'from-accent-blue to-accent-cyan'
  },
  {
    id: '3',
    slug: 'ecommerce',
    name: 'חנויות אונליין',
    nameEn: 'E-Commerce',
    description: 'פתרונות מסחר אלקטרוני מקצה לקצה עם ממשקי ניהול',
    icon: ShoppingBag,
    category: 'development',
    features: [
      'מערכת תשלומים',
      'ניהול מלאי',
      'דשבורד ניהול',
      'רב-שפתי'
    ],
    price: { from: 20000, type: 'fixed' },
    timeline: '3-6 שבועות',
    gradient: 'from-accent-emerald to-accent-cyan',
    popular: true
  },
  {
    id: '4',
    slug: 'ui-ux-design',
    name: 'עיצוב UI/UX',
    nameEn: 'UI/UX Design',
    description: 'עיצוב ממשקים מרהיבים עם חוויית משתמש מושלמת',
    icon: Palette,
    category: 'design',
    features: [
      'Figma Design',
      'Prototyping',
      'User Research',
      'Design System'
    ],
    price: { from: 8000, type: 'fixed' },
    timeline: '1-2 שבועות',
    gradient: 'from-accent-rose to-accent-amber'
  },
  {
    id: '5',
    slug: 'seo-services',
    name: 'קידום אתרים',
    nameEn: 'SEO Services',
    description: 'אופטימיזציה למנועי חיפוש ושיפור הדירוג',
    icon: Search,
    category: 'marketing',
    features: [
      'Technical SEO',
      'Content Strategy',
      'Analytics',
      'Local SEO'
    ],
    price: { from: 3000, type: 'monthly' },
    timeline: 'מתמשך',
    gradient: 'from-accent-amber to-accent-yellow'
  },
  {
    id: '6',
    slug: 'maintenance',
    name: 'תחזוקה ותמיכה',
    nameEn: 'Maintenance',
    description: 'תמיכה טכנית מלאה ועדכונים שוטפים',
    icon: Shield,
    category: 'support',
    features: [
      '24/7 Support',
      'Security Updates',
      'Backups',
      'Monitoring'
    ],
    price: { from: 1500, type: 'monthly' },
    timeline: 'חוזה שנתי',
    gradient: 'from-accent-violet to-accent-purple'
  },
  {
    id: '7',
    slug: 'database-design',
    name: 'תכנון בסיסי נתונים',
    nameEn: 'Database Design',
    description: 'ארכיטקטורת נתונים מתקדמת ואופטימיזציה',
    icon: Database,
    category: 'development',
    features: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Data Migration'
    ],
    price: { from: 10000, type: 'fixed' },
    timeline: '1-3 שבועות',
    gradient: 'from-accent-indigo to-accent-blue'
  },
  {
    id: '8',
    slug: 'cloud-services',
    name: 'שירותי ענן',
    nameEn: 'Cloud Services',
    description: 'פתרונות ענן מתקדמים ואירוח מנוהל',
    icon: Cloud,
    category: 'infrastructure',
    features: [
      'AWS/Azure',
      'Auto Scaling',
      'CI/CD',
      'DevOps'
    ],
    price: { from: 2000, type: 'monthly' },
    timeline: 'מיידי',
    gradient: 'from-accent-cyan to-accent-blue',
    popular: true
  }
];

const categories = [
  { id: 'all', name: 'הכל', icon: Zap },
  { id: 'development', name: 'פיתוח', icon: Code2 },
  { id: 'design', name: 'עיצוב', icon: Palette },
  { id: 'marketing', name: 'שיווק', icon: TrendingUp },
  { id: 'support', name: 'תמיכה', icon: Users },
  { id: 'infrastructure', name: 'תשתיות', icon: Cloud }
];

export default function ServicesGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  
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
  
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);
  
  return (
    <section id="services" ref={containerRef} className="relative py-32 lg:py-40 bg-dark-950 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent" />
        
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-dots opacity-10" />
        
        {/* Animated shapes */}
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 pointer-events-none">
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
            className="absolute top-1/4 -right-32 w-80 h-80"
          >
            <div className="w-full h-full shape-hexagon bg-gradient-to-br from-accent-purple/15 to-accent-indigo/15 blur-3xl" />
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
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-display-lg lg:text-display-xl font-display font-bold mb-6">
            <span className="block text-white">בחרו את</span>
            <span className="block heading-gradient">השירות המושלם</span>
          </h2>
          
          <p className="text-xl text-gray-400 leading-relaxed">
            מגוון פתרונות מותאמים אישית לכל צורך עסקי
          </p>
        </motion.div>
        
        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            const count = category.id === 'all' 
              ? services.length 
              : services.filter(s => s.category === category.id).length;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => { setSelectedCategory(category.id); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative px-8 py-4 rounded-full font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-accent-purple to-accent-indigo text-white shadow-xl' 
                    : 'card-glass text-white/70 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-semibold
                    ${isActive ? 'bg-white/20' : 'bg-white/10'}
                  `}>
                    {count}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>
        
        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => { setHoveredService(service.id); }}
                onMouseLeave={() => { setHoveredService(null); }}
              >
                <ServiceCard 
                  service={service} 
                  isHovered={hoveredService === service.id}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ServiceCard({ service, isHovered }: { service: Service; isHovered: boolean }) {
  const Icon = service.icon;
  
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative h-full group"
    >
      <Link href={`/services/${service.slug}`}>
        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-purple to-accent-indigo shadow-lg">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                פופולרי
              </span>
            </div>
          </div>
        )}
        
        <div className="card-glass-heavy rounded-3xl p-6 h-full backdrop-blur-2xl flex flex-col">
          {/* Background gradient on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-5`}
          />
          
          {/* Icon */}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-6"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.gradient} p-3 shadow-xl relative`}>
              <Icon className="w-full h-full text-white" />
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} blur-xl opacity-50`} />
            </div>
          </motion.div>
          
          {/* Content */}
          <h3 className="text-xl font-bold text-white mb-1">
            {service.name}
          </h3>
          {service.nameEn && (
            <p className="text-xs text-gray-500 mb-3 font-mono">
              {service.nameEn}
            </p>
          )}
          
          <p className="text-gray-400 text-sm mb-4 flex-1">
            {service.description}
          </p>
          
          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                <CheckCircle className="w-3 h-3 text-accent-purple flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold heading-gradient">
                ₪{service.price.from.toLocaleString()}
                {service.price.type === 'monthly' && <span className="text-sm">/חודש</span>}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                <Clock className="w-3 h-3" />
                {service.timeline}
              </div>
            </div>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}