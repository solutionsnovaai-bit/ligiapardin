import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Concept: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.utils.toArray('.concept-reveal').forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
      );
    });

    if (imgRef.current) {
      gsap.to(imgRef.current, {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="py-36 bg-brand-bg">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <div className="concept-reveal relative overflow-hidden rounded-sm group">
            <img
              ref={imgRef}
              className="w-full h-[400px] md:h-[600px] object-cover object-center scale-110 transition-transform duration-1000 group-hover:scale-[1.15] will-change-transform"
              src="/images/barril.png"
              alt="Barril de Carvalho Lígia Cavallera"
            />
            <div className="absolute inset-4 border border-brand-amber/25 rounded-[2px] pointer-events-none" />
            <span className="absolute bottom-6 left-6 text-[9px] tracking-[0.22em] uppercase text-brand-amber/70 font-medium">
              Barril de Carvalho · Edição Limitada
            </span>
          </div>

          <div className="max-w-[420px]">
            <div className="concept-reveal flex items-center gap-3 mb-6 text-[10px] tracking-[0.3em] uppercase text-brand-amber font-medium">
              <span className="w-6 h-px bg-brand-amber" />
              O conceito
            </div>

            <h2 className="concept-reveal font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.08] text-[#F7EDD8] mb-6 tracking-tight">
              Destilada ao ritmo<br />de <em className="italic text-brand-amber-light">85 BPM.</em>
            </h2>

            <div className="concept-reveal w-12 h-px bg-gradient-to-r from-brand-amber to-transparent mb-8" />

            <div className="concept-reveal space-y-4 text-sm md:text-base font-light text-brand-paper/60 leading-relaxed">
              <p>Lígia Cavallera nasce de um experimento inédito: cachaça artesanal envelhecida em barris de carvalho enquanto música country toca continuamente ao redor.</p>
              <p>As vibrações sonoras a 85 BPM permeiam a madeira e interferem diretamente no processo de maturação. O resultado é uma bebida que carrega não apenas o tempo — mas o ritmo.</p>
            </div>

            <div className="concept-reveal flex flex-wrap gap-2 mt-8">
              {['Cachaça Artesanal', '85 BPM', 'Barril de Carvalho'].map(tag => (
                <span key={tag} className="text-[9px] tracking-[0.16em] uppercase px-4 py-1.5 border border-brand-amber/30 text-brand-amber/70 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
