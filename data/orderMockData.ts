
export const statsData = {
    Haftalık: [
      { label: "Sipariş Sayısı", value: "412", trend: "+12.5%", isUp: true, sub: "Geçen haftaya göre" },
      { label: "Ciro Hacmi", value: "340.000 TL", trend: "+8.2%", isUp: true, sub: "Geçen haftaya göre" },
      { label: "Ort. Sepet", value: "825 TL", trend: "-2.1%", isUp: false, sub: "Geçen haftaya göre" },
      { label: "Aktif Satıcı", value: "84", trend: "+4", isUp: true, sub: "Yeni katılanlar" },
    ],
    Aylık: [
      { label: "Sipariş Sayısı", value: "1,840", trend: "+24.1%", isUp: true, sub: "Geçen aya göre" },
      { label: "Ciro Hacmi", value: "1.2M TL", trend: "+18.5%", isUp: true, sub: "Geçen aya göre" },
      { label: "Ort. Sepet", value: "890 TL", trend: "+5.3%", isUp: true, sub: "Geçen aya göre" },
      { label: "Aktif Satıcı", value: "112", trend: "+12", isUp: true, sub: "Yeni katılanlar" },
    ],
    Yıllık: [
      { label: "Sipariş Sayısı", value: "22,150", trend: "+42.8%", isUp: true, sub: "2025 yılına göre" },
      { label: "Ciro Hacmi", value: "14.8M TL", trend: "+55.0%", isUp: true, sub: "2025 yılına göre" },
      { label: "Ort. Sepet", value: "740 TL", trend: "+12.1%", isUp: true, sub: "2025 yılına göre" },
      { label: "Aktif Satıcı", value: "245", trend: "+88", isUp: true, sub: "Yıllık büyüme" },
    ]
  };
  
  export const chartDataSets = {
    Haftalık: [
      { name: 'Pzt', sales: 4200 }, { name: 'Sal', sales: 3800 }, { name: 'Çar', sales: 6500 },
      { name: 'Per', sales: 4900 }, { name: 'Cum', sales: 7200 }, { name: 'Cmt', sales: 9800 }, { name: 'Paz', sales: 8400 }
    ],
    Aylık: [
      { name: '1. Hafta', sales: 42000 }, { name: '2. Hafta', sales: 55000 },
      { name: '3. Hafta', sales: 48000 }, { name: '4. Hafta', sales: 72000 }
    ],
    Yıllık: [
      { name: 'Oca', sales: 120000 }, { name: 'Mar', sales: 180000 }, { name: 'Haz', sales: 250000 },
      { name: 'Eyl', sales: 320000 }, { name: 'Ara', sales: 450000 }
    ]
  };

  export const mockOrders = [
    { 
      id: "ORD-9921", 
      customer: { name: "Ahmet Yılmaz", email: "ahmet@mail.com" }, 
      seller: "GigaTeknoloji", 
      product: "RTX 4080 Ekran Kartı", 
      amount: "42.500 TL", 
      status: "Kargoda" 
    },
    { 
      id: "ORD-9922", 
      customer: { name: "Ayşe Demir", email: "ayse@mail.com" }, 
      seller: "ModaButik", 
      product: "Keten Gömlek Seti", 
      amount: "1.250 TL", 
      status: "Hazırlanıyor" 
    },
    { 
      id: "ORD-9923", 
      customer: { name: "Mehmet Can", email: "mcan@mail.com" }, 
      seller: "EvimDekor", 
      product: "L Koltuk Takımı", 
      amount: "18.900 TL", 
      status: "Teslim Edildi" 
    },
    { 
      id: "ORD-9924", 
      customer: { name: "Canan Tekin", email: "ctekin@mail.com" }, 
      seller: "SporVizyon", 
      product: "Koşu Bandı Pro", 
      amount: "24.300 TL", 
      status: "İade" 
    }
  ];