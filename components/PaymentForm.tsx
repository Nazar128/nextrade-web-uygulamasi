"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, Loader2 } from 'lucide-react';

const PaymentForm = ({ isActive, onBack, onComplete }: { isActive: boolean; onBack: () => void; onComplete: (data: any | null) => void }) => {
    const [method, setMethod] = useState<'card' | 'cod'>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '', focused: '' });

    const isCardValid = 
        cardData.number.replace(/\s/g, '').length === 16 && 
        cardData.name.length > 3 && 
        cardData.expiry.length === 5 && 
        cardData.cvv.length === 3;

    const handlePaymentAction = async () => {
        if (method === 'cod') {
            onComplete({ method: 'COD', label: 'Kapıda Ödeme' });
            return;
        }

        if (!isCardValid) return;

        setIsProcessing(true);
        
        setTimeout(() => {
            const mockToken = `tok_nextrade_${Math.random().toString(36).substr(2, 9)}`;
            onComplete({
                method: 'CARD',
                label: 'Kredi Kartı',
                token: mockToken,
                last4: cardData.number.slice(-4),
                brand: "Visa"
            });
            setIsProcessing(false);
        }, 1500);
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 16);
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardData({ ...cardData, number: value });
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.substring(0, 4);
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        setCardData({ ...cardData, expiry: value });
    };

    return (
        <div className={`w-full transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <div className='bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl'>
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <button 
                        type="button"
                        onClick={() => { setMethod('card'); onComplete(null); }}
                        className={`flex-1 p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${method === 'card' ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-transparent opacity-40 hover:opacity-60'}`}
                    >
                        <CreditCard size={28} className={method === 'card' ? 'text-blue-500' : 'text-white'} />
                        <div className="text-center">
                            <p className="font-bold text-sm text-white">Kredi Kartı</p>
                            <p className="text-[10px] text-gray-500 mt-1">PCI-DSS Güvenli</p>
                        </div>
                    </button>
                    <button 
                        type="button"
                        onClick={() => { setMethod('cod'); onComplete({ method: 'COD', label: 'Kapıda Ödeme' }); }}
                        className={`flex-1 p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${method === 'cod' ? 'bg-green-600/10 border-green-500 shadow-[0_0_20_rgba(34,197,94,0.2)]' : 'bg-white/5 border-transparent opacity-40 hover:opacity-60'}`} 
                    >
                        <Truck size={28} className={method === 'cod' ? 'text-green-500' : 'text-white'} />
                        <div className="text-center">
                            <p className="font-bold text-sm text-white">Kapıda Ödeme</p>
                            <p className="text-[10px] text-gray-400 mt-1">Nakit / Kart</p>
                        </div>
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {method === 'card' ? (
                        <motion.div key="card-form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                            <div className='relative h-56 w-full max-w-[360px] mx-auto' style={{ perspective: '1000px' }}>
                                <motion.div 
                                    animate={{ rotateY: cardData.focused === 'cvv' ? 180 : 0 }} 
                                    transition={{ duration: 0.6 }} 
                                    className='relative w-full h-full shadow-2xl'
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className='absolute inset-0 bg-gradient-to-br from-blue-800 via-indigo-400 to-purple-800 rounded-[2rem] p-6 text-white border border-white/20' style={{ backfaceVisibility: 'hidden' }}>
                                        <div className="flex justify-between items-start"> 
                                            <div className="w-12 h-8 bg-amber-400/80 rounded-md shadow-inner"></div>
                                            <p className="italic font-black text-xl opacity-80 uppercase tracking-tighter">NexTrade</p>
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
                                    <div className='absolute inset-0 bg-slate-900 rounded-[2rem] py-8 border border-white/10' style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                        <div className='w-full h-12 bg-black/80 mb-6'></div>
                                        <div className='mx-8 bg-white/10 h-10 rounded-lg flex items-center justify-end px-4 font-mono font-bold text-lg text-white italic'>
                                            {cardData.cvv || '***'}
                                        </div>
                                        <div className="px-8 mt-4">
                                            <div className="w-16 h-10 border border-white/5 rounded opacity-20"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            <div className='grid grid-cols-2 gap-5'>
                                <div className="col-span-2">
                                    <input 
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
                                        placeholder="Kart Numarası"
                                        value={cardData.number}
                                        onChange={handleNumberChange}
                                        onFocus={() => setCardData({...cardData, focused: 'number'})}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <input 
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all uppercase placeholder:text-gray-600"
                                        placeholder="Kart Üzerindeki İsim"
                                        value={cardData.name}
                                        onChange={(e) => setCardData({...cardData, name: e.target.value})}
                                        onFocus={() => setCardData({...cardData, focused: 'name'})}
                                    />
                                </div>
                                <input 
                                    className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
                                    placeholder="MM/YY"
                                    value={cardData.expiry}
                                    onChange={handleExpiryChange}
                                    onFocus={() => setCardData({...cardData, focused: 'expiry'})}
                                />
                                <input 
                                    className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
                                    placeholder="CVV"
                                    maxLength={3}
                                    value={cardData.cvv}
                                    onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})}
                                    onFocus={() => setCardData({...cardData, focused: 'cvv'})}
                                />
                            </div>
                            <button 
                                type="button"
                                onClick={handlePaymentAction}
                                disabled={!isCardValid || isProcessing}
                                className={`w-full py-4 rounded-2xl font-black tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-2 ${isCardValid ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white/5 text-gray-500'}`}
                            >
                                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : "Kartı Doğrula & Devam Et"}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div key="cod-info" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 px-6 rounded-3xl bg-green-500/5 border border-green-500/20 text-center space-y-6">
                            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                                <ShieldCheck size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">Kapıda Ödeme Aktif</h3>
                                <p className="text-sm text-gray-400">Ödemenizi teslimat anında nakit veya kartla yapabilirsiniz.</p>
                            </div>
                        </motion.div>
                    )} 
                </AnimatePresence>
                <button 
                    type="button"
                    onClick={onBack} 
                    className='mt-10 text-[10px] font-black text-gray-500 hover:text-white w-full text-center transition-colors uppercase tracking-[0.3em]'
                >
                    ← TESLİMAT BİLGİLERİNE DÖN
                </button>
            </div>
        </div>
    );
};

export default PaymentForm;