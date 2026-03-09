"use client";
import React from 'react';
import { SlidersHorizontal, Check, Percent, Box, Star } from 'lucide-react';

interface FiltersProps {
  filters: any;
  state: any;
  setState: any;
  resetFilters: () => void;
}

export const ProductFilters = ({ filters, state, setState, resetFilters }: FiltersProps) => {
  return (
    <aside className="w-full lg:w-80 lg:sticky lg:top-10 shrink-0 order-first">
      <div className="flex flex-col bg-white/[0.03] border border-white/5 rounded-[2.5rem] h-[calc(100vh-120px)] backdrop-blur-md overflow-hidden">
        
        <div className="p-6 pb-4 flex items-center justify-between border-b border-white/5 shrink-0">
          <h2 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-white">
            <SlidersHorizontal size={16} className="text-blue-500" /> Filtreler
          </h2>
          <button onClick={resetFilters} className="text-[9px] font-bold text-slate-500 hover:text-red-500 transition-all uppercase underline underline-offset-4">
            Temizle
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">
          <div className="space-y-3 bg-white/5 p-4 rounded-2xl">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-[10px] font-black text-slate-400 group-hover:text-white transition-colors flex items-center gap-2 uppercase tracking-tighter">
                <Box size={14} className="text-blue-500" /> Stoktakiler
              </span>
              <input 
                type="checkbox" 
                checked={state.onlyInStock} 
                onChange={(e) => setState.setOnlyInStock(e.target.checked)} 
                className="w-4 h-4 accent-blue-600 rounded" 
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-[10px] font-black text-slate-400 group-hover:text-white transition-colors flex items-center gap-2 uppercase tracking-tighter">
                <Percent size={14} className="text-blue-500" /> İndirimli
              </span>
              <input 
                type="checkbox" 
                checked={state.onlyDiscounted} 
                onChange={(e) => setState.setOnlyDiscounted(e.target.checked)} 
                className="w-4 h-4 accent-blue-600 rounded" 
              />
            </label>
          </div>

          <FilterSection title="Fiyat Aralığı (₺)">
            <div className="flex items-center gap-2 mt-4">
              <input 
                type="number" 
                placeholder="Min" 
                value={state.minPrice || ''} 
                onChange={(e) => setState.setMinPrice(e.target.value)} 
                className="w-full bg-gray-900 border border-white/5 rounded-xl px-3 py-2.5 text-[11px] font-bold focus:border-blue-500 outline-none text-white" 
              />
              <div className="w-4 h-[1px] bg-slate-800 shrink-0" />
              <input 
                type="number" 
                placeholder="Max" 
                value={state.maxPrice || ''} 
                onChange={(e) => setState.setMaxPrice(e.target.value)} 
                className="w-full bg-gray-900 border border-white/5 rounded-xl px-3 py-2.5 text-[11px] font-bold focus:border-blue-500 outline-none text-white" 
              />
            </div>
          </FilterSection>

          <FilterSection title="Markalar">
            <div className="space-y-3 mt-4">
              {filters.brands.map((brand: string) => (
                <CheckboxItem 
                  key={brand} 
                  label={brand} 
                  checked={state.selectedBrands.includes(brand)} 
                  onChange={() => setState.setSelectedBrands(brand)} 
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Cinsiyet">
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.genders.map((g: string) => (
                <FilterBadge 
                  key={g} 
                  label={g} 
                  active={state.selectedGenders.includes(g)} 
                  onClick={() => setState.setSelectedGenders(g)} 
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Minimum Puan">
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[3, 4, 4.5].map(r => (
                <button 
                  key={r} 
                  type="button"
                  onClick={() => setState.setMinRating(state.minRating === r ? 0 : r)} 
                  className={`py-2.5 rounded-xl text-[10px] font-black border transition-all flex items-center justify-center gap-1 ${state.minRating === r ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-900 border-white/5 text-slate-500'}`}
                >
                  {r}+ <Star size={10} fill={state.minRating === r ? "white" : "currentColor"} />
                </button>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </aside>
  );
};

const FilterSection = ({ title, children }: any) => (
  <div className="border-b border-white/5 pb-8 last:border-0">
    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2">{title}</h3>
    {children}
  </div>
);

const FilterBadge = ({ label, active, onClick }: any) => (
  <button type="button" onClick={onClick} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-900 text-slate-400 border-white/5 hover:border-white/10'}`}>
    {label}
  </button>
);

const CheckboxItem = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-blue-600 border-blue-600' : 'border-white/10 bg-white/5 group-hover:border-white/20'}`}>
      {checked && <Check size={12} className="text-white" strokeWidth={4} />}
    </div>
    <span className={`text-[12px] font-bold tracking-tight transition-colors ${checked ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{label}</span>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
  </label>   
);