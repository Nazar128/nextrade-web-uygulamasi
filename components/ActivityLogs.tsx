export const ActivityLogs = () => (
  <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl h-full">
    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Sistem Hareketleri</h3>
    <div className="space-y-6">
      {[
        { id: 1, text: "Yeni Satıcı Kaydı", desc: "TeknoMarket", time: "2dk", color: "bg-blue-500" },
        { id: 2, text: "Yüksek Sipariş", desc: "₺12.400 - ID: #342", time: "15dk", color: "bg-emerald-500" },
        { id: 3, text: "Hatalı Giriş", desc: "Admin Paneli - IP: 192.168...", time: "1sa", color: "bg-rose-500" },
        { id: 4, text: "Stok Uyarısı", desc: "iPhone 15 Pro (Kritik)", time: "3sa", color: "bg-amber-500" }
      ].map((log) => (
        <div key={log.id} className="flex items-center justify-between group cursor-default">
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${log.color} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
            <div>
              <p className="text-xs font-bold text-slate-200">{log.text}</p>
              <p className="text-[10px] text-slate-500">{log.desc}</p>
            </div>
          </div>
          <span className="text-[10px] font-medium text-slate-600 italic">{log.time}</span>
        </div>
      ))}
    </div>
  </div>
);