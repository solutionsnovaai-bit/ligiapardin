import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AcousticAging: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barrelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;

      gsap.fromTo(barrelRef.current,
        { rotationY: -20, rotationZ: -5, scale: isMobile ? 0.6 : 0.8, opacity: 0, y: 100 },
        {
          rotationY: 15, rotationZ: 5, scale: isMobile ? 0.9 : 1, opacity: 1, y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: isMobile ? 'top 20%' : 'center center',
            scrub: 1,
          },
        }
      );

      gsap.utils.toArray('.bpm-step').forEach((step: any, i) => {
        gsap.from(step, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 bg-brand-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        <div className="relative z-10">
          <div className="inline-block px-4 py-1 border border-brand-amber/30 rounded-full text-[10px] tracking-[0.3em] uppercase text-brand-amber mb-8">
            A Ciência do Som
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-paper leading-none mb-10">
            Envelhecimento <br />
            <span className="text-brand-amber-light italic">Vibracional.</span>
          </h2>

          <div className="space-y-12">
            {[
              {
                n: '01', title: 'O Fenômeno Físico',
                text: 'A vibração constante do BPM movimenta o líquido dentro do barril, forçando o contato da cachaça com as fibras da madeira de forma profunda e rítmica.',
              },
              {
                n: '02', title: 'Oxigenação Dinâmica',
                text: 'Diferente do repouso estático, nossa técnica utiliza alto-falantes vibracionais que "massageiam" o barril por 4 horas diárias, extraindo aromas inalcançáveis por métodos comuns.',
              },
            ].map(({ n, title, text }) => (
              <div key={n} className="bpm-step flex gap-6">
                <div className="text-4xl font-serif text-brand-amber/40 font-bold">{n}</div>
                <div>
                  <h4 className="text-brand-paper text-xl font-semibold mb-2 uppercase tracking-widest">{title}</h4>
                  <p className="text-brand-paper/50 font-light leading-relaxed">{text}</p>
                </div>
              </div>
            ))}

            <div className="bpm-step flex gap-6">
              <div className="text-4xl font-serif text-brand-amber/40 font-bold">03</div>
              <div>
                <h4 className="text-brand-paper text-xl font-semibold mb-2 uppercase tracking-widest">Evolução de Ritmo</h4>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {[['MÊS 1', '68'], ['MÊS 2', '70'], ['MÊS 3', '72']].map(([label, val]) => (
                    <div key={label} className="bg-brand-bg-alt border border-brand-amber/10 p-4 rounded-lg">
                      <div className="text-brand-amber text-xs mb-1">{label}</div>
                      <div className="text-2xl font-serif">{val}<span className="text-xs ml-1">BPM</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative" style={{ perspective: '1000px' }}>
          <div ref={barrelRef} className="relative z-10 will-change-transform">
            <img
              src="/images/barril.png"
              alt="Barril Lígia Cavallera"
              className="w-full h-auto drop-shadow-[0_0_50px_rgba(212,175,55,0.2)]"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-amber/10 blur-[120px] rounded-full z-0" />
        </div>

      </div>
    </section>
  );
};
