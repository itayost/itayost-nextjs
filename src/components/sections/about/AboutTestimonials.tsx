// src/components/sections/about/AboutTestimonials.tsx - Modern Bold Style
'use client';

import { motion } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';
import { testimonialsData } from '@/data/about';
import { cn } from '@/lib/utils';

export default function AboutTestimonials() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-accent-pink/5 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent-purple/10 via-transparent to-transparent" />
      </div>

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-96 h-96"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-pink/10 to-accent-purple/10 blur-3xl" />
        </motion.div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-yellow to-accent-pink blur-2xl opacity-50" />
              <div className="relative px-6 py-3 bg-gradient-to-r from-accent-yellow/10 to-accent-pink/10 backdrop-blur-sm rounded-full border border-white/10">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-accent-yellow" />
                  <span className="text-sm font-black text-white uppercase tracking-widest">Client Reviews</span>
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
            <span className="block text-white">WHAT CLIENTS</span>
            <span className="block bg-gradient-to-r from-accent-yellow via-accent-pink to-accent-purple bg-clip-text text-transparent">
              SAY ABOUT ME
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto font-medium"
          >
            Real feedback from amazing clients I&apos;ve had the pleasure to work with
          </motion.p>
        </div>

        {/* Testimonials Grid - Modern Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.03,
                rotate: [0, -1, 1, 0],
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/10 group-hover:border-white/20 transition-all duration-300 h-full">
                {/* Quote Icon */}
                <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-accent-pink to-accent-purple rounded-2xl flex items-center justify-center shadow-xl">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                    >
                      <Star
                        className={cn(
                          "w-5 h-5",
                          i < (testimonial.rating || 5)
                            ? "fill-accent-yellow text-accent-yellow"
                            : "text-white/20"
                        )}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg text-white/80 mb-8 leading-relaxed font-medium">
                  &quot;{testimonial.content}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center font-black text-white text-xl">
                      {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-green rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div>
                    <div className="font-black text-white text-lg uppercase">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-white/50 font-medium">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-accent-purple/10 to-transparent rounded-tl-none rounded-tr-3xl rounded-br-3xl rounded-bl-3xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 via-accent-pink/20 to-accent-yellow/20 rounded-3xl blur-xl" />
            
            {/* Content */}
            <div className="relative bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-yellow/10 backdrop-blur-sm rounded-3xl p-10 border-2 border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: '100%', label: 'Client Satisfaction' },
                  { value: '5.0', label: 'Average Rating' },
                  { value: '40+', label: 'Happy Clients' },
                  { value: '95%', label: 'Client Retention' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-black text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-white/50 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}