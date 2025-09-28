'use client'
import React, { useState, useEffect } from 'react';
import { Search, User, Scale, Heart, ShoppingCart, Grid3X3, ChevronDown, Filter, Star, Phone, Mail, MapPin } from 'lucide-react';

// Mock данные на основе бэкенда
const mockCategories = [
  { 
    id: '1', 
    name: 'ВІЗКИ ТА КОРЗИНИ ДЛЯ СУПЕРМАРКЕТІВ', 
    count: 145,
    image: '/api/placeholder/200/150'
  },
  { 
    id: '2', 
    name: 'АКЦІЙНІ КОРЗИНИ', 
    count: 89,
    image: '/api/placeholder/200/150'
  },
  { 
    id: '3', 
    name: 'ТОРГОВІ ГАЧКИ', 
    count: 267,
    image: '/api/placeholder/200/150'
  },
  { 
    id: '4', 
    name: 'ДОДАТКОВІ АКСЕСУАРИ', 
    count: 156,
    image: '/api/placeholder/200/150'
  }
];

const mockFeaturedProducts = [
  {
    id: '1',
    name: 'Холодильне обладнання для супермаркетів',
    price: 45600,
    oldPrice: null,
    rating: 4,
    reviews: 12,
    discount: null,
    image: '/api/placeholder/280/200'
  },
  {
    id: '2',
    name: 'Професійна торгова вага з принтером',
    price: 18500,
    oldPrice: 20500,
    rating: 5,
    reviews: 8,
    discount: 10,
    image: '/api/placeholder/280/200'
  },
  {
    id: '3',
    name: 'Модульний стелаж для складського приміщення',
    price: 32400,
    oldPrice: null,
    rating: 4,
    reviews: 15,
    discount: null,
    image: '/api/placeholder/280/200'
  }
];

const mockReviews = [
  {
    id: '1',
    content: 'Замовляли комплект холодильного обладнання для нашого супермаркету. Якість відмінна, монтаж провели швидко та професійно.',
    rating: 5,
    author: 'Олексій Петренко',
    company: 'Мережа АТБ',
    date: '2024-12-10'
  },
  {
    id: '2',
    name: 'Купували торгові ваги та стелажі. Все працює бездоганно, ціни конкурентні, доставка вчасно.',
    rating: 5,
    author: 'Марина Коваленко', 
    company: 'Сільпо',
    date: '2024-12-08'
  }
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentReview, setCurrentReview] = useState(0);

  

  const formatPrice = (price: number ) => {
    return new Intl.NumberFormat('uk-UA').format(price) + ' ₴';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-100">
            <div className="flex items-center space-x-6">
              <span className="flex items-center"><Phone size={14} className="mr-1" />+38 (067) 123-45-67</span>
              <span className="flex items-center"><Mail size={14} className="mr-1" />info@skladtech.ua</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-green-700">Доставка</a>
              <a href="#" className="hover:text-green-700">Оплата</a>
              <a href="#" className="hover:text-green-700">Гарантія</a>
            </div>
          </div>
          
          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-green-800">
                SkladTech
              </div>
              
              <button className="bg-green-800 text-white px-6 py-2 rounded flex items-center hover:bg-green-900 transition-colors">
                <Grid3X3 size={18} className="mr-2" />
                Каталог товарів
              </button>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Пошук товарів..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded relative">
                <Scale size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded relative">
                <Heart size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <User size={20} className="text-gray-600" />
              </button>
              <button className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors">
                <ShoppingCart size={18} className="text-green-800" />
                <span className="text-green-800 font-medium">Кошик</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="py-3 border-t border-gray-100">
            <div className="flex items-center space-x-8 text-sm">
              <a href="#" className="text-gray-700 hover:text-green-800 font-medium">Галерея</a>
              <a href="#" className="text-gray-700 hover:text-green-800">Блог</a>
              <a href="#" className="text-gray-700 hover:text-green-800">FAQ</a>
              <a href="#" className="text-gray-700 hover:text-green-800">Контакти</a>
              <div className="flex items-center text-gray-700 hover:text-green-800 cursor-pointer">
                <span>Послуги</span>
                <ChevronDown size={14} className="ml-1" />
              </div>
              <a href="#" className="text-gray-700 hover:text-green-800">Проектування магазинів</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Професійне торгове обладнання для вашого бізнесу
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Холодильне обладнання, торгові ваги, стелажі та все необхідне для супермаркетів від провідних виробників
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors">
                Переглянути каталог
              </button>
              <button className="border border-green-800 text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-800 hover:text-white transition-colors">
                Отримати консультацію
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <div key={category.id} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-[4/3] flex items-center justify-center">
                  <div className="text-6xl text-gray-400">📦</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-800 transition-colors text-center text-sm uppercase tracking-wide">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Рекомендовані товари</h2>
              <p className="text-gray-600">Найпопулярніші рішення для торгового обладнання</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Знайдено: <strong>156</strong> товарів</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Сортувати:</span>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option>За замовчуванням</option>
                  <option>За ціною ↑</option>
                  <option>За ціною ↓</option>
                  <option>За рейтингом</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockFeaturedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative">
                  <div className="aspect-[4/3] bg-gray-100 rounded-t-lg flex items-center justify-center">
                    <div className="text-6xl text-gray-400">📦</div>
                  </div>
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <button className="p-1.5 bg-white rounded-full shadow hover:bg-gray-50">
                      <Scale size={14} className="text-gray-600" />
                    </button>
                    <button className="p-1.5 bg-white rounded-full shadow hover:bg-gray-50">
                      <Heart size={14} className="text-gray-600" />
                    </button>
                  </div>
                  {product.discount && (
                    <span className="absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={`${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">{product.reviews} відгуків</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-4 group-hover:text-green-800 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </div>
                      {product.oldPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(product.oldPrice)}
                        </div>
                      )}
                    </div>
                    <button className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-900 transition-colors">
                      В кошик
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Відгуки наших клієнтів</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Довіра провідних торгових мереж України
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <blockquote className="text-lg text-gray-800 mb-6 italic">
                "{mockReviews[currentReview].content}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {mockReviews[currentReview].author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{mockReviews[currentReview].author}</div>
                  <div className="text-gray-600 text-sm">{mockReviews[currentReview].company}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Потрібна професійна консультація?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Наші експерти допоможуть підібрати оптимальне рішення для вашого торгового об'єкта
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Замовити дзвінок
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors">
              Онлайн-консультація
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">SkladTech</div>
              <p className="text-gray-300 mb-4">
                Професійне торгове обладнання та комплексні рішення для бізнесу
              </p>
              <div className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2" />
                <span>Київ, вул. Промислова, 15</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Каталог</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Холодильне обладнання</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Торгові ваги</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Стелажі та меблі</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Касове обладнання</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Послуги</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Проектування</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Монтаж</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Сервісне обслуговування</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Консультації</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакти</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  <span>+38 (067) 123-45-67</span>
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <span>info@skladtech.ua</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkladTech. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;