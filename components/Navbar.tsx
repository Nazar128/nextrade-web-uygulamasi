"use client"
import { Info, LayoutDashboard, Menu, PlusCircle, Search, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const role = "customer"; 
  const path = usePathname();

  return (
   
    <nav className="sticky top-0 w-full flex items-center justify-between bg-slate-900/80 backdrop-blur-xl px-6 py-4 gap-6 z-[100] border-b border-white/5 shadow-2xl">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Image
          alt='Logo'
          src="/logo.png"
          width={220}
          height={60}
          className="w-[160px] md:w-[200px] h-auto"
        />
      </Link>

     
      <div className='hidden md:flex flex-1 max-w-[600px] bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl items-center text-white px-4 py-2.5 transition-all group focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:bg-white/20'>
        <Search className='h-4 w-4 mr-3 text-slate-400 group-focus-within:text-white transition-colors' />
        <input
          placeholder='Aradığınız ürün, kategori veya marka...'
          className='w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400'
        />
      </div>

      <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
        <Link href="/about" className={`flex items-center gap-2 hover:text-white transition-colors ${path === "/about" ? "text-blue-400" : ""}`}>
          <Info className="w-4 h-4" />
          <span className="hidden lg:inline">Hakkımızda</span>
        </Link>

        
        <Link href="/card" className={`relative flex items-center gap-2 hover:text-white transition-colors ${path === "/card" ? "text-blue-400" : ""}`}>
          <div className='relative'>
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-slate-900 animate-pulse">3</span>
          </div>
          <span className="hidden lg:inline">Sepetim</span>
        </Link>

       
        <Link href="/login" className="flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-slate-900 px-4 py-2 rounded-xl transition-all active:scale-95 border border-white/10">
          <User className="w-4 h-4" />
          <span className="hidden md:inline">Profilim</span>
        </Link>
      </div>
    </nav>
  )
}
export default Navbar;