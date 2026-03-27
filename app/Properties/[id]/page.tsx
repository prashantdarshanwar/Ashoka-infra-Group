'use client';
import { useState, useRef } from 'react'; // Added useRef
import { useParams } from 'next/navigation';
import { mockProperties } from '../../data/properties.js';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { 
  MapPin, CheckCircle2, Phone, MessageSquare, Box 
} from 'lucide-react';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Helper Component for Stats
interface StatItemProps {
  label: string;
  value: string | number;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="text-center px-4 border-r last:border-r-0 border-gray-100 flex-1">
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className="font-extrabold text-slate-900 text-lg">{value}</p>
    </div>
  );
}

export default function PropertyDetails() {
  const params = useParams();
  const id = params?.id;
  const [activeTab, setActiveTab] = useState('photos');

  // --- SUBMIT LOGIC START ---
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      property_name: property?.title,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Thank you! Your enquiry has been sent.");
        formRef.current?.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- SUBMIT LOGIC END ---
  
  const property = mockProperties.find((p) => String(p.id) === String(id));

  if (!property) return <div className="p-20 text-center font-bold text-2xl">Property Not Found</div>;

  const propertyImages: string[] = Array.isArray(property.image) 
    ? property.image 
    : property.image ? [property.image] : [];

  const propertyStatus = property.status || (property.type?.toLowerCase() === 'rent' ? 'For Rent' : 'For Sale');
  const isRental = propertyStatus.toLowerCase().includes('rent');

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-gray-500">
        <Link href="/Properties" className="text-sm font-semibold hover:text-blue-600 transition-colors">
          ← Back to properties
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* MEDIA GALLERY SECTION */}
        <div className="mb-8 border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="flex bg-gray-50 border-b border-gray-200">
            {['photos', '3D Plot View', 'Floor Plan'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex-1 py-4 text-sm font-bold transition-all ${
                  activeTab === tab.toLowerCase() 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative h-[350px] md:h-[550px] bg-slate-100">
            {activeTab === 'photos' && propertyImages.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                className="h-full w-full"
              >
                {propertyImages.map((img: string, index: number) => (
                  <SwiperSlide key={`slide-${index}`}>
                    <div className="w-full h-full">
                      <img 
                        src={img} 
                        className="w-full h-full object-cover" 
                        alt={`${property.title} - ${index + 1}`} 
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 italic">
                <Box size={48} className="mb-2 opacity-20" />
                {activeTab === 'photos' ? "No photos available" : `Interactive ${activeTab} view coming soon`}
              </div>
            )}
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className={`${
                      isRental ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                    } px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest`}>
                      {propertyStatus}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                      Verified
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                    {property.title}
                  </h1>
                  <p className="text-gray-400 flex items-center gap-2 mt-2 text-lg">
                    <MapPin size={18} className="text-blue-600" /> {property.location}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-blue-600 text-4xl font-black tracking-tighter">
                    {property.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap justify-between py-8 border-y border-gray-100 mb-10">
                <StatItem label="Beds" value={property.beds} />
                <StatItem label="Baths" value={property.baths} />
                <StatItem label="Sq Ft" value={property.sqft || '1200'} />
                <StatItem label="Type" value={property.type || 'Apartment'} />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900">About this Property</h3>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  {property.description}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-black text-slate-900 mb-6">Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 font-semibold">
                  {(property.features || ['Concierge Service', 'Rooftop Terrace', 'Fitness Center']).map((item) => (
                    <div key={item} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 size={18} className="text-emerald-500" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-10">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Enquire Now</h3>
              <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-2xl border border-blue-50">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-lg">AS</div>
                <div>
                  <p className="font-black text-slate-900 leading-none">Future Support</p>
                  <p className="text-[11px] text-blue-600 font-bold mt-1 uppercase tracking-wider">Direct Agent • Active</p>
                </div>
              </div>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <input 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="Your Name" 
                  className="w-full p-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-black font-semibold" 
                />
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="Email Address" 
                  className="w-full p-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-black font-semibold" 
                />
                <textarea 
                  name="message" 
                  rows={4} 
                  required 
                  placeholder="I'm interested in this..." 
                  className="w-full p-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none text-black font-semibold"
                ></textarea>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Instant Connect</p>
                <div className="grid grid-cols-2 gap-3">
                  <a href="tel:+918007635649" className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl text-xs font-black hover:bg-gray-50 transition-colors text-slate-900 uppercase">
                    <Phone size={14} className="text-blue-600"/> Call
                  </a>
                  <a href="https://wa.me/918007635649" className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl text-xs font-black hover:bg-gray-50 transition-colors text-slate-900 uppercase">
                    <MessageSquare size={14} className="text-green-600"/> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}