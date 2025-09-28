'use client'
import React, { useState } from "react";
import {
  Search,
  User,
  Scale,
  Heart,
  ShoppingCart,
  Grid3X3,
  ChevronDown,
  ChevronRight,
  Star,
  Phone,
  Mail,
  MapPin,
  Minus,
  Plus,
  Check,
  Truck,
  Shield,
  Headphones,
  ChevronLeft,
  ChevronUp,
} from "lucide-react";

// Mock данные товара
const mockProduct = {
  id: "1",
  name: "Професійна холодильна вітрина для м'яса та ковбасних виробів",
  price: 45600,
  oldPrice: 52000,
  rating: 4,
  reviews: 12,
  discount: 12,
  categoryId: "1",
  categoryName: "Холодильне обладнання",
  subcategoryName: "Вітрини холодильні",
  images: [
    "/api/placeholder/600/400",
    "/api/placeholder/600/400",
    "/api/placeholder/600/400",
    "/api/placeholder/600/400",
  ],
  description:
    "Професійна холодильна вітрина призначена для демонстрації та зберігання м'ясних та ковбасних виробів у торгових залах супермаркетів, м'ясних магазинів та гастрономів.",
  specifications: {
    "Габарити (ДхШхВ)": "120 × 80 × 85 см",
    "Температурний режим": "-2°C до +5°C",
    Потужність: "850 Вт",
    Вага: "145 кг",
    "Матеріал корпусу": "Нержавіюча сталь",
    "Тип охолодження": "Статичне",
    Обсяг: "380 л",
    "Країна виробник": "Україна",
    Гарантія: "24 місяці",
  },
  features: [
    "Автоматичне розморожування",
    "LED освітлення",
    "Скляна кришка з функцією розсування",
    "Регульовані полиці",
    "Цифровий термостат",
    "Енергоефективність класу A+",
  ],
  inStock: true,
  stockCount: 5,
};

// Mock схожих товарів
const mockSimilarProducts = [
  {
    id: "2",
    name: "Холодильна вітрина для молочних продуктів",
    price: 38900,
    oldPrice: null,
    rating: 4,
    reviews: 8,
    image: "/api/placeholder/250/180",
  },
  {
    id: "3",
    name: "Морозильна скриня для заморожених продуктів",
    price: 52300,
    oldPrice: 58000,
    rating: 5,
    reviews: 15,
    image: "/api/placeholder/250/180",
  },
  {
    id: "4",
    name: "Вертикальна холодильна шафа",
    price: 67800,
    oldPrice: null,
    rating: 4,
    reviews: 6,
    image: "/api/placeholder/250/180",
  },
  {
    id: "5",
    name: "Холодильний стелаж багаторівневий",
    price: 43200,
    oldPrice: 47500,
    rating: 4,
    reviews: 9,
    image: "/api/placeholder/250/180",
  },
];

