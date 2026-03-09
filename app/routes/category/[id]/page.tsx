"use client";

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot, limit, QueryConstraint } from "firebase/firestore";
import { Loader2, PackageX } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';

const CategoryPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const subCategoryId = params.id as string;

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const brand = searchParams.get('brand') || 'all';
    const gender = searchParams.get('gender') || 'all';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const minRating = Number(searchParams.get('rating')) || 0;
    const inStock = searchParams.get('inStock') === 'true';
    const discounted = searchParams.get('discounted') === 'true';
    const sort = searchParams.get('sort') || 'createdAt';

    const updateURL = (newParams: any) => {
        const current = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === 'all' || value === false || value === 0 || value === '') {
                current.delete(key);
            } else {
                current.set(key, String(value));
            }
        });
        router.push(`?${current.toString()}`, { scroll: false });
    };

    useEffect(() => {
        setLoading(true);

        const constraints: QueryConstraint[] = [
            where("subCategoryId", "==", subCategoryId),
            where("status", "==", "approved")
        ];

        if (brand !== 'all') constraints.push(where("brand", "==", brand));
        if (gender !== 'all') constraints.push(where("gender", "==", gender));
        if (inStock) constraints.push(where("inStock", "==", true));
        if (minRating > 0) constraints.push(where("rating", ">=", minRating));
        if (minPrice) constraints.push(where("price", ">=", Number(minPrice)));
        if (maxPrice) constraints.push(where("price", "<=", Number(maxPrice)));

        if (sort === 'price-asc') constraints.push(orderBy("price", "asc"));
        else if (sort === 'price-desc') constraints.push(orderBy("price", "desc"));
        else constraints.push(orderBy("createdAt", "desc"));

        constraints.push(limit(40));

        const q = query(collection(db, "products"), ...constraints);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                price: Number(doc.data().price),
                oldPrice: doc.data().oldPrice ? Number(doc.data().oldPrice) : null
            }));

            if (discounted) {
                data = data.filter(p => p.oldPrice && p.oldPrice > p.price);
            }

            setProducts(data);
            setLoading(false);
        }, (error) => {
            console.error("Firebase Query Error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [subCategoryId, brand, gender, minPrice, maxPrice, minRating, inStock, discounted, sort]);

    return (
        <div className="max-w-[1600px] mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-8">
                <ProductFilters 
                    filters={{
                        brands: ['Oakley', 'Nike', 'Adidas', 'Ray-Ban', 'Prada'],
                        genders: ['Erkek', 'Kadın', 'Unisex']
                    }}
                    state={{
                        selectedBrands: brand === 'all' ? [] : [brand],
                        selectedGenders: gender === 'all' ? [] : [gender],
                        minPrice, maxPrice, minRating,
                        onlyInStock: inStock,
                        onlyDiscounted: discounted
                    }}
                    setState={{
                        setSelectedBrands: (val: string) => updateURL({ brand: brand === val ? 'all' : val }),
                        setSelectedGenders: (val: string) => updateURL({ gender: gender === val ? 'all' : val }),
                        setMinPrice: (val: string) => updateURL({ minPrice: val }),
                        setMaxPrice: (val: string) => updateURL({ maxPrice: val }),
                        setMinRating: (val: number) => updateURL({ rating: val }),
                        setOnlyInStock: (val: boolean) => updateURL({ inStock: val }),
                        setOnlyDiscounted: (val: boolean) => updateURL({ discounted: val })
                    }}
                    resetFilters={() => router.push(window.location.pathname)}
                />

                <div className="flex-1">
                    {loading ? (
                        <div className="flex h-96 items-center justify-center">
                            <Loader2 className="animate-spin text-blue-500" size={40} />
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10 text-slate-500">
                            <PackageX className="mx-auto mb-4" size={48} />
                            <p>Kriterlere uygun ürün bulunamadı.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;