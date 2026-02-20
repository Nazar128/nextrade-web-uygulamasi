"use client";
import { products } from '@/data/products';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Star, ShoppingCart, Truck, RefreshCcw, Check, ArrowRight } from 'lucide-react';

const ProductDetail = () => {
    const params = useParams();
    const router = useRouter();
    const [added, setAdded] = useState(false);

    const slug = params.id;
    const product = products.find(p => p.id === Number(slug));

    if (!product) return null;

    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingProductIndex = existingCart.findIndex((item: any) => item.id === product.id);

        if (existingProductIndex > -1) {
            existingCart[existingProductIndex].quantity += 1;
        } else {
            existingCart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                brand: product.brand,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(existingCart));


        setAdded(true);
        setTimeout(() => setAdded(false), 4000);
    };

    return (
        <div className='max-w-[1200px] mx-auto p-4 text-white overflow-x-hidden'>
            <div className='bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] p-6 md:p-12 border border-white/10 shadow-2xl'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>

                    <div className='relative aspect-square flex items-center justify-center bg-white/[0.05] rounded-[2rem] overflow-hidden border border-white/5'>
                        <Image src={product.image} alt={product.title} height={600} width={600} className='object-contain p-8 hover:scale-110 transition-transform duration-700' />
                        {product.isNew && <span className="absolute top-6 left-6 bg-blue-600 px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-blue-600/20">YENİ</span>}
                    </div>

                    <div className='flex flex-col justify-center space-y-6'>
                        <div className="space-y-2">
                            <span className='text-blue-400 text-sm font-medium tracking-widest uppercase'>{product.brand}</span>
                            <h1 className='text-3xl md:text-4xl font-bold'>{product.title}</h1>
                            <div className='flex flex-wrap items-center gap-4'>
                                <div className='flex items-center bg-yellow-400/10 px-3 py-1 rounded-lg border border-yellow-400/20'>
                                    <Star size={18} className='text-yellow-400 fill-yellow-400' />
                                    <span className='ml-2 text-yellow-400 font-bold'>{product.rating}</span>
                                </div>
                                <span className='text-gray-400 text-sm'>{product.salesCount}+ Satış</span>
                            </div>
                        </div>

                        <p className='text-gray-300 text-base md:text-lg leading-relaxed'>{product.description}</p>

                        <div className='flex items-baseline space-x-4'>
                            <span className='text-4xl font-extrabold'>{product.price.toLocaleString('tr-TR')} TL</span>
                            {product.oldPrice && <span className='text-xl text-gray-500 line-through'>{product.oldPrice.toLocaleString('tr-TR')} TL</span>}
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3'>
                            <button
                                onClick={addToCart}
                                className={`flex-1 ${added ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'} text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-600/20`}
                            >
                                {added ? <><Check size={20} /> Sepete Eklendi</> : <><ShoppingCart size={20} /> Sepete Ekle</>}
                            </button>

                            {added && (
                                <button
                                    onClick={() => router.push('/routes/shoppingCart')}
                                    className='flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all animate-in fade-in slide-in-from-right-2 border border-white/10'
                                >
                                    Sepete Git <ArrowRight size={18} />
                                </button>
                            )}
                        </div>

                        <div className='grid grid-cols-2 gap-4 pt-8 border-t border-white/10'>
                            <div className='flex items-center gap-3 text-xs md:text-sm text-gray-400'>
                                <Truck size={20} className="text-blue-400 flex-shrink-0" /> <span>Ücretsiz Kargo</span>
                            </div>
                            <div className='flex items-center gap-3 text-xs md:text-sm text-gray-400'>
                                <RefreshCcw size={20} className="text-blue-400 flex-shrink-0" /> <span>30 Gün İade</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='mt-8 md:mt-12 bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 md:p-8'>
                <h3 className='text-xl md:text-2xl font-bold mb-6'>Teknik Detaylar</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-12'>
                    <DetailRow label="Kategori" value={product.category} />
                    <DetailRow label="Cinsiyet" value={product.gender} />
                    <DetailRow label="Desen" value={product.pattern} />
                    <DetailRow label="Stok Durumu" value={product.inStock ? "Stokta Var" : "Tükendi"} />
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <div className='flex justify-between py-4 border-b border-white/5'>
        <span className='text-gray-500 text-sm'>{label}</span>
        <span className='text-gray-200 font-medium text-sm'>{value}</span>
    </div>
);

export default ProductDetail;