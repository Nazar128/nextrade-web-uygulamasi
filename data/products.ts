export type Product = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  categoryId: number;    
  subCategoryId: number; 
  category: string;
  brand: string;
  color: string;
  gender: 'Kadın' | 'Erkek' | 'Unisex';
  pattern: string;       
  isNew?: boolean;
  rating: number;
  salesCount: number;
  inStock: boolean;
  discountRate?: number; 
};

export const products: Product[] = [
  
  {
    id: 1,
    title: "Classic Wayfarer Güneş Gözlüğü",
    price: 1499,
    oldPrice: 1899,
    image: "/GüneşGözlüğü.jpg",
    categoryId: 11,
    subCategoryId: 1102,
    category: "Aksesuar",
    brand: "Ray-Ban",
    color: "Leopar",
    gender: "Kadın",
    pattern: "Desenli",
    isNew: true,
    rating: 4.8,
    salesCount: 1250,
    inStock: true,
    discountRate: 21
  },
  {
    id: 2,
    title: "Aviator Metal Çerçeveli Gözlük",
    price: 2199,
    image: "/erkekgozlugu.jpg",
    categoryId: 11,
    subCategoryId: 1102,
    category: "Aksesuar",
    brand: "Prada",
    color: "Altın",
    gender: "Erkek",
    pattern: "Düz",
    rating: 4.9,
    salesCount: 840,
    inStock: true
  },
  {
    id: 3,
    title: "Retro Beyaz Gözlük",
    price: 899,
    oldPrice: 4000,
    image: "/beyazkadingozlugu.jpg",
    categoryId: 11,
    subCategoryId: 1102,
    category: "Aksesuar",
    brand: "Vogue",
    color: "Beyaz",
    gender: "Kadın",
    pattern: "Düz",
    rating: 4.5,
    salesCount: 420,
    inStock: true,
    discountRate: 77
  },
  {
    id: 4,
    title: "Modern Sport Gözlük",
    price: 599,
    image: "/siyahcercevelierkekgozlugu.jpg",
    categoryId: 11,
    subCategoryId: 1102,
    category: "Aksesuar",
    brand: "Oakley",
    color: "Mavi",
    gender: "Unisex",
    pattern: "Düz",
    rating: 4.2,
    salesCount: 150,
    inStock: true
  },

  {
    id: 5,
    title: "Slim Fit Oxford Gömlek",
    price: 749,
    oldPrice: 950,
    image: "/sporaykkabi.jpg", 
    categoryId: 8,
    subCategoryId: 801,
    category: "Giyim",
    brand: "Mavi",
    color: "Beyaz",
    gender: "Erkek",
    pattern: "Düz",
    rating: 4.6,
    salesCount: 2100,
    inStock: true,
    discountRate: 21
  },
  {
    id: 6,
    title: "Çizgili Keten Gömlek",
    price: 899,
    image: "/sporaykkabi.jpg",
    categoryId: 8,
    subCategoryId: 801,
    category: "Giyim",
    brand: "Zara",
    color: "Mavi",
    gender: "Erkek",
    pattern: "Çizgili",
    rating: 4.4,
    salesCount: 650,
    inStock: true
  },
  {
    id: 7,
    title: "Oversize Kareli Oduncu Gömleği",
    price: 1199,
    image: "/sporaykkabi.jpg",
    categoryId: 8,
    subCategoryId: 801,
    category: "Giyim",
    brand: "H&M",
    color: "Kırmızı",
    gender: "Unisex",
    pattern: "Kareli",
    rating: 4.7,
    salesCount: 890,
    inStock: true
  },

  {
    id: 8,
    title: "WH-1000XM5 Kablosuz Kulaklık",
    price: 8499,
    oldPrice: 9999,
    image: "/KablosuzKulaklik.jpg",
    categoryId: 9,
    subCategoryId: 901,
    category: "Elektronik",
    brand: "Sony",
    color: "Siyah",
    gender: "Unisex",
    pattern: "Logo",
    isNew: true,
    rating: 5.0,
    salesCount: 3400,
    inStock: true,
    discountRate: 15
  },
  {
    id: 9,
    title: "AirPods Max Premium",
    price: 12500,
    image: "/KablosuzKulaklik.jpg",
    categoryId: 9,
    subCategoryId: 901,
    category: "Elektronik",
    brand: "Apple",
    color: "Gümüş",
    gender: "Unisex",
    pattern: "Düz",
    rating: 4.9,
    salesCount: 1800,
    inStock: false
  },
  {
    id: 10,
    title: "G-Pro X Gaming Headset",
    price: 3200,
    oldPrice: 4500,
    image: "/KablosuzKulaklik.jpg",
    categoryId: 9,
    subCategoryId: 901,
    category: "Elektronik",
    brand: "Logitech",
    color: "Siyah",
    gender: "Unisex",
    pattern: "Düz",
    rating: 4.7,
    salesCount: 2200,
    inStock: true,
    discountRate: 28
  }
];


export const featuredProducts = products.filter(p => p.rating >= 4.8);
export const onSaleProducts = products.filter(p => p.discountRate && p.discountRate > 0);