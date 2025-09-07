// src/components/sections/contact/ContactFAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle, 
  Clock, 
  DollarSign, 
  Code, 
  Users, 
  Shield, 
  Phone, 
  MessageCircle,
  Sparkles,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon?: React.ElementType;
  tags?: string[];
}

interface ContactFAQProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    category: 'כללי',
    icon: HelpCircle,
    question: 'כמה זמן לוקח לפתח אתר או אפליקציה?',
    answer: 'משך הזמן תלוי במורכבות הפרויקט. אתר תדמית פשוט יכול להיות מוכן תוך 2-3 שבועות, בעוד שמערכת ניהול מורכבת או אפליקציה יכולה לקחת 2-6 חודשים. נספק הערכת זמן מדויקת לאחר הבנת הדרישות המלאות של הפרויקט.',
    tags: ['זמן', 'תהליך']
  },
  {
    id: '2',
    category: 'תמחור',
    icon: DollarSign,
    question: 'כמה עולה לבנות אתר או אפליקציה?',
    answer: 'העלות משתנה בהתאם לדרישות הפרויקט. אתר תדמית בסיסי מתחיל מ-5,000 ש״ח, חנות אונליין מ-15,000 ש״ח, ואפליקציה מותאמת אישית מ-30,000 ש״ח. נשמח לספק הצעת מחיר מדויקת לאחר שיחת ייעוץ חינמית.',
    tags: ['מחיר', 'עלות']
  },
  {
    id: '3',
    category: 'תהליך',
    icon: Clock,
    question: 'איך נראה תהליך העבודה?',
    answer: 'התהליך כולל 6 שלבים: 1) פגישת ייעוץ והבנת צרכים, 2) אפיון ועיצוב ממשק, 3) פיתוח בשלבים עם משובים שוטפים, 4) בדיקות QA מקיפות, 5) העלאה לאוויר והטמעה, 6) הדרכה ותמיכה שוטפת. תקבלו עדכונים וגישה למערכת בכל שלב.',
    tags: ['תהליך', 'שלבים']
  },
  {
    id: '4',
    category: 'טכנולוגיה',
    icon: Code,
    question: 'באילו טכנולוגיות אתם עובדים?',
    answer: 'אנחנו מתמחים בטכנולוגיות המובילות: React, Next.js, Node.js, TypeScript, Python, MongoDB, PostgreSQL, AWS ועוד. נבחר את הסטאק הטכנולוגי המתאים ביותר לצרכים ולתקציב שלכם, תוך הבטחת ביצועים מיטביים וסקיילביליות.',
    tags: ['טכנולוגיה', 'כלים']
  },
  {
    id: '5',
    category: 'תמיכה',
    icon: Users,
    question: 'האם תהיה לנו תמיכה אחרי סיום הפרויקט?',
    answer: 'בהחלט! אנחנו מציעים חבילות תחזוקה ותמיכה מותאמות. החודש הראשון כולל תמיכה מלאה ללא עלות נוספת, ולאחר מכן ניתן לבחור בחבילת תמיכה חודשית או תמיכה לפי קריאה. זמינים 24/7 למקרי חירום.',
    tags: ['תמיכה', 'תחזוקה']
  },
  {
    id: '6',
    category: 'אבטחה',
    icon: Shield,
    question: 'איך אתם מבטיחים את אבטחת המערכת?',
    answer: 'אנחנו מיישמים את הסטנדרטים הגבוהים ביותר: הצפנת SSL מתקדמת, אימות דו-שלבי, גיבויים אוטומטיים יומיים, בדיקות חדירה תקופתיות, ועמידה מלאה בתקני GDPR ו-ISO 27001. כל המערכות עוברות סקר אבטחה מקיף.',
    tags: ['אבטחה', 'הגנה']
  },
  {
    id: '7',
    category: 'תהליך',
    icon: Zap,
    question: 'האם אפשר לבצע שינויים במהלך הפיתוח?',
    answer: 'כן! אנחנו עובדים במתודולוגיית Agile שמאפשרת גמישות מלאה. תקבלו גרסאות ביניים כל שבועיים ותוכלו לבקש שינויים והתאמות. השינויים הקטנים כלולים במחיר, ושינויים גדולים יתומחרו בנפרד.',
    tags: ['שינויים', 'גמישות']
  },
  {
    id: '8',
    category: 'כללי',
    icon: Star,
    question: 'מה מבדיל אתכם ממפתחים אחרים?',
    answer: 'אנחנו משלבים מקצועיות טכנית עם חשיבה עסקית. מעבר לקוד איכותי, אנחנו מספקים ייעוץ אסטרטגי, עיצוב ברמה גבוהה, אופטימיזציה לנגישות ו-SEO, ותמיכה אישית לאורך כל הדרך. 98% מהלקוחות שלנו ממליצים עלינו.',
    tags: ['יתרונות', 'ייחודיות']
  }
];

