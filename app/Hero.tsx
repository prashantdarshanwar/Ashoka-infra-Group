'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Hero() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('location', query);
    if (type) params.set('type', type);

    router.push(`?${params.toString()}`);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 text-center w-full max-w-4xl px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md leading-tight">
          Find Your Perfect Plot And Home
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Explore the best properties for rent and sale in your city
        </p>
        
        {/* FULLY TRANSPARENT CARD CONTAINER 
            - Removed 'backdrop-blur-md'
            - Kept 'bg-white/10' for a very subtle hint of a surface
            - Kept 'border-white/30' so the card shape is still visible
        */}
        <div className="bg-white/10 border border-white/30 p-2 rounded-lg shadow-2xl flex flex-col md:flex-row gap-2">
          
          {/* Location Input */}
          <div className="flex-[3] flex items-center px-3 border-b md:border-b-0 md:border-r border-white/20">
            <Search className="text-white/70 mr-2 shrink-0" size={20} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter city or neighborhood" 
              className="w-full p-3 text-white font-medium outline-none placeholder:text-white/60 text-sm md:text-base bg-transparent"
            />
          </div>

          {/* Property Type Select */}
          <select 
            className="flex-1 p-3 text-white font-medium outline-none cursor-pointer bg-transparent text-sm md:text-base appearance-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" className="text-gray-800">Property Type</option>
            <option value="Plot" className="text-gray-800">Plot</option>
            <option value="Apartment" className="text-gray-800">Apartment</option>
            <option value="Villa" className="text-gray-800">Villa</option>
            <option value="House" className="text-gray-800">House</option>
          </select>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-3 rounded-md font-semibold transition flex items-center justify-center gap-2 w-full md:w-auto active:scale-95 shadow-lg"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}