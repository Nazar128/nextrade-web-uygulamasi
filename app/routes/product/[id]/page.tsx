"use client";
import ProductDetail from '@/components/ProductDetail';
import { products } from '@/data/products';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
    const params = useParams();
    const selectedId = params.id;
    const product = products.find((p) => p.id === Number(selectedId));

    if (!product) {
        return (
            <div className="min-h-[60vh]  mx-auto p-6 text-white">
                <div className="text-center p-10 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10">
                    <h2 className="text-2xl font-bold">Ürün Bulunamadı</h2>
                    <p className="text-gray-400 mt-2">Aradığınız ürün stoklarımızda kalmamış olabilir.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen py-10">
            <div className="container mx-auto px-4">
                <ProductDetail />
            </div>
        </main>
    );
};

export default Page;