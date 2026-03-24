"use client";
import React, { useState } from 'react';
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { 
  AlertCircle, Check, ArrowLeft, Send, 
  PackageSearch, X, Loader2 
} from 'lucide-react';

interface ReturnModalProps {
  order: any;
  onClose: () => void;
}

export default function ReturnManagement({ order, onClose }: ReturnModalProps) {
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [returnReason, setReturnReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [returnCode, setReturnCode] = useState("");

  const reasons = [
    "Vazgeçtim / İhtiyacım Kalmadı",
    "Beden / Numara Uygun Değil",
    "Ürün Hasarlı / Kusurlu Geldi",
    "Beklediğimden Farklı Kalitede",
    "Yanlış Ürün Gönderildi",
    "Diğer"
  ];

  const toggleItem = (productId: string) => {
    setSelectedItems(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleCreateReturn = async () => {
    setLoading(true);
    try {
      const generatedCode = `NX-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const returnData = {
        orderId: order.id,
        orderDisplayId: order.orderId,
        customerId: order.userId,
        items: order.items.filter((item: any) => selectedItems.includes(item.id.toString() || item.title)),
        reason: returnReason === "Diğer" ? otherReason : returnReason,
        status: 'pending',
        returnCode: generatedCode,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "returns"), returnData);
      setReturnCode(generatedCode);
      setStep(3);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
      <div className="w-full max-w-2xl bg-[#0c0d10] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase">İade Talebi</h2>
            <p className="text-cyan-500 font-mono text-xs mt-1 tracking-widest">ORDER: #{order.orderId}</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl text-gray-500 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <AlertCircle className="text-blue-400" size={20} />
                <p className="text-xs text-blue-200 font-bold uppercase tracking-tight">İade edilecek ürünleri seçiniz</p>
              </div>

              <div className="grid gap-3">
                {order.items.map((item: any, idx: number) => {
                  const itemId = item.id.toString() || item.title;
                  const isSelected = selectedItems.includes(itemId);
                  return (
                    <div 
                      key={idx} 
                      onClick={() => toggleItem(itemId)}
                      className={`flex items-center gap-4 p-5 rounded-[2rem] border transition-all cursor-pointer group ${
                        isSelected ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)]' : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10">
                        <img src={item.imageUrl || item.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
                        <p className="text-gray-500 text-xs font-mono mt-1">{item.price.toLocaleString('tr-TR')} TL</p>
                      </div>
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'bg-blue-600 border-blue-600 scale-110' : 'border-white/20'
                      }`}>
                        {isSelected && <Check size={16} className="text-white" strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                disabled={selectedItems.length === 0}
                onClick={() => setStep(2)}
                className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] disabled:opacity-10 transition-all active:scale-95 shadow-xl"
              >
                İlerle ({selectedItems.length} Ürün)
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
                <ArrowLeft size={14} /> Geri Dön
              </button>
              
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">Neden iade ediyorsunuz?</h3>
              
              <div className="grid grid-cols-1 gap-2">
                {reasons.map((r) => (
                  <button
                    key={r}
                    onClick={() => setReturnReason(r)}
                    className={`text-left p-4 rounded-2xl border text-sm font-bold transition-all ${
                      returnReason === r ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {returnReason === "Diğer" && (
                <textarea
                  placeholder="Detaylı açıklama yazınız..."
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  className="w-full h-32 bg-white/[0.03] border border-white/10 rounded-3xl p-5 text-white text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
                />
              )}

              <button 
                disabled={!returnReason || (returnReason === "Diğer" && !otherReason) || loading}
                onClick={handleCreateReturn}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] disabled:opacity-20 flex items-center justify-center gap-3 transition-all hover:bg-blue-500"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <>Talebi Gönder <Send size={18} /></>}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="py-6 text-center space-y-6 animate-in zoom-in duration-500">
              <div className="w-28 h-28 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/20 shadow-[0_0_60px_-15px_rgba(34,197,94,0.4)]">
                <PackageSearch size={44} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Harika!</h3>
                <p className="text-gray-400 max-w-xs mx-auto text-xs font-bold leading-relaxed uppercase tracking-widest">
                  İade talebiniz satıcıya iletildi. Ürünleri kargoya verirken kodu belirtmeyi unutmayın.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-dashed border-white/20 p-10 rounded-[3rem] max-w-sm mx-auto group">
                <p className="text-[10px] text-gray-600 font-black tracking-[0.4em] uppercase mb-3 group-hover:text-blue-400 transition-colors">KARGO İADE KODU</p>
                <p className="text-5xl font-mono font-black text-blue-500 tracking-tighter select-all">{returnCode}</p>
              </div>

              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}