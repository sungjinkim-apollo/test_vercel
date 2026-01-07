
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-24 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-6 bg-white rotate-45 flex items-center justify-center">
                <div className="w-3 h-3 bg-black"></div>
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Apollo</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Redefining the boundaries of digital reality through generative AI and neural physics. Join the F-1 ecosystem today.
            </p>
            <div className="flex gap-4">
              {['X', 'Discord', 'GitHub', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-xs uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity">{social}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 mb-8">Engine</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-white/60 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white/60 transition-colors">Performance</a></li>
              <li><a href="#" className="hover:text-white/60 transition-colors">Roadmap</a></li>
              <li><a href="#" className="hover:text-white/60 transition-colors">Showcase</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 mb-8">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-white/60 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white/60 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white/60 transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-white/60 transition-colors">Marketplace</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 mb-8">Newsletter</h4>
            <p className="text-xs text-white/40 mb-6 uppercase tracking-widest leading-relaxed">Stay updated with the latest F-1 releases.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border border-white/20 px-4 py-3 text-[10px] tracking-widest flex-1 focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-white text-black px-4 py-3 text-[10px] font-black tracking-widest">JOIN</button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono tracking-widest text-white/20">
            © 2024 APOLLO STUDIO. ALL RIGHTS RESERVED. 
          </p>
          <div className="flex gap-8 text-[10px] font-mono tracking-widest text-white/20 uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
