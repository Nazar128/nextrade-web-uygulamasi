"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Sparkles, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";

const PopularProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("status", "==", "approved"),
          where("rating", ">=", 4.7),
          orderBy("rating", "desc"),
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Popular Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
             <span className="text-blue-600">Popüler</span> Ürünler 
          </h2>
        </div>
        <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors tracking-widest uppercase border-b border-white/5 pb-1">
          Hepsini Gör
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;