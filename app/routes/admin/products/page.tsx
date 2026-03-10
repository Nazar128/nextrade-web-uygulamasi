"use client";

import React, { useEffect, useState } from "react";

import { Search, ShieldCheck } from "lucide-react";

import { db } from "@/lib/firebase"; 

import { AuditStats } from "@/components/AuditStats";

import { AuditRow } from "@/components/AuditRow";

import { ProductPreviewModal } from "@/components/ProductPreviewModal";

import { 

  onSnapshot, 

  collection, 

  query, 

  where, 

  doc, 

  updateDoc 

} from "firebase/firestore";



export default function ProductAuditPage() {

  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);



  useEffect(() => {

    const q = query(

      collection(db, "products"),

      where("status", "==", "pending")

    );



    const unsubscribe = onSnapshot(q, (querySnapshot) => {

      const items: any[] = [];

      querySnapshot.forEach((doc) => {

        items.push({ id: doc.id, ...doc.data() });

      });

      setProducts(items);

      setLoading(false);

    });



    return () => unsubscribe();

  }, []);



  const handleApprove = async (productId: string) => {

    try {

      const productRef = doc(db, "products", productId);

      await updateDoc(productRef, {

        status: "approved",

        approvedAt: new Date().toISOString()

      });

      setIsModalOpen(false);

    } catch (error) {

      console.error("Onay hatası:", error);

    }

  };



  const handleReject = async (productId: string) => {

    try {

      const productRef = doc(db, "products", productId);

      await updateDoc(productRef, {

        status: "rejected",

        rejectedAt: new Date().toISOString()

      });

      setIsModalOpen(false);

    } catch (error) {

      console.error("Red hatası:", error);

    }

  };


  return (
    <div className="mx-auto px-4 lg:max-w-6xl md:px-8 py-6 md:py-12 space-y-8 md:space-y-12 min-h-screen text-slate-300 antialiased">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 tracking-tight leading-none">
            ÜRÜN<span className="text-slate-600 text-2xl md:text-3xl font-medium"> DENETİMİ</span>
          </h1>
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 font-medium italic">
            <ShieldCheck size={14} className="text-blue-500 shrink-0" />
            <span>Mağaza ürünleri onay kuyruğunda.</span>
          </div>
        </div>
        
        <div className="inline-flex bg-slate-900/40 p-1 rounded-full border border-slate-800 shadow-inner">
          <div className="px-4 py-1.5 text-[10px] md:text-[11px] font-bold text-white uppercase tracking-widest">
            {products.length} Bekleyen İstek
          </div>
        </div>
      </header>

      <AuditStats count={products.length} />
      <div className="space-y-6 rounded-2xl md:rounded-[32px] p-4 md:p-8 bg-slate-900/40 border border-slate-800/50 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
          <h3 className="text-xs md:text-sm font-medium text-white uppercase tracking-widest">Onay Kuyruğu</h3>
          
          <div className="relative group w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-600" />
            <input 
              type="text" 
              placeholder="Ürün veya Mağaza Ara..." 
              className="bg-slate-950/50 border border-slate-800 md:border-none rounded-xl text-xs pl-9 pr-4 py-2.5 focus:ring-1 focus:ring-blue-600 outline-none w-full md:w-48 md:transition-all md:focus:w-64" 
            />
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="hidden md:table-header-group text-[10px] text-slate-600 uppercase tracking-[0.2em] border-b border-slate-900/50">
              <tr>
                <th className="pb-4 px-4 font-medium">Ürün Detayı</th>
                <th className="pb-4 px-4 font-medium">Satıcı</th>
                <th className="pb-4 px-4 font-medium">Kategori</th>
                <th className="pb-4 px-4 font-medium">Fiyat</th>
                <th className="pb-4 px-4 text-right font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {products.map((product) => (
                <AuditRow 
                  key={product.id} 
                  product={product} 
                  onPreview={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                  onReject={handleReject}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductPreviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
        onApprove={handleApprove}
        onReject={handleReject}   
      />
    </div>
  );
}