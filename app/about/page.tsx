'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import { ShieldCheck, Target, Users, Landmark, ArrowRight, Instagram, Linkedin } from 'lucide-react';

export default function AboutUs() {
  // Updated Team Data with your provided members
  const team = [
    { name: "Kamlesh K. Sakhare", role: "Chairman / Director", image: "kamlesh sakhare.jpeg" },
    { name: "Nilesh Y. Meshram", role: "Managing Director", image: "/team/nilesh.jpg" },
    { name: "Rohit Wasnik", role: "Accounts", image: "Rohit w.jpeg" },
    { name: "Vikash Choudhary", role: "Manager", image: "/team/vikash.jpg" },
    { name: "Naitik Ganvir", role: "Digital & Tech Creator", image: "/team/naitik.jpg" },
    { name: "Nikhil T. Sakhare", role: "Sales Manager", image: "Nikhil sakhare.jpeg" },
    { name: "Nitin Patle", role: "Team Leader", image: "nitin patle.jpeg" },
    { name: "Amar Devade", role: "Team Leader", image: "amar dode.jpeg" },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* HERO SECTION */}
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
              At Future Infra Grow, we build the foundations for your future dreams. With a focus on transparency and strategic locations, we are Nagpur’s trusted real estate partner.
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
                  src="logo.jpeg" 
                  alt="Future Infra Grow" 
                  className="w-full h-[500px] object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Leadership & Excellence</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">The Minds Behind <span className="text-blue-600">Future Infra Grow</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="relative rounded-[2rem] overflow-hidden mb-5 aspect-[4/5] bg-slate-100 border border-slate-100">
                  {/* Placeholder image logic: If image file doesn't exist, shows a clean grey box */}
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://ui-avatars.com/api/?name=" + member.name + "&background=f1f5f9&color=2563eb&bold=true";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white cursor-pointer hover:bg-blue-600">
                        <Linkedin size={14}/>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-black mb-1">{member.name}</h4>
                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE PHILOSOPHY */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-black">Our Mission</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Providing high-quality residential plots with maximum value appreciation for investors.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-black">Our Promise</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Transparency in every square foot. We ensure clear titles and legal compliance.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-black">Community First</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Developing thriving neighborhoods with modern planned infrastructure.</p>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">Ready to invest in Nagpur's growth?</h2>
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
        </div>
      </section>
    </main>
  );
}