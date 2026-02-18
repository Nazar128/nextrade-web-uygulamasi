"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { featuredProducts } from "@/data/products"; 
import ProductCard from "@/components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedProducts = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="max-w-[1440px] mx-auto py-20 px-6 md:px-8">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">
            Keşfetmeye Başla
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Öne Çıkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Ürünler</span>
          </h2>
        </div>

        <div className="flex gap-3 mb-1">
          <button
            onClick={scrollPrev}
            className="group w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 transition-all duration-300 shadow-sm"
          >
            <ChevronLeft className="text-slate-600 group-hover:text-white transition-colors" size={24} />
          </button>

          <button
            onClick={scrollNext}
            className="group w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 transition-all duration-300 shadow-sm"
          >
            <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={24} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex -ml-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="pl-6 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;