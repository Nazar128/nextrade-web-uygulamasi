import React from "react";

interface OrderRowProps {
  order: {
    id: string;
    customer: { name: string; email: string };
    seller: string;
    product: string;
    amount: string;
    status: string;
  };
  onOpenDetail: () => void;
}

export const OrderRow = ({ order, onOpenDetail }: any) => (
  <tr 
    onClick={onOpenDetail} 
    className="group cursor-pointer hover:bg-slate-900/30 transition-colors"
  >
    <td className="py-5 text-[11px] font-mono text-slate-600">{order.id}</td>
    <td className="py-5 text-sm text-slate-200">{order.customer.name}</td>
    <td className="py-5 text-xs text-slate-400">{order.seller}</td>
    <td className="py-5">
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-800 text-slate-500 group-hover:border-slate-700 transition-colors">
            {order.status}
        </span>
    </td>
    <td className="py-5 text-right font-medium text-white text-sm">{order.amount}</td>
  </tr>
);