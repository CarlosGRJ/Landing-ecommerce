import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/constants/categories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categorías | Arigio Audio e Iluminación',
  description:
    'Explora nuestras categorías de productos: audio, iluminación, estructuras, pantallas y más para tus eventos y espectáculos en Ciudad de México.',
};

export default function CategoriesPage() {
  return (
    <main
      className='max-w-7xl mx-auto px-4 py-16'
      aria-labelledby='categories-heading'>
      <header className='mb-12 text-center'>
        <h1
          id='categories-heading'
          className='text-4xl font-bold text-gray-900 mb-4'>
          Categorías de Productos
        </h1>
        <p className='text-lg text-gray-600'>
          Descubre la variedad de equipos y soluciones que ofrecemos para hacer
          de tu evento un éxito.
        </p>
      </header>

      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            aria-label={`Ver productos de la categoría ${category.name}`}
            className='
              group 
              block 
              rounded-lg 
              focus-visible:outline-none 
              focus-visible:ring-2 
              focus-visible:ring-offset-2 
              focus-visible:ring-indigo-600
              transition-transform 
              duration-300
            '>
            <Card className='group-hover:scale-105 transition-transform duration-300'>
              <CardHeader>
                <div className='w-full aspect-video relative rounded-lg overflow-hidden border'>
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className='object-cover'
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle
                  className={`text-xl font-semibold ${category.color} mb-2`}>
                  {category.name}
                </CardTitle>
                <p className='text-gray-600 text-sm'>{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
