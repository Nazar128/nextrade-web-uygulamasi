"use client";

import { useEffect, useState } from "react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { History, Trash2 } from "lucide-react";

const RecentlyViewed = () => {
  const [recentItems, setRecentItems] = useState<Product[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("recentlyViewed");
    if (data) {
      setRecentItems(JSON.parse(data));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("recentlyViewed");
    setRecentItems([]);
  };

  if (recentItems.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
              <div className="relative p-4 bg-white/[0.03] border border-white/10 rounded-[2rem] text-blue-500 backdrop-blur-md">
                <History size={32} strokeWidth={1.5} />
              </div>
            </div>
            
            <div>
              <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2">
                Kişisel Geçmişin
              </p>
              <h2 className="text-4xl md:text-3xl font-black text-slate-800  tracking-tighter uppercase leading-none">
                Son <span className="text-blue-800 ">Baktıkların</span>
              </h2>
            </div>
          </div>

          <button 
            onClick={clearHistory}
            className="group flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-red-500 transition-all duration-300 uppercase tracking-[0.2em] bg-white/5 px-6 py-3 rounded-xl border border-white/5 hover:border-red-500/20"
          >
            <Trash2 size={14} className="group-hover:rotate-12 transition-transform" />
            Geçmişi Temizle
          </button>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {recentItems.slice(0, 4).map((product) => (
            <div key={`recent-${product.id}`} className="relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;