export const SellerPerformance = () => {
  const topSellers = [
    { name: "GigaTeknoloji", orders: 450, revenue: "850.000 TL", rating: 4.9 },
    { name: "ModaDünyası", orders: 380, revenue: "120.000 TL", rating: 4.7 },
    { name: "EvimDekor", orders: 120, revenue: "95.000 TL", rating: 4.2 },
  ];

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-1 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold"><span className="text-blue-700">Mağaza</span> Performansları</h3>
        <button className="text-xs text-blue-400 hover:underline">Tümünü Gör</button>
      </div>
      <div className="space-y-4">
        {topSellers.map((seller, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-800/30 border border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-gradient-to-r from-blue-700 to-slate-400 rounded-lg flex items-center justify-center font-bold text-xs text-white">
                {seller.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">{seller.name}</p>
                <p className="text-[10px] text-slate-500">{seller.orders} Sipariş</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-emerald-400">{seller.revenue}</p>
              <p className="text-[10px] text-slate-500">⭐ {seller.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};