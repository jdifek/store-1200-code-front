"use client";
import React, { useState } from "react";
import {
  Search,
  User,
  Scale,
  Heart,
  ShoppingCart,
  Grid3X3,
  ChevronDown,
  Filter,
  Star,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Grid,
  List,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";

// Mock данные категорий на основе бэкенда
const mockCategories = [
  {
    id: "1",
    name: "Штабелеры",
    count: 28,
    subcategories: [
      { id: "1-1", name: "Электрические штабелеры", count: 10 },
      { id: "1-2", name: "Ручные штабелеры", count: 9 },
      { id: "1-3", name: "Самоходные штабелеры", count: 9 },
    ],
  },
  {
    id: "2",
    name: "Реф-контейнеры",
    count: 42,
    subcategories: [
      { id: "2-1", name: "40-футовые реф-контейнеры", count: 15 },
      { id: "2-2", name: "20-футовые реф-контейнеры", count: 14 },
      { id: "2-3", name: "Б/у реф-контейнеры", count: 13 },
    ],
  },
  {
    id: "3",
    name: "Резервуары",
    count: 31,
    subcategories: [
      { id: "3-1", name: "Резервуары для топлива", count: 12 },
      { id: "3-2", name: "Резервуары для воды", count: 10 },
      { id: "3-3", name: "Резервуары для химических жидкостей", count: 9 },
    ],
  },
  {
    id: "4",
    name: "Посты охраны",
    count: 15,
    subcategories: [
      { id: "4-1", name: "Модульные посты охраны", count: 7 },
      { id: "4-2", name: "Контейнерные посты охраны", count: 5 },
      { id: "4-3", name: "Передвижные посты охраны", count: 3 },
    ],
  },
  {
    id: "5",
    name: "Погрузчики",
    count: 36,
    subcategories: [
      { id: "5-1", name: "Электропогрузчики", count: 12 },
      { id: "5-2", name: "Дизельные погрузчики", count: 12 },
      { id: "5-3", name: "Газовые погрузчики", count: 12 },
    ],
  },
  {
    id: "6",
    name: "Контейнеры",
    count: 51,
    subcategories: [
      { id: "6-1", name: "20-футовые контейнеры", count: 20 },
      { id: "6-2", name: "40-футовые контейнеры", count: 18 },
      { id: "6-3", name: "Контейнеры б/у", count: 13 },
    ],
  },
  {
    id: "7",
    name: "Ёмкости",
    count: 2,
    subcategories: [
      { id: "7-1", name: "Ёмкости для воды", count: 9 },
      { id: "7-2", name: "Ёмкости для топлива", count: 9 },
      { id: "7-3", name: "Пищевые ёмкости", count: 9 },
    ],
  },
  {
    id: "8",
    name: "Бытовки на колёсах",
    count: 18,
    subcategories: [
      { id: "8-1", name: "Жилые бытовки на колёсах", count: 6 },
      { id: "8-2", name: "Офисные бытовки на колёсах", count: 6 },
      { id: "8-3", name: "Строительные бытовки на колёсах", count: 6 },
    ],
  },
  {
    id: "9",
    name: "Бытовки",
    count: 45,
    subcategories: [
      { id: "9-1", name: "Жилые бытовки", count: 15 },
      { id: "9-2", name: "Строительные бытовки", count: 15 },
      { id: "9-3", name: "Офисные бытовки", count: 15 },
    ],
  },
  {
    id: "10",
    name: "Асики",
    count: 2,
    subcategories: [
      { id: "10-1", name: "ASIC для Bitcoin", count: 9 },
      { id: "10-2", name: "ASIC для Litecoin", count: 7 },
      { id: "10-3", name: "ASIC для Dogecoin", count: 7 },
    ],
  },
];
const mockProducts = [
  
  {
    id: "19",
    name: "Вitmаin Аntminеr S21 Нydrо 335th",
    price: 92000,
    oldPrice: 99500,
    rating: 5,
    reviews: 15,
    discount: 7,
    categoryId: "10",
    image: "/2.jpg",
  },
  {
    id: "20",
    name: "Вitmаin Аntminеr S21 Нydrо 319th",
    price: 235000,
    oldPrice: null,
    rating: 5,
    reviews: 12,
    discount: null,
    categoryId: "10",
    image: "/1.jpg",
  },
  {
    id: "13",
    name: "Смешивающий растворный узел для жидких и сухих удо",
    price: 185000,
    oldPrice: 187000,
    rating: 5,
    reviews: 9,
    discount: 8,
    categoryId: "7",
    image: "/6.jpg",
  },
  {
    id: "14",
    name: "Мобильный растворный узел для кас, жку, сзр",
    price: 160000,
    oldPrice: null,
    rating: 4,
    reviews: 4,
    discount: null,
    categoryId: "7",
    image: "/4.jpg",
  },
  {
    id: "1",
    name: "Электрический штабелер Linde L10",
    price: 245000,
    oldPrice: 268000,
    rating: 5,
    reviews: 12,
    discount: 9,
    categoryId: "1",
    image: "/api/placeholder/280/200",
  },
  {
    id: "2",
    name: "Ручной штабелер Toyota 1000 кг",
    price: 78000,
    oldPrice: null,
    rating: 4,
    reviews: 6,
    discount: null,
    categoryId: "1",
    image: "/api/placeholder/280/200",
  },

  {
    id: "3",
    name: "Реф-контейнер 40 футов Carrier",
    price: 380000,
    oldPrice: 420000,
    rating: 5,
    reviews: 8,
    discount: 10,
    categoryId: "2",
    image: "/api/placeholder/280/200",
  },
  {
    id: "4",
    name: "Реф-контейнер 20 футов Thermo King",
    price: 295000,
    oldPrice: null,
    rating: 4,
    reviews: 5,
    discount: null,
    categoryId: "2",
    image: "/api/placeholder/280/200",
  },

  {
    id: "5",
    name: "Резервуар для топлива 10 м³",
    price: 215000,
    oldPrice: null,
    rating: 5,
    reviews: 7,
    discount: null,
    categoryId: "3",
    image: "/api/placeholder/280/200",
  },
  {
    id: "6",
    name: "Резервуар для воды пластиковый 5000 л",
    price: 48000,
    oldPrice: 55000,
    rating: 4,
    reviews: 4,
    discount: 13,
    categoryId: "3",
    image: "/api/placeholder/280/200",
  },

  {
    id: "7",
    name: "Пост охраны 2х2,5 м утеплённый",
    price: 162000,
    oldPrice: null,
    rating: 5,
    reviews: 9,
    discount: null,
    categoryId: "4",
    image: "/api/placeholder/280/200",
  },
  {
    id: "8",
    name: "Контейнерный пост охраны 3х3 м",
    price: 210000,
    oldPrice: 225000,
    rating: 4,
    reviews: 5,
    discount: 7,
    categoryId: "4",
    image: "/api/placeholder/280/200",
  },

  {
    id: "9",
    name: "Электропогрузчик Toyota 1.5 т",
    price: 640000,
    oldPrice: 695000,
    rating: 5,
    reviews: 11,
    discount: 8,
    categoryId: "5",
    image: "/api/placeholder/280/200",
  },
  {
    id: "10",
    name: "Дизельный погрузчик Doosan 2.5 т",
    price: 580000,
    oldPrice: null,
    rating: 4,
    reviews: 8,
    discount: null,
    categoryId: "5",
    image: "/api/placeholder/280/200",
  },

  {
    id: "11",
    name: "Контейнер 40 футов High Cube",
    price: 215000,
    oldPrice: 239000,
    rating: 5,
    reviews: 10,
    discount: 10,
    categoryId: "6",
    image: "/api/placeholder/280/200",
  },
  {
    id: "12",
    name: "Контейнер 20 футов стандартный",
    price: 165000,
    oldPrice: null,
    rating: 4,
    reviews: 6,
    discount: null,
    categoryId: "6",
    image: "/api/placeholder/280/200",
  },

 

  {
    id: "15",
    name: "Бытовка на колёсах строительная 6 м",
    price: 195000,
    oldPrice: 210000,
    rating: 4,
    reviews: 6,
    discount: 7,
    categoryId: "8",
    image: "/api/placeholder/280/200",
  },
  {
    id: "16",
    name: "Бытовка на колёсах офисная 5 м",
    price: 225000,
    oldPrice: null,
    rating: 5,
    reviews: 5,
    discount: null,
    categoryId: "8",
    image: "/api/placeholder/280/200",
  },

  {
    id: "17",
    name: "Бытовка строительная 6х2.5 м",
    price: 145000,
    oldPrice: 159000,
    rating: 4,
    reviews: 8,
    discount: 9,
    categoryId: "9",
    image: "/api/placeholder/280/200",
  },
  {
    id: "18",
    name: "Жилая бытовка 6х3 м с отделкой",
    price: 185000,
    oldPrice: null,
    rating: 5,
    reviews: 10,
    discount: null,
    categoryId: "9",
    image: "/api/placeholder/280/200",
  },

];

const CatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("uk-UA").format(price) + " ₴";
  };

  const filteredProducts = selectedCategory
    ? mockProducts.filter((product) => product.categoryId === selectedCategory)
    : mockProducts;

  return (
    <div className="min-h-screen bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Верхняя панель фильтров для мобильных */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <h1 className="text-xl font-semibold text-gray-900">Каталог товарів</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
        >
          <Filter size={16} className="mr-2" />
          Фільтри
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar — категории и фильтры */}
        <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-full lg:w-80 lg:pr-8 lg:border-r border-gray-200 mb-6 lg:mb-0`}
        >
          <div className="space-y-6">
          {mockCategories.map((category) => (
  <button
    key={category.id}
    onClick={() =>
      setSelectedCategory(
        selectedCategory === category.id ? null : category.id
      )
    }
    className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between hover:bg-gray-50 ${
      selectedCategory === category.id
        ? 'bg-green-50 text-green-800'
        : 'text-gray-700'
    }`}
  >
    <span className="font-medium">{category.name}</span>
    <span className="text-sm text-gray-500">({category.count})</span>
  </button>
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
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                    }
                  />
                  <span className="text-gray-500">—</span>
                  <input
                    type="number"
                    placeholder="До"
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])
                    }
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
                      onChange={() =>
                        setSelectedRating(selectedRating === rating ? null : rating)
                      }
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`${
                            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
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

        {/* Основной контент */}
        <div className="flex-1 lg:ml-8">
          {/* Header с контролами */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {selectedCategory
                  ? mockCategories.find((c) => c.id === selectedCategory)?.name
                  : 'Каталог товарів'}
              </h1>
              <p className="text-gray-600">
                Знайдено: <strong>{filteredProducts.length}</strong> товарів
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* View toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <Grid
                    size={16}
                    className={
                      viewMode === 'grid' ? 'text-green-800' : 'text-gray-600'
                    }
                  />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <List
                    size={16}
                    className={
                      viewMode === 'list' ? 'text-green-800' : 'text-gray-600'
                    }
                  />
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

          {/* Товары */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >

{filteredProducts.map((product) => (
  <div
    key={product.id}
    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group ${
      viewMode === 'list' ? 'flex items-center p-4' : ''
    }`}
  >
    <div
      className={`relative ${
        viewMode === 'list'
          ? 'w-32 h-24 flex-shrink-0 mr-6'
          : 'aspect-[4/3]'
      }`}
    >
      <Link href={`/product/test`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
          />
        ) : (
          <div className="bg-gray-100 w-full h-full rounded-lg flex items-center justify-center cursor-pointer">
            <div className="text-4xl text-gray-400">📦</div>
          </div>
        )}
      </Link>

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
              className={`${
                i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-2">{product.reviews} відгуків</span>
      </div>

      <Link href={`/product/test`} className="group-hover:text-green-800 transition-colors">
        <h3
          className={`font-semibold text-gray-900 cursor-pointer ${
            viewMode === 'list' ? 'text-lg mb-2' : 'mb-3 text-sm'
          }`}
        >
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <div
            className={`font-bold text-gray-900 ${
              viewMode === 'list' ? 'text-xl' : 'text-lg'
            }`}
          >
            {formatPrice(product.price)}
          </div>
          {product.oldPrice && (
            <div className="text-sm text-gray-500 line-through">{formatPrice(product.oldPrice)}</div>
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

          {/* Пагинация */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-12">
  <button
    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-800 !text-gray-800 transition-colors"
  >
    Попередня
  </button>

  {[1, 2, 3, 4, 5].map((page) => (
    <button
      key={page}
      className={`px-3 py-2 border rounded text-sm font-medium transition-colors 
        ${
          page === 1
            ? '!bg-green-800 !text-white !border-green-800'
            : '!border-gray-300 hover:!bg-gray-50 !text-gray-800'
        }`}
    >
      {page}
    </button>
  ))}

  <button
    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-800 !text-gray-800 transition-colors"
  >
    Наступна
  </button>
</div>

        </div>
      </div>
    </div>
  </div>
  );
};

export default CatalogPage;
