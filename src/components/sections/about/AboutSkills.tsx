'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Wrench, 
  Brain,
  Zap,
  Server
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
  years?: number;
  icon?: React.ElementType;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  gradient: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Code2,
    gradient: 'from-accent-purple to-accent-indigo',
    skills: [
      { id: 'react', name: 'React', level: 95, years: 5 },
      { id: 'nextjs', name: 'Next.js', level: 90, years: 4 },
      { id: 'typescript', name: 'TypeScript', level: 88, years: 4 },
      { id: 'tailwind', name: 'Tailwind CSS', level: 92, years: 3 },
      { id: 'framer', name: 'Framer Motion', level: 85, years: 3 },
      { id: 'redux', name: 'Redux', level: 80, years: 4 },
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    gradient: 'from-accent-blue to-accent-cyan',
    skills: [
      { id: 'nodejs', name: 'Node.js', level: 90, years: 5 },
      { id: 'express', name: 'Express', level: 88, years: 5 },
      { id: 'python', name: 'Python', level: 75, years: 3 },
      { id: 'graphql', name: 'GraphQL', level: 82, years: 3 },
      { id: 'rest', name: 'REST APIs', level: 95, years: 5 },
      { id: 'websockets', name: 'WebSockets', level: 78, years: 2 },
    ]
  },
  {
    id: 'database',
    name: 'Database',
    icon: Database,
    gradient: 'from-accent-emerald to-accent-cyan',
    skills: [
      { id: 'mongodb', name: 'MongoDB', level: 88, years: 4 },
      { id: 'postgresql', name: 'PostgreSQL', level: 85, years: 4 },
      { id: 'redis', name: 'Redis', level: 80, years: 3 },
      { id: 'mysql', name: 'MySQL', level: 82, years: 4 },
      { id: 'firebase', name: 'Firebase', level: 78, years: 3 },
      { id: 'prisma', name: 'Prisma', level: 86, years: 2 },
    ]
  },
  {
    id: 'tools',
    name: 'Tools & Design',
    icon: Wrench,
    gradient: 'from-accent-rose to-accent-amber',
    skills: [
      { id: 'git', name: 'Git', level: 92, years: 5 },
      { id: 'docker', name: 'Docker', level: 78, years: 3 },
      { id: 'aws', name: 'AWS', level: 75, years: 3 },
      { id: 'figma', name: 'Figma', level: 85, years: 4 },
      { id: 'webpack', name: 'Webpack', level: 80, years: 4 },
      { id: 'ci-cd', name: 'CI/CD', level: 82, years: 3 },
    ]
  }
];

export default function AboutSkills() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  
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
  
  const activeSkills = skillsData.find(cat => cat.id === activeCategory);
  
  return (
    <section ref={containerRef} className="relative py-32 lg:py-40 bg-dark-950 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        {/* Animated shapes */}
        <motion.div style={{ y: parallaxY, opacity }} className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
              rotate: [0, 360],
            }}
            transition={{ 
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" }
            }}
            className="absolute top-1/4 -right-32 w-80 h-80"
          >
            <div className="w-full h-full shape-hexagon bg-gradient-to-br from-accent-purple/15 to-accent-indigo/15 blur-3xl" />
          </motion.div>
          
          <motion.div
            animate={{
              x: mousePosition.x * -20,
              y: [0, 30, 0],
            }}
            transition={{ 
              x: { type: "spring", stiffness: 30, damping: 20 },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-1/4 -left-32 w-64 h-64"
          >
            <div className="w-full h-full shape-triangle bg-gradient-to-tr from-accent-blue/15 to-accent-cyan/15 blur-3xl" />
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
            <Brain className="w-5 h-5 text-accent-purple" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              כישורים וטכנולוגיות
            </span>
          </motion.div>
          
          <h2 className="text-display-xl lg:text-display-2xl font-display font-bold mb-8">
            <span className="block text-white">סט כלים</span>
            <span className="block heading-gradient">מקצועי</span>
          </h2>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            שליטה מלאה בטכנולוגיות המתקדמות ביותר לבניית פתרונות דיגיטליים חדשניים
          </p>
        </motion.div>
        
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {skillsData.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => { setActiveCategory(category.id); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative px-8 py-4 rounded-full font-medium transition-all duration-300
                  ${isActive 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white'
                  }
                `}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-full`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Inactive background */}
                {!isActive && (
                  <div className="absolute inset-0 card-glass rounded-full" />
                )}
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  {category.name}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
        
        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          {activeSkills && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeSkills.skills.map((skill, index) => (
                <SkillCard 
                  key={skill.id} 
                  skill={skill} 
                  index={index}
                  gradient={activeSkills.gradient}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-accent-amber/10 to-accent-yellow/10 backdrop-blur-xl border border-accent-amber/20">
            <Zap className="w-5 h-5 text-accent-amber" />
            <span className="font-semibold text-white">
              תמיד לומד טכנולוגיות חדשות
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index, gradient }: { skill: Skill; index: number; gradient: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -10, scale: 1.02 }}
      onMouseEnter={() => { setIsHovered(true); }}
      onMouseLeave={() => { setIsHovered(false); }}
      className="relative group"
    >
      <div className="card-glass-heavy rounded-3xl p-6 h-full backdrop-blur-2xl">
        {/* Background gradient on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-5`}
        />
        
        {/* Skill header */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {skill.name}
            </h3>
            {skill.years && (
              <p className="text-sm text-gray-500">
                {skill.years} {skill.years === 1 ? 'שנה' : 'שנים'}
              </p>
            )}
          </div>
          
          {/* Level badge */}
          <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${gradient}`}>
            <span className="text-sm font-bold text-white">{skill.level}%</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="relative z-10">
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              className={`h-full relative bg-gradient-to-r ${gradient}`}
            >
              {/* Animated shine */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}