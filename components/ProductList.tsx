"use client";
import React, { useState, useEffect } from 'react';
import { Edit3, Trash2, MessageSquare, X, Star, CheckCircle2, Calendar, Image as ImageIcon } from 'lucide-react';
import { collection, query, where, onSnapshot, deleteDoc, doc, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { saveLog } from "@/lib/logger";

interface ProductListProps {
  onEdit: (product: any) => void;
}

export default function ProductList({ onEdit }: ProductListProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productReviews, setProductReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "products"), where("sellerId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openReviews = async (product: any) => {
    setSelectedProduct(product);
    setLoadingReviews(true);
    try {
      const q = query(
        collection(db, "reviews"), 
        where("productId", "==", String(product.id)),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setProductReviews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "products", productId));
        await saveLog('DELETE_PRODUCT', `Ürün silindi: ${productId}`);
      } catch (err) { console.error(err); }
    }
  };

  const maskName = (name: string) => {
    if (!name || name === "Müşteri") return "M*****";
    const parts = name.trim().split(" ");
    return parts.map(p => p[0] + "*".repeat(Math.max(2, p.length - 1))).join(" ");
  };

  if (loading) return <div className="p-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div></div>;

  return (
    <div className="relative">
      <div className="bg-gray-900/40 border border-white/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-950/50">
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500">Ürün Portföyü</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500 text-center">Birim Fiyat</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500 text-center">Stok Durumu</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500 text-right">Yönetim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <img src={product.imageUrl} className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/10 shadow-lg" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 bg-emerald-500" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-100 text-base mb-1 tracking-tight">{product.title}</p>
                        <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'pending' ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                {product.status === 'pending' ? 'İnceleme Altında' : 'Satışa Açık'}
                            </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-lg font-black text-white">{product.price} <span className="text-indigo-500 text-xs">₺</span></span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex flex-col items-center">
                        <span className={`text-xs font-black mb-1 ${product.stock < 5 ? 'text-amber-500' : 'text-emerald-500'}`}>
                            {product.stock} Adet
                        </span>
                        <div className="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${product.stock < 5 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => openReviews(product)} className="w-10 h-10 flex items-center justify-center bg-gray-800/50 hover:bg-amber-500/20 text-amber-500 rounded-xl border border-white/5 transition-all active:scale-95"><MessageSquare size={18} /></button>
                      <button onClick={() => onEdit(product)} className="w-10 h-10 flex items-center justify-center bg-gray-800/50 hover:bg-indigo-500/20 text-indigo-400 rounded-xl border border-white/5 transition-all active:scale-95"><Edit3 size={18} /></button>
                      <button onClick={() => handleDelete(product.id)} className="w-10 h-10 flex items-center justify-center bg-gray-800/50 hover:bg-red-500/20 text-red-400 rounded-xl border border-white/5 transition-all active:scale-95"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-950/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-gray-900 border border-white/10 w-full max-w-3xl rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]">
            <div className="px-8 py-7 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <MessageSquare className="text-amber-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Müşteri Deneyimleri</h3>
                  <p className="text-xs text-gray-500 font-medium">"{selectedProduct.title}" ürünü için gelen tüm geri bildirimler</p>
                </div>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-full text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 max-h-[65vh] overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
              {loadingReviews ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Yorumlar Getiriliyor</p>
                </div>
              ) : productReviews.length === 0 ? (
                <div className="text-center py-20 bg-white/[0.02] rounded-[2rem] border border-dashed border-white/5">
                  <p className="text-gray-500 text-sm italic font-medium">Bu ürün henüz bir kullanıcı tarafından değerlendirilmemiş.</p>
                </div>
              ) : (
                productReviews.map((rev) => (
                  <div key={rev.id} className="relative group bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.05] transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-400 flex items-center justify-center text-white font-black text-xs">
                            {rev.userName?.charAt(0) || "M"}
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-sm font-bold text-gray-200">{maskName(rev.userName)}</span>
                                <CheckCircle2 size={14} className="text-blue-500" />
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} className={i < rev.rating ? "fill-amber-500 text-amber-500" : "text-gray-700"} />
                                ))}
                            </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{rev.date}</span>
                      </div>
                    </div>
                    
                    <div className="relative pl-4 border-l-2 border-indigo-500/30">
                        <p className="text-gray-300 text-[13px] leading-relaxed italic font-medium">
                            "{rev.comment}"
                        </p>
                    </div>

                    {rev.reviewImage && (
                      <div className="mt-5 relative inline-block group/img">
                        <img 
                          src={rev.reviewImage} 
                          className="w-32 h-32 object-cover rounded-2xl ring-1 ring-white/10 shadow-xl group-hover/img:scale-105 transition-transform duration-500 cursor-zoom-in" 
                          onClick={() => window.open(rev.reviewImage, '_blank')}
                        />
                        <div className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <ImageIcon size={14} />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            <div className="px-8 py-6 bg-gray-950/40 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase text-gray-600 tracking-widest">
                <span>Nextrade Seller Insights</span>
                <span>Toplam {productReviews.length} Değerlendirme</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}