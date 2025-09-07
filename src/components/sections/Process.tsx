
// components/sections/home/HomeProcess.tsx
'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Rocket, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 'consultation',
    number: '01',
    title: 'ייעוץ ראשוני',
    description: 'פגישת היכרות להבנת הצרכים והיעדים העסקיים שלכם',
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'planning',
    number: '02',
    title: 'תכנון ועיצוב',
    description: 'בניית אסטרטגיה, עיצוב ממשקים ותכנון ארכיטקטורה',
    icon: Lightbulb,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'development',
    number: '03',
    title: 'פיתוח ובנייה',
    description: 'כתיבת קוד איכותי, בדיקות ואופטימיזציה',
    icon: Rocket,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'launch',
    number: '04',
    title: 'השקה ותמיכה',
    description: 'העלאה לאוויר, הדרכה ותמיכה טכנית מלאה',
    icon: CheckCircle,
    color: 'from-rose-500 to-pink-500',
  },
];

export default function HomeProcess() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-soft overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 mesh-overlay opacity-20" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="primary" size="lg" className="mb-4">
            <Rocket className="w-4 h-4" />
            תהליך העבודה
          </Badge>
          
          <h2 className="text-display-md lg:text-display-lg font-display font-semibold text-slate-900 mb-6">
            <span className="block">מרעיון למציאות</span>
            <span className="block text-gradient-soft">ב-4 צעדים פשוטים</span>
          </h2>
          
          <p className="text-lg text-slate-600">
            תהליך עבודה מובנה ושקוף שמבטיח תוצאות מקצועיות בזמן ובתקציב
          </p>
        </motion.div>
        
        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-slate-200 to-transparent z-0" />
              )}
              
              <ProcessCard step={step} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step }: { step: ProcessStep }) {
  const Icon = step.icon;
  
  return (
    <Card variant="glass" hover="lift" className="h-full relative">
      {/* Step Number */}
      <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full shadow-soft-md flex items-center justify-center">
        <span className="text-slate-900 font-bold text-sm">{step.number}</span>
      </div>
      
      {/* Icon */}
      <div className={cn(
        "w-16 h-16 mb-4 rounded-2xl",
        "bg-gradient-to-br",
        step.color,
        "flex items-center justify-center",
        "shadow-soft-lg"
      )}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        {step.title}
      </h3>
      
      <p className="text-slate-600">
        {step.description}
      </p>
    </Card>
  );
}