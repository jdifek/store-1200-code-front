"use client";
import React, { useEffect, useState } from "react";
import { Scale, Heart, Filter, Star, Grid, List } from "lucide-react";
import Link from "next/link";
import { api } from "../api/http";
export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  parent?: Category | null;
  children?: Category[];
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  createdAt: string;
  categoryId: string;
  category?: Category;
}


const CatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("createdAt");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  
  useEffect(() => {
    loadCategories()
    loadProducts();
    console.log(selectedCategory, 'ad');
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const loadProducts = async () => {
    try {
      // Формируем параметры запроса
      const query = {
        page: 1,
        limit: 20,
        filters: {
          search: searchQuery || undefined,
          categoryId: selectedCategory || undefined,
          minPrice: priceRange?.[0] || undefined,
          maxPrice: priceRange?.[1] || undefined,
        },
        sortBy,
        sortOrder: "desc",
      };
  
      // 🔧 Передаём напрямую, а не { params: query }
      const res: any = await api.get("/products", query);
  
      // Обновляем состояние
      setProducts(res.products || []);
    } catch (err) {
      console.error("Ошибка при загрузке продуктов:", err);
      setProducts([]);
    }
  };
  
  

  const loadCategories = async () => {
    try {
      const data: any = await api.get('/categories');
      setCategories(data.categories || []); // ✅ только массив
    } catch (err) {
      console.error('Ошибка при загрузке категорий:', err);
      setCategories([]);
    }
  };
  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("uk-UA").format(price) + " ₴";
  };


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Верхняя панель фильтров для мобильных */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h1 className="text-xl font-semibold text-gray-900">
            Каталог товарів
          </h1>
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
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-80 lg:pr-8 lg:border-r border-gray-200 mb-6 lg:mb-0`}
          >
            <div className="space-y-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )
                  }
                  className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between hover:bg-gray-50 ${
                    selectedCategory === category.id
                      ? "bg-green-50 text-green-800"
                      : "text-gray-700"
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                 
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
                        setPriceRange([
                          parseInt(e.target.value) || 0,
                          priceRange[1],
                        ])
                      }
                    />
                    <span className="text-gray-500">—</span>
                    <input
                      type="number"
                      placeholder="До"
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          parseInt(e.target.value) || 100000,
                        ])
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
                          setSelectedRating(
                            selectedRating === rating ? null : rating
                          )
                        }
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${
                              i < rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          і вище
                        </span>
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
                    ? categories.find((c) => c.id === selectedCategory)
                        ?.name
                    : "Каталог товарів"}
                </h1>
                <p className="text-gray-600">
                  Знайдено: <strong>{products.length}</strong> товарів
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* View toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid" ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    <Grid
                      size={16}
                      className={
                        viewMode === "grid" ? "text-green-800" : "text-gray-600"
                      }
                    />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list" ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    <List
                      size={16}
                      className={
                        viewMode === "list" ? "text-green-800" : "text-gray-600"
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
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
           {products.map((product) => {
  // Берем первую картинку из массива images
  const imageUrl = product.images?.[0]?.url || null;
  const rating = product.rating ?? 0;
  const reviews = product.reviews ?? 0;
  const discount = product.discount ?? null;
  const oldPrice = product.oldPrice ?? null;

  return (
    <div
      key={product.id}
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group ${
        viewMode === "list" ? "flex items-center p-4" : ""
      }`}
    >
      {/* Изображение */}
      <div
        className={`relative ${
          viewMode === "list"
            ? "w-32 h-24 flex-shrink-0 mr-6"
            : "aspect-[4/3]"
        }`}
      >
        <Link href={`/product/${product.id}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />
          ) : (
            <div className="bg-gray-100 w-full h-full rounded-lg flex items-center justify-center cursor-pointer">
              <div className="text-4xl text-gray-400">📦</div>
            </div>
          )}
        </Link>

        {/* Кнопки действий */}
        <div className="absolute top-2 left-2 flex space-x-1">
          <button className="p-1 bg-white rounded-full shadow hover:bg-gray-50">
            <Scale size={12} className="text-gray-600" />
          </button>
          <button className="p-1 bg-white rounded-full shadow hover:bg-gray-50">
            <Heart size={12} className="text-gray-600" />
          </button>
        </div>

        {/* Скидка */}
        {discount && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">
            -{discount}%
          </span>
        )}
      </div>

      {/* Контент */}
      <div className={`${viewMode === "grid" ? "p-4" : "flex-1"}`}>
        {/* Рейтинг и отзывы */}
        {(rating || reviews) && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`${
                    i < rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            {reviews > 0 && (
              <span className="text-xs text-gray-500 ml-2">
                {reviews} відгуків
              </span>
            )}
          </div>
        )}

        {/* Название */}
        <Link
          href={`/product/${product.id}`}
          className="group-hover:text-green-800 transition-colors"
        >
          <h3
            className={`font-semibold text-gray-900 cursor-pointer ${
              viewMode === "list" ? "text-lg mb-2" : "mb-3 text-sm"
            }`}
          >
            {product.name}
          </h3>
        </Link>

        {/* Категория */}
        {product.category?.name && (
          <div className="text-xs text-gray-500 mb-2">
            {product.category.name}
          </div>
        )}

        {/* Цена и кнопка */}
        <div className="flex items-center justify-between">
          <div>
            <div
              className={`font-bold text-gray-900 ${
                viewMode === "list" ? "text-xl" : "text-lg"
              }`}
            >
              {formatPrice(product.price)}
            </div>

            {oldPrice && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(oldPrice)}
              </div>
            )}
          </div>

          <button className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-900 transition-colors">
            В кошик
          </button>
        </div>
      </div>
    </div>
  );
})}

            </div>

            {/* Пагинация */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-12">
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-800 !text-gray-800 transition-colors">
                Попередня
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 border rounded text-sm font-medium transition-colors 
        ${
          page === 1
            ? "!bg-green-800 !text-white !border-green-800"
            : "!border-gray-300 hover:!bg-gray-50 !text-gray-800"
        }`}
                >
                  {page}
                </button>
              ))}

              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-800 !text-gray-800 transition-colors">
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
