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
  <RecentlyViewed/>
</div>

   

  )
}

export default page