export type SubCategory = {
  id: number;
  title: string;
};

export type Category = {
  id: number;
  title: string;
  subCategories: SubCategory[];
};

export const Categories: Category[] = [
  {
    id: 1,
    title: "Kadın",
    subCategories: [
      { id: 101, title: "Elbise" },
      { id: 102, title: "Tişört & Top" },
      { id: 103, title: "Jean" },
      { id: 104, title: "Dış Giyim" },
    ],
  },
  {
    id: 2,
    title: "Erkek",
    subCategories: [
      { id: 201, title: "Gömlek" },
      { id: 202, title: "Tişört" },
      { id: 203, title: "Pantolon" },
      { id: 204, title: "Sweatshirt" },
    ],
  },
  {
    id: 3,
    title: "Anne & Çocuk",
    subCategories: [
      { id: 301, title: "Bebek Giyim" },
      { id: 302, title: "Oyuncak" },
      { id: 303, title: "Bebek Bakım" },
      { id: 304, title: "Çocuk Ayakkabı" },
    ],
  },
  {
    id: 4,
    title: "Ev & Yaşam",
    subCategories: [
      { id: 401, title: "Ev Tekstili" },
      { id: 402, title: "Dekorasyon" },
      { id: 403, title: "Mutfak Gereçleri" },
      { id: 404, title: "Aydınlatma" },
    ],
  },
  {
    id: 5,
    title: "Süpermarket",
    subCategories: [
      { id: 501, title: "Gıda" },
      { id: 502, title: "Temizlik" },
      { id: 503, title: "Kişisel Bakım" },
      { id: 504, title: "Atıştırmalık" },
    ],
  },
  {
    id: 6,
    title: "Kozmetik & Bakım",
    subCategories: [
      { id: 601, title: "Parfüm" },
      { id: 602, title: "Cilt Bakımı" },
      { id: 603, title: "Makyaj" },
      { id: 604, title: "Saç Bakımı" },
    ],
  },
  {
    id: 7,
    title: "Ayakkabı & Çanta",
    subCategories: [
      { id: 701, title: "Sneaker" },
      { id: 702, title: "Topuklu Ayakkabı" },
      { id: 703, title: "Sırt Çantası" },
      { id: 704, title: "Kol Çantası" },
    ],
  },
  {
    id: 8,
    title: "Giyim",
    subCategories: [
      { id: 801, title: "İç Giyim" },
      { id: 802, title: "Plaj Giyimi" },
      { id: 803, title: "Spor Giyim" },
      { id: 804, title: "Triko" },
    ],
  },
  {
    id: 9,
    title: "Elektronik",
    subCategories: [
      { id: 901, title: "Telefon & Aksesuar" },
      { id: 902, title: "Bilgisayar" },
      { id: 903, title: "Küçük Ev Aletleri" },
      { id: 904, title: "Giyilebilir Teknoloji" },
    ],
  },
  {
    id: 10,
    title: "Outlet",
    subCategories: [
      { id: 1001, title: "Sezon Sonu" },
      { id: 1002, title: "Fırsat Ürünleri" },
      { id: 1003, title: "Tek Bedenler" },
    ],
  },
  {
    id: 11,
    title: "Saat & Aksesuar",
    subCategories: [
      { id: 1101, title: "Kol Saati" },
      { id: 1102, title: "Güneş Gözlüğü" },
      { id: 1103, title: "Takı & Mücevher" },
      { id: 1104, title: "Cüzdan & Kartlık" },
    ],
  },
  {
    id: 12,
    title: "Spor & Outdoor",
    subCategories: [
      { id: 1201, title: "Fitness & Kondisyon" },
      { id: 1202, title: "Kamp Malzemeleri" },
      { id: 1203, title: "Outdoor Giyim" },
      { id: 1204, title: "Spor Ekipmanları" },
    ],
  },
];