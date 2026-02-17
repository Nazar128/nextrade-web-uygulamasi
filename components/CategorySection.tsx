"use client";

import Image from "next/image";
import { categoryData } from "@/data/CategorySection";
import { ArrowUpRight } from "lucide-react";

const CategorySection = () => {
  return (
    <section className="max-w-[1600px] mx-auto py-16 px-6 md:px-12">
     
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-5xl font-black text-slate-800 tracking-tighter">
            Tarzını <span className="text-blue-600">Keşfet</span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg max-w-md">
            En yeni koleksiyonları ve sana özel seçilmiş kategorileri incele.
          </p>
        </div>
        <button className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2">
          Tüm Kategoriler <ArrowUpRight size={18} />
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6">
        {categoryData.map((category, index) => (
          <div
            key={category.id}
            className={`
              relative group overflow-hidden rounded-[2.5rem] cursor-pointer shadow-sm border border-slate-100 transition-all duration-700
              ${index === 0 ? "md:col-span-2 md:row-span-2" : ""} 
              ${index === 3 ? "md:col-span-2" : ""}
              ${category.bgColor || "bg-slate-50"}
            `}
          >
           
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/40 rounded-full blur-3xl group-hover:bg-blue-200/40 transition-colors duration-700" />

            <div className="absolute top-8 left-8 z-20">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                {category.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                Koleksiyonu İncele
              </p>
            </div>

            <div className="absolute inset-0 flex items-end justify-end p-6 pointer-events-none">
              <div className="relative w-full h-full transform transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3 translate-y-8 group-hover:translate-y-4 translate-x-4">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>


            <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl z-20">
              <ArrowUpRight className="text-slate-900" size={20} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;