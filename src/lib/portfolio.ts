// src/lib/portfolio.ts
import { Project, ProjectCategory, ProjectFilter, ProjectStatus } from '@/types/portfolio';

// Filter functions
export function filterProjects(projects: Project[], filters: ProjectFilter): Project[] {
  let filtered = [...projects];
  
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  
  if (filters.technologies && filters.technologies.length > 0) {
    filtered = filtered.filter(p => 
      filters.technologies?.some(tech => 
        p.technologies.some(pt => pt.name.toLowerCase() === tech.toLowerCase())
      )
    );
  }
  
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(p => 
      filters.tags?.some(tag => p.tags.includes(tag))
    );
  }
  
  if (filters.featured !== undefined) {
    filtered = filtered.filter(p => p.featured === filters.featured);
  }
  
  if (filters.status) {
    filtered = filtered.filter(p => p.status === filters.status);
  }
  
  if (filters.year) {
    filtered = filtered.filter(p => {
      const projectYear = new Date(p.startDate).getFullYear();
      return projectYear === filters.year;
    });
  }
  
  return filtered;
}

// Sort functions
export function sortProjects(
  projects: Project[], 
  sortBy: 'date' | 'title' | 'order' = 'order',
  order: 'asc' | 'desc' = 'asc'
): Project[] {
  const sorted = [...projects];
  
  sorted.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title, 'he');
        break;
      case 'order':
      default:
        comparison = a.order - b.order;
        break;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
}

// Pagination
export function paginateProjects(
  projects: Project[],
  page: number,
  itemsPerPage: number
): {
  items: Project[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
} {
  const totalItems = projects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return {
    items: projects.slice(startIndex, endIndex),
    totalPages,
    currentPage,
    totalItems
  };
}

// Get unique values for filters
export function getUniqueTechnologies(projects: Project[]): string[] {
  const technologies = new Set<string>();
  projects.forEach(p => {
    p.technologies.forEach(tech => technologies.add(tech.name));
  });
  return Array.from(technologies).sort();
}

export function getUniqueTags(projects: Project[]): string[] {
  const tags = new Set<string>();
  projects.forEach(p => {
    p.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort((a, b) => a.localeCompare(b, 'he'));
}

export function getProjectYears(projects: Project[]): number[] {
  const years = new Set<number>();
  projects.forEach(p => {
    years.add(new Date(p.startDate).getFullYear());
    if (p.endDate) {
      years.add(new Date(p.endDate).getFullYear());
    }
  });
  return Array.from(years).sort((a, b) => b - a);
}

// Statistics
export function getProjectStats(projects: Project[]) {
  const stats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    maintenance: projects.filter(p => p.status === 'maintenance').length,
    featured: projects.filter(p => p.featured).length,
    byCategory: {} as Record<ProjectCategory, number>,
    avgDuration: 0,
    totalFeatures: 0,
    technologies: {} as Record<string, number>
  };
  
  // Count by category
  projects.forEach(p => {
    stats.byCategory[p.category] = (stats.byCategory[p.category] || 0) + 1;
    
    // Count technologies
    p.technologies.forEach(tech => {
      stats.technologies[tech.name] = (stats.technologies[tech.name] || 0) + 1;
    });
    
    // Sum features
    stats.totalFeatures += p.features.length;
  });
  
  // Calculate average duration (for completed projects)
  const completedWithDuration = projects.filter(p => 
    p.status === 'completed' && p.stats?.duration
  );
  
  if (completedWithDuration.length > 0) {
    // This is simplified - in real app would parse duration strings properly
    stats.avgDuration = completedWithDuration.length;
  }
  
  return stats;
}

// Format functions
export function formatProjectDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + 
                     (end.getMonth() - start.getMonth());
  
  if (monthsDiff < 1) {
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${daysDiff} ימים`;
  } else if (monthsDiff === 1) {
    return 'חודש';
  } else if (monthsDiff < 12) {
    return `${monthsDiff} חודשים`;
  } else {
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    if (months === 0) {
      return years === 1 ? 'שנה' : `${years} שנים`;
    }
    return `${years} ${years === 1 ? 'שנה' : 'שנים'} ו-${months} חודשים`;
  }
}

export function getStatusLabel(status: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    'completed': 'הושלם',
    'in-progress': 'בפיתוח',
    'maintenance': 'תחזוקה'
  };
  return labels[status];
}

export function getStatusColor(status: ProjectStatus): string {
  const colors: Record<ProjectStatus, string> = {
    'completed': 'text-green-400 bg-green-400/10',
    'in-progress': 'text-yellow-400 bg-yellow-400/10',
    'maintenance': 'text-blue-400 bg-blue-400/10'
  };
  return colors[status];
}