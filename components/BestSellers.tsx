"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { TrendingUp, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";

const BestSellers = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("status", "==", "approved"),
          orderBy("salesCount", "desc"),
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("BestSellers Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-emerald-500" size={40} /></div>;

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
          <TrendingUp size={24} />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
          Çok <span className="text-slate-600">Satanlar</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;