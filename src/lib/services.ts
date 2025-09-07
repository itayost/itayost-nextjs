// src/lib/services.ts
import { Service, ServiceCategory } from '@/types/service';
import { servicesData } from '@/data/services';

/**
 * Get all services
 */
export const getAllServices = (): Service[] => {
  return servicesData;
};

/**
 * Get service by slug
 */
export const getServiceBySlug = (slug: string): Service | null => {
  const service = servicesData.find(s => s.slug === slug);
  return service || null;
};

/**
 * Get services by category
 */
export const getServicesByCategory = (category: string): Service[] => {
  if (category === 'all') return servicesData;
  return servicesData.filter(s => s.category === category);
};

/**
 * Get service slugs for static generation
 */
export const getAllServiceSlugs = (): string[] => {
  return servicesData.map(service => service.slug);
};

/**
 * Get featured services
 */
export const getFeaturedServices = (limit: number = 4): Service[] => {
  // For now, return the first n services
  // Later can add a 'featured' flag to services
  return servicesData.slice(0, limit);
};

/**
 * Search services by query
 */
export const searchServices = (query: string): Service[] => {
  const lowercaseQuery = query.toLowerCase();
  return servicesData.filter(service => 
    service.name.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.tagline.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Get service metadata for SEO
 */
export const getServiceMetadata = (slug: string) => {
  const service = getServiceBySlug(slug);
  if (!service) return null;
  
  return {
    title: service.seo?.title || `${service.name} | ItayOst`,
    description: service.seo?.description || service.description,
    keywords: service.seo?.keywords || [],
    openGraph: {
      title: service.seo?.title || service.name,
      description: service.seo?.description || service.description,
      images: service.heroImage ? [{ url: service.heroImage }] : [],
    }
  };
};

/**
 * Calculate estimated project cost
 */
export const calculateEstimatedCost = (service: Service, options?: {
  complexity?: 'simple' | 'medium' | 'complex';
  urgency?: 'normal' | 'urgent';
  features?: string[];
}): number => {
  if (!service.startingPrice) return 0;
  
  let baseCost = service.startingPrice.amount;
  
  // Adjust for complexity
  if (options?.complexity === 'medium') baseCost *= 1.5;
  if (options?.complexity === 'complex') baseCost *= 2.5;
  
  // Adjust for urgency
  if (options?.urgency === 'urgent') baseCost *= 1.3;
  
  // Add features cost (example: 10% per additional feature)
  if (options?.features) {
    baseCost += baseCost * (options.features.length * 0.1);
  }
  
  return Math.round(baseCost);
};

/**
 * Format service price
 */
export const formatServicePrice = (service: Service): string => {
  if (!service.startingPrice) return 'צור קשר למחיר';
  
  const { amount, currency, unit } = service.startingPrice;
  return `החל מ-${amount.toLocaleString('he-IL')}${currency} ${unit}`;
};

/**
 * Get service timeline in weeks
 */
export const getServiceTimelineInWeeks = (timeline?: string): number | null => {
  if (!timeline) return null;
  
  const match = timeline.match(/(\d+)-?(\d+)?/);
  if (!match) return null;
  
  const min = parseInt(match[1]);
  const max = match[2] ? parseInt(match[2]) : min;
  
  return Math.round((min + max) / 2);
};