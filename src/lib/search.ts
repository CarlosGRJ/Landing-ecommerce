// lib/search.ts
import { PRODUCTS } from '@/constants/products';

export function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function searchProducts(query: string) {
  const normalizedQuery = normalize(query);

  return PRODUCTS.filter((product) => {
    const name = normalize(product.name);
    const description = normalize(product.description || '');
    const features = product.features?.map(normalize).join(' ') || '';

    return (
      name.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      features.includes(normalizedQuery)
    );
  });
}
