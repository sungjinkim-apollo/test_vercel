
import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Engine', href: '#features' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Docs', href: '#' },
    { name: 'Pricing', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo matching the prompt's aesthetic */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <div className="w-8 h-8 bg-white rotate-45 flex items-center justify-center transition-transform group-hover:rotate-180 duration-700">
              <div className="w-4 h-4 bg-black"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">Apollo</span>
          <span className="text-xs px-1.5 py-0.5 border border-white/40 rounded-sm font-mono opacity-60">F-1</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-300">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black z-40 flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-3xl font-black uppercase tracking-tighter"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="mt-4 border border-white px-10 py-4 text-sm font-bold uppercase tracking-widest">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
