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
import Image from "next/image";

// Mock данные товара
const mockProduct = {
  id: "1",
  name: "Вitmаin Аntminеr S21 Нydrо 319th",
  price: 45600,
  oldPrice: 52000,
  rating: 4,
  reviews: 12,
  discount: 12,
  categoryId: "1",
  categoryName: "Асики",
  images: ["/1.jpg", "/2.jpg"],
  description: `Нове обладнання для майнінгу Вitmаin Аntminеr S21 Нydrо 335th. В наявності є багато різних варіантів, для оптових покупців діють знижки. Гарантія 12 місяців. Доставка по Україні.

  📝Тех.характеристики апарату:

⚡️Модель апарату: Вitmаin Аntminеr S21 Нydrо 335th

⚡️Здобувані монети: ВТС

⚡️Алгоритм: SНА-256.

⚡️Наshraте -- 335 th

⚡️Охолодження: Гідроохолодження

⚡️Енергоспоживання: 5360 Wаtt

⚡️Рівень шуму: 70 дБ
`,
  inStock: true,
  stockCount: 5,
};

// Mock схожих товарів
const mockSimilarProducts = [
  {
    id: "2",
    name: "Мобильный растворный узел для кас, жку, сзр",
    price: 160000,
    oldPrice: null,
    rating: 4,
    reviews: 8,
    image: "/4.jpg",
  },
  {
    id: "3",
    name: "Смешивающий растворный узел для жидких и сухих удо",
    price: 185000,
    oldPrice: 187000,
    rating: 5,
    reviews: 15,
    image: "/6.jpg",
  },
  {
    id: "4",
    name: "Вitmаin Аntminеr S21 Нydrо 319th",
    price: 67800,
    oldPrice: null,
    rating: 4,
    reviews: 6,
    image: "/1.jpg",
  },
  {
    id: "5",
    name: "Вitmаin Аntminеr S21 Нydrо 335th",
    price: 92000,
    oldPrice: 99500,
    rating: 4,
    reviews: 9,
    image: "/2.jpg",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
                <Image
                  src={mockProduct.images[selectedImageIndex]}
                  alt={mockProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              {mockProduct.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{mockProduct.discount}%
                </span>
              )}
            </div>

            {/* Thumbnail images */}
            <div className="flex space-x-2">
              {mockProduct.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-16 h-16 rounded border-2 overflow-hidden ${
                    selectedImageIndex === index
                      ? "border-green-800"
                      : "border-gray-200"
                  } hover:border-green-600 transition-colors`}
                >
                  <Image
                    src={img}
                    alt={`${mockProduct.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
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
            {/* <div className="mb-8">
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
            </div> */}

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
    {/* Количество */}
    <div className="flex items-center border border-gray-300 rounded-lg w-full sm:w-auto justify-between sm:justify-start">
      <button
        onClick={() => handleQuantityChange(-1)}
        className="p-3 hover:bg-gray-50 disabled:opacity-50 text-gray-700 !text-gray-700"
        disabled={quantity <= 1}
      >
        <Minus size={16} />
      </button>

      <span className="px-4 py-3 border-x border-gray-300 min-w-16 text-center text-gray-900 !text-gray-900 font-medium">
        {quantity}
      </span>

      <button
        onClick={() => handleQuantityChange(1)}
        className="p-3 hover:bg-gray-50 disabled:opacity-50 text-gray-700 !text-gray-700"
        disabled={quantity >= mockProduct.stockCount}
      >
        <Plus size={16} />
      </button>
    </div>

    {/* Кнопка "Додати в кошик" */}
    <button className="flex-1 bg-green-800 text-white !text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors flex items-center justify-center whitespace-nowrap">
      <ShoppingCart size={18} className="mr-2" />
      Додати в кошик
    </button>

    {/* Кнопки избранного и сравнения */}
    <div className="flex items-center space-x-3 justify-center sm:justify-start">
      <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 !text-gray-700">
        <Heart size={18} className="text-gray-600 !text-gray-600" />
      </button>
      <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 !text-gray-700">
        <Scale size={18} className="text-gray-600 !text-gray-600" />
      </button>
    </div>
  </div>
</div>


            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Truck className="text-green-800 mr-3" size={20} />
                <div>
                  <div className="font-medium  !text-gray-600 text-sm">
                    Безкоштовна доставка
                  </div>
                  <div className="text-xs text-gray-600">від 10000 ₴</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Shield className="text-green-800 mr-3" size={20} />
                <div>
                  <div className="font-medium  !text-gray-600 text-sm">Гарантія 24 міс.</div>
                  <div className="text-xs text-gray-600">офіційна</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Headphones className="text-green-800 mr-3" size={20} />
                <div>
                  <div className="font-medium  !text-gray-600 text-sm">Консультація</div>
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
                <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">
                  {mockProduct.description}
                </p>

                {/* <h3 className="text-xl font-semibold mb-4">Переваги:</h3>
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
                </ul> */}

                {/* <h3 className="text-xl font-semibold mb-4">Призначення:</h3>
                <p className="text-gray-700">
                  Ідеально підходить для супермаркетів, м'ясних магазинів,
                  гастрономів та інших торгових точок, де необхідно забезпечити
                  належне зберігання та презентацію м'ясних та ковбасних
                  виробів.
                </p> */}
              </div>
            )}

            {/* {activeTab === "specifications" && (
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
            )} */}

{activeTab === "reviews" && (
  <div className="w-full">
    {/* Заголовок + кнопка */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
      <div>
        <h3 className="text-xl font-semibold mb-2 !text-gray-800">
          Відгуки покупців
        </h3>
        <div className="flex flex-wrap items-center space-x-4">
          <div className="flex items-center">
            {renderStars(mockProduct.rating)}
            <span className="ml-2 text-lg font-semibold !text-gray-900">
              {mockProduct.rating.toFixed(1)}
            </span>
          </div>
          <span className="!text-gray-700">
            {mockProduct.reviews} відгуків
          </span>
        </div>
      </div>

      <button className="bg-green-800 !text-white px-6 py-2 rounded-lg font-medium hover:bg-green-900 transition-colors w-full sm:w-auto text-center">
        Написати відгук
      </button>
    </div>

    {/* Список отзывов */}
    <div className="space-y-8">
      {mockReviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-8">
          {/* Заголовок отзыва */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
              <div className="font-semibold !text-gray-900">
                {review.author}
              </div>
              <div className="text-sm !text-gray-600">{review.company}</div>
              <div className="flex items-center mt-2 flex-wrap">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm !text-gray-500">
                  {new Date(review.date).toLocaleDateString("uk-UA")}
                </span>
              </div>
            </div>
          </div>

          {/* Текст отзыва */}
          <p className="!text-gray-800 mb-4 leading-relaxed">{review.content}</p>

          {/* Плюсы */}
          {review.pros && review.pros.length > 0 && (
            <div className="mb-3">
              <div className="font-medium !text-green-800 mb-2">
                Переваги:
              </div>
              <ul className="list-disc list-inside text-sm !text-gray-800 space-y-1">
                {review.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Минусы */}
          {review.cons && review.cons.length > 0 && (
            <div>
              <div className="font-medium !text-red-800 mb-2">
                Недоліки:
              </div>
              <ul className="list-disc list-inside text-sm !text-gray-800 space-y-1">
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
                <div className="relative aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden">
                  {product.image ? (
                    <Image
                      alt={product.name}
                      src={product.image}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="text-4xl text-gray-400">📦</div>
                    </div>
                  )}

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
    </div>
  );
};

export default ProductPage;
