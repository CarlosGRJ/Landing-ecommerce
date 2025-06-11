'use client';

import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ui/ProductCard';
import { Product } from '@/types/products';
import Link from 'next/link';
import { Breadcrumbs } from '../Breadcrumbs';

interface Props {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
  };
  products: Product[];
}

export default function PaginatedCategory({ category, products }: Props) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 12;

  const totalPages = Math.ceil(products.length / pageSize);
  const paginated = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section
      className='w-full px-4 md:px-8 py-12 max-w-7xl mx-auto'
      aria-labelledby={`category-${category.id}`}>
      <Breadcrumbs
        crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Categorías', href: '/categories' },
          { label: category.name },
        ]}
      />
      <header className='mb-8'>
        <h1
          id={`category-${category.id}`}
          className='text-4xl font-bold text-gray-900 mb-2'>
          {category.name}
        </h1>
        <p className='text-gray-600'>{category.description}</p>
      </header>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10'>
        {paginated.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <nav
        className='flex justify-center gap-2'
        role='navigation'
        aria-label='Paginación de productos'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`/categorias/${category.slug}?page=${page}`}
            scroll={false}
            className={`px-3 py-1 border rounded transition-colors duration-200 ${
              page === currentPage
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}>
            {page}
          </Link>
        ))}
      </nav>
    </section>
  );
}
