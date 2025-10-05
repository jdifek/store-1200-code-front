'use client'
import React, { useState } from 'react';
import { Search, User, Scale, Heart, ShoppingCart, Grid3X3, ChevronRight, Star, Phone, Mail, MapPin, Minus, Plus, X, Trash2, ArrowLeft, Lock, Check } from 'lucide-react';
import Link from 'next/link';

// Mock данные товаров в корзине
const mockCartItems = [
  {
    id: '1',
    name: 'Професійна холодильна вітрина для м\'яса та ковбасних виробів',
    price: 45600,
    oldPrice: 52000,
    quantity: 1,
    image: '/api/placeholder/120/80',
    articleCode: 'HV-120',
    inStock: true,
    maxQuantity: 5
  },
  {
    id: '2',
    name: 'Електричний конвеєр для готування страв',
    price: 25400,
    oldPrice: null,
    quantity: 2,
    image: '/api/placeholder/120/80',
    articleCode: 'EC-254',
    inStock: true,
    maxQuantity: 3
  },
  {
    id: '3',
    name: 'Металевий стелаж для складу багаторівневий',
    price: 12800,
    oldPrice: 14500,
    quantity: 3,
    image: '/api/placeholder/120/80',
    articleCode: 'MS-128',
    inStock: true,
    maxQuantity: 10
  }
];

// Mock данные рекомендованных товаров
const mockRecommended = [
  {
    id: '4',
    name: 'Додатковий термометр для холодильної вітрини',
    price: 850,
    oldPrice: null,
    image: '/api/placeholder/150/100'
  },
  {
    id: '5',
    name: 'Світлодіодне освітлення для стелажів',
    price: 1200,
    oldPrice: 1400,
    image: '/api/placeholder/150/100'
  },
  {
    id: '6',
    name: 'Захисний кожух для конвеєра',
    price: 2300,
    oldPrice: null,
    image: '/api/placeholder/150/100'
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; amount: number } | null>(null);

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('uk-UA').format(price) + ' ₴';
  };

  const updateQuantity = (id: any, newQuantity: any) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    );
  };

  const removeItem = (id: any) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setAppliedPromo({ code: 'SAVE10', discount: 10, amount: subtotal * 0.1 });
    } else if (promoCode === 'FIRST5') {
      setAppliedPromo({ code: 'FIRST5', discount: 5, amount: subtotal * 0.05 });
    } else {
      alert('Промокод не знайдено');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    return sum + ((item.oldPrice || item.price) - item.price) * item.quantity;
  }, 0);
  const promoDiscount = appliedPromo ? appliedPromo.amount : 0;
  const deliveryFee = subtotal >= 15000 ? 0 : 500;
  const total = subtotal - promoDiscount + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
     
    
      {/* EMPTY CART */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <div className="text-6xl sm:text-8xl mb-6 sm:mb-8">🛒</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Ваш кошик порожній</h1>
        <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">Додайте товари до кошика, щоб оформити замовлення</p>
        <button className="bg-green-800 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors">
          Перейти до каталогу
        </button>
      </div>
    
  
    </div>
    
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link
          href="/catalog"
          className="flex items-center text-green-800 hover:text-green-900 mb-4 sm:mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Продовжити покупки
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Кошик
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* 🛒 Список товарів */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 space-y-6">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-4 sm:space-y-0"
                >
                  <div className="w-full sm:w-28 h-28 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                    <div className="text-3xl">📦</div>
                  </div>

                  <div className="flex-1 w-full">
                    <h3 className="font-semibold text-gray-900 mb-1 hover:text-green-800 cursor-pointer text-center sm:text-left">
                      {item.name}
                    </h3>
                    <div className="text-sm text-gray-600 mb-2 text-center sm:text-left">
                      Артикул: {item.articleCode}
                    </div>
                    {item.inStock ? (
                      <div className="text-sm text-green-600 text-center sm:text-left">
                        В наявності
                      </div>
                    ) : (
                      <div className="text-sm text-red-600 text-center sm:text-left">
                        Немає в наявності
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 py-2 border-x border-gray-300 min-w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-50"
                        disabled={item.quantity >= item.maxQuantity}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    {item.oldPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatPrice(item.oldPrice * item.quantity)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 self-center sm:self-start"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Промокод */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Промокод</h3>
              {appliedPromo ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center mb-3 sm:mb-0">
                    <div className="bg-green-600 text-white rounded-full p-1 mr-3">
                      <Check size={14} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {appliedPromo.code}
                      </div>
                      <div className="text-sm text-gray-600">
                        Знижка {appliedPromo.discount}% • -
                        {formatPrice(appliedPromo.amount)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Введіть промокод"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-900 transition-colors"
                  >
                    Застосувати
                  </button>
                </div>
              )}
            </div>

            {/* Рекомендовані */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Рекомендовані товари
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {mockRecommended.map(product => (
                  <div
                    key={product.id}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[3/2] bg-gray-200 rounded mb-3 flex items-center justify-center">
                      <div className="text-3xl">📦</div>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </div>
                        {product.oldPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            {formatPrice(product.oldPrice)}
                          </div>
                        )}
                      </div>
                      <button className="bg-green-800 text-white p-1.5 rounded hover:bg-green-900">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 💰 Підсумок */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Разом</h2>
              <div className="space-y-3 mb-6 text-sm sm:text-base">
                <div className="flex justify-between text-gray-700">
                  <span>Товари ({cartItems.length}):</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Ваша економія:</span>
                    <span>-{formatPrice(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Доставка:</span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-medium">
                      Безкоштовно
                    </span>
                  ) : (
                    <span>{formatPrice(deliveryFee)}</span>
                  )}
                </div>
              </div>
              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-gray-900">
                    До сплати:
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
              <button className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors mb-3">
                Оформити замовлення
              </button>
              <button className="w-full border border-green-800 text-green-800 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Купити в 1 клік
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CartPage;