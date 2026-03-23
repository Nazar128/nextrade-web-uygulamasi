import { X, User, Store, Package, CreditCard, MapPin, Truck } from "lucide-react";

export const OrderDetailsModal = ({ order, isOpen, onClose }: any) => {
  if (!isOpen || !order) return null;

  const currentStatus = order.status || "pending";

  const getStatusLabel = (status: string) => {
    if (status === 'delivered') return { text: 'TESLİM EDİLDİ', color: 'text-emerald-500' };
    if (status === 'shipped') return { text: 'KARGODA', color: 'text-blue-500' };
    return { text: 'HAZIRLANIYOR', color: 'text-amber-500' };
  };

  const statusInfo = getStatusLabel(currentStatus);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/95 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-gray-900 w-full max-w-2xl rounded-[3rem] border border-gray-800 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Sipariş Analizi</h2>
            <p className={`text-[10px] font-black font-mono mt-1 ${statusInfo.color}`}>
              {order.orderId} — {statusInfo.text}
            </p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-800 rounded-2xl transition-all text-slate-500 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-h-[70vh] overflow-y-auto">
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 text-blue-500 mb-4 font-black uppercase text-[10px] tracking-widest">
                <User size={14} /> Müşteri Profili
              </div>
              <p className="text-white font-black text-sm uppercase">{order.address?.fullName}</p>
              <p className="text-xs text-slate-500 font-medium">{order.address?.email}</p>
              <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-slate-400 uppercase">
                <MapPin size={12} className="text-blue-500" />
                <span>{order.address?.district}, {order.address?.city}</span>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 text-purple-500 mb-4 font-black uppercase text-[10px] tracking-widest">
                <Store size={14} /> Mağaza Bilgisi
              </div>
              <p className="text-white font-black text-sm uppercase">NexTrade</p>
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">Mağaza Sahibi: Nazar Kalçık</p>
              <div className="mt-2 p-3 bg-gray-950 rounded-xl border border-gray-800/50">
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Marka</p>
                <p className="text-xs text-white font-bold">{order.items?.[0]?.brand}</p>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 text-emerald-500 mb-4 font-black uppercase text-[10px] tracking-widest">
                <Package size={14} /> Ürün İçeriği
              </div>
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-gray-950 p-4 rounded-2xl border border-gray-800 mb-2">
                  <p className="text-xs font-black text-white uppercase leading-tight">{item.title}</p>
                  <div className="flex justify-between mt-2 items-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Miktar: {item.quantity}</span>
                    <span className="text-[10px] text-blue-500 font-black">{item.price.toLocaleString()} TL</span>
                  </div>
                </div>
              ))}
            </section>

            <section>
              <div className="flex items-center gap-2 text-amber-500 mb-4 font-black uppercase text-[10px] tracking-widest">
                <CreditCard size={14} /> Finansal Özet
              </div>
              <div className="space-y-2 bg-gray-950 p-4 rounded-2xl border border-gray-800">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span className="text-slate-600">Yöntem:</span>
                  <span className="text-slate-300">{order.payment?.method}</span>
                </div>
                <div className="flex justify-between text-sm font-black border-t border-gray-800 pt-3 mt-1">
                  <span className="text-white uppercase tracking-tighter">Genel Toplam:</span>
                  <span className="text-emerald-500">{order.totalAmount.toLocaleString()} TL</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="p-8 bg-gray-900/80 border-t border-gray-800 flex gap-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">
            FATURA GÖRÜNTÜLE
          </button>
          <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-slate-300 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
            <Truck size={14} /> LOJİSTİK TAKİBİ
          </button>
        </div>
      </div>
    </div>
  );
};