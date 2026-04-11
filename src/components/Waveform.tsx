import React, { useEffect, useRef } from 'react';

interface WaveformProps {
  bpm?: number;
}

export const Waveform: React.FC<WaveformProps> = ({ bpm = 85 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Mobile: reduz carga desenhando a cada 2 frames
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let frameSkip = 0;

    let phase = 0;
    let animationFrame: number;
    let isVisible = true;

    const render = () => {
      if (!isVisible) {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      // Pula frames alternados no mobile
      frameSkip++;
      if (isMobile && frameSkip % 2 !== 0) {
        phase += (Math.PI * 2 * bpm) / (60 * 60);
        animationFrame = requestAnimationFrame(render);
        return;
      }

      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      const beat = (Math.sin(phase) + 1) * 0.5;

      ctx.beginPath();
      // Mobile: step maior (menos pontos = mais rápido)
      const step = isMobile ? 5 : 3;
      ctx.strokeStyle = `rgba(191,111,0,${0.35 + beat * 0.2})`;
      ctx.lineWidth = 1.5;
      for (let x = 0; x <= W; x += step) {
        const y = H * 0.55
          + Math.sin(x / W * Math.PI * 2 * 3 + phase) * 18 * (0.7 + beat * 0.5)
          + Math.sin(x / W * Math.PI * 2 * 7 + phase * 1.3) * 6;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = `rgba(94,33,41,${0.25 + beat * 0.15})`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += step) {
        const y = H * 0.65
          + Math.cos(x / W * Math.PI * 2 * 5 + phase * 1.1) * 12 * (0.6 + beat * 0.4)
          + Math.cos(x / W * Math.PI * 2 * 9 - phase) * 4;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += (Math.PI * 2 * bpm) / (60 * 60);
      animationFrame = requestAnimationFrame(render);
    };

    // Pausa quando sai da viewport
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = 100;
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [bpm]);

  return (
    <div ref={wrapperRef} className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none overflow-hidden z-[3]">
      <canvas ref={canvasRef} width={1440} height={100} />
    </div>
  );
};
