// src/components/about/AboutCulture.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface AboutCultureProps {
  locale?: 'en' | 'he';
}

export default function AboutCulture({ locale = 'en' }: AboutCultureProps) {
  const isRTL = locale === 'he';
  const [hoveredPerk, setHoveredPerk] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState(0);

  const content = {
    en: {
      label: '06 — Culture Code',
      title: 'How We',
      titleOutline: 'Roll',
      subtitle: 'Work hard, play harder, innovate hardest',
      
      values: [
        {
          emoji: '🚀',
          title: 'Innovation First',
          description: 'Every project is a chance to do something that\'s never been done'
        },
        {
          emoji: '🤝',
          title: 'Radical Transparency',
          description: 'No BS, no politics, just honest communication'
        },
        {
          emoji: '🎯',
          title: 'Excellence Always',
          description: 'Good enough is never good enough'
        },
        {
          emoji: '🌍',
          title: 'Global Mindset',
          description: 'Think worldwide, act locally, impact universally'
        }
      ],
      
      perks: [
        { 
          icon: '🚀', 
          title: 'Cutting-Edge Projects',
          description: 'Work on projects that push the boundaries of what\'s possible on the web'
        },
        { 
          icon: '🌍', 
          title: 'Remote-First Forever',
          description: 'Work from anywhere. Beach, mountain, or your couch - your choice'
        },
        { 
          icon: '📚', 
          title: 'Unlimited Learning',
          description: 'Courses, conferences, books - if it makes you better, we pay for it'
        },
        { 
          icon: '🎮', 
          title: 'Game Breaks Mandatory',
          description: 'Daily gaming sessions because all work and no play makes Jack a dull developer'
        },
        { 
          icon: '☕', 
          title: 'Coffee Stipend',
          description: 'Monthly coffee budget because great code runs on caffeine'
        },
        { 
          icon: '🌴', 
          title: 'Team Workations',
          description: 'Quarterly meetups in amazing locations - last one was in Bali'
        },
        { 
          icon: '🎯', 
          title: 'No Meeting Fridays',
          description: 'Focus time is sacred. Fridays are for deep work only'
        },
        { 
          icon: '🧠', 
          title: '20% Innovation Time',
          description: 'One day a week to work on your wildest ideas'
        },
        { 
          icon: '💰', 
          title: 'Equity for Everyone',
          description: 'When we win, everyone wins. Real ownership, real rewards'
        },
        { 
          icon: '🏝️', 
          title: 'Unlimited PTO',
          description: 'Take the time you need. We trust you to manage yourself'
        },
        { 
          icon: '🎨', 
          title: 'Creative Freedom',
          description: 'Your ideas matter. Ship features, not just tickets'
        },
        { 
          icon: '🚴', 
          title: 'Wellness Budget',
          description: 'Gym, yoga, therapy - healthy team, healthy code'
        }
      ],
      
      dayInLife: {
        title: 'A Day in the Life',
        schedule: [
          { time: '9:00', activity: 'Coffee & Slack catchup', vibe: 'Chill start' },
          { time: '10:00', activity: 'Deep work session', vibe: 'In the zone' },
          { time: '12:00', activity: 'Team sync (15 min max)', vibe: 'Quick & efficient' },
          { time: '13:00', activity: 'Lunch break', vibe: 'Recharge time' },
          { time: '14:00', activity: 'Collaboration time', vibe: 'Creative chaos' },
          { time: '16:00', activity: 'Code review & gaming', vibe: 'Learn & play' },
          { time: '17:00', activity: 'Wrap up or keep going', vibe: 'Your choice' }
        ]
      }
    },
    he: {
      // Hebrew translations would go here
      label: '06 — קוד התרבות',
      title: 'איך אנחנו',
      titleOutline: 'מתגלגלים',
      subtitle: 'עובדים קשה, משחקים יותר קשה, מחדשים הכי קשה',
      values: [],
      perks: [],
      dayInLife: { title: '', schedule: [] }
    }
  };

  const text = content[locale];

  return (
    <section 
      className="py-32 bg-gray-900 relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Fun animated background */}
      <div className="absolute inset-0">
        {text.values.map((value, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-5"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {value.emoji}
          </motion.div>
        ))}
      </div>

      <div className="px-8 md:px-16 lg:px-32 max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium">
            {text.label}
          </span>
          <h2 className="mt-4 mb-4">
            <span className="text-white font-bold text-5xl md:text-6xl">
              {text.title}{' '}
            </span>
            <span 
              className="font-bold text-5xl md:text-6xl"
              style={{
                WebkitTextStroke: '2px rgba(0, 217, 255, 0.5)',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {text.titleOutline}
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {text.values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
              className="bg-black/50 backdrop-blur-sm border border-gray-800 p-6 text-center cursor-pointer"
              onClick={() => setSelectedValue(index)}
            >
              <div className="text-4xl mb-3">{value.emoji}</div>
              <h3 className="text-white font-bold mb-2">{value.title}</h3>
              <p className="text-gray-500 text-sm">{value.description}</p>
              
              {selectedValue === index && (
                <motion.div
                  layoutId="selectedValue"
                  className="absolute inset-0 border-2 border-cyan-400 pointer-events-none"
                  transition={{ type: "spring", stiffness: 300 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Perks & Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            The Perks of Being an ITAYOSTer
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {text.perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative"
                onMouseEnter={() => setHoveredPerk(index)}
                onMouseLeave={() => setHoveredPerk(null)}
              >
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 p-4 h-full transition-all duration-300 hover:border-cyan-400/50">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{perk.icon}</span>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">
                        {perk.title}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPerk === index ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* A Day in the Life */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black/50 backdrop-blur-sm border border-gray-800 p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            {text.dayInLife.title}
          </h3>
          
          <div className="space-y-4">
            {text.dayInLife.schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <span className="text-cyan-400 font-mono text-sm w-16">
                  {item.time}
                </span>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-white">{item.activity}</span>
                  <span className="text-gray-500 text-sm italic opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.vibe}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Culture Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <blockquote className="text-3xl text-white font-light">
            &quot;We don&apos;t just build products.
            <span className="text-cyan-400 font-bold"> We build careers, friendships, and futures.</span>&quot;
          </blockquote>
          <p className="text-gray-500 mt-4">— The ITAYOST Way</p>
        </motion.div>
      </div>
    </section>
  );
}