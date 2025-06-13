import type { Metadata } from 'next';
import { Geist, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar03Page from '@/components/navbar-03/navbar-03';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/footer/Footer';
import { Toaster } from '@/components/ui/sonner';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
        url: '/images/og-home.webp',
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
    images: ['/images/og-home.webp'],
  },
  metadataBase: new URL('https://www.arigioaudioeiluminacion.com.mx'),
  creator: 'Carlos Gerardo Rojas Jaime - Web Developer',
  authors: [
    {
      name: 'Carlos Gerardo Rojas Jaime',
      url: 'https://www.carlosrojasj.dev',
    },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    'google-site-verification': 'QebEE38PB-fsiCHRFUOryz-QF0QhMZo3oCgFT5qnZXM',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <head>
        <link
          rel='icon'
          type='image/png'
          href='/favicon-96x96.png'
          sizes='96x96'
        />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <meta name='apple-mobile-web-app-title' content='MyWebSite' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='theme-color' content='#4f46e5' />
      </head>

      <body
        className={`${geistSans.variable} ${montserrat.className} antialiased bg-white text-gray-900`}>
        <Navbar03Page />
        <main>{children}</main>
        <Analytics />
        <SpeedInsights />
        <ContactSection />
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
