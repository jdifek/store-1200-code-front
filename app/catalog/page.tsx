'use client'
import React, { useState } from 'react';
import { Search, User, Scale, Heart, ShoppingCart, Grid3X3, ChevronDown, Filter, Star, Phone, Mail, MapPin, ChevronRight, Grid, List, SlidersHorizontal } from 'lucide-react';

// Mock данные категорий на основе бэкенда
const mockCategories = [
  { 
    id: '1', 
    name: 'Холодильне обладнання',
    count: 391,
    subcategories: [
      { id: '1-1', name: 'Вітрини холодильні', count: 156 },
      { id: '1-2', name: 'Морозильні камери', count: 89 },
      { id: '1-3', name: 'Холодильні шафи', count: 146 }
    ]
  },
  { 
    id: '2', 
    name: 'Стелажі', 
    count: 182,
    subcategories: [
      { id: '2-1', name: 'Металеві стелажі', count: 98 },
      { id: '2-2', name: 'Дерев\'яні стелажі', count: 54 },
      { id: '2-3', name: 'Скляні вітрини', count: 30 }
    ]
  },
  { 
    id: '3', 
    name: 'Торгове обладнання', 
    count: 541,
    subcategories: [
      { id: '3-1', name: 'Касові апарати', count: 167 },
      { id: '3-2', name: 'Сканери штрих-кодів', count: 234 },
      { id: '3-3', name: 'Торгові ваги', count: 140 }
    ]
  },
  { 
    id: '4', 
    name: 'Меблі із нержавіючої сталі', 
    count: 30,
    subcategories: [
      { id: '4-1', name: 'Робочі столи', count: 15 },
      { id: '4-2', name: 'Мийки', count: 10 },
      { id: '4-3', name: 'Полиці', count: 5 }
    ]
  },
  { 
    id: '5', 
    name: 'Обладнання для професійної кухні', 
    count: 515,
    subcategories: [
      { id: '5-1', name: 'Плити та духовки', count: 178 },
      { id: '5-2', name: 'Посудомийні машини', count: 167 },
      { id: '5-3', name: 'Витяжки', count: 170 }
    ]
  },
  { 
    id: '6', 
    name: 'Металеві меблі', 
    count: 151,
    subcategories: [
      { id: '6-1', name: 'Шафи та гардероби', count: 67 },
      { id: '6-2', name: 'Столи', count: 45 },
      { id: '6-3', name: 'Стільці', count: 39 }
    ]
  },
  { 
    id: '7', 
    name: 'Меблі для аптек', 
    count: 10,
    subcategories: [
      { id: '7-1', name: 'Вітрини для ліків', count: 6 },
      { id: '7-2', name: 'Аптечні шафи', count: 4 }
    ]
  },
  { 
    id: '8', 
    name: 'Інструменти та техніка', 
    count: 47,
    subcategories: [
      { id: '8-1', name: 'Електроінструменти', count: 25 },
      { id: '8-2', name: 'Ручні інструменти', count: 22 }
    ]
  }
];

const mockProducts = [
  {
    id: '1',
    name: 'Електричний конвеєр для готування',
    price: 25400,
    oldPrice: null,
    rating: 4,
    reviews: 4,
    discount: null,
    categoryId: '5',
    image: '/api/placeholder/280/200'
  },
  {
    id: '2', 
    name: 'Професійна пристрій сому холодильник',
    price: 18900,
    oldPrice: 21000,
    rating: 5,
    reviews: 5,
    discount: 10,
    categoryId: '1',
    image: '/api/placeholder/280/200'
  },
  {
    id: '3',
    name: 'Касовий бокс для касових біс',
    price: 15600,
    oldPrice: null,
    rating: 4,
    reviews: 4,
    discount: null,
    categoryId: '3',
    image: '/api/placeholder/280/200'
  },
  // Добавим больше товаров для демонстрации
  {
    id: '4',
    name: 'Металевий стелаж для складу',
    price: 12800,
    oldPrice: 14500,
    rating: 4,
    reviews: 8,
    discount: 12,
    categoryId: '2',
    image: '/api/placeholder/280/200'
  },
  {
    id: '5',
    name: 'Професійна торгова вага з принтером',
    price: 32100,
    oldPrice: null,
    rating: 5,
    reviews: 12,
    discount: null,
    categoryId: '3',
    image: '/api/placeholder/280/200'
  },
  {
    id: '6',
    name: 'Холодильна вітрина для м\'яса',
    price: 45600,
    oldPrice: null,
    rating: 4,
    reviews: 6,
    discount: null,
    categoryId: '1',
    image: '/api/placeholder/280/200'
  }
];

const CatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('uk-UA').format(price) + ' ₴';
  };

  const filteredProducts = selectedCategory 
    ? mockProducts.filter(product => product.categoryId === selectedCategory)
    : mockProducts;

  return (
    <div className="min-h-screen bg-white">
      {/* Header - same as homepage */}
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
              <a href="#" className="text-gray-700 hover:text-green-800 font-medium">Головна</a>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-green-800 font-medium">Каталог товарів</span>
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar with categories */}
          <div className="w-80 pr-8 border-r border-gray-200">
            <div className="space-y-6">
              {mockCategories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between hover:bg-gray-50 ${
                      selectedCategory === category.id ? 'bg-green-50 text-green-800' : 'text-gray-700'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </button>
                  
                  {selectedCategory === category.id && (
                    <div className="ml-4 mt-2 space-y-1">
                      {category.subcategories.map((sub) => (
                        <a
                          key={sub.id}
                          href="#"
                          className="block py-1 px-3 text-sm text-gray-600 hover:text-green-800 hover:bg-gray-50 rounded"
                        >
                          {sub.name} ({sub.count})
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Фільтри</h3>
              
              {/* Price filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Ціна</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Від"
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    />
                    <span className="text-gray-500">—</span>
                    <input
                      type="number"
                      placeholder="До"
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                    />
                  </div>
                </div>
              </div>

              {/* Rating filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Рейтинг</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">і вище</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 ml-8">
            {/* Header with controls */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory ? mockCategories.find(c => c.id === selectedCategory)?.name : 'Каталог товарів'}
                </h1>
                <p className="text-gray-600">
                  Знайдено: <strong>{filteredProducts.length}</strong> товарів
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* View mode toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Grid size={16} className={viewMode === 'grid' ? 'text-green-800' : 'text-gray-600'} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <List size={16} className={viewMode === 'list' ? 'text-green-800' : 'text-gray-600'} />
                  </button>
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Сортувати:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="default">За замовчуванням</option>
                    <option value="price_asc">За ціною ↑</option>
                    <option value="price_desc">За ціною ↓</option>
                    <option value="rating">За рейтингом</option>
                    <option value="name">За назвою</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products grid/list */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group ${
                  viewMode === 'list' ? 'flex items-center p-4' : ''
                }`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-32 h-24 flex-shrink-0 mr-6' : 'aspect-[4/3]'}`}>
                    <div className={`bg-gray-100 ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-full'} rounded-lg flex items-center justify-center`}>
                      <div className="text-4xl text-gray-400">📦</div>
                    </div>
                    <div className="absolute top-2 left-2 flex space-x-1">
                      <button className="p-1 bg-white rounded-full shadow hover:bg-gray-50">
                        <Scale size={12} className="text-gray-600" />
                      </button>
                      <button className="p-1 bg-white rounded-full shadow hover:bg-gray-50">
                        <Heart size={12} className="text-gray-600" />
                      </button>
                    </div>
                    {product.discount && (
                      <span className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  
                  <div className={`${viewMode === 'grid' ? 'p-4' : 'flex-1'}`}>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={`${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{product.reviews} відгуків</span>
                    </div>
                    
                    <h3 className={`font-semibold text-gray-900 group-hover:text-green-800 transition-colors ${
                      viewMode === 'list' ? 'text-lg mb-2' : 'mb-3 text-sm'
                    }`}>
                      {product.name}
                    </h3>
                    
                    <div className={`flex items-center ${viewMode === 'list' ? 'justify-between' : 'justify-between'}`}>
                      <div>
                        <div className={`font-bold text-gray-900 ${viewMode === 'list' ? 'text-xl' : 'text-lg'}`}>
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

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mt-12">
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                Попередня
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 border rounded text-sm ${
                    page === 1 ? 'bg-green-800 text-white border-green-800' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                Наступна
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - same as homepage */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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

export default CatalogPage;