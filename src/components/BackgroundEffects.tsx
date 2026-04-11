import React, { useEffect, useRef } from 'react';

// Substituído motion/react por animação CSS pura.
// Motivo: motion com blobs + blur-[100px] em loop infinito causa jank severo em mobile.
// CSS animations rodam na GPU compositor thread sem bloquear o JS main thread.

export const BackgroundEffects: React.FC = () => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Blob 1 — topo direita */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-brand-blood/25 blur-[80px] -top-[200px] -right-[200px]
                     hidden md:block"
          style={{ animation: 'blob1 20s ease-in-out infinite' }}
        />
        {/* Blob 2 — base esquerda */}
        <div
          className="absolute w-[420px] h-[420px] rounded-full bg-brand-amber/12 blur-[80px] -bottom-[150px] -left-[150px]
                     hidden md:block"
          style={{ animation: 'blob2 25s ease-in-out infinite' }}
        />
        {/* Blob 3 — centro (desktop only — é o mais pesado) */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full bg-brand-blood-mid/15 blur-[80px] top-[40%] left-[30%]
                     hidden lg:block"
          style={{ animation: 'blob3 16s ease-in-out infinite' }}
        />

        {/* Mobile: gradientes estáticos leves no lugar dos blobs animados */}
        <div className="absolute inset-0 md:hidden">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-blood/20 blur-[60px] -top-[100px] -right-[100px]" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-brand-amber/10 blur-[60px] -bottom-[80px] -left-[80px]" />
        </div>
      </div>

      <div className="grain" />
      <div className="vignette" />

      <style>{`
        @keyframes blob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-80px,100px) scale(1.1); }
          66%      { transform: translate(50px,-60px) scale(0.92); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(90px,-70px) scale(1.08); }
          66%      { transform: translate(-60px,50px) scale(0.95); }
        }
        @keyframes blob3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-40px,40px) scale(1.25); }
        }
      `}</style>
    </>
  );
};
