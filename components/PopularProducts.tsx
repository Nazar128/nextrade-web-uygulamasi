"use client";

import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Sparkles } from "lucide-react";

const PopularProducts = () => {
  
  const popularItems = products.filter(p => p.rating >= 4.7).slice(0, 4);

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">
             <span className="text-blue-600">Popüler</span> Ürünler 
          </h2>
        </div>
        <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors tracking-widest uppercase border-b border-white/5 pb-1">
          Hepsini Gör
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {popularItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;