"use client";
import React, { useState, useEffect } from 'react';
import { db, auth } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy, doc, deleteDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { 
  Package, ChevronRight, Clock, CheckCircle2, Truck, 
  Box, Search, Loader2, X, CreditCard, MapPin, RefreshCcw, Trash2 
} from 'lucide-react';
import ReturnManagement from "@/components/ReturnManagement";

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [returns, setReturns] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showReturnModal, setShowReturnModal] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const qOrders = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
          setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          setLoading(false);
        });

        const qReturns = query(
          collection(db, "returns"),
          where("customerId", "==", user.uid)
        );

        const unsubscribeReturns = onSnapshot(qReturns, (snapshot) => {
          setReturns(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
          unsubscribeOrders();
          unsubscribeReturns();
        };
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const handleCancelReturn = async (orderId: string) => {
    if (!window.confirm("İade talebini iptal etmek istediğinize emin misiniz?")) return;
    
    setIsDeleting(true);
    try {
      const returnDoc = returns.find(r => r.orderId === orderId);
      if (returnDoc) {
        await deleteDoc(doc(db, "returns", returnDoc.id));
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("İptal hatası:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'shipped':
        return { label: "Kargoda", theme: "cyan", icon: <Truck size={20} />, glow: "shadow-cyan-500/20" };
      case 'delivered':
        return { label: "Teslim Edildi", theme: "green", icon: <CheckCircle2 size={20} />, glow: "shadow-green-500/20" };
      case 'pending':
      default:
        return { label: "Hazırlanıyor", theme: "yellow", icon: <Clock size={20} />, glow: "shadow-yellow-500/20" };
    }
  };

  const themes: any = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    green: "text-green-400 bg-green-500/10 border-green-500/20",
    yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  };

  const filteredOrders = orders.filter(o => 
    o.orderId?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: any) => {
    if (!date) return "Tarih Belirsiz";
    const d = date?.seconds ? new Date(date.seconds * 1000) : new Date(date);
    return d.toLocaleDateString('tr-TR');
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 size={48} className="animate-spin text-cyan-500" />
      <span className="text-[10px] font-black tracking-[0.5em] text-white uppercase">YÜKLENİYOR</span>
    </div>
  );

  return (
    <div className="w-full space-y-10 pb-20 px-4 font-sans antialiased">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="space-y-2">
          <p className="text-cyan-500 text-xs font-black tracking-[0.4em] uppercase ml-1">HESABIM — İŞLEM GEÇMİŞİ</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none">
            Siparişlerim
          </h1>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input 
              placeholder="Sipariş ID ile ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-cyan-500/50 w-full md:w-80 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.length === 0 ? (
          <div className="p-20 border-2 border-dashed border-white/5 rounded-[3rem] text-center text-gray-500 font-bold uppercase tracking-widest text-sm">
            SİPARİŞ BULUNAMADI
          </div>
        ) : (
          filteredOrders.map((order) => {
            const config = getStatusConfig(order.status);
            return (
              <div 
                key={order.id}
                className={`group relative overflow-hidden rounded-[2.5rem] bg-[#0f1115] border border-white/5 hover:border-white/10 transition-all duration-500 p-1 shadow-2xl ${config.glow}`}
              >
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-6 md:p-8">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 shadow-lg ${themes[config.theme]}`}>
                      <Box size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-black text-white tracking-tight">#{order.orderId}</h3>
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${themes[config.theme]}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-tighter">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:flex md:items-center gap-8 md:gap-16 border-t border-white/5 lg:border-none pt-6 lg:pt-0">
                    <div className="space-y-1 text-center md:text-left">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">İÇERİK</p>
                      <p className="text-lg font-bold text-gray-200">{order.items?.length || 0} Ürün</p>
                    </div>
                    <div className="space-y-1 text-center md:text-left">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">TOPLAM</p>
                      <p className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        {order.totalAmount?.toLocaleString('tr-TR')} TL
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-4 border-t border-white/5 lg:border-none pt-6 lg:pt-0">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="flex-1 lg:flex-none px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black tracking-widest text-white transition-all"
                    >
                      DETAYLARI İNCELE
                    </button>
                    <button onClick={() => setSelectedOrder(order)} className={`p-4 rounded-2xl transition-all shadow-lg ${themes[config.theme]}`}>
                      <ChevronRight size={24} strokeWidth={3} />
                    </button>
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
          <div className="relative w-full max-w-4xl bg-[#0c0d10] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] flex flex-col">
            
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Sipariş Özeti</h2>
                <p className="text-cyan-500 font-mono text-sm">#{selectedOrder.orderId}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-3 hover:bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-cyan-400">
                    <MapPin size={20} />
                    <span className="font-black text-[10px] uppercase tracking-widest">Teslimat Bilgisi</span>
                  </div>
                  <div className="text-gray-300 space-y-1">
                    <p className="font-bold text-white">{selectedOrder.address?.fullName}</p>
                    <p className="text-sm opacity-70">{selectedOrder.address?.address}</p>
                    <p className="text-sm opacity-70">{selectedOrder.address?.district} / {selectedOrder.address?.city}</p>
                    <p className="text-sm pt-2 font-mono text-cyan-500/60">{selectedOrder.address?.phone}</p>
                  </div>
                </div>

                <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-purple-400">
                    <CreditCard size={20} />
                    <span className="font-black text-[10px] uppercase tracking-widest">Ödeme Detayı</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Yöntem</span>
                      <span className="text-white font-bold">{selectedOrder.payment?.method}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Kart</span>
                      <span className="text-white font-bold">{selectedOrder.payment?.name}</span>
                    </div>
                    <div className="h-[1px] bg-white/5 my-2" />
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-500 font-bold">Toplam</span>
                      <span className="text-white font-black">{selectedOrder.totalAmount?.toLocaleString('tr-TR')} TL</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-yellow-400">
                    <Package size={20} />
                    <span className="font-black text-[10px] uppercase tracking-widest">Ürünler</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {selectedOrder.status === 'delivered' && (
                      returns.some(r => r.orderId === selectedOrder.id) ? (
                        <button 
                          onClick={() => handleCancelReturn(selectedOrder.id)}
                          disabled={isDeleting}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                        >
                          {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} İadeyi İptal Et
                        </button>
                      ) : (
                        <button 
                          onClick={() => setShowReturnModal(selectedOrder)}
                          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all"
                        >
                          <RefreshCcw size={14} /> İade Talebi Oluştur
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="grid gap-4">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        <img src={item.imageUrl || item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">{item.brand}</p>
                        <h4 className="text-white font-bold truncate">{item.title}</h4>
                        <p className="text-gray-500 text-sm">Adet: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-black">{(item.price * item.quantity).toLocaleString('tr-TR')} TL</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-white/5 bg-white/[0.02]">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-cyan-400 transition-all"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {showReturnModal && (
        <ReturnManagement 
          order={showReturnModal} 
          onClose={() => {
            setShowReturnModal(null);
            setSelectedOrder(null);
          }} 
        />
      )}
    </div>
  );
}