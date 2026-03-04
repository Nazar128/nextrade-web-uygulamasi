import { Activity, TrendingUp, TrendingDown } from "lucide-react";

export const TimeStats = ({ data }: { data: any[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {data.map((stat, i) => (
      <div key={i} className="bg-slate-900/40 border border-slate-800 p-3 md:p-4 rounded-[24px]">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2.5 bg-slate-800 rounded-xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Activity size={18} />
          </div>
          <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.isUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            {stat.isUp ? <TrendingUp size={10}/> : <TrendingDown size={12}/>} {stat.trend}
          </div>
        </div>
        <p className="text-slate-500 text-[10px] font-black tracking-[0.2em]">{stat.label}</p>
        <h3 className="text-2xl font-black text-white mt-1">{stat.value}</h3>
        <p className="text-[10px] text-slate-600 mt-2 italic">{stat.sub}</p>
      </div>
    ))}
  </div>
);