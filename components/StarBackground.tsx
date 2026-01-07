
import React, { useMemo } from 'react';

export const StarBackground: React.FC = () => {
  // Generate a random set of stars that will persist
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${3 + Math.random() * 5}s`
          }}
        />
      ))}
      {/* Decorative large logo-like sparkles */}
      <div className="absolute top-[15%] right-[10%] w-0.5 h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent rotate-45"></div>
      <div className="absolute bottom-[20%] left-[5%] w-0.5 h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent -rotate-12"></div>
    </div>
  );
};
