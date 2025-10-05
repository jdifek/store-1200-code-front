'use client'
import React, { useState } from 'react';
import { Search, User, Scale, Heart, ShoppingCart, Grid3X3, ChevronRight, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Дякуємо за звернення! Ми зв\'яжемося з вами найближчим часом.');
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Телефони',
      details: [
        { label: 'Відділ продажів', value: '+38 (067) 123-45-67' },
        { label: 'Технічна підтримка', value: '+38 (067) 123-45-68' },
        { label: 'Бухгалтерія', value: '+38 (044) 123-45-69' }
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        { label: 'Загальні питання', value: 'info@skladtech.ua' },
        { label: 'Замовлення', value: 'sales@skladtech.ua' },
        { label: 'Підтримка', value: 'support@skladtech.ua' }
      ]
    },
    {
      icon: MapPin,
      title: 'Адреса',
      details: [
        { label: 'Офіс та склад', value: 'м. Київ, вул. Промислова, 15' },
        { label: 'Індекс', value: '03067' }
      ]
    },
    {
      icon: Clock,
      title: 'Графік роботи',
      details: [
        { label: 'Понеділок - П\'ятниця', value: '9:00 - 18:00' },
        { label: 'Субота', value: '10:00 - 15:00' },
        { label: 'Неділя', value: 'Вихідний' }
      ]
    }
  ];

  const departments = [
    {
      name: 'Відділ продажів',
      phone: '+38 (067) 123-45-67',
      email: 'sales@skladtech.ua',
      description: 'Консультації по товарам, оформлення замовлень'
    },
    {
      name: 'Технічна підтримка',
      phone: '+38 (067) 123-45-68',
      email: 'support@skladtech.ua',
      description: 'Технічні питання, гарантійне обслуговування'
    },
    {
      name: 'Відділ проектування',
      phone: '+38 (067) 123-45-69',
      email: 'projects@skladtech.ua',
      description: 'Розробка проектів, технічна документація'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакти</h1>
        <p className="text-lg text-gray-600 mb-12">
          Зв'яжіться з нами будь-яким зручним способом. Ми завжди раді допомогти!
        </p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <info.icon className="text-green-800" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{info.title}</h3>
              <div className="space-y-3">
                {info.details.map((detail, idx) => (
                  <div key={idx}>
                    <div className="text-xs text-gray-600 mb-1">{detail.label}</div>
                    <div className="font-medium text-gray-900">{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Форма зворотного зв'язку</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ім'я *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ваше ім'я"
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
                  Email *
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тема звернення *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Оберіть тему</option>
                  <option value="order">Питання по замовленню</option>
                  <option value="product">Питання по товару</option>
                  <option value="delivery">Доставка</option>
                  <option value="payment">Оплата</option>
                  <option value="technical">Технічна підтримка</option>
                  <option value="other">Інше</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Повідомлення *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Опишіть ваше питання детально..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors flex items-center justify-center"
              >
                <Send size={18} className="mr-2" />
                Відправити повідомлення
              </button>
            </form>
          </div>

          {/* Map placeholder and departments */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Як нас знайти</h2>
            
            {/* Map placeholder */}
            <div className="bg-gray-100 rounded-lg h-64 mb-6 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin size={48} className="mx-auto mb-2" />
                <p>м. Київ, вул. Промислова, 15</p>
              </div>
            </div>

            {/* Departments */}
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Наші відділи</h3>
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{dept.name}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Phone size={14} className="mr-2 text-green-800" />
                      <a href={`tel:${dept.phone}`} className="hover:text-green-800">{dept.phone}</a>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail size={14} className="mr-2 text-green-800" />
                      <a href={`mailto:${dept.email}`} className="hover:text-green-800">{dept.email}</a>
                    </div>
                    <p className="text-gray-600 mt-2">{dept.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to get here */}
        <section className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Як до нас дістатися</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-800 font-bold">🚗</span>
                </div>
                <h3 className="font-semibold text-gray-900">На автомобілі</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Безкоштовна парковка на території. Зручний під'їзд з боку вулиці Промислової.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-800 font-bold">🚇</span>
                </div>
                <h3 className="font-semibold text-gray-900">Метро</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Станція метро "Шулявська" - 10 хвилин пішки або маршруткою №115.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-800 font-bold">🚌</span>
                </div>
                <h3 className="font-semibold text-gray-900">Громадський транспорт</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Маршрутки: №115, №213. Автобуси: №67, №218. Зупинка "Промислова".
              </p>
            </div>
          </div>
        </section>

        {/* Social media */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ми в соціальних мережах</h2>
          <p className="text-gray-600 mb-6">
            Слідкуйте за нашими новинами та акціями
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="bg-gray-100 hover:bg-green-100 w-12 h-12 rounded-full flex items-center justify-center transition-colors">
              <span className="text-xl">📘</span>
            </a>
            <a href="#" className="bg-gray-100 hover:bg-green-100 w-12 h-12 rounded-full flex items-center justify-center transition-colors">
              <span className="text-xl">📷</span>
            </a>
            <a href="#" className="bg-gray-100 hover:bg-green-100 w-12 h-12 rounded-full flex items-center justify-center transition-colors">
              <span className="text-xl">💬</span>
            </a>
            <a href="#" className="bg-gray-100 hover:bg-green-100 w-12 h-12 rounded-full flex items-center justify-center transition-colors">
              <span className="text-xl">📱</span>
            </a>
          </div>
        </section>
      </div>

  
    </div>
  );
};

export default ContactsPage;