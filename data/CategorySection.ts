export type Category = {
  id: number;
  title: string;
  image: string;
  bgColor: string;
};

export const categoryData: Category[] = [
  
  { id: 1, title: "Kozmetik", image: "/kozmetik-.png", bgColor: "bg-purple-50" },
  { id: 2, title: "Elektronik", image: "/kulaklik-.png", bgColor: "bg-blue-50" },
  { id: 3, title: "Ayakkabı", image: "/ayakkabi-.png", bgColor: "bg-pink-50" },
  { id: 4, title: "Ev & Yaşam", image: "/evyasam-.png", bgColor: "bg-green-50" },

  
];
