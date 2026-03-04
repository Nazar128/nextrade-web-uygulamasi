export const AuditStats = ({ count }: { count: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    <div className="p-5 md:p-8 rounded-2xl md:rounded-[32px] bg-slate-900/40 border border-slate-800/50 transition-all hover:border-blue-500/30 group">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-blue-400 transition-colors">Bekleyen Onay</p>
        <h4 className="text-3xl md:text-4xl font-medium text-white mt-2">{count}</h4>
    </div>
    
    <div className="p-5 md:p-8 rounded-2xl md:rounded-[32px] bg-slate-900/40 border border-slate-800/50 transition-all hover:border-emerald-500/30 group">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-emerald-400 transition-colors">Bugün Onaylanan</p>
        <h4 className="text-3xl md:text-4xl font-medium text-emerald-500 mt-2">42</h4>
    </div>
    
    <div className="p-5 md:p-8 rounded-2xl md:rounded-[32px] bg-slate-900/40 border border-slate-800/50 transition-all hover:border-slate-700 lg:col-span-1 sm:col-span-2 lg:block">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Red Oranı</p>
        <h4 className="text-3xl md:text-4xl font-medium text-slate-400 mt-2">%4.2</h4>
    </div>
  </div>
);