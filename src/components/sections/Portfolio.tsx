// src/components/sections/Portfolio.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Code2, 
  Smartphone, 
  ShoppingBag, 
  Palette,
  Users,
  TrendingUp,
  Star,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

// Project interface
interface Project {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  category: 'web' | 'mobile' | 'ecommerce' | 'design';
  image: string;
  gradient: string;
  tags: string[];
  stats: {
    users: string;
    performance: string;
    rating: string;
  };
  links?: {
    live?: string;
    github?: string;
  };
  featured?: boolean;
}

// Sample projects data
const projects: Project[] = [
  {
    id: '1',
    title: 'פלטפורמת מסחר דיגיטלית',
    titleEn: 'E-Commerce Platform',
    description: 'מערכת מסחר אלקטרוני מתקדמת עם ניהול מלאי בזמן אמת וממשק תשלומים מאובטח',
    category: 'ecommerce',
    image: '/projects/ecommerce.jpg',
    gradient: 'from-accent-purple to-accent-indigo',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    stats: {
      users: '50K+',
      performance: '99.9%',
      rating: '4.9'
    },
    links: {
      live: 'https://example.com',
      github: 'https://github.com'
    },
    featured: true
  },
  {
    id: '2',
    title: 'אפליקציית בריאות וכושר',
    titleEn: 'Health & Fitness App',
    description: 'אפליקציה חכמה למעקב אימונים עם AI לתוכניות אישיות ומעקב התקדמות',
    category: 'mobile',
    image: '/projects/fitness.jpg',
    gradient: 'from-accent-blue to-accent-cyan',
    tags: ['React Native', 'TensorFlow', 'Firebase', 'Node.js'],
    stats: {
      users: '25K+',
      performance: '98%',
      rating: '4.8'
    },
    links: {
      live: 'https://example.com'
    },
    featured: true
  },
  {
    id: '3',
    title: 'פורטל נדל״ן חכם',
    titleEn: 'Smart Real Estate Portal',
    description: 'פלטפורמה מתקדמת עם מפות אינטראקטיביות וחיפוש חכם המבוסס על AI',
    category: 'web',
    image: '/projects/realestate.jpg',
    gradient: 'from-accent-emerald to-accent-cyan',
    tags: ['React', 'Mapbox', 'Python', 'MongoDB'],
    stats: {
      users: '100K+',
      performance: '97%',
      rating: '4.7'
    },
    links: {
      live: 'https://example.com'
    }
  },
  {
    id: '4',
    title: 'מערכת ניהול ארגונית',
    titleEn: 'Enterprise Management System',
    description: 'CRM מתקדם עם אוטומציה חכמה וממשקי API לאינטגרציות מרובות',
    category: 'web',
    image: '/projects/crm.jpg',
    gradient: 'from-accent-violet to-accent-purple',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
    stats: {
      users: '10K+',
      performance: '99.5%',
      rating: '5.0'
    },
    links: {
      live: 'https://example.com',
      github: 'https://github.com'
    },
    featured: true
  },
  {
    id: '5',
    title: 'עיצוב חווית משתמש בנקאית',
    titleEn: 'Banking UX Design',
    description: 'ממשק דיגיטלי מתקדם לבנקאות עם דגש על נגישות ואבטחה',
    category: 'design',
    image: '/projects/banking.jpg',
    gradient: 'from-accent-rose to-accent-amber',
    tags: ['Figma', 'Prototyping', 'User Research', 'A11y'],
    stats: {
      users: '500K+',
      performance: '99.9%',
      rating: '4.9'
    },
    links: {
      live: 'https://example.com'
    }
  },
  {
    id: '6',
    title: 'פלטפורמת למידה מקוונת',
    titleEn: 'Online Learning Platform',
    description: 'מערכת קורסים דיגיטלית עם וידאו אינטראקטיבי ומעקב התקדמות בזמן אמת',
    category: 'web',
    image: '/projects/learning.jpg',
    gradient: 'from-accent-indigo to-accent-blue',
    tags: ['Next.js', 'AWS', 'WebRTC', 'Prisma'],
    stats: {
      users: '15K+',
      performance: '96%',
      rating: '4.6'
    },
    links: {
      live: 'https://example.com'
    }
  }
];

