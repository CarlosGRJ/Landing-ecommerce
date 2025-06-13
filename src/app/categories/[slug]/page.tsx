import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/constants/categories';
import { PRODUCTS } from '@/constants/products';
import PaginatedCategory from '@/components/sections/PaginatedCategory';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) return {};

  const title = `${category.name} | Venta de Audio e Iluminación CDMX | Arigio Audio e Iluminación`;
  const description = `${category.description}. Equipos profesionales de audio, iluminación, estructuras, pantallas y más en Ciudad de México.`;
  const url = `https://www.arigioaudioeiluminacion.com.mx/categories/${category.slug}`;
  const imageUrl = `https://www.arigioaudioeiluminacion.com.mx${category.image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          alt: category.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [category.image],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((cat) => cat.slug === slug);
  if (!category) return notFound();

  const filteredProducts = PRODUCTS.filter(
    (product) => product.categoryId === category.id,
  );

  return (
    <Suspense
      fallback={<div className='text-center py-10'>Cargando productos...</div>}>
      <PaginatedCategory category={category} products={filteredProducts} />
    </Suspense>
  );
}
