'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TransitionState {
  fromRect: DOMRect | null;
  toRect: DOMRect | null;
  src: string;
  alt: string;
  show: boolean;
  active: boolean;
}

interface ImageTransitionContextProps {
  state: TransitionState;
  startTransition: (fromRect: DOMRect, toRect: DOMRect, src: string, alt: string) => void;
  endTransition: () => void;
}

const ImageTransitionContext = createContext<ImageTransitionContextProps | undefined>(undefined);

export function ImageTransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TransitionState>({
    fromRect: null,
    toRect: null,
    src: '',
    alt: '',
    show: false,
    active: false,
  });

  const startTransition = (fromRect: DOMRect, toRect: DOMRect, src: string, alt: string) => {
    setState({ fromRect, toRect, src, alt, show: true, active: true });
  };

  const endTransition = () => {
    setState((prev) => ({ ...prev, show: false, active: false }));
  };

  return (
    <ImageTransitionContext.Provider value={{ state, startTransition, endTransition }}>
      {children}
    </ImageTransitionContext.Provider>
  );
}

export function useImageTransition() {
  const ctx = useContext(ImageTransitionContext);
  if (!ctx) throw new Error('useImageTransition must be used within ImageTransitionProvider');
  return ctx;
} 