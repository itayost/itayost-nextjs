'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Check,
  X,
  Sparkles,
  Rocket,
  Crown,
  ArrowRight,
  Info
} from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  price: {
    amount: number;
    currency: string;
    period?: string;
  };
  features: {
    text: string;
    included: boolean;
  }[];
  recommended?: boolean;
  gradient: string;
  icon: React.ElementType;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'חבילת התחלה',
    nameEn: 'Starter',
    description: 'מושלם לעסקים קטנים ויזמים',
    price: {
      amount: 5000,
      currency: '₪',
    },
    features: [
      { text: 'אתר עד 5 עמודים', included: true },
      { text: 'עיצוב רספונסיבי', included: true },
      { text: 'SEO בסיסי', included: true },
      { text: 'טופס יצירת קשר', included: true },
      { text: 'אינטגרציות מתקדמות', included: false },
      { text: 'תמיכה 24/7', included: false },
    ],
    gradient: 'from-accent-blue to-accent-cyan',
    icon: Rocket
  },
  {
    id: 'professional',
    name: 'חבילה מקצועית',
    nameEn: 'Professional',
    description: 'לעסקים בצמיחה עם צרכים מתקדמים',
    price: {
      amount: 15000,
      currency: '₪',
    },
    features: [
      { text: 'אתר עד 15 עמודים', included: true },
      { text: 'עיצוב מותאם אישית', included: true },
      { text: 'SEO מתקדם', included: true },
      { text: 'מערכת ניהול תוכן', included: true },
      { text: 'אינטגרציות API', included: true },
      { text: 'תמיכה בעדיפות', included: true },
    ],
    recommended: true,
    gradient: 'from-accent-purple to-accent-indigo',
    icon: Crown
  },
  {
    id: 'enterprise',
    name: 'חבילת ארגון',
    nameEn: 'Enterprise',
    description: 'פתרונות מותאמים אישית לארגונים גדולים',
    price: {
      amount: 30000,
      currency: '₪',
    },
    features: [
      { text: 'אתר ללא הגבלת עמודים', included: true },
      { text: 'עיצוב ייחודי מאפס', included: true },
      { text: 'אופטימיזציה מלאה', included: true },
      { text: 'מערכות מורכבות', included: true },
      { text: 'אבטחה מתקדמת', included: true },
      { text: 'תמיכה 24/7 ייעודית', included: true },
    ],
    gradient: 'from-accent-amber to-accent-yellow',
    icon: Sparkles
  }
];

export default function ServicesPricing() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
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
            <Sparkles className="w-5 h-5 text-accent-purple" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              תמחור שקוף
            </span>
          </motion.div>
          
          <h2 className="text-display-xl lg:text-display-2xl font-display font-bold mb-8">
            <span className="block text-white">חבילות מחירים</span>
            <span className="block heading-gradient">לכל עסק</span>
          </h2>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            בחרו את החבילה המתאימה לכם או צרו קשר לקבלת הצעת מחיר מותאמת אישית
          </p>
        </motion.div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => { setHoveredPlan(plan.id); }}
              onMouseLeave={() => { setHoveredPlan(null); }}
            >
              <PricingCard 
                plan={plan} 
                isHovered={hoveredPlan === plan.id}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Custom Quote CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="card-glass-heavy rounded-3xl p-12 max-w-3xl mx-auto backdrop-blur-2xl">
            <Info className="w-16 h-16 mx-auto mb-6 text-accent-purple" />
            <h3 className="text-3xl font-bold text-white mb-4">
              צריכים משהו מותאם אישית?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              נשמח לבנות עבורכם חבילה מותאמת אישית שתענה בדיוק על הצרכים שלכם
            </p>
            <Link href="/contact">
              <button className="btn-primary group">
                <span className="flex items-center gap-3">
                  קבלו הצעת מחיר
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({ plan, isHovered }: { plan: PricingPlan; isHovered: boolean }) {
  const Icon = plan.icon;
  
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative h-full ${plan.recommended ? 'lg:scale-105' : ''}`}
    >
      {/* Recommended Badge */}
      {plan.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="px-6 py-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-indigo shadow-xl">
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              מומלץ
            </span>
          </div>
        </div>
      )}
      
      <div className={`
        card-glass-heavy rounded-3xl p-8 h-full backdrop-blur-2xl flex flex-col
        ${plan.recommended ? 'border-2 border-accent-purple/30' : ''}
      `}>
        {/* Background gradient on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.gradient} opacity-5`}
        />
        
        {/* Header */}
        <div className="relative z-10 text-center mb-8">
          {/* Icon */}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} p-4 shadow-xl relative`}>
              <Icon className="w-full h-full text-white" />
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${plan.gradient} blur-xl opacity-50`} />
            </div>
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-2">
            {plan.name}
          </h3>
          {plan.nameEn && (
            <p className="text-sm text-gray-500 mb-2 font-mono">
              {plan.nameEn}
            </p>
          )}
          <p className="text-gray-400 text-sm">
            {plan.description}
          </p>
        </div>
        
        {/* Price */}
        <div className="text-center mb-8">
          <div className="text-5xl font-bold heading-gradient mb-2">
            {plan.price.currency}{plan.price.amount.toLocaleString()}
          </div>
          {plan.price.period && (
            <div className="text-gray-500 text-sm">
              {plan.price.period}
            </div>
          )}
        </div>
        
        {/* Features */}
        <ul className="space-y-4 mb-8 flex-1">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              {feature.included ? (
                <Check className="w-5 h-5 text-accent-emerald flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <Link href={`/contact?plan=${plan.id}`}>
          <button className={`
            w-full rounded-full py-4 font-semibold transition-all duration-300
            ${plan.recommended 
              ? 'bg-gradient-to-r from-accent-purple to-accent-indigo text-white hover:shadow-xl hover:scale-105' 
              : 'btn-glass'
            }
          `}>
            בחר חבילה זו
          </button>
        </Link>
      </div>
    </motion.div>
  );
}