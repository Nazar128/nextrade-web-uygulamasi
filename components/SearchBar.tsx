"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Package, Tag, Layers, Loader2, X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, where, limit } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface SearchResult {
    id: string;
    title: string;
    type: 'product' | 'brand' | 'category';
    targetId: string | number;
}

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const performSearch = useCallback(async (val: string) => {
        if (val.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        setLoading(true);
        setIsOpen(true);

        try {
            const searchWords = val.toLowerCase().split(' ').filter(word => word.length > 0);
            
            const productsQuery = query(
                collection(db, "products"),
                where("status", "==", "approved"),
                limit(50)
            );
            const brandsQuery = query(collection(db, "brands"), limit(20));
            const categoriesQuery = query(collection(db, "categories"), limit(20));

            const [pSnap, bSnap, cSnap] = await Promise.all([
                getDocs(productsQuery),
                getDocs(brandsQuery),
                getDocs(categoriesQuery)
            ]);

            const productResults: SearchResult[] = pSnap.docs
                .map(doc => ({ docId: doc.id, ...doc.data() } as any))
                .filter(p => {
                    const title = (p.title || "").toLowerCase();
                    return searchWords.every(word => title.includes(word));
                })
                .map(p => ({ 
                    id: String(p.id), 
                    title: p.title || "Adsız Ürün", 
                    type: 'product', 
                    targetId: p.id 
                }));

            const brandResults: SearchResult[] = bSnap.docs
                .map(doc => doc.data() as any)
                .filter(b => {
                    const name = (b.name || "").toLowerCase();
                    return searchWords.some(word => name.includes(word));
                })
                .map(b => ({ 
                    id: b.name || Math.random().toString(), 
                    title: b.name || "Bilinmeyen Marka", 
                    type: 'brand', 
                    targetId: b.name || "" 
                }));

            const categoryResults: SearchResult[] = cSnap.docs
                .map(doc => ({ docId: doc.id, ...doc.data() } as any))
                .filter(c => {
                    const title = (c.title || "").toLowerCase();
                    return searchWords.some(word => title.includes(word));
                })
                .map(c => ({ 
                    id: String(c.id), 
                    title: c.title || "Kategori", 
                    type: 'category', 
                    targetId: c.id
                }));

            setResults([...productResults, ...brandResults, ...categoryResults].slice(0, 10));
        } catch (error) {
            console.error("Arama hatası:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) performSearch(searchTerm);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, performSearch]);

    const handleNavigate = (result: SearchResult) => {
        setIsOpen(false);
        setSearchTerm('');
        if (result.type === 'product') {
            router.push(`/routes/product/${result.targetId}`);
        } else if (result.type === 'brand') {
            router.push(`/routes/search?brand=${encodeURIComponent(result.targetId)}`);
        } else if (result.type === 'category') {
            router.push(`/routes/category/${result.targetId}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && searchTerm.length >= 2) {
            setIsOpen(false);
            router.push(`/routes/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-xl mx-auto font-sans">
            <div className="relative group">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
                    placeholder="Ürün, marka veya kategori ara..."
                    className="w-full bg-slate-900/50 border border-slate-800 text-white rounded-2xl py-3.5 px-12 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500" size={18} />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {loading && <Loader2 className="text-blue-500 animate-spin" size={18} />}
                    {searchTerm && !loading && (
                        <button onClick={() => { setSearchTerm(''); setResults([]); }} className="text-slate-500 hover:text-white transition-colors">
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {isOpen && searchTerm.length >= 2 && (
                <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 max-h-[420px] overflow-y-auto">
                        {results.length > 0 ? (
                            results.map((result, index) => (
                                <button
                                    key={`${result.type}-${result.id}-${index}`}
                                    onClick={() => handleNavigate(result)}
                                    className="w-full flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-xl transition-colors group"
                                >
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors shrink-0">
                                            {result.type === 'product' && <Package size={16} className="text-blue-400" />}
                                            {result.type === 'brand' && <Tag size={16} className="text-emerald-400" />}
                                            {result.type === 'category' && <Layers size={16} className="text-amber-400" />}
                                        </div>
                                        <span className="text-sm font-medium text-slate-200 line-clamp-1">{result.title}</span>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-950 px-2 py-1 rounded-md shrink-0 ml-2">
                                        {result.type === 'product' ? 'Ürün' : result.type === 'brand' ? 'Marka' : 'Kategori'}
                                    </span>
                                </button>
                            ))
                        ) : !loading && (
                            <div className="p-8 text-center">
                                <p className="text-sm text-slate-500 italic">Sonuç bulunamadı...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}