// Category configuration
const categories = [
  { id: 'all', label: 'הכל', icon: Sparkles },
  { id: 'web', label: 'אתרים', icon: Code2 },
  { id: 'mobile', label: 'אפליקציות', icon: Smartphone },
  { id: 'ecommerce', label: 'מסחר', icon: ShoppingBag },
  { id: 'design', label: 'עיצוב', icon: Palette }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
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
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 bg-dark-950 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-indigo/5" />
        
        {/* Animated geometric shapes */}
        <motion.div style={{ y: parallaxY, opacity }} className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="absolute top-1/4 -left-20 w-96 h-96"
          >
            <div className="w-full h-full shape-hexagon bg-gradient-to-br from-accent-purple/10 to-accent-indigo/10 blur-3xl" />
          </motion.div>
          
          <motion.div
            animate={{
              x: mousePosition.x * -20,
              y: mousePosition.y * -20,
            }}
            transition={{ type: "spring", stiffness: 30, damping: 20 }}
            className="absolute bottom-1/4 -right-20 w-80 h-80"
          >
            <div className="w-full h-full shape-diamond bg-gradient-to-tr from-accent-indigo/10 to-accent-purple/10 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full card-glass mb-10"
          >
            <Sparkles className="w-5 h-5 text-accent-purple" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              תיק עבודות
            </span>
          </motion.div>
          
          {/* Title */}
          <h2 className="text-display-xl lg:text-display-2xl font-display font-bold mb-8">
            <span className="block text-white">פרויקטים</span>
            <span className="block heading-gradient">שמניעים תוצאות</span>
          </h2>
          
          {/* Description */}
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            כל פרויקט הוא סיפור של חדשנות, יצירתיות וביצועים ללא פשרות. 
            צפו בעבודות שלנו ותראו איך אנחנו הופכים רעיונות למוצרים דיגיטליים מובילים.
          </p>
        </motion.div>
        
        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            const count = category.id === 'all' 
              ? projects.length 
              : projects.filter(p => p.category === category.id).length;
            
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => { setSelectedCategory(category.id); }}
                className={`
                  relative group px-8 py-4 rounded-full font-medium
                  transition-all duration-300 
                  ${isActive 
                    ? 'bg-gradient-to-r from-accent-purple to-accent-indigo text-white shadow-xl shadow-accent-purple/20 scale-105' 
                    : 'card-glass text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{category.label}</span>
                  <span className={`
                    px-2.5 py-0.5 rounded-full text-xs font-semibold
                    ${isActive ? 'bg-white/20' : 'bg-white/10'}
                  `}>
                    {count}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>
        
        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="card-glass-heavy rounded-3xl p-12 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              יש לכם פרויקט בראש?
            </h3>
            <p className="text-gray-400 mb-8">
              בואו נדבר על איך נוכל להפוך את החזון שלכם למציאות דיגיטלית
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-primary group">
                  <span className="flex items-center gap-3">
                    בואו נתחיל
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="btn-glass">
                  כל הפרויקטים
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onMouseEnter={() => { setIsHovered(true); }}
      onMouseLeave={() => { setIsHovered(false); }}
      className="relative h-full"
    >
      <div className="card-glass-heavy rounded-3xl overflow-hidden h-full flex flex-col">
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-6 right-6 z-20">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-indigo shadow-lg">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Featured
              </span>
            </div>
          </div>
        )}
        
        {/* Image/Visual area */}
        <div className="relative h-72 bg-gradient-to-br from-dark-800 to-dark-900 overflow-hidden">
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
          
          {/* Category icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {project.category === 'web' && <Code2 className="w-20 h-20 text-white/10" />}
            {project.category === 'mobile' && <Smartphone className="w-20 h-20 text-white/10" />}
            {project.category === 'ecommerce' && <ShoppingBag className="w-20 h-20 text-white/10" />}
            {project.category === 'design' && <Palette className="w-20 h-20 text-white/10" />}
          </div>
          
          {/* Stats overlay */}
          <div className="absolute top-6 left-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-950/60 backdrop-blur-xl">
              <Users className="w-4 h-4 text-white/70" />
              <span className="text-sm font-medium text-white">{project.stats.users}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-950/60 backdrop-blur-xl">
              <TrendingUp className="w-4 h-4 text-white/70" />
              <span className="text-sm font-medium text-white">{project.stats.performance}</span>
            </div>
          </div>
          
          {/* Hover overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/90 to-transparent flex items-end justify-center pb-8"
              >
                <div className="flex gap-4">
                  {project.links?.live && (
                    <Link href={project.links.live} target="_blank">
                      <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="px-6 py-3 rounded-full bg-white text-dark-950 font-semibold hover:scale-105 transition-transform duration-300"
                      >
                        <ExternalLink className="w-4 h-4 inline mr-2" />
                        View Live
                      </motion.button>
                    </Link>
                  )}
                  {project.links?.github && (
                    <Link href={project.links.github} target="_blank">
                      <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all duration-300"
                      >
                        <Github className="w-5 h-5" />
                      </motion.button>
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-8 flex flex-col">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2">
            {project.title}
          </h3>
          {project.titleEn && (
            <p className="text-sm text-gray-500 mb-4 font-mono">
              {project.titleEn}
            </p>
          )}
          
          {/* Description */}
          <p className="text-gray-400 mb-6 flex-1 leading-relaxed">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-accent-purple/10 to-accent-indigo/10 border border-accent-purple/20 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Rating */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent-amber fill-accent-amber" />
              <span className="text-white font-semibold">{project.stats.rating}</span>
              <span className="text-gray-500 text-sm">דירוג</span>
            </div>
            <div className="text-sm text-gray-500">
              {project.category === 'web' && 'אתר אינטרנט'}
              {project.category === 'mobile' && 'אפליקציה'}
              {project.category === 'ecommerce' && 'פלטפורמת מסחר'}
              {project.category === 'design' && 'עיצוב UI/UX'}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}