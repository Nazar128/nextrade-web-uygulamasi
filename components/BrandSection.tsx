"use client";

import Image from "next/image";
import { brands } from "@/data/Brands";
import { motion } from "framer-motion";

const BrandSection = () => {
    return (
        <section className="max-w-[1440px] py-24 bg-gray-950 overflow-hidden relative">
            <div className=" mx-auto px-6 mb-12">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] text-center">
                    Global Partnerlerimiz
                </h3>
            </div>

            <div className="relative flex">

                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-gray-950 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-gray-950 to-transparent z-10" />

                <motion.div
                    className="flex gap-6 items-center"
                    animate={{
                        x: ["0%", "-50%"]
                    }}
                    transition={{
                        ease: "linear",
                        duration: 40,
                        repeat: Infinity
                    }}
                >

                    {[...brands, ...brands].map((brand, index) => (
                        <div
                            key={`${brand.id}-${index}`}
                            className="flex-shrink-0 w-48 h-24 bg-white/[0.03] border border-white/5 rounded-3xl flex items-center justify-center group hover:bg-white/[0.07] hover:border-blue-500/30 transition-all duration-500"
                        >
                            <div className="relative w-24 h-10 transition-all duration-500 group-hover:scale-110">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain brightness-0 text-white invert opacity-60 group-hover:opacity-100 transition-opacity"

                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BrandSection;