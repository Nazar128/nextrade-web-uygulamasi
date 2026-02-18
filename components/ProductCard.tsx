"use client";

import Image from "next/image";
import { Product } from "@/data/products";
import { ShoppingCart, Plus } from "lucide-react";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const addToRecent = () => {
  const existing = localStorage.getItem("recentlyViewed");
  let items: Product[] = existing ? JSON.parse(existing) : [];
  
  items = items.filter(i => i.id !== product.id);
  
  items.unshift(product);
  const updatedItems = items.slice(0, 4);
  
  localStorage.setItem("recentlyViewed", JSON.stringify(updatedItems));
};
  return (
    <div  onClick={addToRecent} className="group relative bg-white/[0.05] backdrop-blur-sm rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-white/[0.08] border border-white/5 hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      
      {product.isNew && (
        <span className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full z-20 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          Yeni
        </span>
      )}

      <div className="relative h-72 w-full mb-5 overflow-hidden rounded-[2rem] bg-slate-900/40">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <button className="absolute bottom-4 right-4 bg-white text-slate-900 p-3.5 rounded-2xl shadow-2xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white active:scale-90">
          <Plus size={22} />
        </button>
      </div>

      <div className="px-2 text-left">
        <p className="text-[10px] text-blue-500 uppercase tracking-[0.25em] font-black mb-2">
          {product.category}
        </p>
        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors h-12 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-slate-500 line-through">
                ₺{product.oldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-black text-white tracking-tighter">
              ₺{product.price.toLocaleString()}
            </span>
          </div>
          
          <button className="flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-2xl font-black text-[11px] uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all active:scale-95">
            <ShoppingCart size={15} />
            Sepet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;