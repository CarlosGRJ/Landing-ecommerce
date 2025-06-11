import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CategoriesSection from './CategoriesSection';

export default function HeroSection() {
  return (
    <section className='relative overflow-hidden w-full min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 py-20'>
        {/* Contenido de texto */}
        <div className='text-center md:text-left w-full md:w-1/2'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight'>
            Equipo{' '}
            <span className='text-cyan-600'>Profesional para Eventos</span>
            <span className='block text-indigo-600'>
              y Espectáculos en Vivo
            </span>
          </h1>
          <p className='mt-6 text-lg text-slate-700 max-w-md mx-auto md:mx-0'>
            Descubre lo mejor en audio, iluminación, estructuras, efectos
            especiales y más. Todo lo que necesitas para que tu evento brille
            como nunca.
          </p>

          <Link href='#categorias'>
            <Button
              className='mt-6 text-base font-semibold px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white'
              size='lg'>
              Ver Catálogo <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
          </Link>
        </div>

        {/* Imagen destacada */}
        <div className='w-full md:w-1/2 flex justify-center'>
          <Image
            src='/images/HeroCover.webp'
            alt='Equipo de audio profesional sobre escenario iluminado'
            width={800}
            height={800}
            priority
            quality={100}
            className='rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-xl'
          />
        </div>
      </div>

      <CategoriesSection />
    </section>
  );
}
