"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface OrderSummaryProps {
  isFinalStep: boolean;
}

const OrderSummary = ({ isFinalStep }: OrderSummaryProps) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = (subtotal > 5000 || cartItems.length === 0) ? 0 : 150;
  const total = subtotal + shipping;

  const handleConfirmOrder = () => {
    if (isFinalStep) {
      router.push('/routes/success');
    }
  };

  return (
    <div className='w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl text-white'>
      <h2 className='text-xl font-bold mb-6 border-b border-white/10 pb-4'>Sipariş Özeti</h2>

      <div className='space-y-4 max-h-60 overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-gray-600'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className='flex items-center justify-between gap-4'>
              <div className='flex items-center gap-3'>
                <div className='relative flex-shrink-0'>
                  <img src={item.image} alt={item.title} className='w-12 h-12 rounded-lg object-cover border border-white/10 bg-white/5' />
                  <span className='absolute -top-2 -right-2 bg-blue-600 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold'>
                    {item.quantity}
                  </span>
                </div>
                <div className="min-w-0">
                   <p className='text-sm font-medium truncate w-32'>{item.title}</p>
                   <p className='text-[10px] text-gray-400'>{item.brand}</p>
                </div>
              </div>
              <p className='text-sm font-bold whitespace-nowrap'>{(item.price * item.quantity).toLocaleString('tr-TR')} TL</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic text-center">Sepet boş.</p>
        )}
      </div>

      <div className='space-y-3 border-t border-white/10 pt-4'>
        <div className='flex justify-between text-sm text-gray-400'>
          <span>Ara Toplam</span>
          <span className='text-white'>{subtotal.toLocaleString('tr-TR')} TL</span>
        </div>
        <div className='flex justify-between text-sm text-gray-400'>
          <span>Kargo</span>
          <span className={shipping === 0 ? 'text-green-400 font-bold' : 'text-white'}>
            {shipping === 0 ? 'Bedava' : `${shipping} TL`}
          </span>
        </div>

        <div className='flex justify-between text-xl font-black mt-6 pt-4 border-t border-white/20'>
          <span>Toplam</span>
          <span className='text-blue-400'>{total.toLocaleString('tr-TR')} TL</span>
        </div>
      </div>

      <motion.button
        onClick={handleConfirmOrder}
        whileHover={isFinalStep ? { scale: 1.02 } : {}}
        whileTap={isFinalStep ? { scale: 0.98 } : {}}
        className={`w-full font-bold py-4 rounded-2xl mt-8 shadow-lg transition-all ${
          isFinalStep 
          ? 'bg-green-600 hover:bg-green-500 shadow-green-600/30 text-white cursor-pointer' 
          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isFinalStep ? "Siparişi Onayla" : "Ödemeye Geçiniz"}
      </motion.button>
      
      <p className='text-[10px] text-center text-gray-500 mt-4 italic'>
        {isFinalStep ? "⚠️ Bilgilerinizi kontrol ediniz." : "* Ödeme adımına geçmek için bilgilerinizi tamamlayın."}
      </p>
    </div>
  );
};

export default OrderSummary;