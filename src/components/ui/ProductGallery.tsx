'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

  const canOpenImage = selected >= 0 && Boolean(images[selected]);
  const totalImages = images.length;

  const goPrev = useCallback(() => {
    if (!totalImages) return;
    setSelected((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const goNext = useCallback(() => {
    if (!totalImages) return;
    setSelected((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, goNext, goPrev]);

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
            controlsList='nodownload'
            className='w-full h-full object-cover'
            aria-label={`Video del producto ${productName}`}>
            <source src={videoUrl} type='video/mp4' />
            Tu navegador no soporta video.
          </video>
        ) : (
          <button
            type='button'
            onClick={() => {
              if (canOpenImage) setIsOpen(true);
            }}
            aria-label={`Ampliar imagen ${selected + 1} de ${productName}`}
            className='w-full h-full cursor-zoom-in'>
            <Image
              src={images[selected] || '/images/no-image.webp'}
              alt={`Imagen ${selected + 1} de ${productName}`}
              width={1000}
              height={600}
              className='w-full h-full object-contain'
              priority
            />
          </button>
        )}
        {isOpen && canOpenImage && (
          <div
            role='dialog'
            aria-modal='true'
            aria-label={`Imagen ampliada ${selected + 1} de ${productName}`}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
            onClick={() => setIsOpen(false)}>
            <div
              className='relative w-full max-w-5xl'
              onClick={(event) => event.stopPropagation()}>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                aria-label='Cerrar imagen ampliada'
                className='absolute -top-12 right-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow hover:bg-white'>
                <X className='h-4 w-4' aria-hidden='true' />
              </button>
              {totalImages > 1 && (
                <button
                  type='button'
                  onClick={goPrev}
                  aria-label='Imagen anterior'
                  className='absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow hover:bg-white'>
                  <ChevronLeft className='h-5 w-5' aria-hidden='true' />
                </button>
              )}
              {totalImages > 1 && (
                <button
                  type='button'
                  onClick={goNext}
                  aria-label='Imagen siguiente'
                  className='absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow hover:bg-white'>
                  <ChevronRight className='h-5 w-5' aria-hidden='true' />
                </button>
              )}
              <div className='w-full aspect-video rounded-lg overflow-hidden bg-white'>
                <Image
                  src={images[selected] || '/images/no-image.webp'}
                  alt={`Imagen ampliada ${selected + 1} de ${productName}`}
                  width={1000}
                  height={600}
                  className='w-full h-full object-contain'
                />
              </div>
            </div>
          </div>
        )}
      </figure>

      {/* Miniaturas Carousel */}
      <div className='mt-4'>
        <Carousel
          opts={{ align: 'start' }}
          className='w-full max-w-3xs md:max-w-5xl mx-auto'>
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
                    src={img || '/images/no-image.webp'}
                    alt={`Miniatura ${index + 1} de ${productName}`}
                    width={150}
                    height={100}
                    className='w-full h-full object-contain'
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
