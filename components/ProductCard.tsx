"use client";
import React, { useState } from "react"; 
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Check, ArrowRight } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion"; 

const ProductCard = ({ product }: { product: any }) => {
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = existingCart.findIndex((item: any) => item.id === product.id);

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        title: product.title || product.name,
        price: Number(product.price),
        image: product.imageUrl || product.image || "/placeholder-product.png",
        brand: product.brand || product.category,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const displayImage = product.imageUrl || product.image || "/placeholder-product.png";

  return (
    <div className="group relative bg-white/[0.05] backdrop-blur-sm rounded-[2.5rem] p-4 transition-all duration-500 border border-white/5 hover:border-blue-500/30 hover:-translate-y-2 block">
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-x-4 top-4 z-20 bg-gradient-to-r from-blue-800 via-indigo-300 to-gray-600 rounded-2xl p-3 shadow-2xl flex items-center justify-between border border-white/20"
          >
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1 rounded-full">
                <Check size={12} className="text-white" />
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Sepete Eklendi</span>
            </div>
            <Link 
              href="/routes/shoppingCart" 
              className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase flex items-center gap-1 hover:bg-blue-50 transition-colors"
            >
              GİT <ArrowRight size={10} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <Link href={`/routes/product/${product.id}`} className="cursor-pointer">
        <div className="relative h-72 w-full mb-5 overflow-hidden rounded-[2rem] bg-slate-900/40">
          <Image src={displayImage} alt={product.title} fill className="object-cover transform group-hover:scale-110 transition-transform duration-700" />
        </div>

        <div className="px-2 text-left">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] text-blue-500 uppercase tracking-[0.25em] font-black">{product.brand}</p>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={10} fill="currentColor" />
              <span className="text-[10px] font-bold text-slate-400">{product.rating || "5.0"}</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white h-12 line-clamp-2">{product.title}</h3>
        </div>
      </Link>

      <div className="flex items-center justify-between mt-6 px-2">
        <span className="text-2xl font-black text-white tracking-tighter">
          ₺{Number(product.price).toLocaleString('tr-TR')}
        </span>
        <button 
          onClick={handleAddToCart}
          className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all active:scale-95"
        >
          <ShoppingCart size={14} /> Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard;