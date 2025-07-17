export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products = [
  {
    id: '1',
    name: 'Смартфон XPhone 12',
    price: 49990,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=320&h=240&fit=crop',
    description: 'Современный смартфон с отличной камерой и мощным процессором.'
  },
  {
    id: '2',
    name: 'Наушники SoundPro',
    price: 7990,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=320&h=240&fit=crop',
    description: 'Беспроводные наушники с шумоподавлением и длительным временем работы.'
  },
  {
    id: '3',
    name: 'Умные часы WatchFit',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=320&h=240&fit=crop',
    description: 'Фитнес-часы с мониторингом здоровья и уведомлениями.'
  },
  {
    id: '4',
    name: 'Планшет TabMax',
    price: 29990,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=320&h=240&fit=crop',
    description: 'Лёгкий и мощный планшет для работы и развлечений.'
  },
  {
    id: '5',
    name: 'Ноутбук UltraBook',
    price: 89990,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=320&h=240&fit=crop',
    description: 'Тонкий ноутбук с длительным временем автономной работы.'
  },
  {
    id: '6',
    name: 'Камера ProShot',
    price: 39990,
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=320&h=240&fit=crop',
    description: 'Компактная камера с профессиональными возможностями.'
  }
]; 