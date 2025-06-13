import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-4 py-20'>
      <div className='max-w-md text-center'>
        <h1 className='text-6xl font-bold text-indigo-600 mb-6'>404</h1>
        <h2 className='text-2xl font-semibold mb-4'>Página no encontrada</h2>
        <p className='text-gray-700 mb-8'>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <Link href='/'>
          <Button className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3'>
            <ArrowLeft className='mr-2 w-5 h-5' /> Volver al inicio
          </Button>
        </Link>
      </div>
    </main>
  );
}
