// src/components/sections/services/ServiceFeatures.tsx

import React from "react";
import { motion } from "framer-motion";

interface Feature {
  id: string;
  title: string;
  titleHe: string;
  description: string;
  descriptionHe: string;
  icon?: React.ReactNode;
}

interface ServiceFeaturesProps {
  serviceId?: string;
  locale?: "en" | "he";
}

// Feature database with proper typing
const featuresDatabase: Record<string, Feature[]> = {
  "web-development": [
    {
      id: "responsive",
      title: "Responsive Design",
      titleHe: "עיצוב רספונסיבי",
      description: "Pixel-perfect on all devices",
      descriptionHe: "מושלם בכל מכשיר",
    },
    {
      id: "performance",
      title: "High Performance",
      titleHe: "ביצועים גבוהים",
      description: "Lightning-fast loading times",
      descriptionHe: "זמני טעינה מהירים",
    },
    {
      id: "seo",
      title: "SEO Optimized",
      titleHe: "מותאם SEO",
      description: "Built for search engines",
      descriptionHe: "בנוי למנועי חיפוש",
    },
  ],
  "mobile-development": [
    {
      id: "cross-platform",
      title: "Cross Platform",
      titleHe: "מולטי פלטפורמה",
      description: "iOS and Android from one codebase",
      descriptionHe: "iOS ואנדרואיד מקוד אחד",
    },
    {
      id: "native-performance",
      title: "Native Performance",
      titleHe: "ביצועים נייטיב",
      description: "Smooth 60fps animations",
      descriptionHe: "אנימציות חלקות ב-60fps",
    },
    {
      id: "offline-first",
      title: "Offline First",
      titleHe: "עובד אופליין",
      description: "Works without internet connection",
      descriptionHe: "עובד ללא חיבור אינטרנט",
    },
  ],
  "ui-ux-design": [
    {
      id: "user-research",
      title: "User Research",
      titleHe: "מחקר משתמשים",
      description: "Data-driven design decisions",
      descriptionHe: "החלטות עיצוב מבוססות נתונים",
    },
    {
      id: "prototyping",
      title: "Rapid Prototyping",
      titleHe: "פרוטוטייפ מהיר",
      description: "Interactive mockups for testing",
      descriptionHe: "אב טיפוס אינטראקטיבי לבדיקה",
    },
    {
      id: "design-systems",
      title: "Design Systems",
      titleHe: "מערכות עיצוב",
      description: "Consistent brand experience",
      descriptionHe: "חוויית מותג עקבית",
    },
  ],
};

function getFeatures(serviceId: string, locale: string): Feature[] {
  const features = featuresDatabase[serviceId] || [];
  
  // Transform features based on locale
  return features.map(feature => ({
    id: feature.id,
    title: locale === "he" ? feature.titleHe : feature.title,
    description: locale === "he" ? feature.descriptionHe : feature.description,
    icon: feature.icon,
    titleHe: feature.titleHe,
    descriptionHe: feature.descriptionHe,
  }));
}

export default function ServiceFeatures({ 
  serviceId = "web-development", 
  locale = "en" 
}: ServiceFeaturesProps) {
  const features = getFeatures(serviceId, locale);
  const isRTL = locale === "he";

  if (features.length === 0) {
    return null;
  }

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className={`mb-16 ${isRTL ? "text-right" : "text-left"}`}>
          <span className="text-caption text-cyan-400 uppercase tracking-wider">
            {locale === "he" ? "תכונות" : "Features"}
          </span>
          <h2 className="text-display font-bold mt-4">
            {locale === "he" ? "מה אנחנו" : "What We"}{" "}
            <span className="text-outline">
              {locale === "he" ? "מציעים" : "Offer"}
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id}
              feature={feature}
              index={index}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Feature Card Component
interface FeatureCardProps {
  feature: Feature;
  index: number;
  isRTL: boolean;
}

function FeatureCard({ feature, index, isRTL }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`relative group ${isRTL ? "text-right" : "text-left"}`}
    >
      {/* Card Border Effect */}
      <div className="absolute inset-0 border border-cyan-400/10 group-hover:border-cyan-400/30 transition-colors duration-300" />
      
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:to-transparent transition-all duration-500" />
      
      {/* Content */}
      <div className="relative p-8">
        {/* Icon Placeholder - Can be replaced with actual icons */}
        <div className="w-12 h-12 mb-6">
          <div className="w-full h-full border border-cyan-400/40 relative">
            <motion.div
              className="absolute inset-0 bg-cyan-400/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
          {feature.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-400 leading-relaxed">
          {feature.description}
        </p>
        
        {/* Learn More Link */}
        <div className="mt-6">
          <span className="inline-flex items-center text-sm text-cyan-400 hover-line cursor-pointer">
            {isRTL ? "למד עוד" : "Learn more"}
            <svg 
              className={`w-4 h-4 ${isRTL ? "mr-1 rotate-180" : "ml-1"}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}