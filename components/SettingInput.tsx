export const SettingInput = ({ label, placeholder, value, onChange, type = "text" }: any) => (
  <div className="flex flex-col p-5 hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 h-1/2 justify-center">
    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent border-none text-sm text-slate-800 focus:ring-0 outline-none placeholder:text-slate-300 font-semibold p-0" 
    />
  </div>
);