import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/constants/categories';
import { PRODUCTS } from '@/constants/products';
import { Metadata } from 'next';
import PaginatedCategory from '@/components/sections/PaginatedCategory';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) return {};

  const title = `${category.name} | Arigio Audio e Iluminación`;
  const description = category.description;
  const url = `https://www.arigioaudioeiluminacion.com.mx/categories/${category.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: category.image,
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

export default function CategoryPage({ params }: Props) {
  const category = CATEGORIES.find((cat) => cat.slug === params.slug);
  if (!category) return notFound();

  const filteredProducts = PRODUCTS.filter(
    (product) => product.categoryId === category.id,
  );

  return <PaginatedCategory category={category} products={filteredProducts} />;
}
