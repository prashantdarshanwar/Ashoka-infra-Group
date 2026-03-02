'use client';
import { useState } from 'react';
import { 
  Home, Upload, CheckCircle2, DollarSign, 
  Calendar, Key, Image as ImageIcon, MapPin, 
  Clock, ShieldCheck, UserCheck, Loader2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RentPage() {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    rent: '',
    deposit: '',
    availableFrom: '',
    tenantType: 'Any',
    address: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('/api/rent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ title: '', rent: '', deposit: '', availableFrom: '', tenantType: 'Any', address: '', description: '' });
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Shared class for black text inputs
  const inputClass = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-black font-medium placeholder:text-gray-400";

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md border border-gray-100">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Listing Live!</h2>
          <p className="text-gray-600 mb-8">
            Your rental property has been submitted. Our team will review the details and make it visible to potential tenants shortly.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            List Another Rental
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="bg-blue-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rent Your Property</h1>
          <p className="text-blue-100 text-lg">Connect with reliable tenants and manage your rental with ease.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Key className="text-blue-600" size={24} /> Rental Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Furnished 2BHK in South Delhi" 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Rent (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="number" 
                      value={formData.rent}
                      onChange={(e) => setFormData({...formData, rent: e.target.value})}
                      placeholder="1,500" 
                      className={`${inputClass} pl-10`} 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Security Deposit (USD)</label>
                  <input 
                    type="number" 
                    value={formData.deposit}
                    onChange={(e) => setFormData({...formData, deposit: e.target.value})}
                    placeholder="3,000" 
                    className={inputClass} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available From</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      value={formData.availableFrom}
                      onChange={(e) => setFormData({...formData, availableFrom: e.target.value})}
                      className={`${inputClass} pl-10`} 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Tenant</label>
                  <select 
                    value={formData.tenantType}
                    onChange={(e) => setFormData({...formData, tenantType: e.target.value})}
                    className={inputClass}
                  >
                    <option value="Any">Any</option>
                    <option value="Family">Family</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Company Lease">Company Lease</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ImageIcon className="text-blue-600" size={24} /> Photos & Gallery
              </h3>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer group">
                <Upload className="mx-auto text-gray-400 group-hover:text-blue-500 mb-3" size={32} />
                <p className="text-gray-600 font-medium">Upload interior and exterior photos</p>
                <p className="text-xs text-gray-400 mt-1">Maximum 15 photos</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MapPin className="text-blue-600" size={24} /> Property Location
              </h3>
              <div className="space-y-6">
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Complete Address" 
                  className={inputClass} 
                  required 
                />
                <textarea 
                  rows={4} 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe additional features (Maintenance, Pet Policy, Parking, etc.)" 
                  className={inputClass}
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-700 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Post Rental Listing"}
            </button>
            {error && <p className="text-red-500 text-center font-bold">Something went wrong. Please try again.</p>}
          </form>
        </div>

        <div className="space-y-6 text-black">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-bold text-slate-800 mb-6">Landlord Benefits</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <UserCheck className="text-green-500 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Verified Tenants</p>
                  <p className="text-xs text-gray-500">We perform basic background checks on interested parties.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="text-blue-500 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Quick Fill</p>
                  <p className="text-xs text-gray-500">Most rentals are filled within 14 days of listing.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="text-purple-500 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Agreement Support</p>
                  <p className="text-xs text-gray-500">Assistance with legal rent agreements and documentation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}