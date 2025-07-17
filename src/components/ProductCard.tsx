import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}
export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group border border-gray-100 hover:border-purple-200 hover:-translate-y-1">
      <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50 h-44 p-4 group-hover:scale-105 transition-transform duration-300">
        <Image
          src={image}
          alt={name}
          width={160}
          height={120}
          className="object-contain drop-shadow-md rounded-xl"
        />
      </div>
      <div className="p-5">
        <div className="font-semibold text-lg mb-1 group-hover:text-purple-600 transition-colors">{name}</div>
        <div className="text-gray-700 text-base font-bold">{price.toLocaleString('ru-RU')} ₽</div>
      </div>
    </Link>
  );
} 