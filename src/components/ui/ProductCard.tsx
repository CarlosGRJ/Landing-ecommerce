'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Skeleton } from './skeleton';
import { Button } from './button';
import Image from 'next/image';
import { Product } from '@/types/products';

export const ProductCard = ({ product }: { product: Product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className='bg-white border rounded-xl shadow flex flex-col h-full overflow-hidden'
      itemScope
      itemType='https://schema.org/Product'>
      <div className='relative w-full h-48'>
        {!imageLoaded && (
          <Skeleton className='absolute top-0 left-0 w-full h-full rounded-none' />
        )}
        <Image
          src={
            product.coverImage || product.images[0] || '/images/no-image.webp'
          }
          alt={product.name}
          width={400}
          height={300}
          className={`w-full h-48 object-contain transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          itemProp='image'
          loading='lazy'
        />
      </div>

      <div className='p-4 flex flex-col flex-grow'>
        <h3 className='text-lg font-semibold text-gray-800' itemProp='name'>
          {product.name}
        </h3>
        {product.description && (
          <p className='text-sm text-gray-700 mt-1' itemProp='description'>
            {product.description}
          </p>
        )}
        <p
          className='text-indigo-600 font-bold mt-2'
          itemProp='offers'
          itemScope
          itemType='https://schema.org/Offer'>
          <span itemProp='priceCurrency' content='MXN'>
            $
          </span>
          <span itemProp='price'>{product.price}</span>
        </p>

        <Link
          href={`/products/${product.slug}`}
          aria-label={`Ver detalles del producto ${product.name}`}>
          <Button className='w-full bg-gray-200 hover:bg-gray-300 text-gray-900 mt-2'>
            Ver detalles
          </Button>
        </Link>
      </div>
    </article>
  );
};

export const ProductSkeleton = () => (
  <div className='bg-white border rounded-xl shadow p-4 space-y-3 h-full flex flex-col'>
    <Skeleton className='w-full h-48' />
    <Skeleton className='h-5 w-3/4' />
    <Skeleton className='h-4 w-full' />
    <Skeleton className='h-4 w-1/2' />
    <Skeleton className='h-10 w-full mt-auto' />
  </div>
);
