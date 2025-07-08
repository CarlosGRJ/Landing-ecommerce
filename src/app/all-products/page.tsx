import ProductGrid from '@/components/ui/ProductGrid';
import { PRODUCTS } from '@/constants/products';

import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Todos los Productos | Mi Sitio',
  description: 'Explora nuestro catálogo completo de productos para eventos.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.tusitio.com/products',
  },
};

export default function AllProductsPage() {
  return (
    <Suspense fallback={<p>Cargando productos...</p>}>
      <ProductGrid products={PRODUCTS} />
    </Suspense>
  );
}
