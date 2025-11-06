"use client";
import React, { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  X,
  Trash2,
  ArrowLeft,
  Check,
} from "lucide-react";
import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface ProductImage {
  id: string;
  url: string;
  productId: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  categoryId: string;
  images?: ProductImage[];
}

interface CartItem extends Product {
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
    amount: number;
  } | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uk-UA").format(price) + " ₴";
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // Оновлюємо localStorage
    const updatedCart = [...cart];
    const currentCount = cart.filter(itemId => itemId === id).length;
    
    if (newQuantity > currentCount) {
      // Додаємо більше копій ID
      for (let i = 0; i < newQuantity - currentCount; i++) {
        updatedCart.push(id);
      }
    } else if (newQuantity < currentCount) {
      // Видаляємо зайві копії ID
      const toRemove = currentCount - newQuantity;
      let removed = 0;
      const filtered = updatedCart.filter(itemId => {
        if (itemId === id && removed < toRemove) {
          removed++;
          return false;
        }
        return true;
      });
      updatedCart.length = 0;
      updatedCart.push(...filtered);
    }
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    
    // Видаляємо всі входження цього ID з корзини
    const updatedCart = cart.filter(itemId => itemId !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setAppliedPromo({ code: "SAVE10", discount: 10, amount: subtotal * 0.1 });
    } else if (promoCode === "FIRST5") {
      setAppliedPromo({ code: "FIRST5", discount: 5, amount: subtotal * 0.05 });
    } else {
      alert("Промокод не знайдено");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        
        if (Array.isArray(parsed)) {
          setCart(parsed);
        } else {
          setCart([]);
        }
      } catch {
        setCart([]);
      }
    } else {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (cart.length > 0) {
      loadCart();
    } else {
      setLoading(false);
    }
  }, [cart]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: cart }),
      });
  
      if (!response.ok) {
        throw new Error("Помилка завантаження кошика");
      }
  
      const data = await response.json();
      
      if (data.success && Array.isArray(data.products)) {
        // Підраховуємо кількість кожного товару
        const itemCounts: Record<string, number> = {};
        cart.forEach(id => {
          itemCounts[id] = (itemCounts[id] || 0) + 1;
        });

        // Додаємо quantity до кожного товару
        const itemsWithQuantity: CartItem[] = data.products.map((product: Product) => ({
          ...product,
          quantity: itemCounts[product.id] || 1
        }));

        setCartItems(itemsWithQuantity);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error(err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const promoDiscount = appliedPromo ? appliedPromo.amount : 0;
  const deliveryFee = subtotal >= 15000 ? 0 : 500;
  const total = subtotal - promoDiscount + deliveryFee;

  useEffect(() => {
console.log(isCheckoutOpen, 'isCheckoutOpen');

  }, [isCheckoutOpen])
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Завантаження кошика...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="text-6xl sm:text-8xl mb-6 sm:mb-8">🛒</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Ваш кошик порожній
          </h1>
          <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
            Додайте товари до кошика, щоб оформити замовлення
          </p>
          <Link href="/catalog">
            <button className="bg-green-800 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors">
              Перейти до каталогу
            </button>
          </Link>
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
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-4 sm:space-y-0"
                >
                  <div className="w-full sm:w-28 h-28 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-3xl">📦</div>
                    )}
                  </div>

                  <div className="flex-1 w-full">
                    <h3 className="font-semibold text-gray-900 mb-1 hover:text-green-800 cursor-pointer text-center sm:text-left">
                      {item.name}
                    </h3>
                    <div className="text-sm text-gray-600 mb-2 text-center sm:text-left line-clamp-2">
                      {item.description}
                    </div>
                    <div className="text-xs text-gray-500 text-center sm:text-left">
                      ID: {item.id.slice(0, 8)}...
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} color="black"/>
                      </button>
                      <span className="px-3 py-2 text-black border-x border-gray-300 min-w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-50"
                      >
                        <Plus color="black" size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-sm text-gray-500">
                        {formatPrice(item.price)} × {item.quantity}
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
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 !text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
          </div>

          {/* 💰 Підсумок */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Разом</h2>
              <div className="space-y-3 mb-6 text-sm sm:text-base">
                <div className="flex justify-between text-gray-700">
                  <span>Товари ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Знижка за промокодом:</span>
                    <span>-{formatPrice(promoDiscount)}</span>
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
                {subtotal < 15000 && (
                  <div className="text-xs text-gray-500">
                    Додайте ще {formatPrice(15000 - subtotal)} для безкоштовної доставки
                  </div>
                )}
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
              <button   onClick={() => setIsCheckoutOpen(true)}
 className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors mb-3">
                Оформити замовлення
              </button>
           
            </div>
          </div>
        </div>
      </div>
      {isCheckoutOpen && (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-xl">
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
  
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Оформлення замовлення
        </h2>
  
        <CheckoutForm
          cartItems={cartItems}
          total={total}
          onClose={() => setIsCheckoutOpen(false)}
        />
      </div>
    </div>
  )}
  
    </div>
  );
  
};

export default CartPage;