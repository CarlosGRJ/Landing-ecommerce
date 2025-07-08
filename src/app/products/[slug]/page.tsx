import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/ui/ProductGallery';
import Link from 'next/link';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CATEGORIES } from '@/constants/categories';
import Head from 'next/head';
import { getProductBySlug } from '@/lib/utils';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado | Arigio Audio e Iluminación',
    };
  }

  const title = `${product.name} | Venta de Audio e Iluminación Profesional CDMX | Arigio Audio e Iluminación`;
  const description = `${product.description}. Equipo profesional de audio, iluminación, estructuras, efectos especiales y más para eventos en Ciudad de México.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.arigioaudioeiluminacion.com.mx/products/${product.id}`,
      images: [
        {
          url: product.coverImage || product.images[0],
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.coverImage || product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const category = CATEGORIES.find((c) => c.id === product.categoryId);

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Arigio Audio e Iluminación',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.arigioaudioeiluminacion.com.mx/products/${product.id}`,
      priceCurrency: 'MXN',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>

      <main
        className='max-w-7xl mx-auto px-4 py-12'
        itemScope
        itemType='https://schema.org/Product'>
        <Breadcrumbs
          crumbs={[
            { label: 'Inicio', href: '/' },
            { label: 'Categorías', href: '/categories' },
            {
              label: category?.name || '',
              href: category ? `/categories/${category.slug}` : undefined,
            },
            { label: product.name },
          ]}
        />

        <article className='grid md:grid-cols-2 gap-10'>
          {/* Product Gallery */}
          <section>
            <ProductGallery
              productName={product.name}
              images={product.images}
              videoUrl={product.videoUrl}
            />
          </section>

          {/* Product Info */}
          <section>
            <header className='mb-6'>
              <h1 className='text-4xl font-bold text-gray-900' itemProp='name'>
                {product.name}
              </h1>
              <p className='mt-4 text-lg text-gray-700' itemProp='description'>
                {product.description}
              </p>
              <p
                className='mt-4 text-3xl font-bold text-indigo-600'
                itemProp='offers'
                itemScope
                itemType='https://schema.org/Offer'>
                <meta itemProp='priceCurrency' content='MXN' />$
                <span itemProp='price'>{product.price}</span> MXN
              </p>
            </header>

            {/* Features (if any) */}
            {product.features?.length > 0 && (
              <section className='mb-6'>
                <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
                  Especificaciones
                </h2>
                <ul className='list-disc list-inside space-y-1'>
                  {product.features.map((feature, index) => (
                    <li key={index} className='text-gray-700'>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Contact Button */}
            <div className='mt-8'>
              <Link
                href={`https://wa.me/522821232252?text=Hola, quiero más información sobre ${product.name}`}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition'>
                Contactar por WhatsApp
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
