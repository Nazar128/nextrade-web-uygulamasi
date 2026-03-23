import { Star } from "lucide-react";

export const SellerPerformance = ({ orders }: any) => {
  const stores = orders.reduce((acc: any, curr: any) => {
    const storeName = "NexTrade"; 
    acc[storeName] = (acc[storeName] || 0) + 1;
    return acc;
  }, {});

  const performanceData = Object.entries(stores).map(([name, count]) => ({
    name,
    count: count as number,
    rating: 5.0
  })).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="space-y-8">
      <h3 className="text-white font-black text-sm uppercase tracking-[0.2em]">Mağaza Performansı</h3>
      <div className="space-y-5">
        {performanceData.map((seller, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-950/50 border border-gray-800 rounded-2xl">
            <div>
              <p className="text-xs font-black text-white uppercase tracking-wider">{seller.name}</p>
              <p className="text-[10px] text-slate-500 font-bold mt-1">{seller.count} Toplam Sipariş</p>
            </div>
            <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-lg">
              <Star size={10} className="fill-amber-500 text-amber-500" />
              <span className="text-[11px] font-black text-amber-500">{seller.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};