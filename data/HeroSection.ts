type HeroSectionProps = {
    id: number,
    title: string,
    description: string,
    image: string,
    discount: string,
    buttonText: string,
    buttonLink: string,
  }
  
  export const heroSectionData: HeroSectionProps[] = [
    {
      id: 1,
      title: "Yeni Sezon Giyim Koleksiyonu",
      description: "Tarzını yenile! En trend parçalar ve sezonun öne çıkan ürünleri şimdi seni bekliyor.",
      image: "/clothes_herosection.jpg",
      discount: "%30",
      buttonText: "Alışverişe Başla",
      buttonLink: "/products",
    },
    {
      id: 2,
      title: "Konforlu ve Şık Ayakkabılar",
      description: "Gün boyu rahatlık ve modern tasarım bir arada. Yeni sezon ayakkabıları keşfet.",
      image: "/shoes_herosection.jpg",
      discount: "%25",
      buttonText: "Hemen İncele",
      buttonLink: "/products",
    },
    {
      id: 3,
      title: "Teknolojide Süper Fırsatlar",
      description: "En yeni teknolojik ürünlerde kaçırılmayacak indirimler seni bekliyor.",
      image: "/technology_herosection.jpg",
      discount: "%20",
      buttonText: "Fırsatları Gör",
      buttonLink: "/products",
    },
    {
      id: 4,
      title: "Ev & Mutfak Ürünlerinde İndirim",
      description: "Evin için şık ve kullanışlı ürünleri avantajlı fiyatlarla şimdi satın al.",
      image: "/plates_herosection.jpg",
      discount: "%35",
      buttonText: "Keşfet",
      buttonLink: "/products",
    },
  ]
  