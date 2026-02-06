import beer1 from '@/assets/beer-1.jpg';
import beer2 from '@/assets/beer-2.jpg';
import snacks1 from '@/assets/snacks-1.jpg';
import bath1 from '@/assets/bath-1.jpg';
import bottle1 from '@/assets/bottle-1.jpg';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
}

export const categories = [
  { key: 'craft', label: 'Крафт & Разливное' },
  { key: 'bottle', label: 'Бутылочное' },
  { key: 'snacks', label: 'Снеки' },
  { key: 'bath', label: 'Для бани' },
];

export const products: Product[] = [
  // Крафт & Разливное
  {
    id: 1,
    name: 'IPA Цитрусовый взрыв',
    price: 350,
    category: 'craft',
    categoryLabel: 'Крафт & Разливное',
    description: 'Хмелевой IPA с яркими нотами грейпфрута и маракуйи',
    image: beer1,
  },
  {
    id: 2,
    name: 'Стаут Шоколадный',
    price: 390,
    category: 'craft',
    categoryLabel: 'Крафт & Разливное',
    description: 'Тёмное пиво с бархатным шоколадным послевкусием',
    image: beer2,
  },
  {
    id: 3,
    name: 'Пшеничное Баварское',
    price: 280,
    category: 'craft',
    categoryLabel: 'Крафт & Разливное',
    description: 'Классическое нефильтрованное с банановыми нотами',
    image: beer1,
  },
  {
    id: 4,
    name: 'Лагер Классический',
    price: 250,
    category: 'craft',
    categoryLabel: 'Крафт & Разливное',
    description: 'Лёгкое светлое пиво с чистым солодовым вкусом',
    image: beer2,
  },
  {
    id: 5,
    name: 'Amber Ale Янтарный',
    price: 320,
    category: 'craft',
    categoryLabel: 'Крафт & Разливное',
    description: 'Карамельные ноты и мягкий хмелевой финиш',
    image: beer1,
  },
  {
    id: 6,
    name: 'Портер Дымный',
    price: 370,
    category: 'craft',
    categoryLabel: 'Крафт & Разливное',
    description: 'Копчёный солод и тонкая кофейная горчинка',
    image: beer2,
  },
  // Снеки
  {
    id: 7,
    name: 'Рыба вяленая ассорти',
    price: 220,
    category: 'snacks',
    categoryLabel: 'Снеки',
    description: 'Отборная рыба — идеальный компаньон к пиву (100г)',
    image: snacks1,
  },
  {
    id: 8,
    name: 'Чипсы крафтовые',
    price: 180,
    category: 'snacks',
    categoryLabel: 'Снеки',
    description: 'Хрустящие картофельные чипсы ручной работы',
    image: snacks1,
  },
  {
    id: 9,
    name: 'Орехи микс солёные',
    price: 250,
    category: 'snacks',
    categoryLabel: 'Снеки',
    description: 'Ассорти отборных солёных орехов (150г)',
    image: snacks1,
  },
  // Для бани
  {
    id: 10,
    name: 'Веник берёзовый',
    price: 350,
    category: 'bath',
    categoryLabel: 'Для бани',
    description: 'Натуральный берёзовый веник премиум-качества',
    image: bath1,
  },
  {
    id: 11,
    name: 'Веник дубовый',
    price: 400,
    category: 'bath',
    categoryLabel: 'Для бани',
    description: 'Прочный дубовый веник с богатым ароматом',
    image: bath1,
  },
  {
    id: 12,
    name: 'Шапка банная войлочная',
    price: 450,
    category: 'bath',
    categoryLabel: 'Для бани',
    description: 'Защитная войлочная шапка для комфортного парения',
    image: bath1,
  },
  // Бутылочное
  {
    id: 13,
    name: 'Хадыженское Светлое',
    price: 120,
    category: 'bottle',
    categoryLabel: 'Бутылочное',
    description: 'Классическое светлое пиво с мягким хмелевым вкусом',
    image: bottle1,
  },
  {
    id: 14,
    name: 'Пятигорское Живое',
    price: 130,
    category: 'bottle',
    categoryLabel: 'Бутылочное',
    description: 'Нефильтрованное живое пиво из горного источника',
    image: bottle1,
  },
  {
    id: 15,
    name: 'Ессентукское Золотое',
    price: 110,
    category: 'bottle',
    categoryLabel: 'Бутылочное',
    description: 'Лёгкое золотистое пиво с освежающим послевкусием',
    image: bottle1,
  },
  {
    id: 16,
    name: 'Карачаевское Тёмное',
    price: 140,
    category: 'bottle',
    categoryLabel: 'Бутылочное',
    description: 'Тёмное бутылочное пиво с карамельными нотами',
    image: bottle1,
  },
  {
    id: 17,
    name: 'Сладовар Пшеничное',
    price: 115,
    category: 'bottle',
    categoryLabel: 'Бутылочное',
    description: 'Мягкое пшеничное пиво с нежным солодовым ароматом',
    image: bottle1,
  },
];
