"use client";
import { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import CategoryBar from '@/components/CategoryBar';
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  const params = useParams();
  const selectedSubCategoryId = params.id;
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("subCategoryId", "==", selectedSubCategoryId),
      where("status", "==", "approved") 
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Gelen Ürünler:", data); 
      setProducts(data);
      setLoading(false);
    }, (error) => {
      console.error("Firebase Hatası:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedSubCategoryId]);

  const filters = useMemo(() => ({
    brands: Array.from(new Set(products.map(p => p.brand).filter(Boolean))),
    colors: Array.from(new Set(products.map(p => p.color).filter(Boolean))),
    genders: ['Kadın', 'Erkek', 'Unisex']
  }), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const price = Number(p.price);
      const priceMatch = (minPrice === '' || price >= Number(minPrice)) && 
                         (maxPrice === '' || price <= Number(maxPrice));
      const colorMatch = selectedColors.length === 0 || selectedColors.includes(p.color);
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(p.gender);
      const ratingMatch = (p.rating || 0) >= minRating;
      const stockMatch = !onlyInStock || p.inStock;
      const discountMatch = !onlyDiscounted || (p.oldPrice && Number(p.oldPrice) > price);

      return priceMatch && colorMatch && brandMatch && genderMatch && ratingMatch && stockMatch && discountMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [products, minPrice, maxPrice, selectedColors, selectedBrands, selectedGenders, minRating, onlyInStock, onlyDiscounted, sortBy]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <span className="text-xs font-black uppercase tracking-widest text-slate-500">Ürünler Yükleniyor...</span>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-950 text-slate-200'>
      <CategoryBar />
      
      <div className='max-w-[1500px] mx-auto px-6 py-10'>
        <div className="mb-12 border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              {products.length > 0 ? products[0].category : "Koleksiyon"}
            </h1>
            <p className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase mt-4">
              Görüntülenen: {filteredProducts.length} Ürün
            </p>
          </div>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-2xl text-white outline-none focus:border-blue-500"
          >
            <option value="default">Sıralama: Önerilen</option>
            <option value="price-asc">Fiyat: Artan</option>
            <option value="price-desc">Fiyat: Azalan</option>
            <option value="rating">Puan: En Yüksek</option>
          </select>
        </div>

        <div className="flex flex-col lg:row lg:flex-row gap-12">
          <ProductFilters 
            filters={filters} 
            resetFilters={() => {
              setMinPrice(''); setMaxPrice(''); setSelectedColors([]); 
              setSelectedBrands([]); setSelectedGenders([]); setMinRating(0); 
              setOnlyInStock(false); setOnlyDiscounted(false);
            }}
            state={{ minPrice, maxPrice, selectedColors, selectedBrands, selectedGenders, minRating, onlyInStock, onlyDiscounted }}
            setState={{ setMinPrice, setMaxPrice, setSelectedColors, setSelectedBrands, setSelectedGenders, setMinRating, setOnlyInStock, setOnlyDiscounted }}
          />

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                {filteredProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Aradığınız kriterde ürün bulunamadı.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;