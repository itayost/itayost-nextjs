// src/components/about/AboutTeam.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AboutTeamProps {
  locale?: 'en' | 'he';
}

export default function AboutTeam({ locale = 'en' }: AboutTeamProps) {
  const isRTL = locale === 'he';
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const content = {
    en: {
      label: '03 — The Architects',
      title: 'Meet the',
      titleOutline: 'Dream Team',
      subtitle: 'Brilliant minds with questionable coffee habits',
      members: [
        {
          name: 'Itay Ostraich',
          role: 'Founder & Creative Technologist',
          avatar: '👨‍💻',
          bio: 'Turning caffeine into code since 2017. Believes every website should be a piece of art that loads in under 2 seconds.',
          specialties: ['React', 'Three.js', 'Creative Direction', 'WebGL'],
          funFact: 'Has rewritten the same component 47 times for "perfect" animations',
          quote: 'If it doesn\'t spark joy, refactor it.',
          stats: { projects: 127, coffees: 8429, bugs: 0 }
        },
        {
          name: 'Sarah Chen',
          role: 'Lead Designer',
          avatar: '👩‍🎨',
          bio: 'Pixels are her paint, screens are her canvas. Makes the impossible look effortless, then makes it responsive.',
          specialties: ['UI/UX', 'Motion Design', 'Design Systems', 'Figma'],
          funFact: 'Can spot a 1px misalignment from across the room',
          quote: 'Design is not what it looks like. Design is how it works.',
          stats: { designs: 342, iterations: 2847, awards: 12 }
        },
        {
          name: 'Marcus Johnson',
          role: 'Senior Developer',
          avatar: '🧙‍♂️',
          bio: 'If it can be optimized, he\'s already done it twice. Treats performance like a competitive sport.',
          specialties: ['Performance', 'Architecture', 'Node.js', 'DevOps'],
          funFact: 'Reduced load time by 80% just to see if he could',
          quote: 'Premature optimization is the root of all evil, but mature optimization is divine.',
          stats: { optimizations: 892, ms_saved: 42000, servers: 23 }
        },
        {
          name: 'Yael Goldberg',
          role: 'Product Strategist',
          avatar: '🎯',
          bio: 'Transforms business goals into digital experiences that users actually love. Data-driven but human-hearted.',
          specialties: ['Strategy', 'User Research', 'Analytics', 'Growth'],
          funFact: 'Has interviewed 1000+ users and remembers them all',
          quote: 'The best product is the one that solves a problem users didn\'t know they had.',
          stats: { interviews: 1247, insights: 523, conversions: '+240%' }
        },
        {
          name: 'Alex Rivera',
          role: 'Backend Architect',
          avatar: '🏗️',
          bio: 'Builds APIs so clean you could eat off them. Believes in microservices but macro-impact.',
          specialties: ['APIs', 'Databases', 'Cloud', 'Security'],
          funFact: 'Has never met a database he couldn\'t optimize',
          quote: 'Good code is its own documentation. Great code doesn\'t need any.',
          stats: { apis: 156, queries: '2ms avg', uptime: '99.99%' }
        },
        {
          name: 'Luna Park',
          role: 'Creative Director',
          avatar: '🎨',
          bio: 'Sees the world in gradients and animations. Makes brands memorable and experiences unforgettable.',
          specialties: ['Branding', '3D Design', 'Animation', 'Art Direction'],
          funFact: 'Created a brand identity using only geometric shapes and won 3 awards',
          quote: 'Creativity is intelligence having fun.',
          stats: { brands: 67, animations: 423, wows: '∞' }
        }
      ]
    },
    he: {
      // Hebrew translations would go here
      label: '03 — האדריכלים',
      title: 'הכירו את',
      titleOutline: 'צוות החלומות',
      subtitle: 'מוחות מבריקים עם הרגלי קפה מפוקפקים',
      members: [] // Would include Hebrew translations
    }
  };

  const text = content[locale];

  return (
    <section 
      className="py-32 bg-black relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent" />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
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

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {text.members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedMember(selectedMember === index ? null : index)}
            >
              {/* Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 transition-all duration-300 hover:border-cyan-400/50 h-full">
                {/* Avatar & Basic Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{member.avatar}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-cyan-400 text-sm">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.specialties.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs uppercase tracking-wider text-cyan-400 border border-cyan-400/20 transition-all duration-300 hover:bg-cyan-400/10"
                      onMouseEnter={() => setHoveredSkill(`${index}-${idx}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        transform: hoveredSkill === `${index}-${idx}` ? 'scale(1.05)' : 'scale(1)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Fun Fact */}
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500 italic">
                    💡 {member.funFact}
                  </p>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: selectedMember === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Expanded Info */}
              <AnimatePresence>
                {selectedMember === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 bg-black/80 backdrop-blur-sm border border-cyan-400/30 p-4 overflow-hidden"
                  >
                    {/* Quote */}
                    <blockquote className="text-gray-300 italic mb-4">
                      &quot;{member.quote}&quot;
                    </blockquote>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {Object.entries(member.stats).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-cyan-400 font-bold text-lg">
                            {value}
                          </div>
                          <div className="text-xs text-gray-500 uppercase">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 border border-dashed border-gray-700"
        >
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Want to Join the Team?
          </h3>
          <p className="text-gray-400 mb-6">
            We&apos;re always looking for exceptional talent who share our passion for digital excellence.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-cyan-400 text-black font-bold uppercase tracking-wider text-sm hover:bg-cyan-500 transition-colors"
          >
            View Open Positions
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}