import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OrderMainChart = ({ data }: { data: any[] }) => (
  <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 h-[450px] relative overflow-hidden shadow-2xl">
    <div className="flex justify-between items-center mb-10 relative z-10">
      <h3 className="text-white font-bold text-lg  tracking-tight">SATIŞ <span className='text-blue-700'>HACMİ</span> TRENDİ</h3>
      <div className="size-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
    </div>
    <div className="h-full w-full absolute inset-0 pt-24 pb-8 pr-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', fontSize: '12px' }}
            itemStyle={{ color: '#3b82f6', fontWeight: '900' }}
          />
          <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);