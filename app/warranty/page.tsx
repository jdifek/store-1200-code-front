import React from 'react';
import { Search, User, Scale, Heart, ShoppingCart, Grid3X3, ChevronRight, Phone, Mail, MapPin, Shield, Check, Clock, FileText, Wrench, AlertCircle, Package } from 'lucide-react';

const WarrantyPage = () => {
  const warrantyTerms = [
    {
      icon: Shield,
      title: 'Офіційна гарантія виробника',
      period: 'від 12 до 60 місяців',
      description: 'Всі товари мають офіційну гарантію від виробника залежно від категорії обладнання'
    },
    {
      icon: Wrench,
      title: 'Безкоштовний ремонт',
      period: 'протягом гарантійного терміну',
      description: 'Усунення всіх виробничих дефектів та несправностей за наш рахунок'
    },
    {
      icon: Package,
      title: 'Заміна товару',
      period: 'протягом 14 днів',
      description: 'Можливість повернення або обміну товару належної якості без пояснення причин'
    }
  ];

  const warrantyByCategory = [
    {
      category: 'Штабелери та погрузчики',
      period: '24-36 місяців',
      conditions: [
        'Гарантія на електричні компоненти - 24 місяці',
        'Гарантія на механічні частини - 36 місяців',
        'Безкоштовне технічне обслуговування перші 6 місяців'
      ]
    },
    {
      category: 'Реф-контейнери',
      period: '12-24 місяці',
      conditions: [
        'Гарантія на холодильне обладнання - 12 місяців',
        'Гарантія на конструкцію контейнера - 24 місяці',
        'Щомісячна перевірка системи охолодження'
      ]
    },
    {
      category: 'Бытовки та модульні будинки',
      period: '36-60 місяців',
      conditions: [
        'Гарантія на конструкцію - 60 місяців',
        'Гарантія на внутрішню обробку - 36 місяців',
        'Гарантія на електрику - 24 місяці'
      ]
    },
    {
      category: 'Резервуари та ємності',
      period: '24-48 місяців',
      conditions: [
        'Гарантія на герметичність - 48 місяців',
        'Гарантія на зварні шви - 36 місяців',
        'Антикорозійне покриття - 24 місяці'
      ]
    }
  ];

  const warrantyExclusions = [
    'Механічні пошкодження внаслідок неправильної експлуатації',
    'Пошкодження від стихійного лиха',
    'Самостійний ремонт або модифікація обладнання',
    'Недотримання правил технічного обслуговування',
    'Використання неоригінальних запчастин',
    'Перевищення максимально допустимих навантажень'
  ];

  const returnProcess = [
    {
      step: '1',
      title: 'Зв\'яжіться з нами',
      description: 'Телефонуйте або пишіть на email з описом проблеми та номером замовлення'
    },
    {
      step: '2',
      title: 'Діагностика',
      description: 'Наш фахівець проведе діагностику та визначить причину несправності'
    },
    {
      step: '3',
      title: 'Ремонт або заміна',
      description: 'Ми усунемо проблему або замінимо товар на новий протягом 5-14 робочих днів'
    },
    {
      step: '4',
      title: 'Повернення',
      description: 'Відремонтований або новий товар буде доставлений до вас безкоштовно'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Гарантія та повернення</h1>
        <p className="text-lg text-gray-600 mb-12">
          Ми гарантуємо якість нашої продукції та надаємо повну підтримку після покупки
        </p>

        {/* Warranty terms */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Умови гарантії</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {warrantyTerms.map((term, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <term.icon className="text-green-800" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {term.title}
                </h3>
                <div className="text-green-800 font-semibold mb-3">
                  {term.period}
                </div>
                <p className="text-gray-600">
                  {term.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Warranty by category */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Гарантійні терміни по категоріях</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {warrantyByCategory.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{item.category}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {item.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {item.conditions.map((condition, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Return process */}
        <section className="mb-16 bg-green-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Процес гарантійного обслуговування</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {returnProcess.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center">
                <div className="bg-green-800 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Warranty exclusions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Випадки, що не покриваються гарантією</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start mb-4">
              <AlertCircle className="text-red-600 mr-3 mt-1 flex-shrink-0" size={24} />
              <p className="text-gray-700">
                Гарантія не поширюється на наступні випадки:
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-9">
              {warrantyExclusions.map((exclusion, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-red-600 mr-2">•</span>
                  <span>{exclusion}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Return policy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Повернення товару</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Повернення протягом 14 днів</h3>
              <p className="text-gray-700 mb-4">
                Згідно із Законом України "Про захист прав споживачів", ви маєте право повернути товар належної якості протягом 14 днів з моменту покупки.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-700">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Товар повинен зберігати товарний вигляд</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Наявність заводської упаковки</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Збереження товарних етикеток</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Наявність документів про покупку</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Повернення коштів</h3>
              <p className="text-gray-700 mb-4">
                При поверненні товару кошти повертаються протягом 10 робочих днів одним із способів:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-700">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>На банківську карту</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Готівкою в касі</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Банківським переказом</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Обмін на інший товар</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Service centers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Сервісні центри</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Київ</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-start">
                  <MapPin size={14} className="mr-2 mt-1 flex-shrink-0 text-green-800" />
                  вул. Промислова, 15
                </p>
                <p className="flex items-start">
                  <Phone size={14} className="mr-2 mt-1 flex-shrink-0 text-green-800" />
                  +38 (067) 123-45-67
                </p>
                <p className="flex items-start">
                  <Clock size={14} className="mr-2 mt-1 flex-shrink-0 text-green-800" />
                  Пн-Пт: 9:00-18:00
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Львів</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-start">
                  <MapPin size={14} className="mr-2 mt-1 flex-shrink-0 text-green-800" />
                  вул. Городоцька, 120
                </p>
                <p className="flex items-start">
                  <Phone size={14} className="mr-2 mt-1 flex-shrink-0 text-green-800" />
                  +38 (067) 234-56-78
                </p>
                <p className="flex items-start">
                  <Clock size={14} className="mr-2 mt-1 flex-shrink-0 text-green-800" />
                  Пн-Пт: 9:00-18:00
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Дніпро</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-start">
                  <MapPin size={14} className="mr-2 mt-1 flex-shrink-0 text-green-800" />
                  просп. Героїв, 28
                </p>
                <p className="flex items-start">
                  <Phone size={14} className="mr-2 mt-1 flex-shrink-0 text-green-800" />
                  +38 (067) 345-67-89
                </p>
                <p className="flex items-start">
                  <Clock size={14} className="mr-2 mt-1 flex-shrink-0 text-green-800" />
                  Пн-Пт: 9:00-18:00
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-green-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Потрібна допомога з гарантією?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Наші фахівці готові відповісти на всі ваші питання щодо гарантійного обслуговування
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+380663040967" className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Зателефонувати
            </a>
          
          </div>
        </section>
      </div>

    </div>
  );
};

export default WarrantyPage;