"use client";
import React, { useState, useEffect } from 'react';
import { db, auth } from "@/lib/firebase";
import { collection, query, onSnapshot, updateDoc, doc, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { 
  Package, Truck, CheckCircle2, Clock, 
  ChevronRight, X, User, MapPin, 
  Loader2, ShoppingBag 
} from 'lucide-react';

export default function SellerOrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
          const allOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          const sellerOrders = allOrders.filter((order: any) => 
            order.items?.some((item: any) => 
              item.sellerId === user.uid || 
              item.sellerName === "NexTrade Mağaza" ||
              item.brand === "Ray-Ban"
            )
          );
          
          setOrders(sellerOrders);
          setLoading(false);
        }, (err) => {
          setLoading(false);
        });
        return () => unsubscribeFirestore();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      setSelectedOrder(null);
    } catch (error) {
      console.error(error);
    }
  };

  const statusMap: any = {
    pending: { label: "BEKLEMEDE", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
    shipped: { label: "KARGODA", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
    delivered: { label: "TESLİM EDİLDİ", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="w-full space-y-10 pb-20 px-4 font-sans antialiased">
      <div className="space-y-2">
        <p className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">SATIŞ YÖNETİMİ</p>
        <h1 className="text-3xl  font-bold text-slate-400 tracking-tight leading-none ">
          GELEN <span className='text-4xl text-blue-600'>SİPARİŞLER</span>
        </h1>
      </div>

      <div className="grid gap-6">
        {orders.length === 0 ? (
          <div className="p-20 border-2 border-dashed border-white/5 rounded-[3rem] text-center">
            <p className="text-gray-500 font-bold uppercase tracking-widest italic">HENÜZ SİPARİŞ ALINMADI</p>
            <p className="text-[10px] text-blue-500/50 mt-4 font-mono">Giriş Yapılan ID: {auth.currentUser?.uid}</p>
          </div>
        ) : (
          orders.map((order) => {
            const status = statusMap[order.status] || statusMap.pending;
            return (
              <div 
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="group relative bg-white/[0.02] border border-white/5 hover:border-blue-500/30 rounded-[2.5rem] p-8 transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl"
              >
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110 ${status.bg} ${status.border} ${status.color}`}>
                      <ShoppingBag size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight italic">#{order.orderId}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-0.5 rounded-lg text-[10px] font-black border ${status.bg} ${status.border} ${status.color}`}>
                          {status.label}
                        </span>
                        <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                          {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('tr-TR') : 'YENİ'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-12">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">ALICI</p>
                      <p className="text-sm font-bold text-gray-200 uppercase tracking-tighter">{order.address?.fullName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">KAZANÇ</p>
                      <p className="text-lg font-black text-white">{order.totalAmount?.toLocaleString('tr-TR')} TL</p>
                    </div>
                    <ChevronRight size={24} className="text-gray-700 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-3xl bg-[#0c0d10] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">SİPARİŞ YÖNETİMİ</h2>
                <p className="text-blue-500 font-mono text-sm tracking-widest">#{selectedOrder.orderId}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-4 hover:bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all">
                <X size={28} />
              </button>
            </div>

            <div className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => updateStatus(selectedOrder.id, 'pending')} className={`p-6 rounded-3xl border flex flex-col items-center gap-3 transition-all ${selectedOrder.status === 'pending' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}>
                  <Clock size={24} /> <span className="text-[10px] font-black uppercase tracking-widest">HAZIRLANIYOR</span>
                </button>
                <button onClick={() => updateStatus(selectedOrder.id, 'shipped')} className={`p-6 rounded-3xl border flex flex-col items-center gap-3 transition-all ${selectedOrder.status === 'shipped' ? 'bg-blue-500/20 border-blue-500 text-blue-500' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}>
                  <Truck size={24} /> <span className="text-[10px] font-black uppercase tracking-widest">KARGOYA VER</span>
                </button>
                <button onClick={() => updateStatus(selectedOrder.id, 'delivered')} className={`p-6 rounded-3xl border flex flex-col items-center gap-3 transition-all ${selectedOrder.status === 'delivered' ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}>
                  <CheckCircle2 size={24} /> <span className="text-[10px] font-black uppercase tracking-widest">TESLİM EDİLDİ</span>
                </button>
              </div>

              <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <User size={20} className="text-blue-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-white tracking-widest">MÜŞTERİ AYRINTILARI</span>
                </div>
                <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-400">
                  <div className="space-y-2">
                    <p className="text-white font-bold text-lg leading-tight uppercase tracking-tighter">{selectedOrder.address?.fullName}</p>
                    <p className="font-medium text-blue-500/70 font-mono tracking-tighter">{selectedOrder.address?.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="leading-relaxed italic">{selectedOrder.address?.address}</p>
                    <p className="text-white font-black uppercase text-xs">{selectedOrder.address?.district} / {selectedOrder.address?.city}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/[0.02] border-t border-white/5">
              <button onClick={() => setSelectedOrder(null)} className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all">
                PANELİ KAPAT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}