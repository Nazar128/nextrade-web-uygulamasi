"use client";
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const queryTerm = searchParams.get('q')?.toLowerCase() || '';
    const brandParam = searchParams.get('brand');

    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [onlyInStock, setOnlyInStock] = useState(false);
    const [onlyDiscounted, setOnlyDiscounted] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
    const [minRating, setMinRating] = useState(0);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const q = query(collection(db, "products"), where("status", "==", "approved"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllProducts(data);
            } catch (error) {
                console.error("Firebase fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        return allProducts.filter(p => {
            if (brandParam) {
                if (p.brand !== brandParam) return false;
            } else if (queryTerm) {
                const words = queryTerm.split(' ');
                if (!words.every(w => p.title?.toLowerCase().includes(w))) return false;
            }

            if (onlyInStock && !p.inStock) return false;
            if (onlyDiscounted && (!p.oldPrice || p.oldPrice <= p.price)) return false;
            if (minPrice && p.price < Number(minPrice)) return false;
            if (maxPrice && p.price > Number(maxPrice)) return false;
            if (!brandParam && selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
            if (selectedGenders.length > 0 && !selectedGenders.includes(p.gender)) return false;
            if (minRating > 0 && (p.rating || 0) < minRating) return false;

            return true;
        });
    }, [allProducts, queryTerm, brandParam, onlyInStock, onlyDiscounted, minPrice, maxPrice, selectedBrands, selectedGenders, minRating]);

    const filterOptions = useMemo(() => ({
        brands: brandParam ? [] : Array.from(new Set(allProducts.map(p => p.brand))).filter(Boolean),
        genders: Array.from(new Set(allProducts.map(p => p.gender))).filter(Boolean)
    }), [allProducts, brandParam]);

    const resetFilters = () => {
        setOnlyInStock(false);
        setOnlyDiscounted(false);
        setMinPrice('');
        setMaxPrice('');
        setSelectedBrands([]);
        setSelectedGenders([]);
        setMinRating(0);
    };

    const filterState = { onlyInStock, onlyDiscounted, minPrice, maxPrice, selectedBrands, selectedGenders, minRating };
    const filterActions = {
        setOnlyInStock,
        setOnlyDiscounted,
        setMinPrice,
        setMaxPrice,
        setSelectedBrands: (brand: string) => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]),
        setSelectedGenders: (gender: string) => setSelectedGenders(prev => prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]),
        setMinRating
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-8 bg-slate-950 min-h-screen">
            <ProductFilters 
                filters={filterOptions} 
                state={filterState} 
                setState={filterActions} 
                resetFilters={resetFilters} 
            />

            <main className="flex-1">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                        {brandParam ? brandParam : `"${queryTerm}"`}
                        <span className="text-blue-600 ml-2">Sonuçları</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">{filteredProducts.length} ürün listeleniyor</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                        {[...Array(8)].map((_, i) => <div key={i} className="h-80 bg-white/5 rounded-[2rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}