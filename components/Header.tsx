'use client'

import {
  ChevronDown,
  Grid3X3,
  Mail,
  Phone,
  Search,
  ShoppingCart,
  Menu,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b bg-white border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔹 Верхняя панель */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <Phone size={14} className="mr-1" />
              +38 (067) 123-45-67
            </span>
            <span className="flex items-center">
              <Mail size={14} className="mr-1" />
              info@skladtech.ua
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/delivery" className="hover:text-green-700">
              Доставка
            </Link>
          
            <Link href="/warranty" className="hover:text-green-700">
              Гарантія
            </Link>
          </div>
        </div>

        {/* 🔹 Основной хедер */}
        <div className="flex items-center justify-between py-4">
          {/* Логотип и каталог */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link
              href="/"
              className="text-2xl font-bold text-green-800 cursor-pointer"
            >
              SkladTech
            </Link>

            <Link
              href="/catalog"
              className="hidden sm:flex bg-green-800 text-white px-6 py-2 rounded items-center hover:bg-green-900 transition-colors"
            >
              <Grid3X3 size={18} className="mr-2" />
              Каталог товарів
            </Link>
          </div>

          {/* Поиск */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Пошук товарів..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-black pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <ShoppingCart size={18} className="text-green-800" />
              <span className="text-green-800 font-medium hidden sm:inline">
                Кошик
              </span>
            </Link>

            {/* Мобильное меню */}
            <button
              className="md:hidden p-2 text-green-800 border border-green-200 rounded-lg hover:bg-green-50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* 🔹 Мобильное меню */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 pb-4 animate-slideDown">
            <div className="flex flex-col space-y-3 mt-3 text-gray-700">
              <Link href="/catalog" className="hover:text-green-700">
                Каталог товарів
              </Link>
              <Link href="/delivery" className="hover:text-green-700">
                Доставка
              </Link>
             
              <Link href="/about" className="hover:text-green-700">
                Про нас
              </Link>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Пошук..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-black px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
