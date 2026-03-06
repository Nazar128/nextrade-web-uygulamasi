import React from "react";
import { X, Check, AlertCircle, Package, ShieldAlert } from "lucide-react";

interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onApprove: (id: string) => void; 
  onReject: (id: string) => void;
}

export const ProductPreviewModal = ({ isOpen, onClose, product, onApprove, onReject }: ProductPreviewModalProps) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
      <div className="bg-[#0A0A0A] border border-slate-800 w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <div className="w-full md:w-1/2 bg-slate-900/50 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-800">
          <div className="absolute top-6 left-6 flex gap-2">
             <span className="px-3 py-1 bg-white text-black text-[10px] font-black rounded-full uppercase tracking-tighter italic">
                {product.category}
             </span>
          </div>
          <Package size={80} className="text-slate-800" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">Sistem ID: {product.id}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-2xl font-medium text-blue-700 tracking-tight leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm text-slate-400 ">Satıcı: {product.seller}</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-slate-900 rounded-full text-slate-600 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1 border-l border-slate-800 pl-4">
                <p className="text-[12px] text-slate-400  font-bold tracking-widest">Fiyat</p>
                <p className="text-xl font-medium text-white">{product.price}</p>
              </div>
              <div className="space-y-1 border-l border-slate-800 pl-4">
                <p className="text-[12px] text-slate-400  font-bold tracking-widest">Stok Adedi</p>
                <p className="text-xl font-medium text-white">{product.stock} Ünite</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-[12px] text-slate-400  font-bold tracking-widest flex items-center gap-2">
                <AlertCircle size={12} /> Ürün Açıklaması
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                {product.desc}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-12 pt-8 border-t border-slate-900">
            <button onClick={() => onApprove(product.id)} className="flex-1 bg-white text-black py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
              <Check size={16} /> ÜRÜNÜ ONAYLA
            </button>
            <button onClick={() => onReject(product.id)} className="flex-1 bg-gradient-to-r from-slate-400 to-blue-700 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest border border-slate-800 hover:text-red-500 hover:border-red-500/30 transition-all">
              REDDET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};