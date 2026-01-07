
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 
        Video Background 
        Placeholder for the 3840x2160 Black Hole video.
        In a real production, replace 'src' with the provided 4K asset.
      */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          {/* Using a high-quality placeholder that matches the 'black hole' vibe */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-starry-galaxy-background-30372-large.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlays for cinematic effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-80">Next-Gen AI Game Engine is here</span>
        </div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
          BEYOND<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">EVENT HORIZON</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-12 font-light leading-relaxed">
          The F-1 Engine by Apollo Studio leverages neural physics and generative AI to create living worlds that respond to your imagination.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="w-full sm:w-auto px-10 py-5 bg-white text-black font-extrabold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform duration-300">
            Download Engine
          </button>
          <button className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-white/5 transition-all duration-300">
            View Documentation
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <ArrowDown size={32} />
      </div>

      {/* Background Sparkles (Logo inspired) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
      </div>
    </section>
  );
};

export default Hero;
