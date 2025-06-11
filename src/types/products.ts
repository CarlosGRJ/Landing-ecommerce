export enum CategoryEnum {
  Bafles = 'Bafles',
  Luces = 'Luces',
  Iluminacion = 'Iluminación',
  Estructuras = 'Estructuras',
  Accesorios = 'Accesorios',
  Pantallas = 'Pantallas',
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  color: string;
  image: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  slug: string;
  price: number;
  coverImage: string;
  images: string[];
  categoryId: string;
  features: string[];
  videoUrl?: string;
}
