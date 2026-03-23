"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TimeStats } from "@/components/TimeStats";
import { OrderMainChart } from "@/components/OrderMainChart";
import { SellerPerformance } from "@/components/SellerPerformance";
import { OrderRow } from "@/components/OrderRow";
import { OrderDetailsModal } from "@/components/OrderDetailsModal";

export default function OrdersPage() {
  const [period, setPeriod] = useState<'Haftalık' | 'Aylık' | 'Yıllık'>('Haftalık');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0),
    avgTicket: orders.length > 0 ? (orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0) / orders.length) : 0,
    activeSellers: new Set(orders.map(o => o.items?.[0]?.brand)).size
  };

  const filteredOrders = orders.filter(o => 
    o.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.address?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-950"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 min-h-screen text-slate-300 antialiased bg-gray-950">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl text-blue-600 font-black tracking-tighter">SİPARİŞ <span className="text-slate-700">YÖNETİMİ</span></h1>
          <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500 font-black uppercase tracking-widest">
            <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />
            Canlı Sistem Verileri
          </div>
        </div>
        
        <div className="flex bg-gray-900 p-1 rounded-2xl border border-gray-800">
          {['Haftalık', 'Aylık', 'Yıllık'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p as any)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                period === p ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </header>

      <TimeStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-800/50 shadow-2xl">
          <OrderMainChart orders={orders} />
        </div>
        <div className="bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-800/50 shadow-2xl">
          <SellerPerformance orders={orders} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Sistemdeki Son İşlemler</h3>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Sipariş veya Müşteri Ara..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border border-gray-800 text-xs py-3 pl-11 pr-4 rounded-2xl focus:ring-2 focus:ring-blue-600 w-64 transition-all focus:w-80 outline-none text-white" 
            />
          </div>
        </div>

        <div className="bg-gray-900/30 rounded-[2.5rem] border border-gray-800 overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] bg-gray-900/80">
              <tr>
                <th className="p-6">Sipariş ID</th>
                <th className="p-6">Müşteri</th>
                <th className="p-6">Mağaza / Marka</th>
                <th className="p-6">Durum</th>
                <th className="p-6 text-right">Tutar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {filteredOrders.map((order) => (
                <OrderRow 
                  key={order.id} 
                  order={order} 
                  onOpenDetail={() => { setSelectedOrder(order); setIsModalOpen(true); }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        order={selectedOrder} 
      />
    </div>
  );
}