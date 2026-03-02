'use client';
import { useState } from 'react';

// 1. Define the interface for the component props
interface FilterSidebarProps {
  onFilterChange: (filters: {
    location: string;
    bhk: string[];
    type: string[];
  }) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  // State for the various filter inputs
  const [location, setLocation] = useState('');
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const propertyTypes = ['Plot', 'Apartment', 'Villa', 'House'];
  // Re-enabled bhkOptions to match the logic used in handleCheck
  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];

  // Helper to send the current state back to the parent PropertiesPage
  const triggerUpdate = () => {
    onFilterChange({
      location: location,
      bhk: selectedBHK,
      type: selectedTypes,
    });
  };

  // Logic to handle checking and unchecking boxes
  const handleCheck = (
    currentList: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>, 
    value: string,
    isBhk: boolean
  ) => {
    const newList = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value];
    
    setList(newList);
    
    // Auto-update parent when a checkbox is clicked
    onFilterChange({ 
      location: location, 
      bhk: isBhk ? newList : selectedBHK, 
      type: isBhk ? selectedTypes : newList 
    });
  };

  // Reset function to clear all inputs
  const handleReset = () => {
    setLocation('');
    setSelectedBHK([]);
    setSelectedTypes([]);
    onFilterChange({ location: '', bhk: [], type: [] });
  };

  return (
    /* Added responsive margin-bottom for mobile stacking */
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-8 text-black mb-6 md:mb-0">
      {/* Location Search */}
      <div>
        <h3 className="font-bold mb-4 text-slate-800">Location</h3>
        <input 
          type="text" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or neighborhood" 
          className="w-full p-2 border rounded text-sm mb-2 outline-blue-500 bg-white"
        />
        <button 
          onClick={triggerUpdate}
          className="w-full bg-blue-700 text-white py-2 rounded text-sm font-bold hover:bg-blue-800 transition active:scale-95"
        >
          Search
        </button>
      </div>

      {/* BHK Filter - Re-enabled for mobile consistency */}
      <div>
        <h3 className="font-bold mb-4 text-slate-800">BHK</h3>
        <div className="space-y-2">
          {bhkOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
              <input 
                type="checkbox" 
                checked={selectedBHK.includes(option)}
                onChange={() => handleCheck(selectedBHK, setSelectedBHK, option, true)}
                className="w-4 h-4 rounded border-gray-300 accent-blue-700" 
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Property Type Filter */}
      <div>
        <h3 className="font-bold mb-4 text-slate-800">Property Type</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
              <input 
                type="checkbox" 
                checked={selectedTypes.includes(type)}
                onChange={() => handleCheck(selectedTypes, setSelectedTypes, type, false)}
                className="w-4 h-4 rounded border-gray-300 accent-blue-700" 
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="pt-4 border-t border-gray-50">
        <button 
          onClick={triggerUpdate}
          className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-md active:scale-95"
        >
          Apply Filters
        </button>
        
        <div className="mt-4 flex justify-center">
          <button 
            onClick={handleReset}
            className="text-sm text-orange-500 font-bold hover:underline py-2"
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  );
}