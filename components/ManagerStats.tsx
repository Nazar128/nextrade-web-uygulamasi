import { Package, AlertCircle, CheckCircle } from 'lucide-react';

export default function ManagerStats() {
  const stats = [
    { label: "Toplam Envanter", value: "124", icon: <Package size={20}/>, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Kritik Stok", value: "3", icon: <AlertCircle size={20}/>, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Satıştaki Ürünler", value: "118", icon: <CheckCircle size={20}/>, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-[2rem] flex items-center justify-between group hover:border-gray-700 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</span>
            <div className="text-3xl font-black text-white">{stat.value}</div>
          </div>
          <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}