export type Product = {
  id: number;
  title: string;
  description: string; 
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[]; 
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
  slug: string; 
};

export const products: Product[] = [
  {
    id: 1,
    title: "Classic Wayfarer Güneş Gözlüğü",
    slug: "classic-wayfarer-gunes-gozlugu",
    description: "Zamansız tasarımıyla öne çıkan Classic Wayfarer, %100 UV korumalı camları ve dayanıklı asetat çerçevesi ile hem şıklık hem de konfor sunar. Her yüz tipine uyum sağlayan ikonik bir model.",
    price: 1499,
    oldPrice: 1899,
    image: "/GüneşGözlüğü.jpg",
    images: ["/GüneşGözlüğü.jpg", "/erkekgozlugu.jpg"], 
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
    slug: "aviator-metal-cerceveli-gozluk",
    description: "Havacılık tarihinden ilham alan metal çerçeveli Aviator, ince yapısı ve degrade cam seçenekleriyle modern bir görünüm sağlar. Hafifliği sayesinde gün boyu rahat kullanım sunar.",
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
    slug: "retro-beyaz-gozluk",
    description: "90'ların ruhunu yansıtan kalın beyaz çerçeveli retro gözlük. Sokak stilini tamamlamak isteyenler için cesur ve dikkat çekici bir aksesuar.",
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
    slug: "modern-sport-gozluk",
    description: "Aktif yaşam tarzı için tasarlanan spor gözlük, kaymaz burun pedleri ve geniş görüş açısı sunan polarize camları ile performansınızı artırır.",
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
    slug: "slim-fit-oxford-gomlek",
    description: "%100 pamuklu kumaştan üretilen Slim Fit Oxford gömlek, hem ofis şıklığı hem de günlük kullanım için idealdir. Nefes alan dokusuyla dört mevsim konfor sağlar.",
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
    slug: "cizgili-keten-gomlek",
    description: "Yaz aylarının vazgeçilmezi keten karışımlı kumaş. Rahat kesimi ve dikey çizgileriyle ferah ve şık bir görünüm sunar.",
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
    slug: "oversize-kareli-oduncu-gomlegi",
    description: "Soğuk havalarda katmanlı giyimin anahtar parçası. Yumuşak tuşeli kalın kumaşı ve oversize kalıbıyla maksimum rahatlık.",
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
    slug: "wh-1000xm5-kablosuz-kulaklik",
    description: "Sektör lideri gürültü engelleme teknolojisi. Kristal netliğinde ses kalitesi ve 30 saate varan pil ömrü ile kusursuz bir müzik deneyimi.",
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
    slug: "airpods-max-premium",
    description: "Apple tasarımı dinamik sürücü ile yüksek sadakatli ses. Aktif Gürültü Engelleme ve Şeffaf Mod arasında tek tuşla geçiş yapın.",
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
    slug: "g-pro-x-gaming-headset",
    description: "Profesyonel oyuncular için tasarlandı. Blue VO!CE mikrofon teknolojisi ve hassas 7.1 surround ses ile oyunun içinde kalın.",
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