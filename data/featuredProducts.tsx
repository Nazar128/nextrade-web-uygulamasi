export type Product = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
};

export const featuredProducts: Product[] = [
  {
    id: 1,
    title: "Kablosuz Kulaklık",
    price: 1299,
    oldPrice: 1599,
    image: "/KablosuzKulaklik.jpg",
    isNew: true,
  },
  {
    id: 2,
    title: "Kol Saati",
    price: 2199,
    image: "/kolsaati.jpg",
  },
  {
    id: 3,
    title: "Spor Ayakkabı",
    price: 1899,
    oldPrice: 2399,
    image: "/sporaykkabi.jpg",
  },
  {
    id: 4,
    title: "Laptop Çantası",
    price: 799,
    image: "/laptopcantasi.jpg",
  },
 
  {
    id: 5,
    title: "Güneş Gözlüğü",
    price: 499,
    image: "/GüneşGözlüğü.jpg",
  },
];
