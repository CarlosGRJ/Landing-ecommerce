'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Menu, Home, Grid, Phone } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';

export const NavigationSheet = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          aria-label='Abrir menú de navegación'>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side='right' className='w-[280px] sm:w-[320px] p-6'>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav
          className='mt-10 flex flex-col space-y-6'
          aria-label='Menú de navegación principal'>
          <Link
            href='/'
            onClick={handleClose}
            className='flex items-center gap-3 text-lg text-gray-900 hover:text-indigo-600 transition'>
            <Home className='w-5 h-5' /> Inicio
          </Link>

          <Link
            href='/categories'
            onClick={handleClose}
            className='flex items-center gap-3 text-lg text-gray-900 hover:text-indigo-600 transition'>
            <Grid className='w-5 h-5' /> Categorías
          </Link>

          <Link
            href='/all-products'
            onClick={handleClose}
            className='flex items-center gap-3 text-lg text-gray-900 hover:text-indigo-600 transition'>
            <Grid className='w-5 h-5' /> Todos los Productos
          </Link>

          <Link
            href='#contacto'
            onClick={handleClose}
            className='flex items-center gap-3 text-lg text-gray-900 hover:text-indigo-600 transition'>
            <Phone className='w-5 h-5' /> Contacto
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
