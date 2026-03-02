'use client';
import Link from 'next/link'; // Import Link for navigation

export default function Testimonials() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      {/* Left: Client Testimonial */}
      <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
        <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" alt="Rahul S." />
        </div>
        <div className="relative">
          <span className="text-blue-200 text-6xl absolute -top-4 -left-2 font-serif">“</span>
          <p className="text-gray-700 italic text-lg relative z-10">
            Great experience! Found my dream home quickly. Highly recommend!
          </p>
          <p className="mt-4 font-bold text-gray-900">Rahul S.</p>
        </div>
      </div>

      {/* Right: Sell Your Home CTA (Enabled) */}
      <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Looking to Sell Your Home?</h3>
          <p className="text-sm text-blue-700 mb-6">Get a free property valuation and find the best buyers.</p>
          
          {/* ENABLED BUTTON: Linked to a sell or contact page */}
          <Link href="/sell"> 
            <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md shadow-orange-200">
              Get Started
            </button>
          </Link>
        </div>
        
        {/* Decorative Home Icon Background */}
        <div className="absolute -bottom-4 -right-4 opacity-10 pointer-events-none">
           <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </div>
      </div>
    </section>
  );
}