// Mock відгуків
const mockReviews = [
  {
    id: "1",
    author: "Олександр Петренко",
    company: 'М\'ясний магазин "Добра ферма"',
    rating: 5,
    date: "2024-12-01",
    content:
      "Відмінна вітрина! Використовуємо вже пів року, дуже задоволені. Температура тримається стабільно, товар виглядає презентабельно. LED освітлення дає гарне підсвічування продукції.",
    pros: ["Стабільна температура", "Якісне освітлення", "Надійна конструкція"],
    cons: ["Трохи шумна при запуску компресора"],
  },
  {
    id: "2",
    author: "Марина Коваленко",
    company: 'Супермаркет "Свіжість"',
    rating: 4,
    date: "2024-11-15",
    content:
      "Гарна вітрина за свої гроші. Монтаж пройшов без проблем, працює стабільно. Єдине зауваження - хотілося б більше регулювань температури.",
    pros: ["Гарне співвідношення ціна-якість", "Простий монтаж"],
    cons: ["Обмежене регулювання температури"],
  },
  {
    id: "3",
    author: "Ігор Семенович",
    company: 'Гастроном "Смакота"',
    rating: 4,
    date: "2024-11-02",
    content:
      "Користуємося місяць. В цілому задоволені, хороша якість за розумні гроші. Рекомендую для невеликих торгових точок.",
    pros: ["Компактні розміри", "Енергоощадність"],
    cons: ["Невеликий обсяг"],
  },
];

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("uk-UA").format(price) + " ₴";
  };

  const handleQuantityChange = (change: any) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= mockProduct.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating: any) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - same as other pages */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-100">
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
              <a href="#" className="hover:text-green-700">
                Доставка
              </a>
              <a href="#" className="hover:text-green-700">
                Оплата
              </a>
              <a href="#" className="hover:text-green-700">
                Гарантія
              </a>
            </div>
          </div>

          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-green-800">SkladTech</div>

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
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
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

          {/* Breadcrumb */}
          <nav className="py-3 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm">
              <a href="#" className="text-gray-700 hover:text-green-800">
                Головна
              </a>
              <ChevronRight size={14} className="text-gray-400" />
              <a href="#" className="text-gray-700 hover:text-green-800">
                Каталог
              </a>
              <ChevronRight size={14} className="text-gray-400" />
              <a href="#" className="text-gray-700 hover:text-green-800">
                {mockProduct.categoryName}
              </a>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-500 truncate max-w-md">
                {mockProduct.name}
              </span>
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-8xl text-gray-400">
                  📦
                </div>
              </div>
              {mockProduct.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{mockProduct.discount}%
                </span>
              )}
            </div>

            {/* Thumbnail images */}
            <div className="flex space-x-2">
              {mockProduct.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 bg-gray-100 rounded border-2 ${
                    selectedImageIndex === index
                      ? "border-green-800"
                      : "border-gray-200"
                  } hover:border-green-600 transition-colors flex items-center justify-center text-2xl`}
                >
                  📦
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <span>Артикул: HV-{mockProduct.id}20</span>
              <span>•</span>
              {mockProduct.inStock ? (
                <span className="text-green-600 flex items-center">
                  <Check size={14} className="mr-1" />В наявності (
                  {mockProduct.stockCount} шт.)
                </span>
              ) : (
                <span className="text-red-600">Немає в наявності</span>
              )}
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {mockProduct.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {renderStars(mockProduct.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  ({mockProduct.reviews} відгуків)
                </span>
              </div>
              <button className="text-sm text-green-800 hover:underline">
                Написати відгук
              </button>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline space-x-4">
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(mockProduct.price)}
                </div>
                {mockProduct.oldPrice && (
                  <div className="text-xl text-gray-500 line-through">
                    {formatPrice(mockProduct.oldPrice)}
                  </div>
                )}
                {mockProduct.discount && (
                  <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                    Економія{" "}
                    {formatPrice(mockProduct.oldPrice - mockProduct.price)}
                  </div>
                )}
              </div>
            </div>

            {/* Key features */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">
                Ключові характеристики:
              </h3>
              <ul className="space-y-2">
                {mockProduct.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Check
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-3 border-x border-gray-300 min-w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50"
                    disabled={quantity >= mockProduct.stockCount}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button className="flex-1 bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors flex items-center justify-center">
                  <ShoppingCart size={18} className="mr-2" />
                  Додати в кошик
                </button>

                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart size={18} className="text-gray-600" />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Scale size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Truck className="text-green-800 mr-3" size={20} />
                <div>
                  <div className="font-medium text-sm">
                    Безкоштовна доставка
                  </div>
                  <div className="text-xs text-gray-600">від 10000 ₴</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Shield className="text-green-800 mr-3" size={20} />
                <div>
                  <div className="font-medium text-sm">Гарантія 24 міс.</div>
                  <div className="text-xs text-gray-600">офіційна</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Headphones className="text-green-800 mr-3" size={20} />
                <div>
                  <div className="font-medium text-sm">Консультація</div>
                  <div className="text-xs text-gray-600">безкоштовна</div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 border border-green-800 text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-800 hover:text-white transition-colors">
                Купити в 1 клік
              </button>
              <button className="flex-1 bg-yellow-200 text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Замовити дзвінок
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: "description", name: "Опис" },
                { id: "specifications", name: "Характеристики" },
                { id: "reviews", name: `Відгуки (${mockProduct.reviews})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-green-800 text-green-800"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg mb-6">
                  {mockProduct.description}
                </p>

                <h3 className="text-xl font-semibold mb-4">Переваги:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {mockProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check
                        size={16}
                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-4">Призначення:</h3>
                <p className="text-gray-700">
                  Ідеально підходить для супермаркетів, м'ясних магазинів,
                  гастрономів та інших торгових точок, де необхідно забезпечити
                  належне зберігання та презентацію м'ясних та ковбасних
                  виробів.
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(mockProduct.specifications)
                    .slice(0, showAllSpecs ? undefined : 8)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-3 border-b border-gray-100"
                      >
                        <span className="font-medium text-gray-700">
                          {key}:
                        </span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                </div>

                {Object.entries(mockProduct.specifications).length > 8 && (
                  <button
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="mt-6 text-green-800 hover:underline flex items-center"
                  >
                    {showAllSpecs ? "Згорнути" : "Показати всі характеристики"}
                    <ChevronUp
                      size={16}
                      className={`ml-1 transform transition-transform ${
                        showAllSpecs ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </button>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Відгуки покупців
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {renderStars(mockProduct.rating)}
                        <span className="ml-2 text-lg font-semibold">
                          {mockProduct.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-gray-600">
                        {mockProduct.reviews} відгуків
                      </span>
                    </div>
                  </div>
                  <button className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-900 transition-colors">
                    Написати відгук
                  </button>
                </div>

                <div className="space-y-8">
                  {mockReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-8"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {review.author}
                          </div>
                          <div className="text-sm text-gray-600">
                            {review.company}
                          </div>
                          <div className="flex items-center mt-2">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString(
                                "uk-UA"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{review.content}</p>

                      {review.pros && review.pros.length > 0 && (
                        <div className="mb-3">
                          <div className="font-medium text-green-800 mb-2">
                            Переваги:
                          </div>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {review.pros.map((pro, index) => (
                              <li key={index}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {review.cons && review.cons.length > 0 && (
                        <div>
                          <div className="font-medium text-red-800 mb-2">
                            Недоліки:
                          </div>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {review.cons.map((con, index) => (
                              <li key={index}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Схожі товари
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockSimilarProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative aspect-[4/3] bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <div className="text-4xl text-gray-400">📦</div>
                  <div className="absolute top-2 left-2 flex space-x-1">
                    <button className="p-1 bg-white rounded-full shadow hover:bg-gray-50">
                      <Scale size={12} className="text-gray-600" />
                    </button>
                    <button className="p-1 bg-white rounded-full shadow hover:bg-gray-50">
                      <Heart size={12} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      {product.reviews} відгуків
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-3 text-sm group-hover:text-green-800 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </div>
                      {product.oldPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(product.oldPrice)}
                        </div>
                      )}
                    </div>
                    <button className="bg-green-800 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-900 transition-colors">
                      В кошик
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
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
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Холодильне обладнання
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Торгові ваги
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Стелажі та меблі
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Касове обладнання
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Послуги</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Проектування
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Монтаж
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Сервісне обслуговування
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Консультації
                  </a>
                </li>
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

export default ProductPage;
