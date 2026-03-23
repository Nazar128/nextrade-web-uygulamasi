"use client";

import React, { useState, useEffect } from "react";
import { Store, Clock, LayoutGrid, List as ListIcon, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { db, auth } from "@/lib/firebase"; 
import { collection, query, getDocs, where, orderBy, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  sellerName: string;
  sellerId: string;
  createdAt: any;
  slug: string;
}

interface FollowedStore {
  id: string;
  name: string;
  logo: string;
}

const FollowedStoresPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<FollowedStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchFollowedData(user.uid);
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchFollowedData = async (userId: string) => {
    setIsLoading(true);
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      const followedIds = userDoc.data()?.followedStores || [];

      if (followedIds.length === 0) {
        setProducts([]);
        setStores([]);
        setIsLoading(false);
        return;
      }

      const storesData: FollowedStore[] = [];
      for (const storeId of followedIds) {
        const sDoc = await getDoc(doc(db, "stores", storeId));
        if (sDoc.exists()) {
          storesData.push({ id: sDoc.id, ...sDoc.data() } as FollowedStore);
        }
      }
      setStores(storesData);

      const productsQuery = query(
        collection(db, "products"),
        where("sellerId", "in", followedIds),
        orderBy("createdAt", "desc")
      );

      const pSnapshot = await getDocs(productsQuery);
      const pData = pSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as Product[];
      
      setProducts(pData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-6 pt-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="p-5 rounded-[2rem] bg-blue-600 shadow-2xl shadow-blue-600/30">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-white">Takip Ettiklerim</h1>
              <p className="text-sm font-bold opacity-50 uppercase tracking-[0.2em] mt-1 text-white">Favori Mağazalar ve Yeni Ürünler</p>
            </div>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 self-start backdrop-blur-md">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl transition-all ${viewMode === "grid" ? "bg-blue-600 text-white shadow-xl" : "opacity-30 hover:opacity-100 text-white"}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition-all ${viewMode === "list" ? "bg-blue-600 text-white shadow-xl" : "opacity-30 hover:opacity-100 text-white"}`}
            >
              <ListIcon size={20} />
            </button>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] opacity-40 text-white">Takip Edilen Mağazalar</h2>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {stores.map(store => (
              <div key={store.id} className="group flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer">
                <div className="w-20 h-20 rounded-[2rem] bg-white/5 border-2 border-white/10 p-1 group-hover:border-blue-600 transition-all duration-500 overflow-hidden">
                  <img src={store.logo || "https://via.placeholder.com/100"} alt={store.name} className="w-full h-full object-cover rounded-[1.8rem]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity text-white">{store.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 text-white">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Clock size={18} className="text-blue-600" />
            <h2 className="text-xl font-black tracking-tight">Son Yüklenenler</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3].map(i => <div key={i} className="h-96 bg-white/5 rounded-[3rem]" />)}
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"}>
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className={`group relative bg-white/5 border border-white/10 transition-all duration-500 hover:border-blue-600/30 ${
                    viewMode === "grid" ? "rounded-[3rem] p-5" : "rounded-[2.5rem] p-6 flex flex-row gap-10 items-center"
                  }`}
                >
                  <div className={`relative overflow-hidden bg-white/5 ${
                    viewMode === "grid" ? "w-full aspect-[4/5] rounded-[2.5rem] mb-6" : "w-48 h-48 rounded-[2rem] flex-shrink-0"
                  }`}>
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-blue-600/90 text-[9px] text-white px-3 py-1.5 rounded-full font-black uppercase tracking-widest backdrop-blur-sm shadow-xl">Yeni Ürün</div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-lg bg-blue-600/10 flex items-center justify-center">
                        <Store size={12} className="text-blue-600" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600/80">{product.sellerName}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight mb-4 group-hover:text-blue-600 transition-colors">{product.title}</h3>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="space-y-1">
                        {product.oldPrice && <span className="text-xs opacity-30 line-through font-bold block">{product.oldPrice.toLocaleString()} TL</span>}
                        <span className="text-3xl font-black tracking-tighter">{product.price.toLocaleString()} <span className="text-sm font-bold opacity-50">TL</span></span>
                      </div>
                      <button className="relative p-5 bg-blue-600 rounded-[1.5rem] text-white shadow-2xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">
                        <ShoppingBag size={22} />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <ArrowRight size={10} className="text-blue-600" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && products.length === 0 && (
            <div className="text-center py-32 bg-white/[0.02] rounded-[4rem] border border-dashed border-white/10">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Store className="opacity-20 w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black opacity-60 tracking-tight text-white">Henüz bir paylaşım yok</h3>
              <p className="text-sm opacity-40 mt-3 font-medium max-w-xs mx-auto text-white">Takip ettiğin mağazalar ürün eklediğinde burada görebilirsin.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FollowedStoresPage;