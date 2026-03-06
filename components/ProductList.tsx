"use client";
import React, { useState, useEffect } from 'react';
import { Edit3, Trash2, Eye, AlertTriangle, Package } from 'lucide-react';
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { saveLog } from "@/lib/logger";

interface ProductListProps {
  onEdit: (product: any) => void;
}

export default function ProductList({ onEdit }: ProductListProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (productId: string) => {
    if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "products", productId));
        await saveLog('DELETE_PRODUCT', `Ürün silindi: ${productId}`);
      } catch (err) { console.error(err); }
    }
  };

  if (loading) return <div className="p-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div></div>;

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-[2rem] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/80">
              <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500">Ürün Detayı</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 text-center">Fiyat</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 text-center">Stok</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase text-gray-500 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {products.map((product) => (
              <tr key={product.id} className="group hover:bg-indigo-500/5 transition-all">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img src={product.imageUrl} className="w-12 h-12 rounded-xl object-cover border border-gray-800" />
                    <div>
                      <p className="font-bold text-gray-200">{product.title}</p>
                      <p className="text-[10px] text-indigo-500 font-bold uppercase">{product.status === 'pending' ? '⏳ Beklemede' : '✅ Yayında'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center font-bold text-indigo-400 italic">{product.price} ₺</td>
                <td className="px-6 py-5 text-center">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black ${product.stock < 5 ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    {product.stock} ADET
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(product)} className="p-2.5 bg-gray-800 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-xl transition-all"><Edit3 size={18} /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-2.5 bg-gray-800 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}