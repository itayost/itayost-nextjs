// src/components/sections/about/AboutStats.tsx - Modern Bold Style
'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Code2, Coffee, Award, Clock } from 'lucide-react';
import { aboutStats } from '@/data/about';
import { cn } from '@/lib/utils';

export default function AboutStats() {
  const stats = [
    {
      value: aboutStats.yearsExperience,
      label: 'Years Experience',
      suffix: '+',
      icon: <Clock className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Building digital excellence'
    },
    {
      value: aboutStats.projectsCompleted,
      label: 'Projects Completed',
      suffix: '+',
      icon: <Code2 className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Delivered on time'
    },
    {
      value: aboutStats.happyClients,
      label: 'Happy Clients',
      suffix: '+',
      icon: <Users className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-500',
      description: '100% satisfaction rate'
    },
    {
      value: aboutStats.coffeesCups,
      label: 'Cups of Coffee',
      suffix: '+',
      icon: <Coffee className="w-6 h-6" />,
      gradient: 'from-orange-500 to-red-500',
      description: 'Fuel for creativity'
    }
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-accent-purple/5 to-neutral-950" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-5" />
      </div>

      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 blur-3xl" />
        </motion.div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-yellow blur-2xl opacity-50" />
              <div className="relative px-6 py-3 bg-gradient-to-r from-primary-500/10 to-accent-yellow/10 backdrop-blur-sm rounded-full border border-white/10">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-primary-500" />
                  <span className="text-sm font-black text-white uppercase tracking-widest">Impact & Results</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-display-sm lg:text-display-md font-black mb-6"
          >
            <span className="block text-white">NUMBERS THAT</span>
            <span className="block bg-gradient-to-r from-primary-500 via-accent-yellow to-accent-pink bg-clip-text text-transparent">
              SPEAK VOLUMES
            </span>
          </motion.h2>
        </div>

        {/* Stats Grid - Modern Bold Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Background glow */}
              <div className={cn(
                "absolute inset-0 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity",
                `bg-gradient-to-br ${stat.gradient}`
              )} />
              
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/10 group-hover:border-white/20 transition-all duration-300 h-full">
                {/* Icon */}
                <div className={cn(
                  "inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6",
                  `bg-gradient-to-br ${stat.gradient}`,
                  "shadow-lg group-hover:scale-110 transition-transform"
                )}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>

                {/* Number with animation */}
                <div className="mb-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-5xl lg:text-6xl font-black text-white"
                  >
                    <CountUp end={stat.value} duration={2} />
                    {stat.suffix}
                  </motion.span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-bold text-white/80 uppercase tracking-wider mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/50 font-medium">
                  {stat.description}
                </p>

                {/* Decorative element */}
                <div className={cn(
                  "absolute -top-2 -right-2 w-20 h-20 opacity-10",
                  `bg-gradient-to-br ${stat.gradient}`,
                  "rounded-full blur-xl"
                )} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 backdrop-blur-sm rounded-full border border-white/10">
            <Award className="w-6 h-6 text-accent-purple" />
            <span className="text-lg font-black text-white uppercase tracking-wider">
              Trusted by Industry Leaders
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// CountUp Component for animated numbers
function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>;
}

import React from 'react';