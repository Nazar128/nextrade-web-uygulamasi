"use client";

import Image from "next/image";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Product } from "@/data/products";

type Props = {
  product: Product;
  onRemove: (id: string | number) => void;
};

const FavoriteProductCard = ({ product, onRemove }: Props) => {
  return (
    <div className="group relative w-full pt-20 mb-4"> 
      <div className="relative bg-[#0a0f20]/80 backdrop-blur-3xl rounded-[2.5rem] px-5 pb-5 pt-28 border border-white/5 transition-all duration-500 hover:bg-[#0f172a] hover:border-pink-500/30 shadow-2xl">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 z-30">
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border-2 border-white/5 transform transition-all duration-700 group-hover:scale-105 group-hover:-rotate-2">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-4 bg-pink-600/20 blur-[45px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        <div className="relative z-10 text-center mb-5">
          <p className="text-[10px] text-pink-500 font-black uppercase tracking-[0.3em] mb-1">
            {product.category}
          </p>
          <h3 className="text-lg font-bold text-white leading-tight truncate px-1 group-hover:text-pink-100 transition-colors">
            {product.title}
          </h3>
          <div className="mt-2">
            <span className="text-2xl font-black text-white tracking-tighter">
              ₺{product.price.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="relative z-10 flex gap-2">
          <button className="flex-1 bg-white text-black h-12 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
            <ShoppingCart size={16} /> EKLE
          </button>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              onRemove(product.id);
            }}
            className="w-12 h-12 flex items-center justify-center bg-white/5 text-slate-400 rounded-2xl border border-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all group/trash"
          >
            <Trash2 size={18} className="group-hover/trash:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductCard;