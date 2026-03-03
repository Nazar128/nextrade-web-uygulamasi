"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MainChart = ({ data }: { data: any[] }) => (
  <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Performans Analizi</h3>
    </div>
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#64748b', fontSize: 10}} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#64748b', fontSize: 10}} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Area 
            type="monotone" 
            dataKey="satis" 
            stroke="#6366f1" 
            strokeWidth={2} 
            fill="url(#chartGradient)" 
          />
          <Area 
            type="monotone" 
            dataKey="ziyaret" 
            stroke="#10b981" 
            strokeWidth={2} 
            fill="transparent" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);