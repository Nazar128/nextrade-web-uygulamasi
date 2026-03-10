"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, CheckCircle2, ShieldCheck } from 'lucide-react';

const PaymentForm = ({ isActive, onBack, onComplete }: { isActive: boolean; onBack: () => void; onComplete: (data: any | null) => void }) => {
  const [method, setMethod] = useState<'card' | 'cod'>('card');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '', focused: '' });

  useEffect(() => {
    if (method === 'cod') {
      onComplete({ method: 'Kapıda Ödeme' });
    } else {
      const isCardValid = 
        cardData.number.replace(/\s/g, '').length === 16 && 
        cardData.name.length > 3 && 
        cardData.expiry.includes('/') && 
        cardData.cvv.length === 3;

      if (isCardValid) {
        onComplete({ method: 'Kredi Kartı', ...cardData });
      } else {
        onComplete(null); 
      }
    }
  }, [method, cardData]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData({ ...cardData, number: value });
  };

  return (
    <div className={`w-full transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
      <div className='bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl'>
        
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <button 
            onClick={() => setMethod('card')}
            className={`flex-1 p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${method === 'card' ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-transparent opacity-40 hover:opacity-60'}`}
          >
            <CreditCard size={28} className={method === 'card' ? 'text-blue-500' : 'text-white'} />
            <div className="text-center">
              <p className="font-bold text-sm">Kredi Kartı</p>
              <p className="text-[10px] text-gray-500 mt-1">Güvenli Ödeme</p>
            </div>
          </button>
          
          <button 
            onClick={() => setMethod('cod')}
            className={`flex-1 p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${method === 'cod' ? 'bg-green-600/10 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'bg-white/5 border-transparent opacity-40 hover:opacity-60'}`}
          >
            <Truck size={28} className={method === 'cod' ? 'text-green-500' : 'text-white'} />
            <div className="text-center">
              <p className="font-bold text-sm">Kapıda Ödeme</p>
              <p className="text-[10px] text-gray-500 mt-1">Nakit / Kart</p>
            </div>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {method === 'card' ? (
            <motion.div 
              key="card-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className='relative h-56 w-full max-w-[360px] mx-auto perspective-1000'>
                <motion.div animate={{ rotateY: cardData.focused === 'cvv' ? 180 : 0 }} transition={{ duration: 0.6 }} className='relative w-full h-full preserve-3d shadow-2xl'>
                  <div className='absolute inset-0 bg-gradient-to-br from-blue-800 via-indigo-400 to-purple-800 rounded-[2rem] p-6 text-white backface-hidden border border-white/20'>
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-8 bg-amber-400/80 rounded-md shadow-inner"></div>
                        <p className="italic font-black text-xl opacity-80">NexCard</p>
                    </div>
                    <p className='text-xl tracking-[4px] font-mono mt-10'>{cardData.number || '•••• •••• •••• ••••'}</p>
                    <div className='mt-8 flex justify-between items-end'>
                      <div className="max-w-[180px]">
                        <p className='text-[8px] opacity-50 uppercase mb-1'>Kart Sahibi</p>
                        <p className='text-sm font-bold truncate tracking-widest uppercase'>{cardData.name || 'AD SOYAD'}</p>
                      </div>
                      <div className="text-right">
                        <p className='text-[8px] opacity-50 uppercase mb-1'>SKT</p>
                        <p className='text-sm font-bold tracking-widest'>{cardData.expiry || '00/00'}</p>
                      </div>
                    </div>
                  </div>
                  <div className='absolute inset-0 bg-slate-900 rounded-[2rem] py-8 rotate-y-180 backface-hidden border border-white/10'>
                    <div className='w-full h-12 bg-black/80 mb-6'></div>
                    <div className='mx-8 bg-white/10 h-10 rounded-lg flex items-center justify-end px-4 font-mono font-bold text-lg text-white'>
                      {cardData.cvv || '***'}
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className='grid grid-cols-2 gap-5'>
                <div className="col-span-2">
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                    placeholder="Kart Numarası (16 Hane)"
                    value={cardData.number}
                    onChange={handleNumberChange}
                    onFocus={() => setCardData({...cardData, focused: 'number'})}
                  />
                </div>
                <div className="col-span-2">
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all uppercase"
                    placeholder="Kart Üzerindeki İsim"
                    onChange={(e) => setCardData({...cardData, name: e.target.value})}
                    onFocus={() => setCardData({...cardData, focused: 'name'})}
                  />
                </div>
                <input 
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                  placeholder="MM/YY"
                  onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                  onFocus={() => setCardData({...cardData, focused: 'expiry'})}
                />
                <input 
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                  placeholder="CVV"
                  maxLength={3}
                  onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                  onFocus={() => setCardData({...cardData, focused: 'cvv'})}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="cod-info"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 px-6 rounded-3xl bg-green-500/5 border border-green-500/20 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                <ShieldCheck size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Kapıda Ödeme Seçildi</h3>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">
                  Siparişinizi teslim alırken kapıda <span className="text-white font-bold">Nakit</span> veya <span className="text-white font-bold">Kredi Kartı</span> ile ödeyebilirsiniz.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] text-green-500 font-bold uppercase tracking-widest">
                <CheckCircle2 size={14} /> Ek Ücret Yok
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={onBack} className='mt-10 text-xs font-bold text-gray-500 hover:text-white w-full text-center transition-colors uppercase tracking-[0.2em]'>
          ← TESLİMAT BİLGİLERİNE DÖN
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;