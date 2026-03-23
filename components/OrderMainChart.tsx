import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OrderMainChart = ({ orders }: any) => {
  const chartData = orders.slice(0, 7).reverse().map((o: any) => ({
    name: o.orderId?.substring(4, 9),
    sales: o.totalAmount
  }));

  return (
    <div className="h-[400px] w-full relative">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-white font-black text-sm uppercase tracking-[0.2em]">Satış Hacmi Trendi</h3>
        <div className="flex items-center gap-2">
          <span className="size-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase">Canlı Akış</span>
        </div>
      </div>
      <div className="h-full w-full pb-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', fontSize: '12px' }}
              itemStyle={{ color: '#3b82f6', fontWeight: '900' }}
            />
            <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};