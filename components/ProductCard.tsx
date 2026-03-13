"use client";
import React, { useState, useEffect } from "react"; 
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Check, ArrowRight, Heart } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion"; 
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ProductCard = ({ product }: { product: any }) => {
  const [showToast, setShowToast] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!currentUser || !product?.id) {
      setIsFavorite(false);
      return;
    }

    const productIdStr = String(product.id);
    const favRef = doc(db, "users", currentUser.uid, "favorites", productIdStr);
    
    const unsubscribe = onSnapshot(favRef, (docSnap) => {
      setIsFavorite(docSnap.exists());
    }, (err) => console.error("Firestore Hatası:", err));
    
    return () => unsubscribe();
  }, [currentUser, product?.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      alert("Lütfen önce giriş yapın.");
      return;
    }

    const productIdStr = String(product.id);
    const favRef = doc(db, "users", currentUser.uid, "favorites", productIdStr);

    try {
      if (isFavorite) {
        await deleteDoc(favRef);
      } else {
        await setDoc(favRef, {
          productId: productIdStr,
          productTitle: product.title || "İsimsiz Ürün",
          price: product.price || 0,
          imageUrl: product.imageUrl || product.image || "/placeholder-product.png",
          sellerId: product.sellerId || "unknown",
          sellerName: product.sellerName || "NexTrade Mağaza",
          addedAt: new Date().toISOString(),
          category: product.category || "Genel"
        });
      }
    } catch (error) {
      console.error("Favori işlemi hatası:", error);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = existingCart.findIndex((item: any) => String(item.id) === String(product.id));

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({
        id: String(product.id),
        title: product.title,
        price: Number(product.price),
        image: product.imageUrl || product.image || "/placeholder-product.png",
        brand: product.brand || "Marka",
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (!product) return null;

  return (
    <div className="group relative bg-white/[0.05] backdrop-blur-sm rounded-[2.5rem] p-4 transition-all duration-500 border border-white/5 hover:border-blue-500/30 hover:-translate-y-2 block">
      
      <button 
        onClick={toggleFavorite}
        className="absolute top-6 right-6 z-10 p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-110 active:scale-90"
      >
        <motion.div
          animate={{ 
            scale: isFavorite ? [1, 1.5, 1.2] : 1,
            color: isFavorite ? "#ef4444" : "#ffffff"
          }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <Heart 
            size={20} 
            fill={isFavorite ? "currentColor" : "none"} 
            strokeWidth={isFavorite ? 0 : 2}
          />
        </motion.div>
      </button>

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
          <Image 
            src={product.imageUrl || product.image || "/placeholder-product.png"} 
            alt={product.title || "Ürün"} 
            fill 
            className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
          />
        </div>

        <div className="px-2 text-left">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] text-blue-500 uppercase tracking-[0.25em] font-black">{product.brand || "Marka"}</p>
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
          ₺{Number(product.price || 0).toLocaleString('tr-TR')}
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