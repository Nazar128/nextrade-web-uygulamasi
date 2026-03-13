"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  product: any;
  onRemove: (id: string | number) => void;
};

const FavoriteProductCard = ({ product, onRemove }: Props) => {
  const [showToast, setShowToast] = useState(false);
  
  const displayImage = product.imageUrl || product.image || "/placeholder-product.png";
  const displayTitle = product.productTitle || product.title || "İsimsiz Ürün";
  const productId = String(product.productId || product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = existingCart.findIndex((item: any) => String(item.id) === productId);

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({
        id: productId,
        title: displayTitle,
        price: Number(product.price),
        image: displayImage,
        brand: product.brand || "Marka",
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="group relative w-full pt-20 mb-4 font-sans">
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-24 inset-x-0 z-[50] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-between border border-white/20 mx-2"
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

      <Link href={`/routes/product/${productId}`} className="block">
        <div className="relative bg-[#0a0f20]/80 backdrop-blur-3xl rounded-[2.5rem] px-5 pb-5 pt-28 border border-white/5 transition-all duration-500 hover:bg-[#0f172a] hover:border-pink-500/30 shadow-2xl">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 z-30">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border-2 border-white/5 transform transition-all duration-700 group-hover:scale-105 group-hover:-rotate-2">
              <Image
                src={displayImage}
                alt={displayTitle}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-4 bg-pink-600/20 blur-[45px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          <div className="relative z-10 text-center mb-5">
            <p className="text-[10px] text-pink-500 font-black uppercase tracking-[0.3em] mb-1">
              {product.category || "Genel"}
            </p>
            <h3 className="text-lg font-bold text-white leading-tight truncate px-1 group-hover:text-pink-100 transition-colors">
              {displayTitle}
            </h3>
            <div className="mt-2">
              <span className="text-2xl font-black text-white tracking-tighter italic">
                ₺{Number(product.price).toLocaleString('tr-TR')}
              </span>
            </div>
          </div>

          <div className="relative z-20 flex gap-2">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white text-black h-12 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingCart size={16} /> EKLE
            </button>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove(product.id);
              }}
              className="w-12 h-12 flex items-center justify-center bg-white/5 text-slate-400 rounded-2xl border border-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all group/trash"
            >
              <Trash2 size={18} className="group-hover/trash:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FavoriteProductCard;