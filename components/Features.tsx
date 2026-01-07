
import React from 'react';
import { Cpu, Zap, Box, Layers, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Neural Real-time Physics",
    description: "Our proprietary F-1 core uses deep learning to simulate complex fluid dynamics and soft-body collisions with zero overhead."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Generative World Building",
    description: "Prompt-to-Level technology allows developers to describe environments and have them rendered in high-fidelity instantly."
  },
  {
    icon: <Box className="w-8 h-8" />,
    title: "Photon-Path Rendering",
    description: "Next-gen ray tracing that mimics the quantum behavior of light, creating shadows and reflections that defy reality."
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "AI Character Agency",
    description: "Every NPC is backed by a localized LLM, giving them unique memories, motivations, and dynamic dialogue."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Edge Cloud Integration",
    description: "Seamlessly scale from mobile devices to high-end workstations with our proprietary distributed rendering protocol."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Blockchain Verification",
    description: "Integrated asset ownership and royalty management for a transparent and scalable developer economy."
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-sm font-mono tracking-[0.4em] uppercase text-white/40 mb-4">Core Technology</h2>
          <p className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight max-w-3xl">
            THE ENGINE THAT <span className="text-white/20">THINKS</span> WHILE IT RENDERS.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="p-10 border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-white/30 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl group-hover:bg-white/10 transition-colors"></div>
              
              <div className="mb-8 text-white group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-white/50 font-light leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
