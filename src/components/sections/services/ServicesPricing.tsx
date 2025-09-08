// src/components/sections/services/ServicesPricing.tsx
"use client";

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

interface ServicesPricingProps {
  locale: 'en' | 'he';
}

export default function ServicesPricing({ locale }: ServicesPricingProps) {
  const isRTL = locale === 'he';

  const content = {
    en: {
      label: '04 — Pricing',
      title: 'Transparent',
      titleOutline: 'Pricing',
      subtitle: 'Choose the perfect plan for your needs',
      plans: [
        {
          name: 'Starter',
          price: '₪5,000',
          period: 'Starting from',
          description: 'Perfect for small businesses and startups',
          features: [
            { text: 'Single Page Website', included: true },
            { text: 'Responsive Design', included: true },
            { text: 'Basic SEO', included: true },
            { text: 'Contact Form', included: true },
            { text: 'Custom Features', included: false },
            { text: 'E-commerce', included: false },
            { text: 'Priority Support', included: false }
          ],
          cta: 'Get Started',
          popular: false
        },
        {
          name: 'Professional',
          price: '₪15,000',
          period: 'Starting from',
          description: 'Ideal for growing businesses',
          features: [
            { text: 'Multi-page Website', included: true },
            { text: 'Advanced Design', included: true },
            { text: 'Full SEO Package', included: true },
            { text: 'CMS Integration', included: true },
            { text: 'Custom Features', included: true },
            { text: 'Basic E-commerce', included: true },
            { text: 'Priority Support', included: false }
          ],
          cta: 'Get Started',
          popular: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: 'Contact us',
          description: 'Tailored solutions for large organizations',
          features: [
            { text: 'Custom Development', included: true },
            { text: 'Advanced Features', included: true },
            { text: 'Enterprise SEO', included: true },
            { text: 'Custom Integrations', included: true },
            { text: 'Unlimited Pages', included: true },
            { text: 'Full E-commerce', included: true },
            { text: '24/7 Priority Support', included: true }
          ],
          cta: 'Contact Sales',
          popular: false
        }
      ]
    },
    he: {
      label: '04 — תמחור',
      title: 'תמחור',
      titleOutline: 'שקוף',
      subtitle: 'בחרו את החבילה המושלמת לצרכים שלכם',
      plans: [
        {
          name: 'התחלה',
          price: '₪5,000',
          period: 'החל מ',
          description: 'מושלם לעסקים קטנים וסטארטאפים',
          features: [
            { text: 'אתר עמוד בודד', included: true },
            { text: 'עיצוב רספונסיבי', included: true },
            { text: 'SEO בסיסי', included: true },
            { text: 'טופס יצירת קשר', included: true },
            { text: 'תכונות מותאמות', included: false },
            { text: 'מסחר אלקטרוני', included: false },
            { text: 'תמיכת עדיפות', included: false }
          ],
          cta: 'בואו נתחיל',
          popular: false
        },
        {
          name: 'מקצועי',
          price: '₪15,000',
          period: 'החל מ',
          description: 'אידיאלי לעסקים צומחים',
          features: [
            { text: 'אתר רב עמודים', included: true },
            { text: 'עיצוב מתקדם', included: true },
            { text: 'חבילת SEO מלאה', included: true },
            { text: 'מערכת ניהול תוכן', included: true },
            { text: 'תכונות מותאמות', included: true },
            { text: 'מסחר אלקטרוני בסיסי', included: true },
            { text: 'תמיכת עדיפות', included: false }
          ],
          cta: 'בואו נתחיל',
          popular: true
        },
        {
          name: 'ארגוני',
          price: 'מותאם',
          period: 'צרו קשר',
          description: 'פתרונות מותאמים לארגונים גדולים',
          features: [
            { text: 'פיתוח מותאם אישית', included: true },
            { text: 'תכונות מתקדמות', included: true },
            { text: 'SEO ארגוני', included: true },
            { text: 'אינטגרציות מותאמות', included: true },
            { text: 'עמודים ללא הגבלה', included: true },
            { text: 'מסחר אלקטרוני מלא', included: true },
            { text: 'תמיכה 24/7', included: true }
          ],
          cta: 'צרו קשר',
          popular: false
        }
      ]
    }
  };

  const currentContent = content[locale];

  return (
    <section 
      id="pricing"
      className="relative py-32 bg-gray-900"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm uppercase tracking-wider">
            {currentContent.label}
          </span>
          <h2 className="text-display mt-4">
            <span className="text-white">{currentContent.title} </span>
            <span className="text-outline">{currentContent.titleOutline}</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4">
            {currentContent.subtitle}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {currentContent.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1 bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider">
                    {locale === 'en' ? 'Most Popular' : 'הכי פופולרי'}
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`
                relative h-full p-8 
                ${plan.popular 
                  ? 'bg-gray-800 border-2 border-cyan-400' 
                  : 'bg-black border border-gray-800'
                }
                hover:border-cyan-400/50 transition-all duration-300
              `}>
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                
                {/* Price */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-cyan-400">
                    {plan.price}
                  </div>
                  <div className="text-sm text-gray-400">
                    {plan.period}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-8">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className={`flex items-center gap-3 ${
                        feature.included ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-700 flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'line-through'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full py-4 font-bold uppercase tracking-wider transition-all duration-300
                      ${plan.popular 
                        ? 'bg-cyan-400 text-black hover:bg-cyan-300' 
                        : 'border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
                      }
                    `}
                  >
                    {plan.cta}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">
            {locale === 'en' 
              ? 'All plans include free consultation and 30-day money-back guarantee'
              : 'כל החבילות כוללות ייעוץ חינם והחזר כספי מלא תוך 30 יום'}
          </p>
          <p className="text-sm text-gray-500">
            {locale === 'en'
              ? 'Prices do not include VAT'
              : 'המחירים אינם כוללים מע"מ'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}