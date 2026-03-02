'use client';
import { useState, useEffect, Suspense } from 'react'; // Added Suspense
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import { mockProperties } from '../data/properties.js';
import { Filter, X } from 'lucide-react';

interface FilterOptions {
  location: string;
  bhk: string[];
  type: string[];
  category?: string[];
}

// Sub-component to hold the logic, ensuring Suspense works correctly
function PropertiesContent() {
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const propertiesPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProperties.length]);

  const handleFilterChange = (filters: FilterOptions) => {
    let result = [...mockProperties];

    if (filters.location) {
      result = result.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    if (filters.bhk && filters.bhk.length > 0) {
      result = result.filter(p => {
        const bhkString = p.beds === 0 ? "Plot" : p.beds >= 4 ? "4+ BHK" : `${p.beds} BHK`;
        return filters.bhk.includes(bhkString);
      });
    }

    if (filters.type && filters.type.length > 0) {
      result = result.filter(p => filters.type.includes(p.type));
    }

    if (filters.category && filters.category.length > 0) {
      const selectedCats = filters.category;
      result = result.filter(p => selectedCats.includes(p.category));
    }

    setFilteredProperties(result);
    setIsMobileFilterOpen(false);
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Properties in Nagpur</h1>
          <p className="text-gray-500 text-sm md:text-base">Discover your perfect residential or commercial space</p>
        </div>
        
        <button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="md:hidden flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl font-bold shadow-sm"
        >
          <Filter size={18} />
          Filter & Search
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
        </aside>

        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-[85%] bg-white p-6 shadow-2xl overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}><X size={24}/></button>
              </div>
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </div>
        )}

        <section className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs md:text-sm text-gray-400 font-medium">
              Showing {filteredProperties.length > 0 ? indexOfFirstProperty + 1 : 0} - {Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length}
            </span>
          </div>

          {currentProperties.length > 0 ? (
            <div className="flex flex-nowrap overflow-x-auto pb-8 gap-5 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
              {currentProperties.map((property) => (
                <div key={property.id} className="min-w-[88vw] sm:min-w-[45vw] md:min-w-0 snap-center">
                  <PropertyCard {...property} image={property.image?.[0]} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-[32px] border border-dashed border-gray-200">
              <p className="text-gray-400 text-lg">No properties match your criteria.</p>
              <button onClick={() => setFilteredProperties(mockProperties)} className="mt-4 text-blue-700 font-bold underline">
                Clear all filters
              </button>
            </div>
          )}
          
          {filteredProperties.length > propertiesPerPage && (
            <div className="mt-12 flex justify-center items-center gap-1 md:gap-2">
               <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 border rounded-xl text-sm ${currentPage === 1 ? 'opacity-30' : 'hover:bg-gray-100'}`}>Prev</button>
               <div className="flex gap-1">
                 {[...Array(totalPages)].map((_, index) => (
                   <button key={index + 1} onClick={() => paginate(index + 1)} className={`w-10 h-10 rounded-xl font-bold text-sm ${currentPage === index + 1 ? 'bg-[#0047AB] text-white' : 'border'}`}>
                     {index + 1}
                   </button>
                 ))}
               </div>
               <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 border rounded-xl text-sm ${currentPage === totalPages ? 'opacity-30' : 'hover:bg-gray-100'}`}>Next</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// Main Page Component
export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-black pb-20 md:pb-10">
      <Navbar />
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p>Loading Nagpur Properties...</p>
        </div>
      }>
        <PropertiesContent />
      </Suspense>
    </main>
  );
}