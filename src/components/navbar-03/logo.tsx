import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
  <Link href='/'>
    <Image
      src='/images/logo-horizontal.webp'
      alt='Logo de Arigio Company'
      width={160}
      height={40}
      priority
      unoptimized
      className='h-28 object-contain hidden sm:block'
    />

    <Image
      src='/images/logo-icon.webp'
      alt='Logo de Arigio Company'
      width={60}
      height={40}
      priority
      unoptimized
      className='h-28 object-contain block sm:hidden'
    />
  </Link>
);
