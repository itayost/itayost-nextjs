// src/components/sections/contact/ContactFAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Clock, DollarSign, Code, Users, Shield, Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon?: React.ElementType;
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
    answer: 'משך הזמן תלוי במורכבות הפרויקט. אתר תדמית פשוט יכול להיות מוכן תוך 2-3 שבועות, בעוד שמערכת ניהול מורכבת או אפליקציה יכולה לקחת 2-6 חודשים. נספק הערכת זמן מדויקת לאחר הבנת הדרישות.'
  },
  {
    id: '2',
    category: 'תמחור',
    icon: DollarSign,
    question: 'כמה עולה לבנות אתר או אפליקציה?',
    answer: 'העלות משתנה בהתאם לדרישות הפרויקט. אתר תדמית בסיסי מתחיל מ-5,000 ש״ח, חנות אונליין מ-15,000 ש״ח, ואפליקציה מותאמת אישית מ-30,000 ש״ח. נשמח לספק הצעת מחיר מדויקת לאחר שיחת ייעוץ.'
  },
  {
    id: '3',
    category: 'תהליך',
    icon: Clock,
    question: 'איך נראה תהליך העבודה?',
    answer: 'התהליך כולל: 1) פגישת ייעוץ והבנת צרכים, 2) אפיון ועיצוב, 3) פיתוח בשלבים עם משובים, 4) בדיקות ותיקונים, 5) העלאה לאוויר, 6) הדרכה ותמיכה. תקבלו עדכונים שוטפים וגישה למערכת בכל שלב.'
  },
  {
    id: '4',
    category: 'טכנולוגיה',
    icon: Code,
    question: 'באילו טכנולוגיות אתם עובדים?',
    answer: 'אנחנו מתמחים בטכנולוגיות המובילות בשוק: React, Next.js, Node.js, TypeScript, Python, MongoDB, PostgreSQL ועוד. נבחר את הטכנולוגיה המתאימה ביותר לצרכים ולתקציב שלכם.'
  },
  {
    id: '5',
    category: 'תמיכה',
    icon: Users,
    question: 'האם תהיה לנו תמיכה אחרי סיום הפרויקט?',
    answer: 'בהחלט! אנחנו מציעים חבילות תחזוקה ותמיכה מותאמות. החודש הראשון כולל תמיכה מלאה ללא עלות, ולאחר מכן ניתן לבחור בחבילת תמיכה חודשית או תמיכה לפי קריאה.'
  },
  {
    id: '6',
    category: 'אבטחה',
    icon: Shield,
    question: 'איך אתם מבטיחים את אבטחת המערכת?',
    answer: 'אנחנו מיישמים את הסטנדרטים הגבוהים ביותר של אבטחת מידע: הצפנת SSL, אימות דו-שלבי, גיבויים אוטומטיים, בדיקות חדירה, ועמידה בתקני GDPR. כל המערכות שלנו עוברות בדיקות אבטחה מקיפות.'
  }
];

const categories = [
  { id: 'all', name: 'הכל', icon: HelpCircle },
  { id: 'כללי', name: 'כללי', icon: HelpCircle },
  { id: 'תמחור', name: 'תמחור', icon: DollarSign },
  { id: 'תהליך', name: 'תהליך', icon: Clock },
  { id: 'טכנולוגיה', name: 'טכנולוגיה', icon: Code },
  { id: 'תמיכה', name: 'תמיכה', icon: Users },
  { id: 'אבטחה', name: 'אבטחה', icon: Shield }
];

export default function ContactFAQ({
  title = 'שאלות נפוצות',
  subtitle = 'FAQ',
  description = 'התשובות לשאלות שכולם שואלים',
  className
}: ContactFAQProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className={cn('py-16 sm:py-20 lg:py-24 bg-gray-900', className)}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            {subtitle && (
              <p className="text-teal-400 font-medium mb-2 text-sm sm:text-base">
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-gray-400 text-base sm:text-lg">
                {description}
              </p>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => { setSelectedCategory(category.id); }}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium",
                    "transition-all duration-200",
                    "flex items-center gap-2",
                    selectedCategory === category.id
                      ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                      : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800 hover:text-gray-300"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredFAQs.map((item, index) => {
                const Icon = item.icon || HelpCircle;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
                  >
                    <button
                      onClick={() => { toggleItem(item.id); }}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-500/10 rounded-lg">
                          <Icon className="h-5 w-5 text-teal-400" />
                        </div>
                        <h3 className="text-white font-medium text-right">
                          {item.question}
                        </h3>
                      </div>
                      <ChevronDown 
                        className={cn(
                          "h-5 w-5 text-gray-400 transition-transform duration-200",
                          openItem === item.id && "rotate-180"
                        )}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {openItem === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-4">
                            <p className="text-gray-400 leading-relaxed pr-11">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="p-6 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-3xl border border-teal-500/20">
              <h3 className="text-xl font-bold text-white mb-2">
                לא מצאתם תשובה לשאלה שלכם?
              </h3>
              <p className="text-gray-400 mb-4">
                אנחנו כאן כדי לעזור! צרו איתנו קשר ונשמח לענות על כל שאלה
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:054-499-4417"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 rounded-xl text-white hover:bg-gray-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  התקשרו אלינו
                </a>
                <a
                  href="https://wa.me/972544994417"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-white hover:shadow-lg transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  שלחו WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}