// src/components/sections/contact/ContactForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Briefcase, 
  MessageSquare,
  DollarSign,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  className?: string;
}

type ServiceType = 'web-development' | 'mobile-app' | 'management-system' | 'e-commerce' | 'ui-ux' | 'consulting' | 'other';
type ProjectBudget = 'under-10k' | '10k-25k' | '25k-50k' | '50k-100k' | 'above-100k' | 'not-sure';
type ProjectTimeline = 'asap' | '1-month' | '2-3-months' | '3-6-months' | 'above-6-months' | 'flexible';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  serviceType: ServiceType;
  projectDescription: string;
  budget?: ProjectBudget;
  timeline?: ProjectTimeline;
  referralSource: string;
  message: string;
  newsletter: boolean;
  agreeToTerms: boolean;
}

const services: { value: ServiceType; label: string; icon: React.ElementType }[] = [
  { value: 'web-development', label: 'פיתוח אתרים', icon: Zap },
  { value: 'mobile-app', label: 'אפליקציית מובייל', icon: Phone },
  { value: 'management-system', label: 'מערכת ניהול', icon: Briefcase },
  { value: 'e-commerce', label: 'חנות אונליין', icon: DollarSign },
  { value: 'ui-ux', label: 'עיצוב UI/UX', icon: Star },
  { value: 'consulting', label: 'ייעוץ טכנולוגי', icon: MessageSquare },
  { value: 'other', label: 'אחר', icon: Sparkles }
];

const budgets: { value: ProjectBudget; label: string }[] = [
  { value: 'under-10k', label: 'עד 10,000 ₪' },
  { value: '10k-25k', label: '10,000 - 25,000 ₪' },
  { value: '25k-50k', label: '25,000 - 50,000 ₪' },
  { value: '50k-100k', label: '50,000 - 100,000 ₪' },
  { value: 'above-100k', label: 'מעל 100,000 ₪' },
  { value: 'not-sure', label: 'לא בטוח' }
];

const timelines: { value: ProjectTimeline; label: string }[] = [
  { value: 'asap', label: 'בהקדם האפשרי' },
  { value: '1-month', label: 'תוך חודש' },
  { value: '2-3-months', label: '2-3 חודשים' },
  { value: '3-6-months', label: '3-6 חודשים' },
  { value: 'above-6-months', label: 'מעל 6 חודשים' },
  { value: 'flexible', label: 'גמיש' }
];

