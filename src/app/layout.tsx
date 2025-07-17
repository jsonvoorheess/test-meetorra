import './globals.css';
import type { Metadata } from 'next';
import { ImageTransitionProvider } from '../components/ImageTransitionContext';
import ProductImageTransition from '../components/ProductImageTransition';

export const metadata: Metadata = {
  title: 'Анимация карточек товаров',
  description: 'Тестовое задание: плавная анимация перехода между карточками и страницей товара',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ImageTransitionProvider>
          {children}
          <ProductImageTransition />
        </ImageTransitionProvider>
      </body>
    </html>
  );
}
