"use client";
import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Header } from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { api } from "./api/http";

// Mock данные на основе бэкенда
const mockCategories = [
  {
    id: "1",
    name: "Контейнеры",
    count: 145,
    image: "/api/placeholder/200/150",
  },
  {
    id: "2",
    name: "Погрузчики",
    count: 89,
    image: "/api/placeholder/200/150",
  },
  {
    id: "3",
    name: "Ёмкости",
    count: 267,
    image: "/api/placeholder/200/150",
  },
  {
    id: "4",
    name: "Асики",
    count: 156,
    image: "/api/placeholder/200/150",
  },
];



const mockReviews = [
  {
    id: "1",
    content:
      "Замовляли комплект холодильного обладнання для нашого супермаркету. Якість відмінна, монтаж провели швидко та професійно.",
    rating: 5,
    author: "Олексій Петренко",
    company: "Мережа АТБ",
    date: "2024-12-10",
  },
  {
    id: "2",
    name: "Купували торгові ваги та стелажі. Все працює бездоганно, ціни конкурентні, доставка вчасно.",
    rating: 5,
    author: "Марина Коваленко",
    company: "Сільпо",
    date: "2024-12-08",
  },
];

const HomePage = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [cart, setCart] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  // Считываем корзину при монтировании
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        // на всякий случай проверяем, что это массив
        if (Array.isArray(parsed)) {
          setCart(parsed);
        } else {
          setCart([]);
        }
      } catch {
        setCart([]);
      }
    }
  }, []);

  const handleCart = (id: number) => {
    let newCart: number[];

    if (cart.includes(id)) {
      // Если товар уже в корзине — убираем
      newCart = cart.filter((item) => item !== id);
    } else {
      // Если нет — добавляем
      newCart = [...cart, id];
    }

    // Обновляем state и localStorage
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uk-UA").format(price) + " ₴";
  };

  const loadProducts = async () => {
    try {
      
      // 🔧 Передаём напрямую, а не { params: query }
      const res: any = await api.get("/products/three-random");
  
      // Обновляем состояние
      setProducts(res.products || []);
    } catch (err) {
      console.error("Ошибка при загрузке продуктов:", err);
      setProducts([]);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Професійне торгове обладнання для вашого бізнесу
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Холодильне обладнання, торгові ваги, стелажі та все необхідне для
              супермаркетів від провідних виробників
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalog"
                className="bg-green-800 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors"
              >
                Переглянути каталог
              </Link>
              <Link
                href="/about"
                className="border cursor-pointer border-green-800 text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-800 hover:text-white transition-colors"
              >
                Отримати консультацію
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <Link
                href={"/catalog"}
                key={category.id}
                className="group cursor-pointer"
              >
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-[4/3] flex items-center justify-center">
                  <div className="text-6xl text-gray-400">📦</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-800 transition-colors text-center text-sm uppercase tracking-wide">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок + сортировка */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-bold !text-gray-900 mb-2">
                Рекомендовані товари
              </h2>
              <p className="!text-gray-700 text-sm sm:text-base">
                Найпопулярніші рішення для торгового обладнання
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
              {/* <span className="text-sm !text-gray-700 text-center sm:text-left">
                Знайдено: <strong className="!text-gray-900">156</strong>{" "}
                товарів
              </span> */}

              {/* <div className="flex items-center justify-center space-x-2">
                <span className="text-sm !text-gray-700">Сортувати:</span>
                <select className="border border-gray-300 rounded px-3 py-1.5 text-sm !text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600">
                  <option>За замовчуванням</option>
                  <option>За ціною ↑</option>
                  <option>За ціною ↓</option>
                  <option>За рейтингом</option>
                </select>
              </div> */}
            </div>
          </div>

          {/* Сетка товаров */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Изображение товара */}
                <div className="relative">
                  <div className="relative aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden">
                    <Link href={`/product/${product.id}`}>
                      {product.images ? (
                        <Image
                          alt={product.name}
                          src={product.images?.[0]?.url}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full cursor-pointer">
                          <div className="text-4xl !text-gray-400">📦</div>
                        </div>
                      )}
                    </Link>
                  </div>

                  {/* Кнопки действий */}
                  {/* <div className="absolute top-3 left-3 flex space-x-2">
                    <button className="p-1.5 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
                      <Scale size={14} className="!text-gray-600" />
                    </button>
                    <button className="p-1.5 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
                      <Heart size={14} className="!text-gray-600" />
                    </button>
                  </div> */}

                  {/* Скидка */}
                  {product.discount && (
                    <span className="absolute top-3 right-3 bg-yellow-400 !text-black px-2 py-1 rounded text-xs font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Описание и цена */}
                <div className="p-5 sm:p-6">
                  {/* Рейтинг */}
                  {/* <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < product.rating
                              ? "!text-yellow-400 fill-current"
                              : "!text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs !text-gray-600 ml-2">
                      {product.reviews} відгуків
                    </span>
                  </div> */}

                  {/* Название */}
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold !text-gray-900 mb-4 group-hover:!text-green-800 transition-colors text-sm sm:text-base line-clamp-2 cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Цена и кнопка */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg sm:text-xl font-bold !text-gray-900">
                        {formatPrice(product.price)}
                      </div>
                      {product.oldPrice && (
                        <div className="text-sm !text-gray-500 line-through">
                          {formatPrice(product.oldPrice)}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleCart(product.id)}
                      className={`${
                        cart.includes(product.id)
                          ? "bg-red-800 hover:bg-red-900"
                          : "bg-green-800 hover:bg-green-900"
                      } text-white cursor-pointer px-4 py-2 rounded-lg text-sm font-medium  transition-colors whitespace-nowrap`}
                    >
                      {cart.includes(+product.id)
                        ? "Прибрати з кошика"
                        : "В кошик"}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Відгуки наших клієнтів
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Довіра провідних торгових мереж України
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-current"
                    size={20}
                  />
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
                  <div className="font-semibold text-gray-900">
                    {mockReviews[currentReview].author}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {mockReviews[currentReview].company}
                  </div>
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
            Наші експерти допоможуть підібрати оптимальне рішення для вашого
            торгового об'єкта
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
    </div>
  );
};

export default HomePage;
