import { Activity, TrendingUp, DollarSign, Users, ShoppingBag } from "lucide-react";

export const TimeStats = ({ stats }: any) => {
  const items = [
    { label: "Toplam Sipariş", value: stats.totalOrders, sub: "Sistem geneli", icon: ShoppingBag, color: "text-blue-500" },
    { label: "Toplam Ciro", value: `${stats.totalRevenue.toLocaleString()} TL`, sub: "Brüt kazanç", icon: DollarSign, color: "text-emerald-500" },
    { label: "Ort. Sepet", value: `${Math.round(stats.avgTicket).toLocaleString()} TL`, sub: "Sipariş başı", icon: Activity, color: "text-amber-500" },
    { label: "Aktif Satıcı", value: stats.activeSellers, sub: "Marka sayısı", icon: Users, color: "text-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((stat, i) => (
        <div key={i} className="bg-gray-900/50 border border-gray-800 p-6 rounded-[2rem] hover:border-blue-900/50 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 bg-gray-800 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={20} />
            </div>
            <div className="flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 uppercase">
              <TrendingUp size={10}/> %12.5
            </div>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
          <h3 className="text-2xl font-black text-white mt-1">{stat.value}</h3>
          <p className="text-[10px] text-slate-600 mt-2 italic font-medium">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
};