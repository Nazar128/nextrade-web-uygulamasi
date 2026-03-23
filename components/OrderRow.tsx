"use client";

import React from "react";

export const OrderRow = ({ order, onOpenDetail }: any) => {
  const currentStatus = order.status || "pending";

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'border-emerald-500/20 text-emerald-500 bg-emerald-500/10';
      case 'shipped':
        return 'border-blue-500/20 text-blue-500 bg-blue-500/10';
      case 'pending':
        return 'border-amber-500/20 text-amber-500 bg-amber-500/10';
      default:
        return 'border-slate-800 text-slate-500 bg-slate-900';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'TESLİM EDİLDİ';
      case 'shipped': return 'KARGODA';
      case 'pending': return 'HAZIRLANIYOR';
      default: return 'İŞLENİYOR';
    }
  };

  return (
    <tr onClick={onOpenDetail} className="group cursor-pointer hover:bg-blue-600/5 transition-all border-b border-gray-800/30">
      <td className="p-6 text-[10px] font-black font-mono text-slate-500 group-hover:text-blue-500">
        {order.orderId}
      </td>
      <td className="p-6">
        <p className="text-xs font-black text-white uppercase">{order.address?.fullName}</p>
        <p className="text-[10px] text-slate-600 font-bold">{order.address?.city}</p>
      </td>
      <td className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
        NexTrade
      </td>
      <td className="p-6">
        <span className={`text-[9px] font-black px-4 py-1.5 rounded-full border shadow-sm ${getStatusStyles(currentStatus)}`}>
          {getStatusText(currentStatus)}
        </span>
      </td>
      <td className="p-6 text-right font-black text-white text-sm">
        {order.totalAmount?.toLocaleString()} TL
      </td>
    </tr>
  );
};