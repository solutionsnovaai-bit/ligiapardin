import React from 'react';
import { motion } from 'motion/react';

export const BackgroundEffects: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, -80, 50, 0], y: [0, 100, -60, 0], scale: [1, 1.1, 0.92, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[700px] h-[700px] rounded-full bg-brand-blood/30 blur-[100px] -top-[200px] -right-[200px]"
        />
        <motion.div
          animate={{ x: [0, 90, -60, 0], y: [0, -70, 50, 0], scale: [1, 1.08, 0.95, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[500px] h-[500px] rounded-full bg-brand-amber/15 blur-[100px] -bottom-[150px] -left-[150px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[350px] h-[350px] rounded-full bg-brand-blood-mid/20 blur-[100px] top-[40%] left-[30%]"
        />
      </div>
      <div className="grain" />
      <div className="vignette" />
    </>
  );
};
