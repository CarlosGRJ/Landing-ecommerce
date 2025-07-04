import HeroSection from '@/components/sections/HeroSection';
import { ProductCategorySection } from '@/components/sections/ProductCategorySection';
import { CATEGORIES } from '@/constants/categories';
import { PRODUCTS } from '@/constants/products';
import Head from 'next/head';

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Arigio Audio e Iluminación',
    url: 'https://www.arigioaudioeiluminacion.com.mx',
    logo: 'https://www.arigioaudioeiluminacion.com.mx/images/logo-horizontal.webp',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+52-55-XXXX-XXXX', // TODO: put real phone
        contactType: 'customer service',
        areaServed: 'MX',
        availableLanguage: ['Spanish'],
      },
    ],
    sameAs: ['https://www.google.com/maps/place/ARIGIO'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arigio Audio e Iluminación',
    url: 'https://www.arigioaudioeiluminacion.com.mx',
    potentialAction: {
      '@type': 'SearchAction',
      target:
        'https://www.arigioaudioeiluminacion.com.mx/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const categoriesToShow = CATEGORIES.slice(0, 4);

  return (
    <>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </Head>

      <HeroSection />

      {categoriesToShow.map((category) => {
        const productsForCategory = PRODUCTS.filter(
          (product) => product.categoryId === category.id,
        ).slice(0, 6);

        return (
          <ProductCategorySection
            key={category.id}
            title={category.name}
            products={productsForCategory}
            categorySlug={category.slug}
          />
        );
      })}
    </>
  );
}
