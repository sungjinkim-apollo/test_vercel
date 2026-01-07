
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { label: 'Neural Latency', value: '< 1.2ms' },
    { label: 'Max Resolution', value: '16K Native' },
    { label: 'AI Entities', value: '10M+' },
    { label: 'Global Developers', value: '450K' },
  ];

  return (
    <section className="py-24 bg-black relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="group cursor-default">
            <h3 className="text-3xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</h3>
            <p className="text-[10px] font-mono tracking-widest uppercase text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
