import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 text-center border-t border-brand-amber/10 bg-brand-bg">
      <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.25em] uppercase text-brand-amber/30">
        <span className="w-5 h-px bg-brand-amber/20" />
        Desenvolvido por LabFuture
        <span className="w-5 h-px bg-brand-amber/20" />
      </div>
    </footer>
  );
};
