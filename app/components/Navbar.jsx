'use client';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/Properties' },
    { name: 'Sell', href: '/sell' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a192f] text-white shadow-lg">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex items-center justify-center">
            <img src="/logo (2).png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight">Future InfraGrow</span>
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-blue-400 transition-colors">
              {link.name}
            </Link>
          ))}
          <a href="tel:+918007635649" className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-semibold">
            Call Us
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1f3d] border-t border-gray-700 py-6 px-8 flex flex-col gap-5 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg">
              {link.name}
            </Link>
          ))}
          <a href="tel:+918007635649" className="bg-blue-600 text-center py-3 rounded-md font-bold">
            Call 8007635649
          </a>
        </div>
      )}
    </nav>
  );
}