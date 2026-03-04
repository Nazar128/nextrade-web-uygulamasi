export const SettingToggle = ({ label, isActive, onToggle }: any) => (
  <div className="flex justify-between items-center p-5 hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 h-1/2">
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{label}</span>
    <button 
      onClick={onToggle}
      className={`w-8 h-4 rounded-full transition-all relative ${isActive ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <div className={`absolute top-0.5 size-3 bg-white rounded-full transition-all ${isActive ? 'left-4.5' : 'left-0.5'}`} />
    </button>
  </div>
);