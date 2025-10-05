import React from 'react';
import { Search, User, Scale, Heart, ShoppingCart, Grid3X3, ChevronRight, Phone, Mail, MapPin, Truck, Package, MapPinned, CreditCard, Banknote, FileText, Clock, Check } from 'lucide-react';

const DeliveryPage = () => {
  const deliveryMethods = [
    {
      icon: Truck,
      title: 'Кур\'єрська доставка',
      description: 'Доставка по Києву та Київській області',
      price: '500 ₴',
      time: '1-2 робочі дні',
      details: [
        'Безкоштовна доставка при замовленні від 15 000 ₴',
        'Доставка здійснюється з 9:00 до 18:00',
        'Можливість вибору зручного часу доставки',
        'Підйом на поверх оплачується окремо'
      ]
    },
    {
      icon: Package,
      title: 'Нова Пошта (відділення)',
      description: 'Доставка в будь-яке відділення по Україні',
      price: 'За тарифами НП',
      time: '2-3 робочі дні',
      details: [
        'Понад 5000 відділень по всій Україні',
        'Можливість оплати при отриманні',
        'СМС-повідомлення про прибуття',
        'Зручний графік роботи відділень'
      ]
    },
    {
      icon: MapPinned,
      title: 'Самовивіз',
      description: 'Самостійне отримання із нашого складу',
      price: 'Безкоштовно',
      time: 'В день замовлення',
      details: [
        'Адреса: м. Київ, вул. Промислова, 15',
        'Графік роботи: Пн-Пт 9:00-18:00, Сб 10:00-15:00',
        'Безкоштовне паркування',
        'Допомога в завантаженні'
      ]
    }
  ];

  const paymentMethods = [
    {
      icon: Banknote,
      title: 'Готівкою',
      description: 'Оплата кур\'єру або в пункті самовивозу',
      features: [
        'Оплата при отриманні товару',
        'Можливість перевірки товару перед оплатою',
        'Надання фіскального чеку'
      ]
    },
    {
      icon: CreditCard,
      title: 'Картою онлайн',
      description: 'Оплата на сайті через безпечний платіжний шлюз',
      features: [
        'Visa, Mastercard',
        'Захищені 3D-Secure технологією',
        'Миттєве підтвердження оплати'
      ]
    },
    {
      icon: FileText,
      title: 'Безготівковий розрахунок',
      description: 'Оплата за рахунком для юридичних осіб',
      features: [
        'Можливість оплати з ПДВ або без ПДВ',
        'Формування рахунку протягом 1 години',
        'Закриваючі документи в день оплати'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Доставка та оплата</h1>
        <p className="text-lg text-gray-600 mb-12">
          Оберіть найзручніший для вас спосіб доставки та оплати замовлення
        </p>

        {/* Delivery methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Способи доставки</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliveryMethods.map((method, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <method.icon className="text-green-800" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {method.description}
                </p>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="text-sm text-gray-600">Вартість</div>
                    <div className="font-semibold text-green-800">{method.price}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Термін</div>
                    <div className="font-semibold text-gray-900">{method.time}</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {method.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <Check size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery zones */}
        <section className="mb-16 bg-green-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Зони доставки по Києву</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Зона 1 (в межах МКАД)</h4>
              <p className="text-gray-700 mb-2">Вартість доставки: <strong>500 ₴</strong></p>
              <p className="text-sm text-gray-600">
                Безкоштовна доставка при замовленні від 15 000 ₴
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Зона 2 (передмістя)</h4>
              <p className="text-gray-700 mb-2">Вартість доставки: <strong>від 800 ₴</strong></p>
              <p className="text-sm text-gray-600">
                Розраховується індивідуально залежно від відстані
              </p>
            </div>
          </div>
        </section>

        {/* Payment methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Способи оплати</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <method.icon className="text-green-800" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {method.description}
                </p>
                <ul className="space-y-2">
                  {method.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <Check size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Additional info */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Додаткова інформація</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="text-green-800 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">Час обробки замовлень</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Замовлення, оформлені до 14:00, відправляються в той же день. Замовлення після 14:00 - наступного робочого дня.
              </p>
              <p className="text-sm text-gray-600">
                У вихідні та святкові дні замовлення обробляються в перший робочий день.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Package className="text-green-800 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">Перевірка товару</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Ви маєте право перевірити товар при отриманні до моменту оплати.
              </p>
              <p className="text-sm text-gray-600">
                Перевірте комплектність, зовнішній вигляд та відповідність товару вашому замовленню.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Часті питання</h2>
          <div className="space-y-4">
            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Чи можна змінити адресу доставки після оформлення замовлення?
              </summary>
              <p className="text-gray-700 mt-3">
                Так, ви можете змінити адресу доставки, зв'язавшись з нашим менеджером за телефоном +38 (067) 123-45-67 до моменту відправки товару.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Чи можна оплатити частину замовлення зараз, а частину пізніше?
              </summary>
              <p className="text-gray-700 mt-3">
                Так, для великих замовлень можлива оплата частинами. Зв'яжіться з менеджером для узгодження умов.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Що робити, якщо товар пошкоджений при доставці?
              </summary>
              <p className="text-gray-700 mt-3">
                Не приймайте пошкоджений товар і негайно зв'яжіться з нами. Ми організуємо заміну або повернення коштів відповідно до законодавства України.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Чи надаєте ви послуги монтажу?
              </summary>
              <p className="text-gray-700 mt-3">
                Так, ми надаємо професійні послуги монтажу обладнання. Вартість та терміни узгоджуються індивідуально залежно від складності робіт.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-green-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Залишились питання?</h2>
          <p className="text-green-100 mb-6">
            Наші менеджери з радістю допоможуть вам оформити замовлення
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+380671234567" className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Зателефонувати
            </a>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors">
              Написати в чат
            </button>
          </div>
        </section>
      </div>

    </div>
  );
};

export default DeliveryPage;