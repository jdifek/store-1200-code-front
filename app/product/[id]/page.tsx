// @ts-nocheck

"use client";
import React, { useState, useEffect } from "react";
import {
  Scale,
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  Headphones,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { api } from "@/app/api/http";

const ProductPage = () => {
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [cart, setCart] = useState<number[]>([]);

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
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.get(`/products/${productId}`);
        setProduct(data.product);
      } catch (err: any) {
        setError(err.message || "Помилка завантаження товару");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uk-UA").format(price) + " ₴";
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-900 mb-4">
            {error || "Товар не знайдено"}
          </p>
          <a href="/catalog" className="text-green-800 hover:underline">
            Повернутися до каталогу
          </a>
        </div>
      </div>
    );
  }

  const hasImages = product.images && product.images.length > 0;
  const currentImage = hasImages
    ? product.images[selectedImageIndex]?.url
    : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="text-6xl text-gray-400">📦</div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail images */}
            {hasImages && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-16 h-16 rounded border-2 overflow-hidden flex-shrink-0 ${
                      selectedImageIndex === index
                        ? "border-green-800"
                        : "border-gray-200"
                    } hover:border-green-600 transition-colors`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <span>Артикул: {product.id.slice(0, 8)}</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {product.category && (
              <div className="text-sm text-gray-600 mb-4">
                Категорія:{" "}
                <a
                  href={`/catalog/${product.category.id}`}
                  className="text-green-800 hover:underline"
                >
                  {product.category.name}
                </a>
              </div>
            )}

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline space-x-4">
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                {/* <div className="flex items-center border border-gray-300 rounded-lg w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 text-gray-700"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>

                  <span className="px-4 py-3 border-x border-gray-300 min-w-16 text-center text-gray-900 font-medium">
                    {quantity}
                  </span>

                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-50 text-gray-700"
                  >
                    <Plus size={16} />
                  </button>
                </div> */}

                <button
                  onClick={() => handleCart(product.id)}
                  className={`${
                    cart.includes(product.id)
                      ? "bg-red-800 hover:bg-red-900"
                      : "bg-green-800 hover:bg-green-900"
                  } text-white cursor-pointer px-8 py-4 rounded-lg text-l font-medium  transition-colors whitespace-nowrap`}
                >
                  <div className="flex">
                    <ShoppingCart size={18} className="mr-2" />
                    <p>
                      {" "}
                      {cart.includes(+product.id)
                        ? "Прибрати з кошика"
                        : "В кошик"}
                    </p>
                  </div>
                </button>

                {/* <div className="flex items-center space-x-3 justify-center sm:justify-start">
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                    <Heart size={18} className="text-gray-600" />
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                    <Scale size={18} className="text-gray-600" />
                  </button>
                </div> */}
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Truck className="text-green-800 mr-3" size={20} />
                <div>
                  <div className="font-medium text-gray-600 text-sm">
                    Безкоштовна доставка
                  </div>
                  <div className="text-xs text-gray-600">від 10000 ₴</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Shield className="text-green-800 mr-3" size={20} />
                <div>
                  <div className="font-medium text-gray-600 text-sm">
                    Гарантія 24 міс.
                  </div>
                  <div className="text-xs text-gray-600">офіційна</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Headphones className="text-green-800 mr-3" size={20} />
                <div>
                  <div className="font-medium text-gray-600 text-sm">
                    Консультація
                  </div>
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
        {product.description && (
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "description"
                      ? "border-green-800 text-green-800"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Опис
                </button>
              </nav>
            </div>

            <div className="py-8">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
