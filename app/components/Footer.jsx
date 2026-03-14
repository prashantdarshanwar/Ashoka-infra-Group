import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] text-white py-16 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & Bio */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-blue-500 font-bold text-xl">
            <Building2 size={28} />
            <span className="text-white">Future InfraGrow</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted partner in finding the perfect property. We're committed to making your real estate journey seamless and successful.
          </p>
          
          {/* ENABLED SOCIAL LINKS */}
          <div className="flex gap-4 text-gray-400">
            <a href="https://www.facebook.com/profile.php?id=61588553162380" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={18} className="hover:text-blue-500 cursor-pointer transition-colors" />
            </a>
            <a href="https://x.com/i/status/2025873041654481257" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={18} className="hover:text-blue-400 cursor-pointer transition-colors" />
            </a>
            <a href="https://www.instagram.com/futureinfragrow?igsh=MW1jb3ZkbHl2d3Bhdg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} className="hover:text-pink-500 cursor-pointer transition-colors" />
            </a>
            <a href="https://www.linkedin.com/company/ashoka-infra-group/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} className="hover:text-blue-600 cursor-pointer transition-colors" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/Properties" className="hover:text-white transition-colors">Properties</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="font-bold text-lg mb-6">Services</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Buy Property</Link></li>
            <li><Link href="/rent" className="hover:text-white transition-colors">Rent Property</Link></li>
            <li><Link href="/sell" className="hover:text-white transition-colors">Sell Property</Link></li>
            <li><Link href="/management" className="hover:text-white transition-colors">Property Management</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info - Ashoka Infra Group */}
<div>
  <h4 className="font-black text-xs uppercase tracking-[0.3em] text-white mb-8">
    Get In Touch
  </h4>
  <ul className="space-y-6">
    {/* Physical Location */}
    <li className="flex items-start gap-4 group">
      <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <MapPin size={20} />
      </div>
      <div className="text-sm font-medium leading-relaxed text-slate-400">
        <span className="text-white font-bold block mb-1">Regional Office</span>
        Nagpur Region, Maharashtra,<br /> India
      </div>
    </li>

    {/* Phone Number */}
    <li className="flex items-center gap-4 group">
      <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Phone size={18} />
      </div>
      <a href="tel:+918007635649" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
        +91 80076 35649
      </a>
    </li>

    {/* Email Address */}
    <li className="flex items-center gap-4 group">
      <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Mail size={18} />
      </div>
      <a href="mailto:ashokainfragroup@gmail.com" className="text-sm font-bold text-slate-400 hover:text-white transition-colors break-all">
        futureinfragrow@gmail.com
      </a>
    </li>
  </ul>
</div>

      </div>
      
      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Future Infra Grow. All rights reserved.
      </div>
    </footer>
  );
}