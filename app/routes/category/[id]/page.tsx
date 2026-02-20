"use client";
import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useParams } from 'next/navigation';
import { SlidersHorizontal, Check, ArrowUpDown, Percent, Box, Star } from 'lucide-react';
import CategoryBar from '@/components/CategoryBar';
import Link from 'next/link';

const Page = () => {
  const params = useParams();
  const selectedSubCategoryId = params.id;


  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('default');

  const categoryProducts = useMemo(() =>
    products.filter(p => p.subCategoryId === Number(selectedSubCategoryId)),
    [selectedSubCategoryId]);

  const filters = useMemo(() => ({
    brands: Array.from(new Set(categoryProducts.map(p => p.brand))),
    colors: Array.from(new Set(categoryProducts.map(p => p.color))),
    patterns: Array.from(new Set(categoryProducts.map(p => p.pattern))),
    genders: ['Kadın', 'Erkek', 'Unisex']
  }), [categoryProducts]);

  const filteredProducts = useMemo(() => {
    let result = categoryProducts.filter(p => {
      const priceMatch = (minPrice === '' || p.price >= Number(minPrice)) &&
        (maxPrice === '' || p.price <= Number(maxPrice));
      const colorMatch = selectedColors.length === 0 || selectedColors.includes(p.color);
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(p.gender);
      const patternMatch = selectedPatterns.length === 0 || selectedPatterns.includes(p.pattern);
      const ratingMatch = p.rating >= minRating;
      const stockMatch = !onlyInStock || p.inStock;
      const discountMatch = !onlyDiscounted || (p.oldPrice && p.oldPrice > p.price);

      return priceMatch && colorMatch && brandMatch && genderMatch && patternMatch && ratingMatch && stockMatch && discountMatch;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [categoryProducts, minPrice, maxPrice, selectedColors, selectedBrands, selectedGenders, selectedPatterns, minRating, onlyInStock, onlyDiscounted, sortBy]);

  return (
    <div className='min-h-screen bg-gray-950 text-slate-200'>
      <CategoryBar />
      <div className='max-w-[1500px] mx-auto px-6 py-4'>

        <div className="mb-2 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-2">
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter  text-slate-300 leading-none">
              {categoryProducts[0]?.category || "Koleksiyon"}
            </h1>
            <p className="text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase mt-4">
              Sonuçlar ({filteredProducts.length})
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl outline-none focus:border-blue-500 transition-all text-white cursor-pointer"
          >
            <option value="default" className='bg-gray-900'>Sıralama: Önerilen</option>
            <option value="price-asc" className='bg-gray-900'>Fiyat: Artan</option>
            <option value="price-desc" className='bg-gray-900'>Fiyat: Azalan</option>
            <option value="rating" className='bg-gray-900'>Puan: En Yüksek</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          <aside className="w-full lg:w-80 lg:sticky lg:top-10 shrink-0">
            <div className="flex flex-col bg-white/[0.03] border border-white/5 rounded-[2.5rem] max-h-[calc(100vh-80px)] backdrop-blur-md">

              <div className="p-6 pb-4 flex items-center justify-between border-b border-white/5 shrink-0">
                <h2 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-white">
                  <SlidersHorizontal size={16} className="text-blue-500" /> Filtreler
                </h2>
                <button
                  onClick={() => {
                    setSelectedBrands([]); setSelectedColors([]); setSelectedGenders([]);
                    setSelectedPatterns([]); setMinRating(0); setMinPrice(''); setMaxPrice('');
                    setOnlyInStock(false); setOnlyDiscounted(false); setSortBy('default');
                  }}
                  className="text-[9px] font-bold text-slate-500 hover:text-red-500 transition-all uppercase underline underline-offset-4"
                >
                  Temizle
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">

                <div className="space-y-3 bg-white/5 p-4 rounded-2xl">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-white transition-colors flex items-center gap-2 uppercase tracking-tighter">
                      <Box size={14} className="text-blue-500" /> Sadece Stoktakiler
                    </span>
                    <input type="checkbox" checked={onlyInStock} onChange={() => setOnlyInStock(!onlyInStock)} className="w-4 h-4 accent-blue-600 rounded" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-white transition-colors flex items-center gap-2 uppercase tracking-tighter">
                      <Percent size={14} className="text-blue-500" /> İndirimli Ürünler
                    </span>
                    <input type="checkbox" checked={onlyDiscounted} onChange={() => setOnlyDiscounted(!onlyDiscounted)} className="w-4 h-4 accent-blue-600 rounded" />
                  </label>
                </div>

                <FilterSection title="Fiyat Aralığı (₺)">
                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="number" placeholder="Min" value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full bg-gray-900 border border-white/5 rounded-xl px-3 py-2.5 text-[11px] font-bold focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="w-4 h-[1px] bg-slate-800 shrink-0" />
                    <input
                      type="number" placeholder="Max" value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full bg-gray-900 border border-white/5 rounded-xl px-3 py-2.5 text-[11px] font-bold focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </FilterSection>

                <FilterSection title="Cinsiyet">
                  <div className="flex flex-wrap gap-2 mt-4">
                    {filters.genders.map(g => (
                      <FilterBadge
                        key={g} label={g}
                        active={selectedGenders.includes(g)}
                        onClick={() => setSelectedGenders(prev => prev.includes(g) ? prev.filter(i => i !== g) : [...prev, g])}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Markalar">
                  <div className="space-y-3 mt-4">
                    {filters.brands.map(brand => (
                      <CheckboxItem
                        key={brand} label={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(i => i !== brand) : [...prev, brand])}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Renk Seçenekleri">
                  <div className="flex flex-wrap gap-2 mt-4">
                    {filters.colors.map(color => (
                      <FilterBadge
                        key={color} label={color}
                        active={selectedColors.includes(color)}
                        onClick={() => setSelectedColors(prev => prev.includes(color) ? prev.filter(i => i !== color) : [...prev, color])}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Minimum Puan">
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[3, 4, 4.5].map(r => (
                      <button
                        key={r} onClick={() => setMinRating(minRating === r ? 0 : r)}
                        className={`py-2.5 rounded-xl text-[10px] font-black border transition-all flex items-center justify-center gap-1 ${minRating === r ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-900 border-white/5 text-slate-500 hover:border-white/10'}`}
                      >
                        {r}+ <Star size={10} fill={minRating === r ? "white" : "currentColor"} />
                      </button>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Desen & Stil">
                  <div className="space-y-3 mt-4 pb-4">
                    {filters.patterns.map(p => (
                      <CheckboxItem
                        key={p} label={p}
                        checked={selectedPatterns.includes(p)}
                        onChange={() => setSelectedPatterns(prev => prev.includes(p) ? prev.filter(i => i !== p) : [...prev, p])}
                      />
                    ))}
                  </div>
                </FilterSection>

              </div>
            </div>
          </aside>

          <main className="flex-1 w-full overflow-hidden">
            {filteredProducts.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12'>
                {filteredProducts.map((item) => (
                  <Link key={item.id} href={`/routes/product/${item.id}`} className=''>
                    <ProductCard key={item.id} product={item} />
                  </Link>

                ))}
              </div>
            ) : (
              <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[3.5rem] bg-white/[0.01]">
                <p className="text-slate-600 font-black uppercase tracking-widest text-xs">Aradığınız kriterlerde ürün bulunamadı</p>
                <button onClick={() => setMinPrice('')} className="mt-4 text-blue-500 text-[10px] font-black uppercase underline underline-offset-4">Filtreleri Sıfırla</button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};


const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="border-b border-white/5 pb-8 last:border-0">
    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2">{title}</h3>
    {children}
  </div>
);

const FilterBadge = ({ label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${active ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/30' : 'bg-gray-900 text-slate-400 border-white/5 hover:border-white/10 hover:text-slate-200'}`}
  >
    {label}
  </button>
);

const CheckboxItem = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-blue-600 border-blue-600 shadow-sm shadow-blue-600/50' : 'border-white/10 bg-white/5 group-hover:border-white/20'}`}>
      {checked && <Check size={12} className="text-white" strokeWidth={4} />}
    </div>
    <span className={`text-[12px] font-bold tracking-tight transition-colors ${checked ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{label}</span>
  </label>
);

export default Page;