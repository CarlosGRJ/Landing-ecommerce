import { searchProducts } from '@/lib/search';
import { ProductCard } from '@/components/ui/ProductCard';

interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  const results = query ? searchProducts(query) : [];

  return (
    <main className='max-w-7xl mx-auto px-4 py-12'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold'>
          {query ? `Resultados para: "${query}"` : 'Buscar productos'}
        </h1>
      </header>

      {!query ? (
        <p className='text-gray-600'>Ingresa un término de búsqueda.</p>
      ) : results.length === 0 ? (
        <p className='text-red-500'>
          No se encontraron productos para tu búsqueda.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
