import { MetadataRoute } from 'next';
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "";

  const productsSnap = await getDocs(collection(db, "products"));
  const productEntries = productsSnap.docs.map((doc) => ({
    url: `${baseUrl}/routes/product/${doc.data().slug || doc.id}`,
    lastModified: new Date(doc.data().updatedAt?.seconds * 1000 || new Date()),
    priority: 0.9,
  }));
  const categoriesSnap = await getDocs(collection(db, "categories"));
  const categoryEntries = categoriesSnap.docs.map((doc) => ({
    url: `${baseUrl}/routes/category/${doc.data().title.toLowerCase()}`,
    lastModified: new Date(),
    priority: 0.8,
  }));
  const brandsSnap = await getDocs(collection(db, "brands"));
  const brandEntries = brandsSnap.docs.map((doc) => ({
    url: `${baseUrl}/routes/store/${doc.data().name.toLowerCase()}`,
    lastModified: new Date(),
    priority: 0.7,
  }));
  const staticPages = [
    "",
    "/routes/about",
    "/routes/contact",
    "/routes/support",
    "/routes/search",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    priority: route === "" ? 1.0 : 0.5,
  }));

  return [...staticPages, ...productEntries, ...categoryEntries, ...brandEntries];
}