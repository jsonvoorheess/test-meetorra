"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useImageTransition } from './ImageTransitionContext';

export default function ProductImageTransition() {
  const { state, endTransition } = useImageTransition();
  const { active, show: contextShow, fromRect: contextFromRect, toRect: contextToRect, src, alt } = state;
  const onAnimationEnd = endTransition;
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      contextShow &&
      contextFromRect && contextToRect &&
      typeof contextFromRect.left === 'number' && typeof contextToRect.left === 'number'
    ) {
      setStyle({
        position: 'fixed',
        left: contextFromRect.left,
        top: contextFromRect.top,
        width: contextFromRect.width,
        height: contextFromRect.height,
        zIndex: 50,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(80,80,160,0.2)',
        transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
        transform: 'scale(1)',
      });
      setOverlayOpacity(0.5);

      requestAnimationFrame(() => {
        setStyle((prev) => ({
          ...prev,
          left: contextToRect.left,
          top: contextToRect.top,
          width: contextToRect.width,
          height: contextToRect.height,
          transform: 'scale(1.04)',
        }));
        requestAnimationFrame(() => {
          setStyle((prev) => ({ ...prev, transform: 'scale(1)' }));
        });
      });
    }
  }, [
    contextShow,
    contextFromRect?.left, contextFromRect?.top, contextFromRect?.width, contextFromRect?.height,
    contextToRect?.left, contextToRect?.top, contextToRect?.width, contextToRect?.height
  ]);

  useEffect(() => {
    if (!contextShow) {
      setOverlayOpacity(0);
      const timeout = setTimeout(() => {
        setStyle({});
        onAnimationEnd();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [contextShow, onAnimationEnd]);

  if (!active || !contextShow || !contextFromRect || !contextToRect) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 transition-opacity duration-500"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          backdropFilter: 'blur(2px)',
        }}
      />
      <div ref={imageRef} style={style} className="pointer-events-none">
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
    </>
  );
}