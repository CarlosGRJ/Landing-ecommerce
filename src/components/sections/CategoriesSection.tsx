import { CATEGORIES } from '@/constants/categories';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function CategoriesSection() {
  return (
    <section
      id='categorias'
      className='w-full max-w-7xl mx-auto py-20 px-4 md:px-8'
      aria-labelledby='categories-heading'>
      <header className='mb-10 text-center'>
        <h2
          id='categories-heading'
          className='text-4xl font-bold text-gray-900'>
          Explora nuestras categorías
        </h2>
        <p className='text-lg text-gray-700 mt-2'>
          Equipos profesionales de audio, iluminación, estructuras y más.
        </p>
      </header>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {CATEGORIES.map((item, index) => (
          <Link
            key={index}
            href={`/categories/${item.slug}`}
            className='block group focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded-xl'
            aria-label={`Ver productos de la categoría ${item.name}`}>
            <div className='bg-white rounded-xl overflow-hidden shadow transition group-hover:shadow-lg group-hover:scale-105'>
              <div className='w-full aspect-video relative'>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className='object-cover'
                  quality={90}
                />
              </div>

              <div className='p-4 text-center'>
                <h3 className={`text-xl font-semibold ${item.color}`}>
                  {item.name}
                </h3>
                <p className='text-gray-700 mt-2'>{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
