// src/components/sections/portfolio/PortfolioGrid.tsx
// Update the interface to include all expected props

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  titleHe?: string;
  category: string;
  categoryHe?: string;
  description: string;
  descriptionHe?: string;
  image: string;
  featured?: boolean;
  awards?: string[];
  tech?: string[];
  link?: string;
  stats?: Record<string, string | number>;
}

interface PortfolioGridProps {
  locale?: "en" | "he";
  selectedCategory?: string | null;
  selectedProject?: number | null;  // Add this prop
  setSelectedProject?: React.Dispatch<React.SetStateAction<number | null>>;  // Add this prop
  viewMode?: "grid" | "list";  // Add this prop
  projects?: Project[];
}

export default function PortfolioGrid({ 
  locale = "en", 
  selectedCategory = null,
  selectedProject,
  setSelectedProject,
  viewMode = "grid",
  projects = []
}: PortfolioGridProps) {
  const isRTL = locale === "he";
  
  // Filter projects by category
  const filteredProjects = selectedCategory 
    ? projects.filter(p => p.category === selectedCategory)
    : projects;

  // Handle view mode
  if (viewMode === "list") {
    return (
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <ProjectListItem 
                key={project.id} 
                project={project} 
                index={index} 
                locale={locale}
                isRTL={isRTL}
                isSelected={selectedProject === index}
                onClick={() => setSelectedProject?.(index)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Grid view (default)
  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              locale={locale}
              isRTL={isRTL}
              isSelected={selectedProject === index}
              onClick={() => setSelectedProject?.(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
  locale: "en" | "he";
  isRTL: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

function ProjectCard({ project, index, locale, isRTL, isSelected, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative cursor-pointer ${isSelected ? 'ring-2 ring-cyan-400' : ''}`}
      onClick={onClick}
    >
      <Link href={`/portfolio/${project.id}`}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {project.awards && project.awards.length > 0 && (
            <div className="absolute top-6 right-6 flex gap-2">
              {project.awards.map((award: string, i: number) => (
                <div 
                  key={i}
                  className="px-2 py-1 bg-black/50 backdrop-blur text-cyan-400 text-xs uppercase tracking-wider"
                >
                  {award}
                </div>
              ))}
            </div>
          )}
          
          <div className={`absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${isRTL ? "text-right" : "text-left"}`}>
            <span className="text-cyan-400 text-xs uppercase tracking-wider">
              {locale === "he" ? project.categoryHe || project.category : project.category}
            </span>
            <h3 className="text-2xl font-bold mt-2 mb-2">
              {locale === "he" ? project.titleHe || project.title : project.title}
            </h3>
            <p className="text-gray-300 text-sm line-clamp-2">
              {locale === "he" ? project.descriptionHe || project.description : project.description}
            </p>
            
            {project.tech && project.tech.length > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {project.tech.slice(0, 3).map((tech: string, i: number) => (
                  <span 
                    key={i}
                    className="text-xs text-gray-400 border border-gray-700 px-2 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Project List Item Component
interface ProjectListItemProps {
  project: Project;
  index: number;
  locale: "en" | "he";
  isRTL: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

function ProjectListItem({ project, index, locale, isRTL, isSelected, onClick }: ProjectListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative cursor-pointer ${isSelected ? 'ring-2 ring-cyan-400' : ''}`}
      onClick={onClick}
    >
      <Link href={`/portfolio/${project.id}`}>
        <div className={`flex gap-8 p-6 border border-gray-900 hover:border-cyan-400/30 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="relative w-64 h-48 flex-shrink-0 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
            <span className="text-cyan-400 text-xs uppercase tracking-wider">
              {locale === "he" ? project.categoryHe || project.category : project.category}
            </span>
            <h3 className="text-3xl font-bold mt-2 mb-4">
              {locale === "he" ? project.titleHe || project.title : project.title}
            </h3>
            <p className="text-gray-300 mb-6">
              {locale === "he" ? project.descriptionHe || project.description : project.description}
            </p>
            
            {project.tech && project.tech.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {project.tech.map((tech: string, i: number) => (
                  <span 
                    key={i}
                    className="text-xs text-gray-400 border border-gray-700 px-2 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
