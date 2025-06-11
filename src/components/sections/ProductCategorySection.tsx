import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/products';
import { ProductCard, ProductSkeleton } from '../ui/ProductCard';

interface Props {
  title: string;
  products: Product[];
  categorySlug?: string;
  loading?: boolean;
}

export const ProductCategorySection = ({
  title,
  products,
  loading,
  categorySlug,
}: Props) => {
  const skeletonArray = Array(4).fill(null);

  return (
    <section
      aria-labelledby={`category-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className='w-full py-12 px-4 md:px-8 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <header className='mb-6'>
          <h2
            id={`category-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className='text-3xl font-extrabold text-gray-900'>
            {title}
          </h2>
        </header>

        <Carousel className='w-full'>
          <CarouselContent>
            {(loading ? skeletonArray : products).map((product, index) => (
              <CarouselItem
                key={index}
                className='pl-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4'>
                {loading || !product ? (
                  <ProductSkeleton />
                ) : (
                  <ProductCard product={product} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {categorySlug && (
          <footer className='flex justify-end mt-4'>
            <Link
              href={`/categories/${categorySlug}`}
              aria-label={`Ver más productos de la categoría ${title}`}>
              <Button variant='link' className='text-indigo-600 text-sm'>
                Ver más productos →
              </Button>
            </Link>
          </footer>
        )}
      </div>
    </section>
  );
};
