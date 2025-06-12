'use client';

import Link from 'next/link';
import {
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className='w-full bg-white border-t py-10 px-4 md:px-8 text-gray-700'
      role='contentinfo'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Brand & Description */}
        <section aria-labelledby='footer-brand'>
          <h2
            id='footer-brand'
            className='text-xl font-bold mb-4 text-gray-900'>
            Arigio Audio e Iluminación
          </h2>
          <p>
            Renta de equipo profesional de audio, iluminación, estructuras,
            pantallas y maquinaria de humo para eventos y espectáculos en Ciudad
            de México.
          </p>
        </section>

        {/* Contact Info */}
        <section aria-labelledby='footer-contact'>
          <h2
            id='footer-contact'
            className='text-xl font-bold mb-4 text-gray-900'>
            Contacto
          </h2>
          <ul className='space-y-2'>
            <li className='flex items-center gap-2'>
              <FaEnvelope className='text-indigo-600' />
              <a
                href='mailto:arigioiluminacion7@gmail.com'
                className='hover:underline'>
                arigioiluminacion7@gmail.com
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <FaPhone className='text-indigo-600' />
              {/* TODO: ADD REAL NUMBER  */}
              <a href='tel:+5255XXXXXXXX' className='hover:underline'>
                +52 55 XXXX XXXX
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <FaWhatsapp className='text-green-600' />
              <a
                href='https://wa.me/52155xxxxxxxx'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline'>
                WhatsApp Directo
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <FaMapMarkerAlt className='text-indigo-600' />
              <address className='not-italic'>
                Calle de Mesones 26, local 3, Centro Histórico de la Cdad. de
                México, Centro, Cuauhtémoc, 06080 Ciudad de México, CDMX
              </address>
            </li>
          </ul>
        </section>

        {/* Quick Links */}
        <section aria-labelledby='footer-links'>
          <h2
            id='footer-links'
            className='text-xl font-bold mb-4 text-gray-900'>
            Enlaces rápidos
          </h2>
          <ul className='space-y-2'>
            <li>
              <Link href='/' className='hover:underline'>
                Inicio
              </Link>
            </li>
            <li>
              <Link href='/categories' className='hover:underline'>
                Categorías
              </Link>
            </li>
            <li>
              <Link href='#contacto' className='hover:underline'>
                Contacto
              </Link>
            </li>
          </ul>
        </section>
      </div>

      {/* Bottom Credits */}
      <div className='max-w-7xl mx-auto mt-10 pt-6 border-t text-center text-sm text-gray-500'>
        <p>
          © {currentYear} Arigio Audio e Iluminación. Todos los derechos
          reservados.
        </p>
        <p>
          Desarrollado por{' '}
          <a
            href='https://www.carlosrojasj.dev/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-indigo-600 hover:underline'>
            Carlos Rojas - Web Developer
          </a>
        </p>
      </div>
    </footer>
  );
};
