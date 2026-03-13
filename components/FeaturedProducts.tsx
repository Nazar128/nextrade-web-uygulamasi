"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "@/components/ProductCard";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, limit, getDocs, orderBy } from "firebase/firestore";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: products.length > 4,
    dragFree: true,
  });

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("status", "==", "approved"),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Featured Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;

  return (
    <section className="max-w-[1440px] mx-auto py-20 px-6 md:px-8">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">Keşfetmeye Başla</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Öne Çıkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Ürünler</span>
          </h2>
        </div>

        <div className="flex gap-3 mb-1">
          <button onClick={scrollPrev} className="group w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white transition-all shadow-sm">
            <ChevronLeft className="text-white group-hover:text-slate-900" size={24} />
          </button>
          <button onClick={scrollNext} className="group w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white transition-all shadow-sm">
            <ChevronRight className="text-white group-hover:text-slate-900" size={24} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex -ml-6">
          {products.map((product) => (
            <div key={product.id} className="pl-6 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;