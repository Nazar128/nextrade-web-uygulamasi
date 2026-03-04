import { X, User, Store, Package, CreditCard, MapPin } from "lucide-react";

export const OrderDetailsModal = ({ order, isOpen, onClose }: any) => {
  if (!isOpen || !order) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="bg-slate-900 w-full max-w-2xl rounded-t-[32px] sm:rounded-[32px] overflow-hidden max-h-[95vh] flex flex-col">
        <div className="overflow-y-auto p-6 md:p-10 space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">Sipariş Detayı</h2>
            <p className="text-xs text-slate-500 font-mono mt-1">{order.id} nolu siparişin tüm ayrıntıları</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400">
            <X className="size-6" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <div className="flex items-center gap-2 text-blue-400 mb-3">
                <User className="size-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">Müşteri Bilgileri</h3>
              </div>
              <p className="text-slate-200 font-medium">{order.customer.name}</p>
              <p className="text-sm text-slate-500">{order.customer.email}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                <MapPin className="size-3" />
                <span>Kadıköy, İstanbul / Türkiye</span>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 text-purple-400 mb-3">
                <Store className="size-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">Satıcı & Mağaza</h3>
              </div>
              <p className="text-slate-200 font-medium">{order.seller}</p>
              <p className="text-xs text-slate-500">Mağaza ID: #STR-552</p>
            </section>
          </div>

          <div className="space-y-6">
            <section>
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <Package className="size-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">Ürün Bilgisi</h3>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-200">{order.product}</p>
                <p className="text-xs text-slate-500 mt-1 uppercase">Adet: 1</p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 text-amber-400 mb-3">
                <CreditCard className="size-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">Ödeme Özeti</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Ara Toplam:</span>
                  <span className="text-slate-300">{(parseFloat(order.amount) * 0.8).toLocaleString()} TL</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">KDV (%20):</span>
                  <span className="text-slate-300">{(parseFloat(order.amount) * 0.2).toLocaleString()} TL</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-slate-800 pt-2 mt-2">
                  <span className="text-white">Toplam:</span>
                  <span className="text-emerald-400">{order.amount}</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="p-6 bg-slate-800/30 border-t border-slate-800 flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-bold text-sm transition-all">
            Faturayı Görüntüle
          </button>
          <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 py-2.5 rounded-xl font-bold text-sm transition-all">
            Lojistik Takibi
          </button>
        </div>
      </div>
    </div>
  );
};