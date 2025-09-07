// src/app/portfolio/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/portfolio';
import ProjectPageClient from './ProjectPageClient';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    return {
      title: 'פרויקט לא נמצא | ItayOst',
      description: 'הפרויקט המבוקש לא נמצא',
    };
  }
  
  return {
    title: `${project.title} | ItayOst Portfolio`,
    description: project.longDescription || project.description,
    keywords: project.seoKeywords || project.tags,
    openGraph: {
      title: project.seoTitle || project.title,
      description: project.seoDescription || project.description,
      type: 'website',
      locale: 'he_IL',
      url: `https://itayost.com/portfolio/${project.slug}`,
      siteName: 'ItayOst',
      images: project.images.filter(img => img.primary).map(img => ({
        url: img.src,
        width: 1200,
        height: 630,
        alt: img.alt,
      })),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    notFound();
  }
  
  return <ProjectPageClient project={project} />;
}