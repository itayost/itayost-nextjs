// src/app/services/[slug]/ServicePageClient.tsx
'use client';

import { notFound } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { 
  CheckCircle, 
  Clock, 
  DollarSign,
  ChevronRight,
  Sparkles,
  Code,
  Layers,
  Award,
  ArrowLeft
} from 'lucide-react';
// Fix: Import from the correct file with .tsx extension
import { getServiceBySlug, getRelatedServices } from '@/data/services';
import CTA from '@/components/sections/CTA';
import { useState, useEffect } from 'react';

interface ServicePageClientProps {
  slug: string;
}

export default function ServicePageClient({ slug }: ServicePageClientProps) {
  const service = getServiceBySlug(slug);
  const relatedServices = service ? getRelatedServices(slug, 3) : [];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
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

  if (!service) {
    notFound();
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Hero Section - Refined Bold Style */}
      <section className="relative min-h-screen pt-32 pb-20 bg-dark-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900" />
          <div className="absolute inset-0 bg-grid opacity-10" />
          
          {/* Animated geometric shapes */}
          <motion.div style={{ y: parallaxY }} className="absolute inset-0">
            <motion.div
              animate={{
                x: mousePosition.x * 30,
                y: mousePosition.y * 30,
                rotate: 360,
              }}
              transition={{ 
                x: { type: "spring", stiffness: 50, damping: 20 },
                y: { type: "spring", stiffness: 50, damping: 20 },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
              className="absolute top-20 right-10 w-96 h-96"
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-indigo opacity-10 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-indigo/20 shape-hexagon backdrop-blur-sm" />
              </div>
            </motion.div>
            
            <motion.div
              animate={{
                x: mousePosition.x * -20,
                y: mousePosition.y * -20,
              }}
              transition={{ type: "spring", stiffness: 30, damping: 20 }}
              className="absolute bottom-20 left-10 w-80 h-80"
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-cyan opacity-10 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-cyan/20 shape-diamond" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-accent-purple transition-colors">
                בית
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/services" className="hover:text-accent-purple transition-colors">
                שירותים
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">{service.shortName || service.name}</span>
            </div>

            {/* Title & Description */}
            <div className="text-center">
              {/* Icon with gradient background */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="inline-flex p-6 bg-gradient-to-br from-accent-purple/20 to-accent-indigo/20 rounded-3xl backdrop-blur-xl mb-8"
              >
                <div className="p-4 bg-gradient-to-br from-accent-purple to-accent-indigo rounded-2xl shadow-2xl">
                  <div className="text-white [&>svg]:h-16 [&>svg]:w-16">
                    {service.icon}
                  </div>
                </div>
              </motion.div>
              
              <h1 className="text-display-xl lg:text-display-2xl font-display font-bold text-white mb-6">
                {service.name}
              </h1>
              
              <p className="text-2xl lg:text-3xl heading-gradient font-semibold mb-6">
                {service.tagline}
              </p>
              
              <p className="text-lg lg:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-10">
                {service.longDescription || service.description}
              </p>

              {/* Quick Info Cards */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {service.timeline && (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center gap-3 px-6 py-4 card-glass rounded-full"
                  >
                    <Clock className="h-5 w-5 text-accent-purple" />
                    <span className="text-white font-medium">{service.timeline}</span>
                  </motion.div>
                )}
                {service.startingPrice && (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center gap-3 px-6 py-4 card-glass rounded-full"
                  >
                    <DollarSign className="h-5 w-5 text-accent-emerald" />
                    <span className="text-white font-medium">
                      החל מ-{service.startingPrice.amount.toLocaleString('he-IL')}
                      {service.startingPrice.currency}
                    </span>
                  </motion.div>
                )}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-3 px-6 py-4 card-glass rounded-full"
                >
                  <Award className="h-5 w-5 text-accent-amber" />
                  <span className="text-white font-medium">איכות מובטחת</span>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={service.cta?.buttonLink || `/contact?service=${service.slug}`}>
                  <button className="btn-primary group">
                    <span className="flex items-center gap-3">
                      {service.cta?.buttonText || 'קבלו הצעת מחיר'}
                      <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="btn-glass">
                    <span className="flex items-center gap-3">
                      <Layers className="w-5 h-5" />
                      ראו דוגמאות
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">גלול</span>
            <Sparkles className="w-5 h-5 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Features Section - Glass Cards Grid */}
      <section className="py-20 lg:py-32 bg-dark-950">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              variants={itemVariants}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <h2 className="text-display-lg lg:text-display-xl font-display font-bold text-white mb-6">
                מה כולל השירות?
              </h2>
              <p className="text-gray-400 text-lg lg:text-xl">
                כל מה שאתם צריכים כדי להצליח
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="card-glass-heavy rounded-3xl p-8 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-purple to-accent-indigo rounded-2xl flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section - Timeline Style */}
      {service.process && service.process.length > 0 && (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-dark-950 to-dark-900">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                variants={itemVariants}
                className="text-center mb-16 max-w-3xl mx-auto"
              >
                <h2 className="text-display-lg lg:text-display-xl font-display font-bold text-white mb-6">
                  תהליך העבודה
                </h2>
                <p className="text-gray-400 text-lg lg:text-xl">
                  צעד אחר צעד להצלחה
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                {service.process.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative flex gap-8 mb-12 last:mb-0"
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-indigo rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl"
                      >
                        {step.step}
                      </motion.div>
                      {/* Connector Line */}
                      {index < service.process.length - 1 && (
                        <div className="absolute right-8 top-16 h-full w-0.5 bg-gradient-to-b from-accent-purple/50 to-transparent" />
                      )}
                    </div>

                    {/* Step Content */}
                    <motion.div 
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 card-glass rounded-2xl p-6 backdrop-blur-xl"
                    >
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 mb-3 leading-relaxed">
                        {step.description}
                      </p>
                      {step.duration && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent-purple" />
                          <span className="text-sm text-accent-purple font-medium">
                            משך זמן: {step.duration}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Benefits Section - Bento Grid */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-20 lg:py-32 bg-dark-950">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                variants={itemVariants}
                className="text-center mb-16 max-w-3xl mx-auto"
              >
                <h2 className="text-display-lg lg:text-display-xl font-display font-bold text-white mb-6">
                  היתרונות שתקבלו
                </h2>
                <p className="text-gray-400 text-lg lg:text-xl">
                  למה כדאי לבחור בשירות הזה?
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {service.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 p-6 card-glass rounded-2xl backdrop-blur-xl"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-accent-purple to-accent-indigo rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Technologies Section - Floating Tags */}
      {service.technologies && service.technologies.length > 0 && (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-dark-950 to-dark-900">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                variants={itemVariants}
                className="text-center mb-16 max-w-3xl mx-auto"
              >
                <h2 className="text-display-lg lg:text-display-xl font-display font-bold text-white mb-6">
                  טכנולוגיות שבשימוש
                </h2>
                <p className="text-gray-400 text-lg lg:text-xl">
                  הכלים המתקדמים ביותר בתעשייה
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {service.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                    transition={{ duration: 0.3 }}
                    className="px-8 py-4 card-glass rounded-full backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-accent-purple" />
                      <span className="text-white font-medium">{tech.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Services - Modern Cards */}
      {relatedServices.length > 0 && (
        <section className="py-20 lg:py-32 bg-dark-950">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                variants={itemVariants}
                className="text-center mb-16 max-w-3xl mx-auto"
              >
                <h2 className="text-display-lg lg:text-display-xl font-display font-bold text-white mb-6">
                  שירותים נוספים
                </h2>
                <p className="text-gray-400 text-lg lg:text-xl">
                  שירותים שעשויים לעניין אתכם
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedServices.map((relatedService) => (
                  <motion.div 
                    key={relatedService.id} 
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/services/${relatedService.slug}`} className="block group">
                      <div className="card-glass-heavy rounded-3xl p-8 backdrop-blur-xl h-full">
                        <div className="flex items-start justify-between mb-6">
                          <div className="p-4 bg-gradient-to-br from-accent-purple/20 to-accent-indigo/20 rounded-2xl">
                            <div className="text-accent-purple [&>svg]:h-8 [&>svg]:w-8">
                              {relatedService.icon}
                            </div>
                          </div>
                          <ArrowLeft className="h-6 w-6 text-gray-500 group-hover:text-accent-purple transition-all duration-300 group-hover:translate-x-2" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors">
                          {relatedService.shortName || relatedService.name}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {relatedService.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTA />
    </>
  );
}