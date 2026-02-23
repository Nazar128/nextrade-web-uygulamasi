"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PaymentForm = ({ isActive, onBack }: { isActive: boolean; onBack: () => void }) => {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    focused: ''
  });
  const [errors, setErrors] = useState<any>({});

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData({ ...cardData, number: value });
  };

  const validatePayment = () => {
    let newErrors: any = {};
    if (cardData.number.length < 19) newErrors.number = "Eksik numara";
    if (!cardData.name) newErrors.name = "İsim gerekli";
    if (!cardData.expiry.includes('/')) newErrors.expiry = "Geçersiz SKT";
    if (cardData.cvv.length < 3) newErrors.cvv = "Eksik CVV";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 

  return (
    <div className={`w-full transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
      <div className='bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl'>
        
        <div className='relative h-48 w-full max-w-[320px] mx-auto mb-10 perspective-1000'>
          <motion.div 
            animate={{ rotateY: cardData.focused === 'cvv' ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            className='relative w-full h-full preserve-3d'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white backface-hidden shadow-2xl'>
              <div className='flex justify-between items-start'>
                <div className='w-10 h-7 bg-yellow-500/80 rounded-sm'></div>
                <span className='font-bold italic italic'>VISA</span>
              </div>
              <p className='text-lg tracking-[4px] font-mono mt-8'>{cardData.number || '#### #### #### ####'}</p>
              <div className='mt-6 flex justify-between uppercase'>
                <div>
                  <p className='text-[8px] opacity-60 uppercase'>Kart Sahibi</p>
                  <p className='text-xs font-bold truncate w-24'>{cardData.name || 'AD SOYAD'}</p>
                </div>
                <div>
                  <p className='text-[8px] opacity-60 uppercase'>SKT</p>
                  <p className='text-xs font-bold'>{cardData.expiry || 'MM/YY'}</p>
                </div>
              </div>
            </div>
            <div className='absolute inset-0 bg-gray-800 rounded-2xl py-6 rotate-y-180 backface-hidden shadow-2xl'>
              <div className='w-full h-10 bg-black mb-4'></div>
              <div className='mx-6 bg-white h-8 rounded text-black flex items-center justify-end px-3 font-mono font-bold'>
                {cardData.cvv || '***'}
              </div>
            </div>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='md:col-span-2 flex flex-col gap-1'>
            <label className='text-[10px] font-bold text-gray-400 ml-1'>Kart Numarası</label>
            <input 
              value={cardData.number}
              onChange={handleNumberChange}
              onFocus={() => setCardData({...cardData, focused: 'number'})}
              className={`bg-white/5 border ${errors.number ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm text-white outline-none`}
              placeholder='0000 0000 0000 0000'
            />
          </div>

          <div className='md:col-span-2 flex flex-col gap-1'>
            <label className='text-[10px] font-bold text-gray-400 ml-1'>Kart Üzerindeki İsim</label>
            <input 
              onChange={(e) => setCardData({...cardData, name: e.target.value})}
              onFocus={() => setCardData({...cardData, focused: 'name'})}
              className={`bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm text-white outline-none uppercase`}
              placeholder='JOHN DOE'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-[10px] font-bold text-gray-400 ml-1'>SKT</label>
            <input 
              onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
              onFocus={() => setCardData({...cardData, focused: 'expiry'})}
              className={`bg-white/5 border ${errors.expiry ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm text-white outline-none`}
              placeholder='MM/YY'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-[10px] font-bold text-gray-400 ml-1'>CVV</label>
            <input 
              maxLength={3}
              onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
              onFocus={() => setCardData({...cardData, focused: 'cvv'})}
              onBlur={() => setCardData({...cardData, focused: ''})}
              className={`bg-white/5 border ${errors.cvv ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm text-white outline-none`}
              placeholder='***'
            />
          </div>
        </div>


        <button onClick={onBack} className='mt-4 text-xs text-gray-400 hover:text-white w-full text-center'>
          ← Adres Bilgilerine Dön
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;