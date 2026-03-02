import { Suspense } from 'react'; // 1. Import Suspense
import Navbar from './components/Navbar';
import Hero from './Hero'; 
import PropertySection from './components/PropertySection';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
//trihgegvrv
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 2. Wrap Hero in Suspense to fix the Vercel build error */}
      {/* The fallback is a simple black/dark box that matches your hero height */}
      <Suspense fallback={<div className="h-[500px] md:h-[600px] bg-slate-900 animate-pulse" />}>
        <Hero />
      </Suspense>
      
      {/* Reduced space-y from 20 to 10 to bring sections closer together */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        
        {/* Featured Section */}
        <PropertySection 
          title="Featured Properties" 
          currentPropertyId={undefined} 
        />
        
        {/* Recommended Section: Added pt-0 to remove top padding and close the gap */}
        <PropertySection 
          title="Recommended For You" 
          currentPropertyId={undefined} 
          className="pt-0" 
        />

        {/* Restore larger spacing for other components if desired */}
        <div className="pt-10 space-y-20">
          <HowItWorks />
          <Testimonials />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}