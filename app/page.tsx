import { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './Hero'; 
import PropertySection from './components/PropertySection';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <Suspense fallback={<div className="h-[500px] bg-slate-900 animate-pulse" />}>
        <Hero />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

        {/* 🔥 Wrap THIS in Suspense */}
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-200 rounded-lg" />}>
          <PropertySection 
            title="Featured Properties" 
            currentPropertyId={undefined} 
          />

          <PropertySection 
            title="Recommended For You" 
            currentPropertyId={undefined} 
            className="pt-0" 
          />
        </Suspense>

        <div className="pt-10 space-y-20">
          <HowItWorks />
          <Testimonials />
        </div>
      </div>

      <Footer />
    </main>
  );
}