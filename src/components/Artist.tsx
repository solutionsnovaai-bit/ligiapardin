import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Artist: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.utils.toArray('.artist-reveal').forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
      );
    });

    if (imgRef.current) {
      gsap.to(imgRef.current, {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    }
  }, []);

  return (
    <section className="py-36 bg-brand-bg-alt">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <div className="order-2 md:order-1">
            <div className="artist-reveal flex items-center gap-3 mb-6 text-[10px] tracking-[0.3em] uppercase text-brand-amber font-medium">
              <span className="w-6 h-px bg-brand-amber" />
              A artista
            </div>

            <h2 className="artist-reveal font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.08] text-[#F7EDD8] mb-6 tracking-tight">
              Criada pela IA.<br /><em className="italic text-brand-amber-light">Destilada pela alma.</em>
            </h2>

            <div className="artist-reveal w-12 h-px bg-gradient-to-r from-brand-amber to-transparent mb-8" />

            <div className="artist-reveal space-y-4 text-sm md:text-base font-light text-brand-paper/60 leading-relaxed max-w-[420px]">
              <p>Ligia Cavallera não é apenas uma imagem — ela é a frequência que molda o sabor. Uma artista de música country criada por inteligência artificial para encarnar o espírito da marca.</p>
              <p>Ela não é modelo. Ela é a cachaça. É a terra, o barril, o som que ecoa entre as tábuas de carvalho enquanto a bebida amadurece. Uma identidade nascida de pixels — mas que sabe exatamente onde pisa.</p>
              <p>Desenvolvida com IA generativa e direção de arte da LabFuture, Ligia representa uma nova era do branding artesanal: onde tecnologia e tradição se encontram no mesmo copo.</p>
            </div>

            <div className="artist-reveal flex flex-wrap gap-2 mt-8">
              {['Personagem de IA', 'Identidade Visual', 'LabFuture'].map(tag => (
                <span key={tag} className="text-[9px] tracking-[0.16em] uppercase px-4 py-1.5 border border-brand-amber/30 text-brand-amber/70 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="artist-reveal overflow-hidden rounded-sm">
              <img
                ref={imgRef}
                className="w-full h-[400px] md:h-[640px] object-cover object-top scale-110 will-change-transform"
                src="/images/ligia.jpeg"
                alt="Ligia Cavallera — Personagem de IA"
              />
            </div>
            <div className="artist-reveal absolute -bottom-6 -right-4 md:-right-6 bg-brand-bg/90 border border-brand-amber/35 p-5 md:p-7 rounded-sm backdrop-blur-xl shadow-2xl">
              <div className="text-[9px] tracking-[0.22em] uppercase text-brand-paper/60 mb-2">Criada com</div>
              <div className="font-serif text-2xl md:text-3xl font-bold text-brand-amber-light leading-none">IA Gen</div>
              <div className="text-[10px] text-brand-paper/40 mt-1">Direção · LabFuture</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
