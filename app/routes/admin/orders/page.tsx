"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { TimeStats } from "@/components/TimeStats";
import { OrderMainChart } from "@/components/OrderMainChart";
import { SellerPerformance } from "@/components/SellerPerformance";
import { OrderRow } from "@/components/OrderRow";
import { OrderDetailsModal } from "@/components/OrderDetailsModal";
import { statsData, chartDataSets, mockOrders } from "@/data/orderMockData";

export default function OrdersPage() {
  const [period, setPeriod] = useState<'Haftalık' | 'Aylık' | 'Yıllık'>('Haftalık');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-12  min-h-screen text-slate-300 antialiased">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl  text-blue-700 font-bold tracking-tight leading-none">SİPARİŞ <span className="text-slate-600 text-3xl font-bold">YÖNETİMİ</span></h1>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-medium">
            <span className="size-1.5 bg-emerald-500 rounded-full" />
            Sistem aktif .
          </div>
        </div>
        
        <div className="flex bg-slate-900/50 p-1 rounded-full border border-slate-800">
          {['Haftalık', 'Aylık', 'Yıllık'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p as any)}
              className={`px-6 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                period === p ? 'bg-white text-black' : 'hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </header>

      <TimeStats data={statsData[period]} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 p-6 rounded-3xl border border-slate-800/50">
          <OrderMainChart data={chartDataSets[period]} />
        </div>

        <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800/50">
          <SellerPerformance />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-medium text-white">Son İşlemler</h3>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-600 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Filtrele..." 
              className="bg-transparent border-none text-xs pl-7 focus:ring-0 w-40 transition-all focus:w-64" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="text-[10px] text-blue-700 uppercase tracking-widest border-b border-slate-900">
              <tr>
                <th className="pb-4 font-medium">ID</th>
                <th className="pb-4 font-medium">Müşteri</th>
                <th className="pb-4 font-medium">Mağaza</th>
                <th className="pb-4 font-medium">Durum</th>
                <th className="pb-4 text-right font-medium">Tutar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {mockOrders.map((order) => (
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