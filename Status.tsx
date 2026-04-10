import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Status: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const BPM = 85;
  const BEAT_MS = 60000 / BPM;

  useEffect(() => {
    gsap.fromTo('#status-card',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '#status-card', start: 'top 80%', once: true },
      }
    );

    let interval: ReturnType<typeof setInterval>;

    const startPulse = () => {
      const pulse = () => {
        if (!titleRef.current || !cardRef.current) return;
        gsap.timeline()
          .to(titleRef.current, { scale: 1.02, color: '#E8A020', duration: 0.1, ease: 'power2.out' })
          .to(titleRef.current, { scale: 1, color: '#F7EDD8', duration: (BEAT_MS / 1000) * 0.55, ease: 'power3.out' });
        gsap.timeline()
          .to(cardRef.current, { boxShadow: '0 0 80px rgba(191,111,0,0.2), 0 0 140px rgba(94,33,41,0.1)', duration: 0.1 })
          .to(cardRef.current, { boxShadow: 'none', duration: (BEAT_MS / 1000) * 0.7, ease: 'power3.out' });
      };
      pulse();
      interval = setInterval(pulse, BEAT_MS);
    };

    ScrollTrigger.create({
      trigger: '#status-card',
      start: 'top 80%',
      once: true,
      onEnter: startPulse,
    });

    return () => clearInterval(interval);
  }, [BEAT_MS]);

  return (
    <section className="py-36 bg-brand-bg text-center">
      <div className="max-w-[1120px] mx-auto px-6">
        <div
          id="status-card"
          ref={cardRef}
          className="relative inline-block bg-black/50 backdrop-blur-2xl border border-brand-amber/30 rounded-3xl px-10 md:px-20 py-16 md:py-20 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blood/50 to-transparent" />

          <div className="flex items-center justify-center gap-3 mb-8 text-[10px] tracking-[0.3em] uppercase text-brand-amber font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-ping" />
            Status atual
          </div>

          <div
            ref={titleRef}
            className="font-serif text-[clamp(2.5rem,7vw,5rem)] font-light tracking-[0.08em] text-[#F7EDD8] leading-none mb-4 will-change-transform cursor-default"
          >
            EM<br />DESENVOLVIMENTO
          </div>

          <p className="font-serif text-lg md:text-xl italic text-brand-paper/45 tracking-wide mb-10">
            Algo jamais destilado antes. Aguarde.
          </p>

          <div className="text-[10px] tracking-[0.28em] uppercase text-brand-amber/35">
            85 BPM · Maturando agora
          </div>
        </div>
      </div>
    </section>
  );
};