const categories = [
  { id: 'all', name: 'כל השאלות', icon: HelpCircle, count: faqs.length },
  { id: 'כללי', name: 'כללי', icon: HelpCircle, count: faqs.filter(f => f.category === 'כללי').length },
  { id: 'תמחור', name: 'תמחור', icon: DollarSign, count: faqs.filter(f => f.category === 'תמחור').length },
  { id: 'תהליך', name: 'תהליך', icon: Clock, count: faqs.filter(f => f.category === 'תהליך').length },
  { id: 'טכנולוגיה', name: 'טכנולוגיה', icon: Code, count: faqs.filter(f => f.category === 'טכנולוגיה').length },
  { id: 'תמיכה', name: 'תמיכה', icon: Users, count: faqs.filter(f => f.category === 'תמיכה').length },
  { id: 'אבטחה', name: 'אבטחה', icon: Shield, count: faqs.filter(f => f.category === 'אבטחה').length }
];

export default function ContactFAQ({
  title = 'שאלות נפוצות',
  subtitle = 'FAQ',
  description = 'כל מה שרציתם לדעת ולא העזתם לשאול',
  className
}: ContactFAQProps) {
  const [openItem, setOpenItem] = useState<string | null>('1');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className={cn('py-20 sm:py-24 lg:py-32 bg-dark-900 relative overflow-hidden', className)}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        {/* Floating Shapes */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity }
          }}
          className="absolute top-20 right-10 w-64 h-64 shape-hexagon bg-gradient-to-br from-purple-500/5 to-transparent blur-2xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity }
          }}
          className="absolute bottom-20 left-10 w-48 h-48 shape-diamond bg-gradient-to-br from-cyan-500/5 to-transparent blur-2xl"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/*  Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex mb-6"
            >
              <div className="p-4 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl card-glass-heavy">
                <HelpCircle className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            
            {subtitle && (
              <p className="text-lg font-medium mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {subtitle}
              </p>
            )}
            <h2 className="text-display-md lg:text-display-lg font-display font-bold text-white mb-4">
              <span className="heading-gradient">{title}</span>
            </h2>
            {description && (
              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="חפשו שאלה..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 bg-dark-950/50 card-glass rounded-full border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
              <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </motion.div>

          {/*  Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-5 py-3 rounded-full text-sm font-medium",
                    "transition-all duration-300",
                    "flex items-center gap-2",
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/25"
                      : "card-glass text-gray-400 border border-white/10 hover:border-white/20 hover:text-gray-300"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs",
                    selectedCategory === category.id
                      ? "bg-white/20"
                      : "bg-white/5"
                  )}>
                    {category.count}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/*  FAQ Items */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((item, index) => {
                  const Icon = item.icon || HelpCircle;
                  const isOpen = openItem === item.id;
                  
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        "card-glass-heavy rounded-3xl border overflow-hidden transition-all duration-300",
                        isOpen 
                          ? "border-purple-500/30 shadow-xl shadow-purple-500/10" 
                          : "border-white/10 hover:border-white/20"
                      )}
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            animate={{ rotate: isOpen ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                            className={cn(
                              "p-3 rounded-2xl transition-all duration-300",
                              isOpen
                                ? "bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
                                : "bg-white/5"
                            )}
                          >
                            <Icon className={cn(
                              "h-6 w-6 transition-colors",
                              isOpen ? "text-purple-400" : "text-gray-400"
                            )} />
                          </motion.div>
                          <h3 className="text-lg font-semibold text-white text-right">
                            {item.question}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-8 pb-6">
                              <div className="pr-14 space-y-4">
                                <p className="text-gray-300 leading-relaxed">
                                  {item.answer}
                                </p>
                                {item.tags && (
                                  <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag, tagIndex) => (
                                      <span
                                        key={tagIndex}
                                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400"
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex p-4 bg-white/5 rounded-full mb-4">
                    <HelpCircle className="h-8 w-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-lg">
                    לא נמצאו תוצאות עבור &quot;{searchQuery}&quot;
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-4 text-purple-400 hover:text-purple-300 underline"
                  >
                    נקה חיפוש
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/*  Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="p-8 card-glass-heavy rounded-3xl border border-white/10 max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="mb-6"
                >
                  <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full">
                    <Sparkles className="h-8 w-8 text-green-400" />
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-3">
                  לא מצאתם תשובה לשאלה שלכם?
                </h3>
                <p className="text-gray-400 mb-8 max-w-xl">
                  אנחנו כאן בשבילכם! צרו איתנו קשר בכל דרך נוחה ונשמח לענות על כל שאלה
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="tel:054-499-4417"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glass rounded-full px-8 py-4 font-semibold flex items-center justify-center gap-2 group"
                  >
                    <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    התקשרו אלינו
                  </motion.a>
                  <motion.a
                    href="https://wa.me/972544994417"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary rounded-full px-8 py-4 font-semibold flex items-center justify-center gap-2 group"
                  >
                    <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    שלחו WhatsApp
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}