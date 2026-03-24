import BestSellers from '@/components/BestSellers'
import BrandSection from '@/components/BrandSection'
import CategoryBar from '@/components/CategoryBar'
import CategorySection from '@/components/CategorySection'
import FeaturedProducts from '@/components/FeaturedProducts'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import PopularProducts from '@/components/PopularProducts'
import ProductCard from '@/components/ProductCard'
import RecentlyViewed from '@/components/RecentlyViewed'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NexTrade | Modern E-Ticaret ve Pazaryeri Platformu",
  description: "Aradığınız her şey NexTrade'de! En yeni teknoloji ürünleri, moda, ev dekorasyonu ve binlerce kategoride avantajlı fiyatları keşfedin.",
  keywords: ["e-ticaret", "pazaryeri", "online alışveriş", "indirimli ürünler", "NexTrade", "güvenli alışveriş"],
  openGraph: {
    title: "NexTrade | Güvenli ve Hızlı Alışverişin Adresi",
    description: "Binlerce ürün, güvenli ödeme seçenekleri ve hızlı teslimat avantajıyla NexTrade dünyasına adım atın.",
    siteName: "NexTrade",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "NexTrade E-Ticaret",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
  return (
<div>
  <CategoryBar/>
  <HeroSection/>
  <FeaturedProducts/>
<CategorySection/>
<BestSellers/>
<PopularProducts/>

  <BrandSection/>
 {/* <RecentlyViewed/> */}
</div>

   

  )
}

export default page