import React, { useEffect, useRef } from 'react';

interface WaveformProps {
  bpm?: number;
}

export const Waveform: React.FC<WaveformProps> = ({ bpm = 85 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    let animationFrame: number;

    const render = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      const beat = (Math.sin(phase) + 1) * 0.5;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(191,111,0,${0.35 + beat * 0.2})`;
      ctx.lineWidth = 1.5;
      for (let x = 0; x <= W; x += 3) {
        const y = H * 0.55
          + Math.sin(x / W * Math.PI * 2 * 3 + phase) * 18 * (0.7 + beat * 0.5)
          + Math.sin(x / W * Math.PI * 2 * 7 + phase * 1.3) * 6;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = `rgba(94,33,41,${0.25 + beat * 0.15})`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += 3) {
        const y = H * 0.65
          + Math.cos(x / W * Math.PI * 2 * 5 + phase * 1.1) * 12 * (0.6 + beat * 0.4)
          + Math.cos(x / W * Math.PI * 2 * 9 - phase) * 4;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += (Math.PI * 2 * bpm) / (60 * 60);
      animationFrame = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas) { canvas.width = window.innerWidth; canvas.height = 100; }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [bpm]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none overflow-hidden z-[3]">
      <canvas ref={canvasRef} width={1440} height={100} />
    </div>
  );
};
