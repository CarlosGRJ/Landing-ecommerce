import HeroSection from '@/components/sections/HeroSection';
import { ProductCategorySection } from '@/components/sections/ProductCategorySection';
import { CATEGORIES } from '@/constants/categories';
import { PRODUCTS } from '@/constants/products';

export default function Home() {
  return (
    <>
      <HeroSection />

      {CATEGORIES.map((category) => {
        const productsForCategory = PRODUCTS.filter(
          (product) => product.categoryId === category.id,
        );

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
