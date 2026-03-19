"use client"
import { Info, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import SearchBar from './SearchBar'

const Navbar = () => {
  const path = usePathname();

  return (
    <nav className="sticky top-0 w-full flex items-center justify-between bg-brand-bg/40 backdrop-blur-xl px-6 py-4 gap-6 z-[100] border-b border-brand-border/10 shadow-2xl transition-colors duration-500">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Image
          alt='Logo'
          src="/logo.png"
          width={220}
          height={60}
          className="w-[160px] md:w-[200px] h-auto"
        />
      </Link>

      <SearchBar />

      <div className="flex items-center gap-6 text-brand-text/70 text-sm font-medium">
        <Link 
          href="/routes/about" 
          className={`flex items-center gap-2 hover:text-brand-text transition-colors ${path === "/about" ? "text-brand-primary" : ""}`}
        >
          <Info className="w-4 h-4" />
          <span className="hidden lg:inline">Hakkımızda</span>
        </Link>

        <Link 
          href="/routes/shoppingCart" 
          className={`relative flex items-center gap-2 hover:text-brand-text transition-colors ${path === "/routes/shoppingCart" ? "text-brand-primary" : ""}`}
        >
          <div className='relative'>
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-brand-bg animate-pulse">
              3
            </span>
          </div>
          <span className="hidden lg:inline">Sepetim</span>
        </Link>

        <Link 
          href="/routes/profile" 
          className="flex items-center gap-2 bg-brand-primary/10 hover:bg-brand-primary text-brand-text hover:text-white px-4 py-2 rounded-xl transition-all active:scale-95 border border-brand-primary/20"
        >
          <User className="w-4 h-4" />
          <span className="hidden md:inline">Profilim</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;