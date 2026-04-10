import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-[1000] px-6 md:px-12 py-7 flex items-center justify-between transition-all duration-500',
      scrolled && 'bg-brand-bg/85 backdrop-blur-xl border-b border-brand-amber/10 py-5'
    )}>
      <span className="font-serif text-xl md:text-2xl font-bold tracking-[0.15em] text-brand-amber-light uppercase">
        Pardin
      </span>
      <span className="text-[10px] tracking-[0.3em] uppercase text-brand-amber/60 font-semibold border-l border-brand-amber/20 pl-6 ml-6 hidden sm:inline">
        Edição Lígia Cavallera
      </span>
    </nav>
  );
};
