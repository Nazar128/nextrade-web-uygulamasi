"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { heroSectionData } from "@/data/HeroSection";
import { ChevronRight, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [autoplay.current]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
   
    <section className="relative w-full px-4 md:px-8 mx-auto max-w-[1500px] mt-6 overflow-hidden">
      
      
      <div className="relative h-[550px] md:h-[650px] overflow-hidden rounded-sm shadow-2xl bg-slate-900" ref={emblaRef}>
        <div className="flex h-full">
          {heroSectionData.map((item, index) => (
            <div
              key={item.id}
              className="relative min-w-full h-full flex items-center group overflow-hidden"
            >
              
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-[10s] ease-out"
                  style={{ transform: selectedIndex === index ? 'scale(1.1)' : 'scale(1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              </div>

              
              <div className="relative z-10 w-full px-8 md:px-16">
                <div className="max-w-2xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md text-blue-300 text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    Yeni Sezon Fırsatları
                  </div>

                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tighter">
                    {item.title}
                  </h2>

                  <p className="text-base md:text-xl text-slate-200 max-w-lg leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-4 items-center">
                    <Button className="h-14 px-10 bg-white text-black hover:bg-blue-600 hover:text-white rounded-full text-lg font-bold transition-all duration-300 group/btn shadow-xl">
                      {item.buttonText}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <button className="flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors">
                      Detaylı Bilgi <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>

              
              <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center justify-center w-36 h-36 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-bounce-slow">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">İndirim</span>
                <span className="text-white text-4xl font-black">{item.discount}</span>
              </div>
            </div>
          ))}
        </div>

        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {heroSectionData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="group relative h-1.5 transition-all duration-500 rounded-full overflow-hidden bg-white/30"
              style={{ width: selectedIndex === index ? '50px' : '10px' }}
            >
              {selectedIndex === index && (
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500"
                  style={{ 
                    width: '100%',
                    animation: 'progress 5s linear forwards' 
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;