'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import { ShieldCheck, Target, Users, Landmark, ArrowRight } from 'lucide-react';

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* HERO SECTION: The Vision */}
      <section className="relative py-24 px-6 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">
              Established Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tighter">
              Defining the <br /> 
              <span className="text-blue-600">Nagpur Skyline.</span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed mb-8">
              At Ashoka Infra Group, we don’t just deal in plots and properties; we build the foundations for your future dreams. With a focus on transparency and strategic locations, we are Nagpur’s trusted real estate partner.
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
                  <ShieldCheck className="text-emerald-500" />
                  <span className="font-bold text-sm">RERA Approved</span>
               </div>
               <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
                  <Landmark className="text-blue-500" />
                  <span className="font-bold text-sm">Bank Finance Available</span>
               </div>
            </div>
          </div>
          <div className="relative">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
                <img 
                  src="logo (2).jpeg" 
                  alt="Modern Real Estate Development" 
                  className="w-full h-[500px] object-cover"
                />
             </div>
             {/* Stats Overlay */}
             <div className="absolute -bottom-6 -left-6 bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl">
                <p className="text-4xl font-black mb-1">100%</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Verified Plots</p>
             </div>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Our Core Philosophy</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-black">Our Mission</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              To provide high-quality residential and commercial plots that offer maximum value appreciation for our investors and a perfect home setting for families.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-black">Our Promise</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Transparency in every square foot. We ensure clear titles, legal compliance, and hassle-free documentation for every client.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-black">Community First</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              We focus on developing thriving neighborhoods with planned infrastructure, ensuring a high quality of life for our residents.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">
              Ready to invest in Nagpur's growth?
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
              Join hundreds of happy families who have found their dream property with Future Infra Grow.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="/contact" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3">
                Inquire Now <ArrowRight size={20} />
              </a>
              <div className="text-white text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Call for Support</p>
                <p className="text-xl font-black">+91 80076 35649</p>
              </div>
            </div>
          </div>
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </div>
      </section>
    </main>
  );
}