// src/app/services/ServicesClient.tsx

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServiceGrid from "@/components/sections/services/ServiceGrid";
import ServicesCTA from "@/components/sections/services/ServicesCTA";
import Footer from "@/components/layout/Footer";

const ServicesScene = dynamic(
  () => import("@/components/three/ServicesScene"),
  { ssr: false }
);

interface ServicesClientProps {
  locale?: "en" | "he";
}

export default function ServicesClient({ locale = "en" }: ServicesClientProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <ServicesScene />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ServicesHero 
          locale={locale}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        <ServiceGrid 
          locale={locale}
          selectedService={selectedService}
          onServiceSelect={setSelectedService}
        />
        
        <ServicesCTA locale={locale} />
        
        <Footer locale={locale} />
      </div>
    </main>
  );
}