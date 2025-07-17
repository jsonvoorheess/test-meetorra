"use client";
import { products } from '../../../data/products';
import type { Product } from '../../../data/products';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { useRef, useEffect, useState, use } from 'react';
import { useImageTransition } from '../../../components/ImageTransitionContext';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const product = products.find((p: Product) => p.id === resolvedParams.id);
  if (!product) return notFound();

  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { state, startTransition, endTransition } = useImageTransition();
  const [contentVisible, setContentVisible] = useState(false);
  const [pendingBack, setPendingBack] = useState(false);

  useEffect(() => {
    if (!state.active && !state.show) {
      setContentVisible(true);
    }
  }, [state.active, state.show]);

  useEffect(() => {
    setContentVisible(false);
  }, [product.id]);

  useEffect(() => {
    if (imageRef.current && state.show) {
      const toRect = imageRef.current.getBoundingClientRect();
      if (
        state.fromRect && (
          state.fromRect.left !== toRect.left ||
          state.fromRect.top !== toRect.top ||
          state.fromRect.width !== toRect.width ||
          state.fromRect.height !== toRect.height
        )
      ) {
        startTransition(state.fromRect, toRect, product.image, product.name);
        setTimeout(() => {
          endTransition();
        }, 700);
      }
    }
  }, [product, imageRef]);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setContentVisible(false);
    setPendingBack(true);
  
    let fallbackTimeout: NodeJS.Timeout | null = null;
  
    setTimeout(() => {
      if (imageRef.current && state.fromRect) {
        const toRect = imageRef.current.getBoundingClientRect();
        startTransition(toRect, state.fromRect, product.image, product.name);
  
        fallbackTimeout = setTimeout(() => {
          router.push('/');
          setPendingBack(false);
          endTransition();
        }, 1000);
      } else {
        router.push('/');
        setPendingBack(false);
      }
    }, 400);
  
    return () => {
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
    };
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-transparent">
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-8 relative border border-purple-100">
        <button
          onClick={handleBack}
          className="absolute left-6 top-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-400 text-white font-semibold shadow hover:scale-105 transition-transform"
        >
          ← Назад
        </button>
        <div className="flex flex-col items-center">
          <div className="relative w-full flex justify-center mb-6" ref={imageRef}>
            <Image
              src={product.image}
              alt={product.name}
              width={240}
              height={180}
              className="object-contain rounded-xl shadow-lg border border-gray-100 bg-white"
              priority
            />
          </div>
          <div
            className={`transition-all duration-700 ease-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
            }`}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400">
              {product.name}
            </h1>
            <div className="text-2xl text-gray-800 mb-4 font-bold">{product.price.toLocaleString('ru-RU')} ₽</div>
            <p className="text-gray-600 text-center mb-4 text-lg">{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}