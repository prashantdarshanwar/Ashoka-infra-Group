'use client';
import Link from 'next/link';

export default function PropertyCard({ id, title, price, beds, baths, image, location, category }) {
  // Logic to check if we should show the BHK/Bed/Bath details
  const hasBedBathInfo = beds > 0 || baths > 0;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col h-full">
      <div className="h-48 overflow-hidden relative bg-slate-200">
        <img 
          src={image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"} 
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Category Badge on Image */}
        {category && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-tight">
            {category}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow text-black">
        <h3 className="font-bold text-lg mb-1 text-gray-800 line-clamp-1">{title}</h3>
        
        {/* Location Row */}
        {location && (
          <p className="text-gray-500 text-sm mb-2 flex items-center">
            <span className="mr-1 opacity-70">📍</span> {location}
          </p>
        )}

        <p className="text-blue-800 font-bold text-xl mb-2">{price}</p>
        
        {/* Only show BHK tag if beds value is provided */}
        {beds > 0 && (
          <p className="text-gray-500 text-xs font-semibold mb-4 uppercase tracking-wider">
            {beds} BHK
          </p>
        )}
        
        {/* Only show the bed/bath row if values exist */}
        {hasBedBathInfo && (
          <div className="flex items-center text-gray-400 text-sm mb-6 space-x-4">
            {beds > 0 && <span>{beds} bed</span>}
            {baths > 0 && <span>{baths} bath</span>}
          </div>
        )}
        
        <Link href={`/Properties/${id}`} className="mt-auto">
          <button className="w-full py-2 bg-[#0047AB] text-white font-semibold rounded hover:bg-blue-900 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}