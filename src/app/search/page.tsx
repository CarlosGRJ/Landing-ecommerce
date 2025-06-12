import { searchProducts } from '@/lib/search';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Buscar productos | Arigio Audio e Iluminación',
  description:
    'Encuentra productos de audio, iluminación, estructuras, pantallas y más en nuestro catálogo profesional para eventos en Ciudad de México.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

const PAGE_SIZE = 12;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page } = await searchParams;
  const query = q?.trim() || '';
  const currentPage = parseInt(page || '1', 10);

  const allResults = query ? searchProducts(query) : [];
  const totalPages = Math.ceil(allResults.length / PAGE_SIZE);
  const paginatedResults = allResults.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <main className='max-w-7xl mx-auto px-4 py-12'>
      <header className='mb-8 text-center'>
        <h1 className='text-3xl font-bold'>
          {query ? `Resultados para: "${query}"` : 'Buscar productos'}
        </h1>
      </header>

      {!query ? (
        <p className='text-gray-600 text-center'>
          Ingresa un término de búsqueda.
        </p>
      ) : allResults.length === 0 ? (
        <p className='text-red-500 text-center'>
          No se encontraron productos para tu búsqueda.
        </p>
      ) : (
        <>
          <section
            aria-labelledby='search-results'
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12'>
            {paginatedResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>

          {/* Pagination */}
          <nav
            className='flex justify-center gap-2'
            role='navigation'
            aria-label='Paginación de resultados'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/search?q=${encodeURIComponent(query)}&page=${page}`}
                className={`px-4 py-2 rounded border text-sm font-medium transition ${
                  page === currentPage
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}>
                {page}
              </Link>
            ))}
          </nav>
        </>
      )}
    </main>
  );
}
