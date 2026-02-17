import CategorySection from '@/components/CategorySection'
import FeaturedProducts from '@/components/FeaturedProducts'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import React from 'react'

const page = () => {
  return (
    <div >
     <HeroSection/> 
     <FeaturedProducts/>
     <CategorySection/>

    </div>
   

  )
}

export default page