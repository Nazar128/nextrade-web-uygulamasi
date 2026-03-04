import React from "react";

export const AuditRow = ({ product, onPreview }: any) => (
  <tr className="hover:bg-slate-800/40 transition-colors border-b border-slate-900/50 block md:table-row">
    <td className="py-4 md:py-6 px-4 md:px-8 block md:table-cell">
      <div className="flex items-center gap-4 md:gap-8">
        <div className="size-10 md:size-12 bg-slate-900/40 rounded-xl border border-slate-800 shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{product.name}</p>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-tighter">
            ID: {product.id}
          </p>
        </div>
      </div>
    </td>
    
    <td className="hidden md:table-cell py-6 text-[11px] text-slate-400 px-6 lg:px-10 font-medium italic underline underline-offset-8 decoration-slate-900">
      {product.seller}
    </td>
    
    <td className="hidden lg:table-cell py-6 px-6 lg:px-10">
       <span className="text-[10px] px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-500 font-medium whitespace-nowrap">
         {product.category}
       </span>
    </td>
    
    <td className="py-2 md:py-6 px-4 md:px-10 font-medium text-white text-sm block md:table-cell absolute md:relative right-4 top-14 md:top-0">
      {product.price}
    </td>

    <td className="py-4 md:py-6 px-4 md:px-8 block md:table-cell text-right">
      <div className="flex justify-end items-center gap-2">
        <button 
          onClick={onPreview}
          className="flex-1 md:flex-none px-4 md:px-6 py-2 bg-white text-black text-[10px] font-bold rounded-lg hover:bg-slate-200 transition-all active:scale-95 shadow-sm uppercase tracking-widest"
        >
          İNCELE
        </button>
        <button className="flex-1 md:flex-none px-4 md:px-6 py-2 bg-slate-900/50 text-red-500/80 text-[10px] font-bold rounded-lg border border-red-500/10 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95 uppercase tracking-widest">
          RED
        </button>
      </div>
    </td>
  </tr>
);