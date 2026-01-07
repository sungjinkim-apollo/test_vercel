
import React from 'react';

const projects = [
  { id: 1, title: 'NEON FRONTIER', category: 'Open World RPG', img: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=1000' },
  { id: 2, title: 'VOID RUNNER', category: 'Space Simulation', img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000' },
  { id: 3, title: 'ETHEREAL PULSE', category: 'Rhythm Shooter', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000' },
  { id: 4, title: 'CYBER CORE', category: 'Competitive Arena', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000' },
];

const Showcase: React.FC = () => {
  return (
    <section id="showcase" className="py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-mono tracking-[0.4em] uppercase text-white/40 mb-4">Built with Apollo</h2>
            <p className="text-4xl md:text-5xl font-extrabold tracking-tighter">THE FUTURE IS PLAYABLE.</p>
          </div>
          <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-white pb-2 hover:opacity-60 transition-opacity">
            View All Projects
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden cursor-pointer aspect-[16/9]">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/60 mb-2 block">{project.category}</span>
                <h3 className="text-3xl font-black tracking-tighter uppercase">{project.title}</h3>
              </div>
              <div className="absolute top-8 right-8 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-xl">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
