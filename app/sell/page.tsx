'use client';
import React, { useState } from 'react';
import { 
  Building2, Upload, CheckCircle2, DollarSign, 
  ShieldCheck, Zap, Video, Image as ImageIcon, MapPin, Loader2 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SellPage() {
  // Logic: Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'Apartment',
    price: '',
    address: '',
    description: '',
    videoUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ title: '', type: 'Apartment', price: '', address: '', description: '', videoUrl: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS VIEW
  if (status === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 font-sans">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Listing Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for choosing Ashoka Infra Group. Our team will verify your property details and contact you within 24 hours.
          </p>
          <button 
            onClick={() => setStatus(null)}
            className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
          >
            Submit Another Listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <section className="bg-[#0b1120] text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Sell Your Property</h1>
          <p className="text-gray-400 text-lg font-medium">Provide your property details below to reach thousands of potential buyers.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Basic Information */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Building2 className="text-blue-600" size={24} /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Property Title</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Luxury 4BHK Villa with Private Pool" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-slate-900" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Property Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-slate-900"
                  >
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                    <option>Commercial Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Expected Price (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-4.5 text-gray-400" size={18} />
                    <input 
                      required
                      type="number" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="500,000" 
                      className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-slate-900" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Media Upload */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ImageIcon className="text-blue-600" size={24} /> Property Media
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Video Tour URL (YouTube)</label>
                  <input 
                    type="url" 
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                    placeholder="https://youtube.com/watch?v=..." 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-slate-900" 
                  />
                </div>
              </div>
            </div>

            {/* 3. Location & Description */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MapPin className="text-blue-600" size={24} /> Location & Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Full Address</label>
                  <input 
                    required
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Street name, Area, City" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-slate-900" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Detailed Description</label>
                  <textarea 
                    required
                    rows={5} 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your property's best features..." 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-slate-900 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-blue-800 text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-900 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Submit Listing For Approval"}
            </button>
            {status === 'error' && <p className="text-red-500 font-bold text-center">Something went wrong. Please try again.</p>}
          </form>
        </div>

        {/* Sidebar Guide */}
        <div className="space-y-8">
          <div className="bg-blue-900 rounded-3xl p-8 text-white shadow-xl">
            <h4 className="text-2xl font-bold mb-6">Selling Guide</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Zap className="text-yellow-400 shrink-0" />
                <p className="text-sm font-medium opacity-90">Properties with high-quality videos sell 40% faster.</p>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="text-green-400 shrink-0" />
                <p className="text-sm font-medium opacity-90">Verified listings appear at the top of search results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}