export default function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    serviceType: 'web-development',
    projectDescription: '',
    budget: undefined,
    timeline: undefined,
    referralSource: '',
    message: '',
    newsletter: false,
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 0.01;
      const y = (clientY / window.innerHeight - 0.5) * 0.01;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'שם פרטי חובה';
    if (!formData.lastName.trim()) newErrors.lastName = 'שם משפחה חובה';
    if (!formData.email.trim()) newErrors.email = 'אימייל חובה';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'אימייל לא תקין';
    }
    if (!formData.phone.trim()) newErrors.phone = 'טלפון חובה';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'תיאור הפרויקט חובה';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'יש לאשר את התנאים';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        serviceType: 'web-development',
        projectDescription: '',
        budget: undefined,
        timeline: undefined,
        referralSource: '',
        message: '',
        newsletter: false,
        agreeToTerms: false
      });
      
      setTimeout(() => { setSubmitStatus('idle'); }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => { setSubmitStatus('idle'); }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string | boolean | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className={cn('py-20 sm:py-24 lg:py-32 bg-dark-950 relative overflow-hidden', className)} id="contact-form">
      {/*  Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        {/* Animated Gradients */}
        <motion.div
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: "spring", damping: 30 }}
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{ type: "spring", damping: 30 }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl"
        />

        {/* Geometric Decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 w-40 h-40 shape-hexagon bg-gradient-to-br from-purple-500/5 to-transparent"
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
                <Send className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            
            <h2 className="text-display-md lg:text-display-lg font-display font-bold text-white mb-4">
              <span className="heading-gradient">שלחו לנו הודעה</span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
              מלאו את הטופס ונחזור אליכם תוך 2 שעות עם הצעה מותאמת אישית
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: step * 0.1 }}
                  className="flex items-center"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300",
                    currentStep >= step
                      ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white"
                      : "bg-gray-800 text-gray-500 border border-gray-700"
                  )}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={cn(
                      "w-20 h-1 mx-2 transition-all duration-300",
                      currentStep > step
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                        : "bg-gray-800"
                    )} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/*  Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card-glass-heavy rounded-3xl p-8 sm:p-10 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl">
                  <User className="h-6 w-6 text-white" />
                </div>
                פרטים אישיים
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    שם פרטי *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    onFocus={() => setCurrentStep(1)}
                    className={cn(
                      "w-full px-5 py-4 bg-dark-900/50 border rounded-2xl",
                      "text-white placeholder-gray-500",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
                      "transition-all duration-200",
                      errors.firstName ? "border-red-500" : "border-gray-700/50 hover:border-gray-600"
                    )}
                    placeholder="יוסי"
                  />
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.firstName}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    שם משפחה *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    onFocus={() => setCurrentStep(1)}
                    className={cn(
                      "w-full px-5 py-4 bg-dark-900/50 border rounded-2xl",
                      "text-white placeholder-gray-500",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
                      "transition-all duration-200",
                      errors.lastName ? "border-red-500" : "border-gray-700/50 hover:border-gray-600"
                    )}
                    placeholder="כהן"
                  />
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.lastName}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="inline h-4 w-4 ml-1" />
                    אימייל *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onFocus={() => setCurrentStep(1)}
                    className={cn(
                      "w-full px-5 py-4 bg-dark-900/50 border rounded-2xl",
                      "text-white placeholder-gray-500",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
                      "transition-all duration-200",
                      errors.email ? "border-red-500" : "border-gray-700/50 hover:border-gray-600"
                    )}
                    placeholder="yossi@example.com"
                    dir="ltr"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="inline h-4 w-4 ml-1" />
                    טלפון *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onFocus={() => setCurrentStep(1)}
                    className={cn(
                      "w-full px-5 py-4 bg-dark-900/50 border rounded-2xl",
                      "text-white placeholder-gray-500",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
                      "transition-all duration-200",
                      errors.phone ? "border-red-500" : "border-gray-700/50 hover:border-gray-600"
                    )}
                    placeholder="050-1234567"
                    dir="ltr"
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Building className="inline h-4 w-4 ml-1" />
                    חברה
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    onFocus={() => setCurrentStep(1)}
                    className="w-full px-5 py-4 bg-dark-900/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 hover:border-gray-600"
                    placeholder="שם החברה"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Briefcase className="inline h-4 w-4 ml-1" />
                    תפקיד
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                    onFocus={() => setCurrentStep(1)}
                    className="w-full px-5 py-4 bg-dark-900/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 hover:border-gray-600"
                    placeholder="מנהל שיווק"
                  />
                </div>
              </div>
            </motion.div>

            {/* Step 2: Project Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-glass-heavy rounded-3xl p-8 sm:p-10 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                פרטי הפרויקט
              </h3>

              <div className="space-y-6">
                {/* Service Type Cards */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    איזה שירות אתם מחפשים? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <motion.button
                          key={service.value}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            handleChange('serviceType', service.value);
                            setCurrentStep(2);
                          }}
                          className={cn(
                            "p-4 rounded-2xl border transition-all duration-200",
                            formData.serviceType === service.value
                              ? "bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-purple-500/50"
                              : "bg-dark-900/50 border-gray-700/50 hover:border-gray-600"
                          )}
                        >
                          <Icon className={cn(
                            "h-6 w-6 mx-auto mb-2",
                            formData.serviceType === service.value
                              ? "text-purple-400"
                              : "text-gray-400"
                          )} />
                          <span className={cn(
                            "text-sm font-medium",
                            formData.serviceType === service.value
                              ? "text-white"
                              : "text-gray-400"
                          )}>
                            {service.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare className="inline h-4 w-4 ml-1" />
                    תארו את הפרויקט שלכם *
                  </label>
                  <textarea
                    value={formData.projectDescription}
                    onChange={(e) => handleChange('projectDescription', e.target.value)}
                    onFocus={() => setCurrentStep(2)}
                    rows={5}
                    className={cn(
                      "w-full px-5 py-4 bg-dark-900/50 border rounded-2xl",
                      "text-white placeholder-gray-500",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
                      "transition-all duration-200 resize-none",
                      errors.projectDescription ? "border-red-500" : "border-gray-700/50 hover:border-gray-600"
                    )}
                    placeholder="ספרו לנו על החזון, המטרות והיעד הקהל של הפרויקט..."
                  />
                  {errors.projectDescription && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.projectDescription}
                    </motion.p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <DollarSign className="inline h-4 w-4 ml-1" />
                      תקציב משוער
                    </label>
                    <select
                      value={formData.budget || ''}
                      onChange={(e) => handleChange('budget', e.target.value as ProjectBudget || undefined)}
                      onFocus={() => setCurrentStep(2)}
                      className="w-full px-5 py-4 bg-dark-900/50 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 hover:border-gray-600"
                    >
                      <option value="">בחרו תקציב</option>
                      {budgets.map(budget => (
                        <option key={budget.value} value={budget.value}>
                          {budget.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Calendar className="inline h-4 w-4 ml-1" />
                      לוח זמנים
                    </label>
                    <select
                      value={formData.timeline || ''}
                      onChange={(e) => handleChange('timeline', e.target.value as ProjectTimeline || undefined)}
                      onFocus={() => setCurrentStep(2)}
                      className="w-full px-5 py-4 bg-dark-900/50 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 hover:border-gray-600"
                    >
                      <option value="">בחרו לוח זמנים</option>
                      {timelines.map(timeline => (
                        <option key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card-glass-heavy rounded-3xl p-8 sm:p-10 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                מידע נוסף
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    איך שמעתם עלינו?
                  </label>
                  <input
                    type="text"
                    value={formData.referralSource}
                    onChange={(e) => handleChange('referralSource', e.target.value)}
                    onFocus={() => setCurrentStep(3)}
                    className="w-full px-5 py-4 bg-dark-900/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 hover:border-gray-600"
                    placeholder="גוגל, המלצה, פייסבוק..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    הודעה נוספת
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onFocus={() => setCurrentStep(3)}
                    rows={4}
                    className="w-full px-5 py-4 bg-dark-900/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 resize-none hover:border-gray-600"
                    placeholder="משהו נוסף שחשוב לנו לדעת?"
                  />
                </div>

                {/*  Checkboxes */}
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) => handleChange('newsletter', e.target.checked)}
                      className="mt-1 w-5 h-5 bg-dark-900/50 border border-gray-700/50 rounded text-purple-500 focus:ring-purple-500/50"
                    />
                    <span className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                      אני מעוניין לקבל עדכונים וטיפים בנושא פיתוח וטכנולוגיה
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                      className={cn(
                        "mt-1 w-5 h-5 bg-dark-900/50 border rounded",
                        "text-purple-500 focus:ring-purple-500/50",
                        errors.agreeToTerms ? "border-red-500" : "border-gray-700/50"
                      )}
                    />
                    <span className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                      אני מאשר את <a href="/terms" className="text-purple-400 hover:text-purple-300 underline">תנאי השימוש</a> ו<a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">מדיניות הפרטיות</a> *
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400"
                    >
                      {errors.agreeToTerms}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/*  Submit Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className={cn(
                  "btn-primary rounded-full px-12 py-5 text-lg font-bold",
                  "inline-flex items-center gap-3 group",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-all duration-300"
                )}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full"
                    />
                    שולח...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-6 w-6" />
                    נשלח בהצלחה!
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    שלח הודעה
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="mt-6 p-6 card-glass rounded-2xl border border-green-500/20 max-w-md mx-auto"
                  >
                    <div className="flex items-center justify-center gap-3 text-green-400">
                      <CheckCircle className="h-6 w-6" />
                      <p className="font-medium">תודה! קיבלנו את הפנייה שלכם</p>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      נחזור אליכם תוך 2 שעות עם הצעה מותאמת אישית
                    </p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="mt-6 p-6 card-glass rounded-2xl border border-red-500/20 max-w-md mx-auto"
                  >
                    <div className="flex items-center justify-center gap-3 text-red-400">
                      <AlertCircle className="h-6 w-6" />
                      <p className="font-medium">אופס! משהו השתבש</p>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      אנא נסו שוב או התקשרו אלינו: 054-499-4417
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}