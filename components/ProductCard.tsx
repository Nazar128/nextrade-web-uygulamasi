"use client";

import Image from "next/image";
import { Product } from "@/data/featuredProducts";
import { ShoppingCart, Plus } from "lucide-react";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="group relative bg-white rounded-3xl p-3 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-gray-50">
      
     
      {product.isNew && (
        <span className="absolute top-5 left-5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10 shadow-lg">
          Yeni
        </span>
      )}

  
      <div className="relative h-72 w-full mb-4 overflow-hidden rounded-2xl">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

        <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white">
          <Plus size={20} />
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.15em] font-semibold mb-1">
              Koleksiyon
            </p>
            <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₺{product.oldPrice}
              </span>
            )}
            <span className="text-xl font-black text-slate-900">
              ₺{product.price}
            </span>
          </div>
          
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-600 transition-all active:scale-95 shadow-md">
            <ShoppingCart size={14} />
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;