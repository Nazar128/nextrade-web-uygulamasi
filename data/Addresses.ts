export type Address = {
    id: number;
    fullName: string;
    phone: string;
    email: string;
    title: string;
    city: string;
    district: string;
    neighborhood: string;
    fulladdress: string;
}


export const adresses: Address[] = [
    {
        id: 1,
        fullName: "Nazar kalçık",
        phone: "555 555 5555",
        email: "nazar@gmail.com",
        title: "Ev",
        city: "İstanbul",
        district: "Kadıköy",
        neighborhood: "Moda",
        fulladdress: "Caferağa Mah. Şair Nefi Sokak, No:12 Daire:4",
    },
    {
        id: 2,
        fullName: "Nazar kalçık",
        phone: "555 555 5555",
        email: "nazar@gmail.com",
        title: "İş",
        city: "Ankara",
        district: "Çankaya",
        neighborhood: "Kavaklıdere",
        fulladdress: "Tunalı Hilmi Cad. No:95, İş Merkezi Kat:3 No:302",
    },
    {
        id: 3,
        fullName: "Nazar kalçık",
        phone: "555 555 5555",
        email: "nazar@gmail.com",
        title: "Yurt",
        city: "Eskişehir",
        district: "Tepebaşı",
        neighborhood: "Yenibağlar",
        fulladdress: "Üniversite Cad. Kredi Yurtlar Kurumu B Blok No:405",
    },
    {
        id: 4,
        fullName: "Nazar kalçık",
        phone: "555 555 5555",
        email: "nazar@gmail.com",
        title: "Yazlık",
        city: "Muğla",
        district: "Bodrum",
        neighborhood: "Yalıkavak",
        fulladdress: "Geriş Mah. Erdem Sitesi No:15",
    }


]