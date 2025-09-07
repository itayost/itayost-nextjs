// src/app/services/[slug]/page.tsx
import { Metadata } from 'next';
import { getAllServiceSlugs, getServiceMetadata } from '@/lib/services';
import ServicePageClient from './ServicePageClient';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all service slugs
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const metadata = getServiceMetadata(resolvedParams.slug);
  
  if (!metadata) {
    return {
      title: 'שירות לא נמצא | ItayOst',
      description: 'השירות המבוקש לא נמצא',
    };
  }
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      ...metadata.openGraph,
      type: 'website',
      locale: 'he_IL',
      url: `https://itayost.com/services/${resolvedParams.slug}`,
      siteName: 'ItayOst',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.openGraph.title,
      description: metadata.openGraph.description,
      images: metadata.openGraph.images,
    },
    alternates: {
      canonical: `https://itayost.com/services/${resolvedParams.slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  
  return <ServicePageClient slug={resolvedParams.slug} />;
}