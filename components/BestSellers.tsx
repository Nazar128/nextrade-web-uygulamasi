"use client";

import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { TrendingUp } from "lucide-react";

const BestSellers = () => {
  
  const bestSellers = [...products]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 4);

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-slate-300">
          <TrendingUp size={24} />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
          Çok <span className="text-slate-600">Satanlar</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;