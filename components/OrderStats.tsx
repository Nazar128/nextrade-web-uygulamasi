import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  color: string;
}

export const OrderStats = ({ label, value, icon: Icon, trend, color }: StatCardProps) => (
  <div className="bg-transparent border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-all">
    <div className="flex justify-between items-center mb-3">
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`size-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
        {trend}
      </span>
    </div>
    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</p>
    <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
  </div>
);