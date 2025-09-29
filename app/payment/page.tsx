'use client'
import React, { useState } from 'react';
import { Search, User, Scale, Heart, ShoppingCart, Grid3X3, ChevronRight, Phone, Mail, MapPin, Lock, Check, CreditCard, Truck, Package } from 'lucide-react';

// Mock данные заказа
const mockOrderItems = [
  {
    id: '1',
    name: 'Професійна холодильна вітрина',
    price: 45600,
    quantity: 1
  },
  {
    id: '2',
    name: 'Електричний конвеєр',
    price: 25400,
    quantity: 2
  },
  {
    id: '3',
    name: 'Металевий стелаж',
    price: 12800,
    quantity: 3
  }
];

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    deliveryMethod: 'courier',
    city: '',
    address: '',
    postOffice: '',
    paymentMethod: 'cash',
    comment: '',
    agreement: false
  });

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('uk-UA').format(price) + ' ₴';
  };

  const subtotal = mockOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = formData.deliveryMethod === 'courier' ? 500 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit order
      console.log('Order submitted:', formData);
      alert('Замовлення успішно оформлено!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-100">
            <div className="flex items-center space-x-6">
              <span className="flex items-center"><Phone size={14} className="mr-1" />+38 (067) 123-45-67</span>
              <span className="flex items-center"><Mail size={14} className="mr-1" />info@skladtech.ua</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div className="text-2xl font-bold text-green-800">
              SkladTech
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Lock size={14} />
              <span>Безпечне оформлення</span>
            </div>
          </div>

          <nav className="py-3 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm">
              <a href="#" className="text-gray-700 hover:text-green-800">Головна</a>
              <ChevronRight size={14} className="text-gray-400" />
              <a href="#" className="text-gray-700 hover:text-green-800">Кошик</a>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-green-800">Оформлення замовлення</span>
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Оформлення замовлення</h1>

        {/* Progress steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[
              { num: 1, title: 'Контактні дані' },
              { num: 2, title: 'Доставка' },
              { num: 3, title: 'Оплата' }
            ].map((s, index) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                    step >= s.num 
                      ? 'bg-green-800 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > s.num ? <Check size={20} /> : s.num}
                  </div>
                  <div className={`mt-2 text-sm font-medium ${
                    step >= s.num ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    {s.title}
                  </div>
                </div>
                {index < 2 && (
                  <div className={`w-24 h-1 mx-4 ${
                    step > s.num ? 'bg-green-800' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Contact info */}
              {step >= 1 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Контактні дані</h2>
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-green-800 hover:underline"
                      >
                        Редагувати
                      </button>
                    )}
                  </div>

                  {step === 1 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ім'я *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Введіть ім'я"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Прізвище *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Введіть прізвище"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Телефон *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="+38 (0__) ___-__-__"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-700">
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.email}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Delivery */}
              {step >= 2 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Доставка</h2>
                    {step > 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-sm text-green-800 hover:underline"
                      >
                        Редагувати
                      </button>
                    )}
                  </div>

                  {step === 2 ? (
                    <div className="space-y-4">
                      {/* Delivery method */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Спосіб доставки *
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="deliveryMethod"
                              value="courier"
                              checked={formData.deliveryMethod === 'courier'}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <Truck className="mr-3 text-green-800" size={20} />
                            <div className="flex-1">
                              <div className="font-medium">Кур'єрська доставка</div>
                              <div className="text-sm text-gray-600">1-2 дні • 500 ₴</div>
                            </div>
                          </label>

                          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="deliveryMethod"
                              value="novaposhta"
                              checked={formData.deliveryMethod === 'novaposhta'}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <Package className="mr-3 text-green-800" size={20} />
                            <div className="flex-1">
                              <div className="font-medium">Нова Пошта (відділення)</div>
                              <div className="text-sm text-gray-600">2-3 дні • за тарифами перевізника</div>
                            </div>
                          </label>

                          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="deliveryMethod"
                              value="pickup"
                              checked={formData.deliveryMethod === 'pickup'}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <MapPin className="mr-3 text-green-800" size={20} />
                            <div className="flex-1">
                              <div className="font-medium">Самовивіз</div>
                              <div className="text-sm text-gray-600">Київ, вул. Промислова, 15 • Безкоштовно</div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Address fields */}
                      {formData.deliveryMethod !== 'pickup' && (
                        <div className="grid grid-cols-1 gap-4 pt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Місто *
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Введіть місто"
                            />
                          </div>

                          {formData.deliveryMethod === 'courier' ? (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Адреса доставки *
                              </label>
                              <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Вулиця, будинок, квартира"
                              />
                            </div>
                          ) : (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Відділення Нової Пошти *
                              </label>
                              <input
                                type="text"
                                name="postOffice"
                                value={formData.postOffice}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Номер відділення"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-700">
                      <p className="font-medium">
                        {formData.deliveryMethod === 'courier' && 'Кур\'єрська доставка'}
                        {formData.deliveryMethod === 'novaposhta' && 'Нова Пошта'}
                        {formData.deliveryMethod === 'pickup' && 'Самовивіз'}
                      </p>
                      {formData.deliveryMethod !== 'pickup' && (
                        <>
                          <p>{formData.city}</p>
                          <p>{formData.deliveryMethod === 'courier' ? formData.address : `Відділення ${formData.postOffice}`}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Payment */}
              {step >= 3 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Оплата</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Спосіб оплати *
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={formData.paymentMethod === 'cash'}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <div className="text-2xl mr-3">💵</div>
                          <div className="flex-1">
                            <div className="font-medium">Готівкою при отриманні</div>
                            <div className="text-sm text-gray-600">Оплата кур'єру або в пункті самовивозу</div>
                          </div>
                        </label>

                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <CreditCard className="mr-3 text-green-800" size={20} />
                          <div className="flex-1">
                            <div className="font-medium">Оплата карткою онлайн</div>
                            <div className="text-sm text-gray-600">Visa, Mastercard</div>
                          </div>
                        </label>

                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="invoice"
                            checked={formData.paymentMethod === 'invoice'}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <div className="text-2xl mr-3">📄</div>
                          <div className="flex-1">
                            <div className="font-medium">Безготівковий розрахунок</div>
                            <div className="text-sm text-gray-600">За рахунком для юридичних осіб</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Коментар до замовлення
                      </label>
                      <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Додаткова інформація до замовлення (необов'язково)"
                      />
                    </div>

                    <div>
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreement"
                          checked={formData.agreement}
                          onChange={handleInputChange}
                          required
                          className="mt-1 mr-3"
                        />
                        <span className="text-sm text-gray-700">
                          Я погоджуюсь з <a href="#" className="text-green-800 hover:underline">умовами користування</a> та <a href="#" className="text-green-800 hover:underline">політикою конфіденційності</a>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Назад
                  </button>
                )}
                <button
                  type="submit"
                  className={`bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors ${
                    step === 1 ? 'w-full' : 'ml-auto'
                  }`}
                  disabled={step === 3 && !formData.agreement}
                >
                  {step < 3 ? 'Продовжити' : 'Підтвердити замовлення'}
                </button>
              </div>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ваше замовлення</h2>

              <div className="space-y-4 mb-6">
                {mockOrderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <div className="text-gray-900">{item.name}</div>
                      <div className="text-gray-600">Кількість: {item.quantity}</div>
                    </div>
                    <div className="font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Товари:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Доставка:</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-medium">Безкоштовно</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-gray-900">До сплати:</span>
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <Check size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Безпечна оплата</span>
                </div>
                <div className="flex items-start">
                  <Check size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Гарантія повернення протягом 14 днів</span>
                </div>
                <div className="flex items-start">
                  <Check size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Офіційна гарантія виробника</span>
                </div>
              </div>
            </div>
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

export default CheckoutPage;