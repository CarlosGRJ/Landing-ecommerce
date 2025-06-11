'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  videoUrl?: string;
  productName: string;
}

export const ProductGallery = ({
  images,
  videoUrl,
  productName,
}: ProductGalleryProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <section
      aria-label={`Galería del producto: ${productName}`}
      className='w-full max-w-5xl mx-auto py-8'>
      <h2 className='sr-only'>Galería del producto</h2>

      {/* Vista principal */}
      <figure className='w-full aspect-video rounded-lg overflow-hidden border shadow-md'>
        {selected === -1 && videoUrl ? (
          <video
            controls
            className='w-full h-full object-cover'
            aria-label={`Video del producto ${productName}`}>
            <source src={videoUrl} type='video/mp4' />
            Tu navegador no soporta video.
          </video>
        ) : (
          <Image
            src={images[selected]}
            alt={`Imagen ${selected + 1} de ${productName}`}
            width={1000}
            height={600}
            className='w-full h-full object-cover'
            priority
          />
        )}
      </figure>

      {/* Miniaturas Carousel */}
      <div className='mt-4'>
        <Carousel
          opts={{ align: 'start' }}
          className='w-full max-w-5xl mx-auto'>
          <CarouselContent>
            {videoUrl && (
              <CarouselItem className='basis-1/4 lg:basis-1/6'>
                <button
                  onClick={() => setSelected(-1)}
                  aria-label='Ver video del producto'
                  className={`w-full h-24 overflow-hidden border-2 rounded-md ${
                    selected === -1 ? 'border-indigo-600' : 'border-transparent'
                  }`}>
                  <video className='w-full h-full object-cover' muted>
                    <source src={videoUrl} type='video/mp4' />
                  </video>
                </button>
              </CarouselItem>
            )}

            {images.map((img, index) => (
              <CarouselItem key={index} className='basis-1/4 lg:basis-1/6'>
                <button
                  onClick={() => setSelected(index)}
                  aria-label={`Seleccionar imagen ${index + 1}`}
                  className={`w-full h-24 overflow-hidden border-2 rounded-md ${
                    selected === index
                      ? 'border-indigo-600'
                      : 'border-transparent'
                  }`}>
                  <Image
                    src={img}
                    alt={`Miniatura ${index + 1} de ${productName}`}
                    width={150}
                    height={100}
                    className='w-full h-full object-cover'
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
