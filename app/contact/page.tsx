'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Mail, Phone, Globe, Send, ArrowRight, Loader2 } from 'lucide-react';

export default function ContactUs() {
  // 1. Logic: Form State with Explicit TypeScript Typing to fix 'SetStateAction' errors
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Residential',
    message: ''
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  // Fixing the "Argument of type 'error' is not assignable" error here:
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  // 2. Logic: Submit Handler connected to /api/Enquiry
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/Enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        // Reset form on success
        setFormData({ name: '', phone: '', service: 'Residential', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-[#0F172A] pt-24 pb-48 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Connect With Us
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Expert guidance for your real estate journey. Reach out to Ashoka Infra Group today.
          </p>
        </div>
      </section>

      {/* SYMMETRICAL GRID SECTION */}
      <section className="max-w-7xl mx-auto px-6 -mt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: CONTACT CARDS */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Phone Card */}
            <div className="flex-1 bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Phone size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">Direct Line</h3>
                <p className="text-2xl font-black text-slate-900">+91 80076 35649</p>
              </div>
              <a href="tel:+918007635649" className="mt-6 flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                Call Now <ArrowRight size={20} />
              </a>
            </div>

            {/* Email Card */}
            <div className="flex-1 bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <Mail size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">Support Email</h3>
                <p className="text-lg font-bold text-slate-900 break-all leading-tight">futureinfragrow@gmail.com</p>
              </div>
              <a href="mailto:ashokainfragroup@gmail.com" className="mt-6 flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-4 transition-all">
                Write Us <ArrowRight size={20} />
              </a>
            </div>

            {/* Website Card */}
            <div className="flex-1 bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <Globe size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">Digital Portal</h3>
                <p className="text-xl font-bold text-slate-900">futureinfragrow.in</p>
              </div>
              <a href="https://www.futureinfragrow.in/" target="_blank" className="mt-6 flex items-center gap-2 text-orange-600 font-bold group-hover:gap-4 transition-all">
                Visit Site <ArrowRight size={20} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: ENQUIRY FORM */}
          <div className="lg:col-span-8 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-slate-300/40 border border-white flex flex-col">
            <div className="mb-12">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
                Inquiry Form
              </span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">How can we help you?</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pb-3 bg-transparent border-b-2 border-slate-100 focus:border-blue-600 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all" 
                  />
                </div>
                {/* Phone Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+91" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pb-3 bg-transparent border-b-2 border-slate-100 focus:border-blue-600 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all" 
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service of Interest</label>
                <div className="flex flex-wrap gap-3">
                  {['Residential', 'Commercial', 'Plots', 'Investment'].map((item) => (
                    <button 
                      key={item} 
                      type="button" 
                      onClick={() => setFormData({...formData, service: item})}
                      className={`px-6 py-2.5 rounded-xl border-2 font-bold transition-all text-sm ${
                        formData.service === item 
                        ? 'border-blue-600 bg-blue-50 text-blue-600' 
                        : 'border-slate-50 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                <textarea 
                  required
                  rows={4} 
                  placeholder="Describe your requirement..." 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full pb-3 bg-transparent border-b-2 border-slate-100 focus:border-blue-600 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button & Feedback */}
              <div className="space-y-4">
                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#0F172A] hover:bg-blue-600 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-[0.2em] transition-all shadow-xl hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>Send Inquiry <Send size={20} strokeWidth={3} /></>
                  )}
                </button>
                
                {status === 'success' && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <p className="text-center text-emerald-600 font-bold">Message sent successfully! Our team will contact you shortly.</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-center text-red-500 font-bold">Something went wrong. Please check your connection or call us directly.</p>
                  </div>
                )}
              </div>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}