

export type Product = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  rating: number;
  salesCount: number;
};


export const products: Product[] = [
  {
    id: 1,
    title: "Kablosuz Kulaklık",
    price: 1299,
    oldPrice: 1599,
    image: "/KablosuzKulaklik.jpg",
    category: "Elektronik",
    isNew: true,
    rating: 4.8,
    salesCount: 450
  },
  {
    id: 2,
    title: "Kol Saati",
    price: 2199,
    image: "/kolsaati.jpg",
    category: "Aksesuar",
    rating: 4.5,
    salesCount: 120
  },
  {
    id: 3,
    title: "Spor Ayakkabı",
    price: 1899,
    oldPrice: 2399,
    image: "/sporaykkabi.jpg",
    category: "Giyim",
    rating: 4.9,
    salesCount: 850
  },
  {
    id: 4,
    title: "Laptop Çantası",
    price: 799,
    image: "/laptopcantasi.jpg",
    category: "Aksesuar",
    rating: 4.2,
    salesCount: 95
  },
  {
    id: 5,
    title: "Güneş Gözlüğü",
    price: 499,
    image: "/GüneşGözlüğü.jpg",
    category: "Aksesuar",
    rating: 4.6,
    salesCount: 310
  }
];


export const featuredProducts = products;