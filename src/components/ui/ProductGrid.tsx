'use client';

import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ui/ProductCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Product } from '@/types/products';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface Props {
  products: Product[];
}

const PAGE_SIZE = 12;

export default function ProductGrid({ products }: Props) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  const paginated = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  /**
   * Determine which pages to show (for compact pagination)
   * E.g. show [1] ... [4] [5] [6] ... [10]
   */
  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <section
      className='w-full px-4 md:px-8 py-12 max-w-7xl mx-auto'
      aria-labelledby='all-products-heading'>
      <Breadcrumbs
        crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Productos', href: '/all-products' },
        ]}
      />

      <header className='mb-8'>
        <h1
          id='all-products-heading'
          className='text-4xl font-bold text-gray-900 mb-2'>
          Todos los Productos
        </h1>
        <p className='text-gray-700'>
          Descubre nuestro catálogo completo de productos para todo tipo de
          eventos.
        </p>
      </header>

      {paginated.length > 0 ? (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10'>
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              {/* Previous button */}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`/all-products?page=${currentPage - 1}`}
                  />
                </PaginationItem>
              )}

              {/* Pages */}
              {getPageNumbers().map((page, i) => {
                if (page === '...') {
                  return (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                } else {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href={`/all-products?page=${page}`}
                        isActive={page === currentPage}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              })}

              {/* Next button */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`/all-products?page=${currentPage + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <p className='text-gray-700'>No hay productos para mostrar.</p>
      )}
    </section>
  );
}
