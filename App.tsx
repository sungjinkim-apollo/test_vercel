
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Showcase from './components/Showcase';
import Stats from './components/Stats';
import Footer from './components/Footer';
import { StarBackground } from './components/StarBackground';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <StarBackground />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Showcase />
      </main>
      <Footer />
    </div>
  );
};

export default App;
