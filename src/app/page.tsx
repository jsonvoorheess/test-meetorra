'use client';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useImageTransition } from '../components/ImageTransitionContext';

export default function Home() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();
  const { state, startTransition, endTransition } = useImageTransition();
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  const handleCardClick = (idx: number, product: typeof products[0]) => (e: React.MouseEvent) => {
    e.preventDefault();
    const fromRect = cardRefs.current[idx]?.querySelector('img')?.getBoundingClientRect();
    if (fromRect) {
      startTransition(fromRect, fromRect, product.image, product.name);
      setPendingProductId(product.id);
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  return (
    <main className="min-h-screen py-16 px-4 max-w-7xl mx-auto flex flex-col items-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 mb-2 text-center drop-shadow-lg">
        Каталог техники
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">Выберите интересующий товар, чтобы узнать подробности и увидеть красивую анимацию перехода.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {products.map((product, idx) => (
          <div
            key={product.id}
            ref={el => { cardRefs.current[idx] = el; }}
            onClick={handleCardClick(idx, product)}
            className="cursor-pointer"
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </main>
  );
}
