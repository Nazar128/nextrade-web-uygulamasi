"use client";
import Image from "next/image";
import { ShoppingCart, Plus, Star } from "lucide-react";

const ProductCard = ({ product }: { product: any }) => {
  const addToRecent = () => {
    const existing = localStorage.getItem("recentlyViewed");
    let items: any[] = existing ? JSON.parse(existing) : [];
    items = items.filter(i => i.id !== product.id);
    items.unshift(product);
    localStorage.setItem("recentlyViewed", JSON.stringify(items.slice(0, 4)));
  };

  const displayImage = product.imageUrl || product.image || "/placeholder-product.png";

  return (
    <div onClick={addToRecent} className="group relative bg-white/[0.05] backdrop-blur-sm rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-white/[0.08] border border-white/5 hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer">
      
      {product.isNew && (
        <span className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full z-20">
          Yeni
        </span>
      )}

      <div className="relative h-72 w-full mb-5 overflow-hidden rounded-[2rem] bg-slate-900/40">
        <Image
          src={displayImage}
          alt={product.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <button className="absolute bottom-4 right-4 bg-white text-slate-900 p-3.5 rounded-2xl shadow-2xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white active:scale-90 z-30">
          <Plus size={22} />
        </button>
      </div>

      <div className="px-2 text-left">
        <div className="flex justify-between items-center mb-2">
           <p className="text-[10px] text-blue-500 uppercase tracking-[0.25em] font-black">
            {product.brand || product.category}
          </p>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={10} fill="currentColor" />
            <span className="text-[10px] font-bold text-slate-400">{product.rating || "5.0"}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors h-12 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-slate-500 line-through">
                ₺{Number(product.oldPrice).toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-black text-white tracking-tighter">
              ₺{Number(product.price).toLocaleString()}
            </span>
          </div>
          
          <button className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all active:scale-95">
            <ShoppingCart size={14} />
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;