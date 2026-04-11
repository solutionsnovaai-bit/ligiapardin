import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Waveform } from './Waveform';

export const Hero: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rafRef = useRef<number>(0);
  const scrollYRef = useRef(0);

  const BPM = 85;
  const BEAT_MS = 60000 / BPM;

  useEffect(() => {
    // Detecta mobile — desliga parallax em telas pequenas (principal causa de lag)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    let ticking = false;

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      if (isMobile) return; // sem parallax no mobile
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          if (imgRef.current) {
            imgRef.current.style.transform =
              `translateY(${scrollYRef.current * 0.35}px) scale(1.1)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Entrada inicial
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo('.hero-anim',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
    gsap.fromTo('#hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.2 });

    // Pulso no BPM — reduzido em mobile para evitar repaint constante
    const pulseTl = gsap.timeline({ repeat: -1, repeatDelay: BEAT_MS / 1000 - 0.15 });
    if (!isMobile) {
      pulseTl
        .to(titleRef.current, {
          scale: 1.015,
          textShadow: '0 0 40px rgba(191,111,0,0.5), -2px 0 rgba(191,111,0,0.5), 2px 0 rgba(94,33,41,0.5)',
          duration: 0.12,
          ease: 'power2.out',
        })
        .to(titleRef.current, {
          scale: 1,
          textShadow: 'none',
          duration: (BEAT_MS / 1000) * 0.6,
          ease: 'power3.out',
        });
    } else {
      // Mobile: apenas opacity sutil, sem scale/textShadow (evita composite layers extras)
      pulseTl
        .to(titleRef.current, { opacity: 0.85, duration: 0.1, ease: 'power2.out' })
        .to(titleRef.current, { opacity: 1, duration: (BEAT_MS / 1000) * 0.6, ease: 'power3.out' });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [BEAT_MS]);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          ref={imgRef}
          className="w-full h-full object-cover object-[center_30%] brightness-[0.28] saturate-[0.7] sepia-[0.3] will-change-transform"
          src="/images/ligia.jpeg"
          alt="Ligia Cavallera"
        />
      </div>

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-brand-bg/30 via-brand-bg/10 to-brand-bg" />

      <div className="relative z-[3] text-center px-6">
        <div className="hero-anim flex items-center justify-center gap-6 mb-12 text-[11px] tracking-[0.4em] uppercase text-brand-amber font-semibold">
          <span className="block w-12 h-px bg-brand-amber/40" />
          A primeira bebida do mundo envelhecida por música
          <span className="block w-12 h-px bg-brand-amber/40" />
        </div>

        <h1
          ref={titleRef}
          className="hero-anim font-serif text-[clamp(2.5rem,10vw,8rem)] font-bold leading-[0.85] tracking-tighter text-[#F7EDD8] cursor-default will-change-transform"
        >
          <span className="block opacity-80 text-[0.4em] tracking-[0.2em] mb-4 font-sans font-light">CACHAÇA PARDIN</span>
          <span className="block text-brand-amber-light drop-shadow-2xl">LIGIA CAVALLERA</span>
          <em className="block not-italic font-light text-brand-paper text-[0.35em] tracking-[0.25em] mt-4 uppercase">
            Edição Especial
          </em>
        </h1>

        <p className="hero-anim font-serif text-[clamp(1.1rem,2.5vw,1.6rem)] font-light italic text-brand-paper/50 mt-10 tracking-[0.05em] max-w-2xl mx-auto leading-relaxed">
          "A cachaça que aprendeu a ouvir e traduzir vibrações em sabor."
        </p>
      </div>

      <div id="hero-scroll" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-brand-amber to-transparent animate-pulse" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-brand-amber/50">Role</span>
      </div>

      <Waveform bpm={BPM} />
    </section>
  );
};
