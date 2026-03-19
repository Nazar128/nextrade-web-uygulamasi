"use client";
import React, { useState, useEffect } from 'react';
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { useParams } from 'next/navigation';
import { Store, Loader2, ArrowLeft, ShieldCheck, Mail, Calendar, Star, Package, Award, UserPlus, UserMinus, Users } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChanged } from "firebase/auth";

export default function StoreProfilePage() {
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!id) return;
    const storeRef = doc(db, "users", id as string);
    const unsubscribe = onSnapshot(storeRef, (doc) => {
      if (doc.exists()) {
        setSeller(doc.data());
      }
    });
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (!id || !currentUser) return;
    const checkFollowStatus = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const followedStores = userSnap.data().followedStores || [];
        setIsFollowing(followedStores.includes(id));
      }
    };
    checkFollowStatus();
  }, [id, currentUser]);

  useEffect(() => {
    if (!id) return;
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("sellerId", "==", String(id)));
        const pSnap = await getDocs(q);
        const allProducts = pSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setProducts(allProducts.filter((p: any) => p.status === "approved"));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  const handleFollowToggle = async () => {
    if (!currentUser || !id || followLoading) return;
    setFollowLoading(true);

    const userRef = doc(db, "users", currentUser.uid);
    const storeRef = doc(db, "users", id as string);

    try {
      if (isFollowing) {
        await updateDoc(userRef, { followedStores: arrayRemove(id) });
        await updateDoc(storeRef, { followers: arrayRemove(currentUser.uid) });
        setIsFollowing(false);
      } else {
        await updateDoc(userRef, { followedStores: arrayUnion(id) });
        await updateDoc(storeRef, { followers: arrayUnion(currentUser.uid) });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <Loader2 className="animate-spin text-white/20" size={32} />
    </div>
  );

  if (!seller) return (
    <div className="min-h-screen  flex items-center justify-center text-white/30 tracking-widest uppercase text-xs">
      Mağaza bulunamadı
    </div>
  );

  return (
    <div className="min-h-screen  text-white selection:bg-blue-500/30 mt-20 relative overflow-x-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.05] bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto h-20 flex items-center justify-between px-8">
          <Link href="/" className="flex items-center gap-3 group text-white/40 hover:text-white transition-all duration-300">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Geri Dön</span>
          </Link>
          <div className="text-[10px] tracking-[0.5em] text-white/10 uppercase font-black">Store Profile</div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto pt-44 pb-32 px-8 relative z-10">
        <section className="flex flex-col items-center text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mb-8 p-1.5 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl"
          >
            <div className="w-40 h-40 rounded-[2.2rem] bg-gray-900 overflow-hidden border border-white/10 relative">
              {seller.photoURL ? (
                <img src={seller.photoURL} alt={seller.displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <Store className="text-white/5" size={64} />
                </div>
              )}
            </div>
            {seller.status === "Aktif" && (
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2.5 rounded-2xl shadow-xl border-4 border-gray-950">
                <ShieldCheck size={20} />
              </div>
            )}
          </motion.div>

          <h1 className="text-5xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            {seller.displayName}
          </h1>

          <div className="mb-8">
            <button
              onClick={handleFollowToggle}
              disabled={followLoading || !currentUser}
              className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-500 border
                ${isFollowing 
                  ? "bg-white/5 border-white/10 text-white/50 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500" 
                  : "bg-blue-600 border-blue-500 text-white hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                } ${(!currentUser || followLoading) && "opacity-50 cursor-not-allowed"}`}
            >
              {followLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : isFollowing ? (
                <><UserMinus size={16} /> Takibi Bırak</>
              ) : (
                <><UserPlus size={16} /> Mağazayı Takip Et</>
              )}
            </button>
          </div>

          <p className="text-white/40 text-base max-w-2xl leading-relaxed mb-8">
            {seller.description || "Doğrulanmış NexTrade satıcısı."}
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold uppercase tracking-widest text-white/30">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md">
              <Mail size={14} className="text-blue-500" /> {seller.email}
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md">
              <Calendar size={14} className="text-blue-500" /> 2024'ten beri üye
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 mb-20 max-w-4xl mx-auto">
          {[
            { icon: <Package size={20}/>, label: "Aktif Envanter", value: `${products.length} Ürün` },
            { icon: <Star size={20}/>, label: "Mağaza Puanı", value: "4.9 / 5.0" },
            { icon: <Users size={20}/>, label: "Takipçi Sayısı", value: seller.followers?.length || 0 }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl hover:bg-white/[0.04] transition-all duration-500 text-center relative overflow-hidden"
            >
              <div className="text-white/20 mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-black tracking-tight mb-1">{stat.value}</div>
              <div className="text-[9px] text-white/30 uppercase font-black tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </section>

        <section>
          <div className="flex items-center justify-between mt-16 mb-16 pb-8 border-b border-white/[0.05]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/70">Koleksiyon</h2>
            </div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{products.length} Sonuç</span>
          </div>

          <AnimatePresence>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-4 gap-x-8 gap-y-16">
              {products.map((product, index) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}