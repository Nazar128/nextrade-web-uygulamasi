"use client"
import { Info, LayoutDashboard, Menu, PlusCircle, Search, ShoppingCart, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

type UserRole = "guest" | "customer" | "seller"

const mockUser = {
  role: "customer" as UserRole
}

const Navbar = () => {
  const role = mockUser.role
  const path = usePathname()
  return (

    <nav className="relative flex items-center justify-between bg-gradient-to-b from-gray-400 via-gray-700 to-gray-950 px-5 py-5 gap-6 z-50">
      <Link href="/" >
        <Image
          alt='Logo'
          src="/logo.png"
          width={300}
          height={96}
          className="w-[200px] md:w-[280px] h-auto block"
        />
      </Link>

      <div className=" flex items-center gap-4 ">
        <Search className="w-5 h-5 cursor-pointer md:hidden text-white" />
        <div className='hidden  md:flex  xl:w-[720px] bg-gray-950 text-sm rounded-xl items-center text-white p-2'>
          <Search className='h-4 w-4 mr-2' />
          <input
            placeholder='Aradığınız Ürün'
            className=' w-full  bg-transparent  text-sm  text-white focus:outline-none focus:ring-0'
          />
        </div>

        <Link href="/about" className={path === "/about" ? "flex items-center gap-2 text-white font-extrabold" : "flex items-center gap-2"}>
          <Info className="w-5 h-5" />
          <span className="hidden md:inline">Hakkımızda</span>
        </Link>

        {role === "guest" && (
          <>
            <Link href="/card" className={path === "/card" ? "flex items-center gap-2 text-white font-extrabold" : "flex items-center gap-2"}>
              <div className='relative'>
                <ShoppingCart className="w-5 h-5 cursor-pointer" />
                <span className=" absolute -top-2 -right-2  bg-red-800 text-xs px-1.5 rounded-full">3</span>
              </div>
              <span className="hidden md:inline">Sepet</span>
            </Link>

            <Link href="/login" className={path === "/login" ? "flex items-center gap-2 text-white font-extrabold" : "flex items-center gap-2"}>
              <User className="w-5 h-5 cursor-pointer" />
              <span className="hidden md:inline">Giriş Yap</span>
            </Link>
          </>

        )}
        {role === "customer" && (
          <>
            <Link href="/card" className={path === "/card" ? "flex items-center gap-2 text-white font-extrabold" : "flex items-center gap-2"}>
              <div className='relative'>
                <ShoppingCart className="w-5 h-5 cursor-pointer" />
                <span className=" absolute -top-2 -right-2  bg-red-800 text-xs px-1.5 rounded-full">3</span>
              </div>

              <span className="hidden md:inline">Sepetim</span>

            </Link>

            <Link href="/login" className={path === "/login" ? "flex items-center gap-2 text-white font-extrabold" : "flex items-center gap-2"}
            >
              <User className="w-5 h-5 cursor-pointer" />
              <span className="hidden md:inline">Profilim</span>
            </Link>
          </>
        )}

        {role === "seller" && (
          <>
            <Link href="/dashboard" className={path === "/dashboard" ? "flex items-center gap-2 text-white font-extrabold" : "flex items-center gap-2"}>
              <LayoutDashboard className="w-5 h-5 cursor-pointer" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>

            <Link href="/addProduct" className={path === "/addProduct" ? "flex items-center gap-2 text-white font-extrabold" : "flex items-center gap-2"}>
              <PlusCircle className='w-5 h-5 cursor-pointer' />
              <span className="hidden md:inline">Ürün Ekle</span>
            </Link>
            <Link href="/profile" className={path === "/profile" ? "flex items-center gap-2 text-white font-extrabold" : "flex items-center gap-2"}>
              <User className="w-5 h-5 cursor-pointer" />
              <span className="hidden md:inline">Profilim</span>
            </Link>
          </>
        )}
      </div>
    </nav>

  )
}

export default Navbar