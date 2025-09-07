'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Code2,
  Smartphone,
  ShoppingBag,
  Palette,
  Search,
  Shield,
  ArrowRight,
  CheckCircle,
  Zap,
  Clock,
  Users,
  TrendingUp,
  Calculator,
  Star,
  Quote,
  Phone,
  MessageCircle,
  SortAsc,
  SortDesc,
  Package,
  Award,
  Target,
  Sparkles,
  ChevronDown,
  X,
  Send,
  Eye
} from 'lucide-react';
import Link from 'next/link';

//  Service Interface
interface Service {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  shortDescription: string;
  longDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  features: string[];
  benefits: string[];
  price: {
    from: number;
    to?: number;
    type: 'fixed' | 'monthly' | 'hourly';
    currency: string;
  };
  timeline: string;
  timelineDetails: {
    planning: string;
    development: string;
    testing: string;
    launch: string;
  };
  gradient: string;
  popular?: boolean;
  featured?: boolean;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  testimonial?: {
    content: string;
    author: string;
    role: string;
    company: string;
    rating: number;
  };
  gallery?: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

// Service Category Interface
interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Service Package Interface
interface ServicePackage {
  id: string;
  name: string;
  description: string;
  services: string[];
  originalPrice: number;
  packagePrice: number;
  savings: number;
  timeline: string;
  popular?: boolean;
  featured?: boolean;
}

// Sample  Services Data
const Services: Service[] = [
  {
    id: '1',
    slug: 'web-development',
    name: 'פיתוח אתרים מקצועיים',
    nameEn: 'Professional Web Development',
    shortDescription: 'אתרים מותאמים אישית עם טכנולוגיות מתקדמות',
    longDescription: 'פיתוח אתרים מקצועיים עם Next.js, React ו-TypeScript. אתרים מהירים, מאובטחים ומותאמים לכל המכשירים עם SEO מובנה וחוויית משתמש מעולה.',
    icon: Code2,
    category: 'development',
    features: [
      'React/Next.js 14',
      'TypeScript',
      'עיצוב רספונסיבי',
      'SEO מובנה',
      'ביצועים מהירים',
      'אבטחה מתקדמת',
      'CMS מובנה',
      'גוגל אנליטיקס'
    ],
    benefits: [
      'עלייה בכניסות באתר',
      'שיפור חוויית המשתמש',
      'דירוג גבוה בגוגל',
      'זמני טעינה מהירים'
    ],
    price: { from: 15000, to: 35000, type: 'fixed', currency: '₪' },
    timeline: '3-6 שבועות',
    timelineDetails: {
      planning: '3-5 ימים',
      development: '2-4 שבועות',
      testing: '3-5 ימים',
      launch: '1-2 ימים'
    },
    gradient: 'from-accent-purple to-accent-indigo',
    popular: true,
    featured: true,
    difficulty: 3,
    tags: ['React', 'Next.js', 'TypeScript', 'SEO'],
    testimonial: {
      content: 'האתר החדש הגדיל את המכירות שלנו ב-150% תוך 3 חודשים!',
      author: 'דני לוי',
      role: 'מנכ״ל',
      company: 'טכנולוגיות המחר',
      rating: 5
    },
    faq: [
      {
        question: 'כמה זמן לוקח לפתח אתר?',
        answer: 'בממוצע 3-6 שבועות, תלוי במורכבות הפרויקט ובכמות הפיצ\'רים הנדרשים.'
      },
      {
        question: 'האם האתר יהיה מותאם לנייד?',
        answer: 'כמובן! כל האתרים שלנו מותאמים לכל המכשירים - נייד, טאבלט ומחשב.'
      }
    ]
  },
  {
    id: '2',
    slug: 'mobile-apps',
    name: 'אפליקציות מובייל',
    nameEn: 'Mobile Applications',
    shortDescription: 'אפליקציות native ו-cross platform מתקדמות',
    longDescription: 'פיתוח אפליקציות מובייל מתקדמות עם React Native. אפליקציות מהירות, יציבות ועם חוויית משתמש מעולה עבור iOS ו-Android.',
    icon: Smartphone,
    category: 'development',
    features: [
      'React Native',
      'iOS & Android',
      'Push Notifications',
      'Offline Support',
      'App Store Deploy',
      'Analytics מובנה',
      'In-App Purchases',
      'Social Login'
    ],
    benefits: [
      'נוכחות במובייל',
      'מעורבות גבוהה',
      'הכנסות נוספות',
      'חוויה מותאמת'
    ],
    price: { from: 25000, to: 60000, type: 'fixed', currency: '₪' },
    timeline: '6-12 שבועות',
    timelineDetails: {
      planning: '1-2 שבועות',
      development: '4-8 שבועות',
      testing: '1-2 שבועות',
      launch: '3-7 ימים'
    },
    gradient: 'from-accent-blue to-accent-cyan',
    difficulty: 4,
    tags: ['React Native', 'iOS', 'Android', 'API'],
    faq: [
      {
        question: 'איך מפרסמים באפ סטור?',
        answer: 'אנחנו מטפלים בכל התהליך - הכנת החומרים, הגשה לחנויות והשקה.'
      }
    ]
  },
  {
    id: '3',
    slug: 'ecommerce',
    name: 'חנויות אונליין',
    nameEn: 'E-Commerce Solutions',
    shortDescription: 'פתרונות מסחר אלקטרוני מקצה לקצה',
    longDescription: 'בניית חנויות אונליין מתקדמות עם מערכות תשלום, ניהול מלאי ודשבורד ניהול מקיף. אינטגרציה מלאה עם שירותי משלוחים וחשבוניות.',
    icon: ShoppingBag,
    category: 'development',
    features: [
      'מערכת תשלומים',
      'ניהול מלאי',
      'דשבורד ניהול',
      'רב-שפתי',
      'קופונים והנחות',
      'משלוחים אוטומטיים',
      'ממשק לספקים',
      'דוחות מכירות'
    ],
    benefits: [
      'מכירות 24/7',
      'ניהול אוטומטי',
      'הגדלת לקוחות',
      'חיסכון בעלויות'
    ],
    price: { from: 20000, to: 80000, type: 'fixed', currency: '₪' },
    timeline: '4-10 שבועות',
    timelineDetails: {
      planning: '1 שבוע',
      development: '3-8 שבועות',
      testing: '1-2 שבועות',
      launch: '3-5 ימים'
    },
    gradient: 'from-accent-emerald to-accent-cyan',
    popular: true,
    difficulty: 4,
    tags: ['E-Commerce', 'Payments', 'Inventory', 'Analytics'],
    testimonial: {
      content: 'החנות האונליין פתחה לנו שוק חדש לגמרי. המכירות זינקו ב-300%!',
      author: 'שרה כהן',
      role: 'בעלת חנות',
      company: 'אופנה ישראלית',
      rating: 5
    },
    faq: [
      {
        question: 'אילו אמצעי תשלום נתמכים?',
        answer: 'כל אמצעי התשלום הפופולריים - אשראי, פייפאל, ביט, אפל פיי ועוד.'
      }
    ]
  },
  {
    id: '4',
    slug: 'ui-ux-design',
    name: 'עיצוב UI/UX מתקדם',
    nameEn: 'Advanced UI/UX Design',
    shortDescription: 'עיצוב ממשקים מרהיבים עם חוויית משתמש מושלמת',
    longDescription: 'עיצוב מקצועי של ממשקי משתמש עם מחקר UX מעמיק, אב-טיפוס אינטראקטיבי ומערכת עיצוב מקיפה.',
    icon: Palette,
    category: 'design',
    features: [
      'Figma Design',
      'User Research',
      'Interactive Prototypes',
      'Design System',
      'Usability Testing',
      'Accessibility Design',
      'Mobile-First Design',
      'Brand Guidelines'
    ],
    benefits: [
      'חוויה מושלמת',
      'המרות גבוהות',
      'מותג חזק',
      'נגישות מלאה'
    ],
    price: { from: 8000, to: 25000, type: 'fixed', currency: '₪' },
    timeline: '2-4 שבועות',
    timelineDetails: {
      planning: '2-3 ימים',
      development: '1.5-3 שבועות',
      testing: '2-3 ימים',
      launch: '1-2 ימים'
    },
    gradient: 'from-accent-rose to-accent-amber',
    difficulty: 3,
    tags: ['Figma', 'UX Research', 'Design System', 'Prototyping'],
    faq: [
      {
        question: 'מה כלול במחקר UX?',
        answer: 'מחקר קהל יעד, ניתוח מתחרים, בדיקות שימושיות ואופטימיזציה של זרימות.'
      }
    ]
  },
  {
    id: '5',
    slug: 'seo-services',
    name: 'קידום אתרים (SEO)',
    nameEn: 'SEO Services',
    shortDescription: 'אופטימיזציה למנועי חיפוש ושיפור דירוג',
    longDescription: 'שירותי SEO מקצועיים הכוללים אופטימיזציה טכנית, יצירת תוכן איכותי ובניית קישורים חיצוניים איכותיים.',
    icon: Search,
    category: 'marketing',
    features: [
      'Technical SEO Audit',
      'Keyword Research',
      'Content Strategy',
      'Link Building',
      'Local SEO',
      'Analytics & Reports',
      'Schema Markup',
      'Site Speed Optimization'
    ],
    benefits: [
      'תנועה אורגנית',
      'עלות נמוכה לקליק',
      'מוכרות מותג',
      'ROI גבוה'
    ],
    price: { from: 3000, to: 8000, type: 'monthly', currency: '₪' },
    timeline: 'מתמשך (3-6 חודשים)',
    timelineDetails: {
      planning: '1 שבוע',
      development: 'מתמשך',
      testing: 'שבועי',
      launch: 'מיידי'
    },
    gradient: 'from-accent-amber to-accent-yellow',
    difficulty: 3,
    tags: ['SEO', 'Content', 'Analytics', 'Keywords'],
    faq: [
      {
        question: 'כמה זמן לוקח לראות תוצאות?',
        answer: 'תוצאות ראשוניות תוך 2-3 חודשים, תוצאות משמעותיות תוך 6-12 חודשים.'
      }
    ]
  },
  {
    id: '6',
    slug: 'maintenance',
    name: 'תחזוקה ותמיכה 24/7',
    nameEn: 'Maintenance & Support',
    shortDescription: 'תמיכה טכנית מלאה ועדכונים שוטפים',
    longDescription: 'שירותי תחזוקה מקיפים הכוללים גיבויים אוטומטיים, עדכוני אבטחה, מוניטורינג ותמיכה טכנית 24/7.',
    icon: Shield,
    category: 'support',
    features: [
      '24/7 Monitoring',
      'Security Updates',
      'Daily Backups',
      'Performance Optimization',
      'Bug Fixes',
      'Content Updates',
      'SSL Certificate',
      'Emergency Response'
    ],
    benefits: [
      'אמינות גבוהה',
      'אבטחה מרבית',
      'שקט נפשי',
      'זמינות מלאה'
    ],
    price: { from: 1500, to: 5000, type: 'monthly', currency: '₪' },
    timeline: 'חוזה שנתי',
    timelineDetails: {
      planning: 'מיידי',
      development: 'מתמשך',
      testing: 'יומי',
      launch: 'מיידי'
    },
    gradient: 'from-accent-violet to-accent-purple',
    difficulty: 2,
    tags: ['Monitoring', 'Security', 'Backup', 'Support'],
    faq: [
      {
        question: 'מה קורה אם האתר נופל?',
        answer: 'אנחנו מקבלים התראה מיידית ומטפלים בבעיה תוך דקות ספורות.'
      }
    ]
  }
];

// Service Categories
const serviceCategories: ServiceCategory[] = [
  { id: 'all', name: 'הכל', icon: Zap, color: 'from-accent-purple to-accent-indigo' },
  { id: 'development', name: 'פיתוח', icon: Code2, color: 'from-accent-blue to-accent-cyan' },
  { id: 'design', name: 'עיצוב', icon: Palette, color: 'from-accent-rose to-accent-amber' },
  { id: 'marketing', name: 'שיווק', icon: TrendingUp, color: 'from-accent-emerald to-accent-cyan' },
  { id: 'support', name: 'תמיכה', icon: Users, color: 'from-accent-violet to-accent-purple' },
];

// Service Packages
const servicePackages: ServicePackage[] = [
  {
    id: 'starter',
    name: 'חבילת התחלה',
    description: 'מושלם לעסקים קטנים שרוצים נוכחות דיגיטלית',
    services: ['web-development', 'ui-ux-design', 'seo-services'],
    originalPrice: 26000,
    packagePrice: 20000,
    savings: 6000,
    timeline: '4-6 שבועות',
    popular: true
  },
  {
    id: 'business',
    name: 'חבילת עסקים',
    description: 'פתרון מקיף לעסקים בינוניים עם צרכים מתקדמים',
    services: ['web-development', 'ecommerce', 'mobile-apps', 'maintenance'],
    originalPrice: 70000,
    packagePrice: 55000,
    savings: 15000,
    timeline: '8-12 שבועות',
    featured: true
  },
  {
    id: 'enterprise',
    name: 'חבילת ארגונים',
    description: 'פתרון מלא לארגונים גדולים עם דרישות מיוחדות',
    services: ['web-development', 'ecommerce', 'mobile-apps', 'ui-ux-design', 'seo-services', 'maintenance'],
    originalPrice: 120000,
    packagePrice: 90000,
    savings: 30000,
    timeline: '12-16 שבועות'
  }
];

type SortBy = 'name' | 'price' | 'timeline' | 'popularity';

interface ServiceGridSectionProps {
  services: Service[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  comparedServices: string[];
  toggleServiceComparison: (serviceId: string) => void;
}

interface PackagesSectionProps {
  packages: ServicePackage[];
  services: Service[];
  setSelectedPackage: (packageId: string | null) => void;
}

export default function ServicesClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortBy>('popularity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showComparison, setShowComparison] = useState(false);
  const [comparedServices, setComparedServices] = useState<string[]>([]);
  const [, setSelectedPackage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'services' | 'packages' | 'calculator'>('services');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true });
  
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 300]);
  
  // Mouse tracking for interactive elements
  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (clientY - window.innerHeight / 2) / window.innerHeight;
        setMousePosition({ x, y });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
  
  // Filter and sort services
  const filteredAndSortedServices = React.useMemo(() => {
    const filtered = selectedCategory === 'all' 
      ? Services 
      : Services.filter(s => s.category === selectedCategory);
    
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name, 'he');
          break;
        case 'price':
          comparison = a.price.from - b.price.from;
          break;
        case 'timeline':
          comparison = a.difficulty - b.difficulty;
          break;
        case 'popularity':
          comparison = (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return filtered;
  }, [selectedCategory, sortBy, sortOrder]);
  
  // Handle service comparison
  const toggleServiceComparison = (serviceId: string) => {
    setComparedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId].slice(0, 3) // Max 3 services
    );
  };
  
  return (
    <div ref={containerRef} className="min-h-screen bg-dark-950">
      {/*  Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900" />
          <div className="absolute inset-0 bg-grid opacity-10" />
          
          {/* Interactive geometric shapes */}
          <motion.div style={{ y: parallaxY }} className="absolute inset-0">
            <motion.div
              animate={{
                x: mousePosition.x * 40,
                y: mousePosition.y * 40,
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                x: { type: "spring", stiffness: 50, damping: 20 },
                y: { type: "spring", stiffness: 50, damping: 20 },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-20 right-10 w-96 h-96"
              style={{ willChange: 'transform' }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-indigo opacity-20 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/30 to-accent-indigo/30 shape-hexagon backdrop-blur-sm" />
              </div>
            </motion.div>
            
            <motion.div
              animate={{
                x: mousePosition.x * -30,
                y: mousePosition.y * -30,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                type: "spring", 
                stiffness: 30, 
                damping: 20,
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-20 left-10 w-80 h-80"
              style={{ willChange: 'transform' }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-cyan opacity-20 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/30 to-accent-cyan/30 shape-diamond" />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Hero Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full card-glass mb-10"
            >
              <Sparkles className="w-5 h-5 text-accent-purple animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                שירותים דיגיטליים מתקדמים
              </span>
              <Award className="w-5 h-5 text-accent-amber" />
            </motion.div>
            
            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-display-xl xl:text-display-2xl font-display font-bold mb-8"
            >
              <span className="block text-white">פתרונות דיגיטליים</span>
              <span className="block heading-gradient">שמביאים תוצאות</span>
            </motion.h1>
            
            {/* Hero Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              גלו את המגוון הרחב של השירותים הדיגיטליים שלנו - מפיתוח אתרים ואפליקציות 
              ועד עיצוב UI/UX וקידום דיגיטלי. פתרונות מותאמים אישית עם טכנולוגיות מתקדמות.
            </motion.p>
            
            {/* Service Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {[
                { id: 'services', label: 'שירותים', icon: Code2 },
                { id: 'packages', label: 'חבילות', icon: Package },
                { id: 'calculator', label: 'מחשבון מחיר', icon: Calculator }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'services' | 'packages' | 'calculator')}
                    className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-accent-purple to-accent-indigo text-white shadow-xl'
                        : 'card-glass text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { value: '250+', label: 'פרויקטים הושלמו', icon: CheckCircle },
                { value: '98%', label: 'שביעות רצון', icon: Star },
                { value: '24/7', label: 'תמיכה', icon: Clock },
                { value: '5⭐', label: 'דירוג ממוצע', icon: Award }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={isStatsInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    className="text-center card-glass rounded-2xl p-6"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3 text-accent-purple" />
                    <div className="text-2xl sm:text-3xl font-bold heading-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <AnimatePresence mode="wait">
        {activeTab === 'services' && (
          <ServiceGridSection
            services={filteredAndSortedServices}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            comparedServices={comparedServices}
            toggleServiceComparison={toggleServiceComparison}
          />
        )}
        
        {activeTab === 'packages' && (
          <PackagesSection
            packages={servicePackages}
            services={Services}
            setSelectedPackage={setSelectedPackage}
          />
        )}
        
        {activeTab === 'calculator' && (
          <PricingCalculatorSection services={Services} />
        )}
      </AnimatePresence>

      {/* Service Comparison Modal */}
      <AnimatePresence>
        {showComparison && comparedServices.length > 0 && (
          <ServiceComparisonModal
            services={Services.filter(s => comparedServices.includes(s.id))}
            onClose={() => setShowComparison(false)}
          />
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <FAQSection services={Services} />

      {/* Trust & Testimonials */}
      <TrustSection services={Services} />

      {/* Contact CTA */}
      <ContactCTASection />
    </div>
  );
}

// Service Grid Section Component
function ServiceGridSection({ 
  services, 
  selectedCategory, 
  setSelectedCategory,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  comparedServices,
  toggleServiceComparison
}: ServiceGridSectionProps) {
  return (
    <motion.section
      key="services"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 lg:py-32 bg-dark-950"
    >
      <div className="container">
        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              const count = category.id === 'all' 
                ? services.length 
                : services.filter(s => s.category === category.id).length;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${category.color} text-white shadow-xl` 
                      : 'card-glass text-white/70 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-white/20">
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
            >
              <option value="popularity">פופולריות</option>
              <option value="name">שם</option>
              <option value="price">מחיר</option>
              <option value="timeline">זמן פיתוח</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-xl card-glass hover:bg-white/10 transition-colors"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: Service, index: number) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isCompared={comparedServices.includes(service.id)}
              onToggleComparison={toggleServiceComparison}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

//  Service Card Component
function ServiceCard({ 
  service, 
  index, 
  isCompared, 
  onToggleComparison 
}: { 
  service: Service; 
  index: number; 
  isCompared: boolean; 
  onToggleComparison: (id: string) => void; 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Popular/Featured Badges */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {service.popular && (
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-accent-purple to-accent-indigo text-xs font-bold text-white">
            פופולרי
          </div>
        )}
        {service.featured && (
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-accent-amber to-accent-yellow text-xs font-bold text-dark-950">
            מומלץ
          </div>
        )}
      </div>
      
      <div className="card-glass-heavy rounded-3xl p-8 h-full backdrop-blur-2xl relative overflow-hidden">
        {/* Background gradient on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}
        />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.6 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} p-4 shadow-xl`}
            >
              <Icon className="w-full h-full text-white" />
            </motion.div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {service.name}
              </h3>
              <p className="text-xs text-gray-500 font-mono">
                {service.nameEn}
              </p>
            </div>
          </div>
          
          {/* Comparison Toggle */}
          <button
            onClick={() => onToggleComparison(service.id)}
            className={`p-2 rounded-xl transition-all duration-300 ${
              isCompared 
                ? 'bg-accent-purple text-white' 
                : 'bg-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
          {service.shortDescription}
        </p>
        
        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-3">תכונות עיקריות:</h4>
          <ul className="space-y-2">
            {service.features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                <CheckCircle className="w-3 h-3 text-accent-purple flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Pricing and Timeline */}
        <div className="border-t border-white/10 pt-6 mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold heading-gradient">
                {service.price.currency}{service.price.from.toLocaleString()}
                {service.price.to && (
                  <span className="text-sm text-gray-400">
                    -{service.price.currency}{service.price.to.toLocaleString()}
                  </span>
                )}
                {service.price.type === 'monthly' && (
                  <span className="text-sm">/חודש</span>
                )}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {service.timeline}
              </div>
            </div>
            
            {/* Difficulty indicator */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < service.difficulty ? 'bg-accent-purple' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <Link href={`/services/${service.slug}`}>
            <button className="w-full btn-primary group">
              <span className="flex items-center justify-center gap-2">
                פרטים נוספים
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// Service Packages Section
function PackagesSection({ packages, services }: PackagesSectionProps) {
  return (
    <motion.section
      key="packages"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 lg:py-32 bg-gradient-to-b from-dark-950 to-dark-900"
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            חבילות שירותים מיוחדות
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            חסכו עד 25% עם החבילות המותאמות שלנו
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${
                pkg.featured ? 'lg:scale-105 lg:-translate-y-4' : ''
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-accent-purple to-accent-indigo rounded-full text-sm font-bold text-white">
                  הכי פופולרי
                </div>
              )}
              
              <div className={`card-glass-heavy rounded-3xl p-8 h-full ${
                pkg.featured ? 'border-2 border-accent-purple/50' : ''
              }`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-gray-500 line-through">
                      ₪{pkg.originalPrice.toLocaleString()}
                    </span>
                    <div className="text-4xl font-bold heading-gradient">
                      ₪{pkg.packagePrice.toLocaleString()}
                    </div>
                    <div className="text-accent-emerald font-semibold">
                      חסכו ₪{pkg.savings.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    {pkg.timeline}
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  {pkg.services.map((serviceId) => {
                    const service = services.find(s => s.slug === serviceId);
                    if (!service) return null;
                    
                    const Icon = service.icon;
                    return (
                      <div key={serviceId} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.gradient} p-1.5`}>
                          <Icon className="w-full h-full text-white" />
                        </div>
                        <span className="text-white font-medium">{service.name}</span>
                      </div>
                    );
                  })}
                </div>
                
                <button
                  className={`w-full ${
                    pkg.featured ? 'btn-primary' : 'btn-glass'
                  } group`}
                >
                  <span className="flex items-center justify-center gap-2">
                    בחר חבילה
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Pricing Calculator Section
function PricingCalculatorSection({ services }: { services: Service[] }) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  const calculateTotal = () => {
    let total = 0;
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        total += service.price.from;
      }
    });
    return total;
  };
  
  return (
    <motion.section
      key="calculator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 lg:py-32 bg-dark-950"
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            מחשבון מחירים חכם
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            בנו את הפרויקט המושלם שלכם וקבלו הערכת מחיר מיידית
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Service Selection */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">בחרו שירותים:</h3>
            <div className="space-y-4">
              {services.map(service => {
                const Icon = service.icon;
                const isSelected = selectedServices.includes(service.id);
                
                return (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-accent-purple bg-accent-purple/10' 
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                    onClick={() => {
                      setSelectedServices(prev => 
                        prev.includes(service.id)
                          ? prev.filter(id => id !== service.id)
                          : [...prev, service.id]
                      );
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.gradient} p-3`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">{service.name}</h4>
                        <p className="text-sm text-gray-400">{service.shortDescription}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">
                          ₪{service.price.from.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">{service.timeline}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Calculation Summary */}
          <div className="card-glass-heavy rounded-3xl p-8 sticky top-8">
            <h3 className="text-2xl font-bold text-white mb-6">סיכום הזמנה:</h3>
            
            {selectedServices.length === 0 ? (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-500">בחרו שירותים לחישוב מחיר</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {selectedServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    if (!service) return null;
                    
                    return (
                      <div key={serviceId} className="flex items-center justify-between py-2 border-b border-white/10">
                        <span className="text-white">{service.name}</span>
                        <span className="font-bold text-white">
                          ₪{service.price.from.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between text-2xl font-bold">
                    <span className="text-white">סה״כ:</span>
                    <span className="heading-gradient">
                      ₪{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                  
                  <button className="w-full btn-primary mt-6 group">
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      קבל הצעת מחיר מפורטת
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    המחיר הסופי עשוי להשתנות בהתאם לדרישות הפרויקט
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// Service Comparison Modal
function ServiceComparisonModal({ services, onClose }: { services: Service[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-6xl w-full max-h-[90vh] overflow-auto bg-dark-900 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">השוואת שירותים</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl card-glass hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-right p-4 text-gray-400">תכונה</th>
                  {services.map(service => (
                    <th key={service.id} className="text-center p-4 min-w-[200px]">
                      <div className="text-white font-bold">{service.name}</div>
                      <div className="text-sm text-gray-400">{service.nameEn}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="p-4 text-gray-400">מחיר התחלתי</td>
                  {services.map(service => (
                    <td key={service.id} className="text-center p-4">
                      <div className="text-2xl font-bold heading-gradient">
                        {service.price.currency}{service.price.from.toLocaleString()}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-4 text-gray-400">זמן פיתוח</td>
                  {services.map(service => (
                    <td key={service.id} className="text-center p-4 text-white">
                      {service.timeline}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-4 text-gray-400">רמת מורכבות</td>
                  {services.map(service => (
                    <td key={service.id} className="text-center p-4">
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < service.difficulty ? 'bg-accent-purple' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// FAQ Section
function FAQSection({ services }: { services: Service[] }) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  
  const generalFAQs = [
    {
      question: 'כמה זמן לוקח לפתח פרויקט?',
      answer: 'זמן הפיתוח תלוי במורכבות הפרויקט. פרויקטים פשוטים יכולים להסתיים תוך 2-3 שבועות, ואילו פרויקטים מורכבים יותר עשויים לקחת 3-6 חודשים.'
    },
    {
      question: 'מה כלול בתמחור?',
      answer: 'התמחור כולל עיצוב, פיתוח, בדיקות, הטמעה וחודש תמיכה חינם. עלויות נוספות כמו אחסון או רישיונות מוזכרות בנפרד.'
    },
    {
      question: 'האם תומכים בשינויים במהלך הפיתוח?',
      answer: 'כן, אנחנו גמישים ומאפשרים שינויים בתהליך. שינויים קטנים כלולים במחיר, שינויים גדולים עלולים להשפיע על הזמנים והעלויות.'
    },
    {
      question: 'איך נראה תהליך העבודה?',
      answer: 'התהליך כולל: פגישת הכרות וגיבוש דרישות, הכנת מפרט טכני, עיצוב, פיתוח בשלבים, בדיקות והשקה. אתם מקבלים עדכונים שוטפים לאורך הדרך.'
    }
  ];
  
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-dark-950 to-dark-900">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            שאלות נפוצות
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            מצאו תשובות לשאלות הנפוצות ביותר על השירותים שלנו
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* General FAQs */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">שאלות כלליות</h3>
              <div className="space-y-4">
                {generalFAQs.map((faq, index) => (
                  <div key={index} className="card-glass rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === `general-${index}` ? null : `general-${index}`)}
                      className="w-full p-6 text-right flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <span className="font-semibold text-white">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                        openFAQ === `general-${index}` ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <AnimatePresence>
                      {openFAQ === `general-${index}` && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-gray-400">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Service-specific FAQs */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">שאלות על שירותים ספציפיים</h3>
              <div className="space-y-4">
                {services.slice(0, 4).map((service) => 
                  service.faq.map((faq, faqIndex) => {
                    const id = `${service.id}-${faqIndex}`;
                    return (
                      <div key={id} className="card-glass rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setOpenFAQ(openFAQ === id ? null : id)}
                          className="w-full p-6 text-right flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                          <div>
                            <span className="font-semibold text-white block">{faq.question}</span>
                            <span className="text-xs text-accent-purple">{service.name}</span>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                            openFAQ === id ? 'rotate-180' : ''
                          }`} />
                        </button>
                        <AnimatePresence>
                          {openFAQ === id && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-gray-400">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Trust Section with Testimonials
function TrustSection({ services }: { services: Service[] }) {
  const servicesWithTestimonials = services.filter(s => s.testimonial);
  
  return (
    <section className="py-20 lg:py-32 bg-dark-950">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            מה הלקוחות אומרים
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            עשרות לקוחות מרוצים שכבר התנסו בשירותים שלנו
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesWithTestimonials.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-glass-heavy rounded-3xl p-8"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < (service.testimonial?.rating || 0)
                        ? 'text-accent-amber fill-accent-amber'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-accent-purple opacity-50 mb-4" />
              
              <p className="text-gray-300 mb-6 italic">
                &ldquo;{service.testimonial?.content}&rdquo;
              </p>
              
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${service.gradient} p-3`}>
                  <Users className="w-full h-full text-white" />
                </div>
                <div>
                  <div className="font-bold text-white">{service.testimonial?.author}</div>
                  <div className="text-sm text-gray-400">
                    {service.testimonial?.role} • {service.testimonial?.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact CTA Section
function ContactCTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-dark-950 to-dark-900">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass-heavy rounded-3xl p-12 backdrop-blur-xl"
          >
            <Target className="w-16 h-16 mx-auto mb-8 text-accent-purple" />
            
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              מוכנים להתחיל?
            </h2>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              בואו נדבר על הפרויקט שלכם. נספק ייעוץ חינם והצעת מחיר מפורטת תוך 24 שעות.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-primary group">
                  <span className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    קבל ייעוץ חינם
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              
              <a href="https://wa.me/972544994417" target="_blank" rel="noopener noreferrer">
                <button className="btn-glass">
                  <span className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </span>
                </button>
              </a>
              
              <Link href="/portfolio">
                <button className="btn-outline">
                  <span className="flex items-center gap-3">
                    <Eye className="w-5 h-5" />
                    ראו דוגמאות
                  </span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}