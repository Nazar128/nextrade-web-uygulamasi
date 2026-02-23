"use client";
import { adresses } from '@/data/Addresses';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AddressForm = ({ onNext }: { onNext: (data: any) => void }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(adresses[0]?.id);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    address: ''
  });
  const [errors, setErrors] = useState<any>({});

  // Adres seçildiğinde formu otomatik dolduran fonksiyon
  const handleSelectAddress = (id: number) => {
    setSelectedAddressId(id);
    const findAddress = adresses.find(a => a.id === id);
    if (findAddress) {
      setFormData({
        fullName: findAddress.fullName || '', // Verinizde fullName yoksa boş döner
        phone: findAddress.phone || '',
        email: findAddress.email || '',
        city: findAddress.city,
        district: findAddress.district,
        address: findAddress.fulladdress || '' // Veri dosyanızdaki alan isimlerine dikkat edin
      });
      // Adres seçildiğinde eski hataları temizle
      setErrors({});
    }
  };

  // İlk açılışta ilk adresi forma yükle
  useEffect(() => {
    if (adresses.length > 0) {
      handleSelectAddress(adresses[0].id);
    }
  }, []);

  const validate = () => {
    let newErrors: any = {};
    if (!formData.fullName) newErrors.fullName = "Ad Soyad gerekli";
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Geçerli bir telefon giriniz";
    if (!formData.email.includes('@')) newErrors.email = "Geçerli bir e-posta giriniz";
    if (!formData.city) newErrors.city = "Şehir seçiniz";
    if (!formData.district) newErrors.district = "İlçe seçiniz";
    if (!formData.address) newErrors.address = "Açık adres giriniz";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <div className='w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl'>
      <div className='flex flex-col gap-8'>
        <div className='text-center'>
          <h1 className='text-2xl font-black text-white uppercase'>Teslimat Bilgileri</h1>
          <div className='h-1 w-12 bg-blue-500 mx-auto mt-2 rounded-full'></div>
        </div>

        {/* Kayıtlı Adresler */}
        <div className='space-y-3'>
          <h2 className='text-xs font-bold text-gray-400 uppercase ml-1'>Kayıtlı Adreslerim</h2>
          <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide'>
            {adresses.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleSelectAddress(item.id)}
                className={`flex-shrink-0 w-32 p-3 rounded-xl cursor-pointer border-2 transition-all ${selectedAddressId === item.id ? 'border-blue-500 bg-blue-500/20' : 'border-white/10 bg-white/5'}`}
              >
                <p className='text-[10px] font-bold text-blue-400 uppercase'>{item.title}</p>
                <p className='text-xs text-white truncate'>{item.city}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Alanları */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-[10px] font-bold text-gray-400 uppercase ml-1'>Ad Soyad</label>
            <input 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className={`bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none text-white transition-all`}
              placeholder='John Doe'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-[10px] font-bold text-gray-400 uppercase ml-1'>Telefon</label>
            <input 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={`bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none text-white transition-all`}
              placeholder='0555...'
            />
          </div>

          {/* E-posta, Şehir, İlçe inputlarına da value={formData.xxx} eklemeyi unutmayın */}
          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <label className='text-[10px] font-bold text-gray-400 uppercase ml-1'>E-posta</label>
            <input 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none text-white transition-all`}
              placeholder='mail@example.com'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-[10px] font-bold text-gray-400 uppercase ml-1'>Şehir</label>
            <input 
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className={`bg-white/5 border ${errors.city ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none text-white transition-all`}
              placeholder='İstanbul'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-[10px] font-bold text-gray-400 uppercase ml-1'>İlçe</label>
            <input 
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value})}
              className={`bg-white/5 border ${errors.district ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none text-white transition-all`}
              placeholder='Kadıköy'
            />
          </div>

          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <label className='text-[10px] font-bold text-gray-400 uppercase ml-1'>Açık Adres</label>
            <textarea 
              value={formData.address}
              rows={2}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className={`bg-white/5 border ${errors.address ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none text-white transition-all resize-none`}
              placeholder='Mahalle, sokak, kapı no...'
            />
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className='w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-extrabold tracking-wide transition-all shadow-lg shadow-blue-600/20'
        >
          ADRESİ KAYDET VE DEVAM ET
        </button>
      </div>
    </div>
  );
};