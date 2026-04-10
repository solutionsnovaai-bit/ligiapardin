import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AcousticAging } from './components/AcousticAging';
import { Concept } from './components/Concept';
import { Artist } from './components/Artist';
import { Status } from './components/Status';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
  }, []);

  return (
    <main className="relative min-h-screen selection:bg-brand-amber selection:text-brand-bg">
      <CustomCursor />
      <BackgroundEffects />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <AcousticAging />
        <Concept />
        <Artist />
        <Status />
        <Footer />
      </div>
    </main>
  );
}
