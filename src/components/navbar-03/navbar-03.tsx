'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { NavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';

import { FaWhatsapp } from 'react-icons/fa';

const Navbar03Page = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`h-20 bg-background border-b ${isSticky ? 'sticky' : ''}`}
      role='navigation'
      aria-label='Menú principal'>
      <div className='h-full flex items-center justify-between max-w-screen-2xl mx-auto px-4 '>
        <div className='flex items-center gap-10'>
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className='hidden md:block' />
        </div>

        <div className='flex items-center gap-3'>
          <Button
            className='bg-green-500 hover:bg-green-600 text-white flex items-center gap-2'
            asChild>
            {/* TODO: ADD real number */}
            <a
              href='https://wa.me/521XXXXXXXXXX'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Contáctanos por WhatsApp'>
              <FaWhatsapp className='h-5 w-5' /> Contáctanos
            </a>
          </Button>

          {/* Mobile Menu */}
          <div className='md:hidden'>
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar03Page;
