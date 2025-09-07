'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Workflow,
  ArrowRight,
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
  Users,
  Settings,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface ProcessStep {
  id: string;
  step: number;
  title: string;
  titleEn?: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  gradient: string;
  tasks: string[];
}

const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    step: 1,
    title: 'גילוי והבנה',
    titleEn: 'Discovery',
    description: 'הבנה מעמיקה של הצרכים, היעדים והאתגרים שלכם',
    icon: Lightbulb,
    duration: '2-3 ימים',
    gradient: 'from-accent-purple to-accent-indigo',
    tasks: ['ניתוח דרישות', 'מחקר שוק', 'הגדרת יעדים', 'תכנון ארכיטקטורה']
  },
  {
    id: 'design',
    step: 2,
    title: 'עיצוב ותכנון',
    titleEn: 'Design',
    description: 'יצירת עיצוב ויזואלי וחוויית משתמש מושלמת',
    icon: PenTool,
    duration: '3-5 ימים',
    gradient: 'from-accent-blue to-accent-cyan',
    tasks: ['Wireframes', 'UI Design', 'Prototyping', 'User Testing']
  },
  {
    id: 'development',
    step: 3,
    title: 'פיתוח',
    titleEn: 'Development',
    description: 'כתיבת קוד איכותי ובניית הפתרון המושלם',
    icon: Code2,
    duration: '2-4 שבועות',
    gradient: 'from-accent-emerald to-accent-cyan',
    tasks: ['Frontend', 'Backend', 'Database', 'API Integration']
  },
  {
    id: 'testing',
    step: 4,
    title: 'בדיקות',
    titleEn: 'Testing',
    description: 'בדיקות מקיפות להבטחת איכות ואמינות',
    icon: CheckCircle,
    duration: '3-5 ימים',
    gradient: 'from-accent-amber to-accent-yellow',
    tasks: ['Unit Tests', 'Integration', 'Performance', 'Security']
  },
  {
    id: 'deployment',
    step: 5,
    title: 'השקה',
    titleEn: 'Launch',
    description: 'העלאה לאוויר ווידוא שהכל עובד בצורה מושלמת',
    icon: Rocket,
    duration: '1-2 ימים',
    gradient: 'from-accent-rose to-accent-amber',
    tasks: ['Deployment', 'Monitoring', 'Optimization', 'Documentation']
  },
  {
    id: 'support',
    step: 6,
    title: 'תמיכה',
    titleEn: 'Support',
    description: 'תמיכה שוטפת ושיפורים מתמשכים',
    icon: Settings,
    duration: 'מתמשך',
    gradient: 'from-accent-violet to-accent-purple',
    tasks: ['Maintenance', 'Updates', 'Scaling', 'Improvements']
  }
];

export default function AboutProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent" />
        
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
            className="absolute top-1/3 -right-32 w-96 h-96"
          >
            <div className="w-full h-full shape-triangle bg-gradient-to-br from-accent-purple/10 to-accent-indigo/10 blur-3xl" />
          </motion.div>
          
          <motion.div
            animate={{
              x: mousePosition.x * -20,
              rotate: [0, 360],
            }}
            transition={{ 
              x: { type: "spring", stiffness: 30, damping: 20 },
              rotate: { duration: 40, repeat: Infinity, ease: "linear" }
            }}
            className="absolute bottom-1/3 -left-32 w-80 h-80"
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
            <Workflow className="w-5 h-5 text-accent-purple" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              תהליך העבודה
            </span>
          </motion.div>
          
          <h2 className="text-display-xl lg:text-display-2xl font-display font-bold mb-8">
            <span className="block text-white">מרעיון</span>
            <span className="block heading-gradient">למוצר מושלם</span>
          </h2>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            תהליך עבודה מסודר ומוכח שמבטיח תוצאות מעולות בכל פעם
          </p>
        </motion.div>
        
        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            <div className="h-full bg-white/10" />
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-0 h-full bg-gradient-to-r from-accent-purple via-accent-indigo to-accent-blue"
            />
          </div>
          
          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                onMouseEnter={() => { setActiveStep(step.step); }}
                onMouseLeave={() => { setActiveStep(null); }}
                className={`relative ${index >= 3 ? 'lg:mt-24' : ''}`}
              >
                <ProcessCard 
                  step={step} 
                  isActive={activeStep === step.step}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="card-glass-heavy rounded-3xl p-12 max-w-3xl mx-auto backdrop-blur-2xl">
            <Users className="w-16 h-16 mx-auto mb-6 text-accent-purple" />
            <h3 className="text-3xl font-bold text-white mb-4">
              מוכנים להתחיל?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              בואו נעבוד יחד על הפרויקט הבא שלכם ונהפוך את הרעיון שלכם למציאות
            </p>
            <Link href="/contact">
              <button className="btn-primary group">
                <span className="flex items-center gap-3">
                  התחילו עכשיו
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

function ProcessCard({ step, isActive }: { step: ProcessStep; isActive: boolean; index: number }) {
  const Icon = step.icon;
  
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative h-full group"
    >
      {/* Step Number - Floating Badge */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
          <span className="text-white font-bold text-xl">{step.step}</span>
        </div>
      </motion.div>
      
      {/* Card */}
      <div className="card-glass-heavy rounded-3xl p-8 pt-12 h-full backdrop-blur-2xl">
        {/* Background gradient on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-5`}
        />
        
        {/* Icon */}
        <motion.div
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6"
        >
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} p-4 shadow-xl relative`}>
            <Icon className="w-full h-full text-white" />
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.gradient} blur-xl opacity-50`} />
          </div>
        </motion.div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-2">
          {step.title}
        </h3>
        {step.titleEn && (
          <p className="text-sm text-gray-500 mb-4 font-mono">
            {step.titleEn}
          </p>
        )}
        
        <p className="text-gray-400 mb-6 leading-relaxed">
          {step.description}
        </p>
        
        {/* Tasks */}
        <div className="space-y-2 mb-6">
          {step.tasks.map((task, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isActive ? 1 : 0.6, x: isActive ? 0 : -10 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-2 text-sm text-gray-400"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              <span>{task}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Duration Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
          <Sparkles className="w-4 h-4 text-accent-purple" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
            {step.duration}
          </span>
        </div>
      </div>
    </motion.div>
  );
}