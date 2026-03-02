'use client'; 
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link'; 
import PropertyCard from './PropertyCard';
import { mockProperties } from '../data/properties.js';

export default function PropertySection({ title, currentPropertyId, className = "" }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const targetId = currentPropertyId ? String(currentPropertyId) : null;
  const filterLocation = searchParams.get('location')?.toLowerCase();
  const filterType = searchParams.get('type');
  const isFiltered = !!(filterLocation || filterType);

  // --- REFINED RECOMMENDATION LOGIC ---
  const getRecommendedProperties = () => {
    const current = mockProperties.find(p => String(p.id) === targetId);
    if (!current) return mockProperties.slice(3, 6); 

    return mockProperties
      .filter(p => String(p.id) !== targetId)
      .map(p => {
        let score = 0;
        if (p.location.toLowerCase() === current.location.toLowerCase()) score += 15;
        else if (p.location.toLowerCase().includes(current.location.toLowerCase())) score += 5;
        if (p.type === current.type) score += 10;
        return { ...p, score };
      })
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  // --- DATA SELECTION ENGINE ---
  let displayProperties = [];

  if (isFiltered) {
    displayProperties = mockProperties.filter(p => {
      const matchLoc = filterLocation ? p.location.toLowerCase().includes(filterLocation) : true;
      const matchType = filterType ? p.type === filterType : true;
      return matchLoc && matchType;
    }).slice(0, 3);
  } 
  else if (title.toLowerCase().includes("recommend")) {
    displayProperties = getRecommendedProperties();
    if (displayProperties.length === 0) {
      displayProperties = mockProperties.filter(p => String(p.id) !== targetId).slice(3, 6);
    }
  } 
  else if (title === "Featured Properties") {
    displayProperties = mockProperties.slice(0, 3);
  } 
  else {
    displayProperties = mockProperties.slice(3, 6);
  }

  return (
    <section className={`pb-10 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center md:items-end mb-6 px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
          {title}
        </h2>
        <Link 
          href="/Properties" 
          className="text-blue-700 text-xs md:text-sm font-bold hover:underline whitespace-nowrap ml-4"
        >
          View All <span className="hidden md:inline">▶</span>
        </Link>
      </div>

      {/* FORCE HORIZONTAL ON MOBILE:
          - flex: sets items in a row
          - flex-nowrap: prevents them from jumping to the next line (vertical)
          - overflow-x-auto: enables the side-scroll
          - snap-x: enables snapping effect
          - md:grid: restores the 3-column laptop view
      */}
      <div className="flex flex-nowrap overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-6 px-4 md:px-0 snap-x snap-mandatory scrollbar-hide">
        {displayProperties.map((prop) => (
          <div 
            key={prop.id} 
            className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center md:snap-align-none"
          >
            <PropertyCard {...prop} />
          </div>
        ))}
      </div>

      {displayProperties.length === 0 && (
        <p className="text-center py-20 text-gray-500 italic">
          No properties found.
        </p>
      )}
    </section>
  );
}