import { PRODUCTS } from '@/constants/products';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProductsByCategory = (categoryId: string) => {
  return PRODUCTS.filter((product) => product.categoryId === categoryId);
};

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}
