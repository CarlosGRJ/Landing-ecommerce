import type { Metadata } from 'next';
import { Geist, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar03Page from '@/components/navbar-03/navbar-03';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/footer/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Arigio Audio e Iluminación | Renta de equipo profesional CDMX',
  description:
    'Renta de audio profesional, iluminación, estructuras, pantallas y maquinaria para eventos en Ciudad de México. Contáctanos para cotización inmediata.',
  keywords: [
    'renta de audio',
    'iluminación eventos',
    'estructuras truss',
    'pantallas LED',
    'maquinaria de humo',
    'conciertos CDMX',
    'Arigio Audio e Iluminación',
  ],
  openGraph: {
    title: 'Arigio Audio e Iluminación',
    description:
      'Renta de audio, iluminación y equipo profesional para eventos y espectáculos en CDMX.',
    url: 'https://www.arigioaudioeiluminacion.com.mx',
    siteName: 'Arigio Audio e Iluminación',
    images: [
      {
        url: '/images/og-home.jpg', // TODO: Change image cover
        alt: 'Arigio Audio e Iluminación - Equipo profesional para eventos',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arigio Audio e Iluminación | CDMX',
    description:
      'Renta de equipo profesional para eventos, conciertos y espectáculos en Ciudad de México.',
    images: ['/images/og-home.jpg'],
  },
  metadataBase: new URL('https://www.arigioaudioeiluminacion.com.mx'),
  creator: 'Carlos Gerardo Rojas Jaime - Web Developer',
  authors: [
    {
      name: 'Carlos Gerardo Rojas Jaime',
      url: 'https://www.carlosrojasj.dev',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body
        className={`${geistSans.variable} ${montserrat.className} antialiased`}>
        <Navbar03Page />
        <main>{children}</main>

        <ContactSection />

        <Footer />
      </body>
    </html>
  );
}
