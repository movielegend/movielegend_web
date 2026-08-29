import React, { ReactNode } from 'react';

interface AuraBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export function AuraBackground({ children, className = '' }: AuraBackgroundProps) {
  return (
    <div className={`aura-bg ${className}`}>
      <div className="aura-layer-1" aria-hidden="true" />
      <div className="aura-layer-2" aria-hidden="true" />
      <div className="aura-layer-3" aria-hidden="true" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
