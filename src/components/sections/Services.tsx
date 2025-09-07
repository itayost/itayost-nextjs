'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Smartphone, 
  ShoppingBag, 
  Palette, 
  Search, 
  Shield,
  Rocket,
  Server,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  features: string[];
  price: string;
  priceType: 'fixed' | 'monthly' | 'hourly';
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 'web-development',
    title: 'פיתוח אתרים',
    titleEn: 'Web Development',
    description: 'אתרים מותאמים אישית עם טכנולוגיות מתקדמות וביצועים מעולים',
    icon: Code2,
    gradient: 'from-accent-purple to-accent-indigo',
    features: ['React/Next.js', 'TypeScript', 'API Integration', 'SEO Optimization'],
    price: '₪15,000',
    priceType: 'fixed',
    popular: true,
  },
  {
    id: 'mobile-apps',
    title: 'אפליקציות מובייל',
    titleEn: 'Mobile Apps',
    description: 'אפליקציות native ו-cross platform לכל המכשירים',
    icon: Smartphone,
    gradient: 'from-accent-blue to-accent-cyan',
    features: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline Mode'],
    price: '₪25,000',
    priceType: 'fixed',
  },
  {
    id: 'ecommerce',
    title: 'חנויות אונליין',
    titleEn: 'E-Commerce',
    description: 'פתרונות מסחר אלקטרוני מקצה לקצה עם ממשקי ניהול',
    icon: ShoppingBag,
    gradient: 'from-accent-emerald to-accent-cyan',
    features: ['Payment Gateway', 'Inventory Management', 'Analytics Dashboard', 'Multi-language'],
    price: '₪20,000',
    priceType: 'fixed',
    popular: true,
  },
  {
    id: 'ui-design',
    title: 'עיצוב UI/UX',
    titleEn: 'UI/UX Design',
    description: 'עיצוב ממשקים מרהיבים עם חוויית משתמש אינטואיטיבית',
    icon: Palette,
    gradient: 'from-accent-rose to-accent-amber',
    features: ['Figma Design', 'Interactive Prototypes', 'User Research', 'Design System'],
    price: '₪8,000',
    priceType: 'fixed',
  },
  {
    id: 'seo',
    title: 'קידום אורגני',
    titleEn: 'SEO Services',
    description: 'אופטימיזציה למנועי חיפוש ושיפור הדירוג',
    icon: Search,
    gradient: 'from-accent-amber to-accent-yellow',
    features: ['Technical SEO', 'Content Strategy', 'Analytics & Reports', 'Local SEO'],
    price: '₪3,000',
    priceType: 'monthly',
  },
  {
    id: 'maintenance',
    title: 'תחזוקה ותמיכה',
    titleEn: 'Maintenance',
    description: 'תמיכה טכנית מלאה ועדכונים שוטפים',
    icon: Shield,
    gradient: 'from-accent-violet to-accent-purple',
    features: ['24/7 Support', 'Security Updates', 'Regular Backups', 'Performance Monitoring'],
    price: '₪1,500',
    priceType: 'monthly',
  },
];

export default function Services() {
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
  
  return (
    <section ref={containerRef} className="relative py-32 lg:py-40 bg-dark-950 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent" />
        
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-dots opacity-10" />
        
        {/* Animated shapes */}
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 pointer-events-none">
          {/* Rotating hexagon */}
          <motion.div
            animate={{
              rotate: 360,
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 }
            }}
            className="absolute top-1/3 -right-32 w-80 h-80"
          >
            <div className="w-full h-full shape-hexagon bg-gradient-to-br from-accent-purple/15 to-accent-indigo/15 blur-2xl" />
          </motion.div>
          
          {/* Floating triangle */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: mousePosition.x * -20,
            }}
            transition={{ 
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              x: { type: "spring", stiffness: 30, damping: 20 }
            }}
            className="absolute bottom-1/3 -left-32 w-64 h-64"
          >
            <div className="w-full h-full shape-triangle bg-gradient-to-tr from-accent-blue/15 to-accent-cyan/15 blur-2xl" />
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
            <Rocket className="w-5 h-5 text-accent-purple" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              השירותים שלנו
            </span>
          </motion.div>
          
          <h2 className="text-display-xl lg:text-display-2xl font-display font-bold mb-8">
            <span className="block text-white">פתרונות דיגיטליים</span>
            <span className="block heading-gradient">מותאמים אישית</span>
          </h2>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            כל עסק הוא ייחודי, ולכן אנחנו מציעים פתרונות מותאמים אישית 
            שמשלבים טכנולוגיות מתקדמות עם עיצוב מרהיב וחוויית משתמש מושלמת
          </p>
        </motion.div>
        
        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => { setHoveredService(service.id); }}
              onMouseLeave={() => { setHoveredService(null); }}
            >
              <ServiceCard 
                service={service} 
                isHovered={hoveredService === service.id}
              />
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="card-glass-heavy rounded-3xl p-12 max-w-3xl mx-auto">
            <Server className="w-16 h-16 mx-auto mb-6 text-accent-purple" />
            <h3 className="text-3xl font-bold text-white mb-4">
              לא מצאתם את מה שחיפשתם?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              אנחנו מתמחים בפתרונות מותאמים אישית. ספרו לנו על הפרויקט שלכם ונבנה יחד את הפתרון המושלם
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-primary group">
                  <span className="flex items-center gap-3">
                    קבלו הצעת מחיר
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              <Link href="/services">
                <button className="btn-outline">
                  כל השירותים
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
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
      {/* Popular badge */}
      {service.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-purple to-accent-indigo shadow-lg">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              פופולרי
            </span>
          </div>
        </div>
      )}
      
      <div className="card-glass-heavy rounded-3xl p-8 h-full flex flex-col backdrop-blur-2xl">
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
          className={`
            w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} 
            p-4 mb-6 shadow-xl relative
          `}
        >
          <Icon className="w-full h-full text-white" />
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} blur-xl opacity-50`} />
        </motion.div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">
            {service.title}
          </h3>
          {service.titleEn && (
            <p className="text-sm text-gray-500 mb-4 font-mono">
              {service.titleEn}
            </p>
          )}
          
          <p className="text-gray-400 mb-6 leading-relaxed">
            {service.description}
          </p>
          
          {/* Features */}
          <ul className="space-y-3 mb-8">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-accent-purple flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Price footer */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold heading-gradient">
                {service.price}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {service.priceType === 'monthly' && 'לחודש'}
                {service.priceType === 'hourly' && 'לשעה'}
                {service.priceType === 'fixed' && 'החל מ-'}
              </div>
            </div>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-white transition-colors duration-300" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}