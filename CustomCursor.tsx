import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const { clientX: x, clientY: y } = e;
      gsap.to(dot, { x: x - 2, y: y - 2, duration: 0.06, ease: 'none' });
      gsap.to(cursor, { x: x - 12, y: y - 12, duration: 0.3, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full border border-brand-amber pointer-events-none z-[9999] top-0 left-0 hidden md:block will-change-transform"
      />
      <div
        ref={dotRef}
        className="fixed w-1 h-1 rounded-full bg-brand-amber pointer-events-none z-[9999] top-0 left-0 hidden md:block will-change-transform"
      />
    </>
  );
};
