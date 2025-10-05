import React from 'react';
import { Search, User, Scale, Heart, ShoppingCart, Grid3X3, ChevronRight, Phone, Mail, MapPin, Award, Users, TrendingUp, Wrench, Clock, Shield } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: Users, value: '500+', label: 'Задоволених клієнтів' },
    { icon: TrendingUp, value: '15', label: 'Років на ринку' },
    { icon: Award, value: '1200+', label: 'Реалізованих проектів' },
    { icon: Wrench, value: '24/7', label: 'Технічна підтримка' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Гарантія якості',
      description: 'Всі товари мають офіційну гарантію виробника та проходять контроль якості'
    },
    {
      icon: Users,
      title: 'Професіоналізм',
      description: 'Команда експертів з багаторічним досвідом у галузі торгового обладнання'
    },
    {
      icon: Clock,
      title: 'Швидкість виконання',
      description: 'Оперативна доставка та монтаж в узгоджені терміни'
    },
    {
      icon: Award,
      title: 'Індивідуальний підхід',
      description: 'Розробка рішень під специфічні потреби вашого бізнесу'
    }
  ];

  const team = [
    {
      name: 'Олексій Петренко',
      position: 'Генеральний директор',
      experience: '15 років досвіду',
      avatar: '👨‍💼'
    },
    {
      name: 'Марина Коваленко',
      position: 'Керівник відділу продажів',
      experience: '10 років досвіду',
      avatar: '👩‍💼'
    },
    {
      name: 'Ігор Семенович',
      position: 'Головний інженер',
      experience: '12 років досвіду',
      avatar: '👨‍🔧'
    },
    {
      name: 'Наталія Василівна',
      position: 'Менеджер з проектів',
      experience: '8 років досвіду',
      avatar: '👩‍💻'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
  

      {/* Hero section */}
      <section className="bg-gradient-to-r from-green-800 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Про компанію SkladTech
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Провідний постачальник професійного торгового обладнання в Україні з 2009 року
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-green-800" size={32} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Наша місія
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  Компанія <strong>SkladTech</strong> спеціалізується на постачанні та монтажу професійного торгового обладнання для супермаркетів, магазинів, складських приміщень та виробничих об'єктів.
                </p>
                <p>
                  З 2009 року ми успішно реалізували понад 1200 проектів по всій Україні, забезпечивши наших клієнтів якісним обладнанням та професійним сервісом.
                </p>
                <p>
                  Наша мета - надавати комплексні рішення, які допомагають бізнесу ефективно організувати торгові та складські приміщення, підвищити продуктивність та оптимізувати витрати.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="text-8xl mb-4">🏭</div>
              <p className="text-gray-600">
                Власне виробництво та склад у Києві площею 3000 м²
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Наші цінності
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-green-800" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Що ми пропонуємо
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Постачання обладнання
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <ChevronRight className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Холодильне обладнання для торгових залів</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Торгові ваги та касове обладнання</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Стелажі та металеві конструкції</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Обладнання для професійних кухонь</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Послуги
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <ChevronRight className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Проектування торгових та складських приміщень</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Професійний монтаж обладнання</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Гарантійне та післягарантійне обслуговування</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Консультації експертів</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Наша команда
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Професіонали з багаторічним досвідом, які завжди готові допомогти вам знайти оптимальне рішення
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-800 font-medium mb-2">
                  {member.position}
                </p>
                <p className="text-sm text-gray-600">
                  {member.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готові почати співпрацю?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Зв'яжіться з нами для безкоштовної консультації та розрахунку вартості вашого проекту
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Замовити консультацію
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors">
              Переглянути каталог
            </button>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Нам довіряють
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Серед наших клієнтів провідні торгові мережі та виробничі компанії України
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['АТБ', 'Сільпо', 'Novus', 'Ашан', 'Фора', 'Велмарт'].map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow">
                <div className="text-xl font-bold text-gray-400">{partner}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Сертифікати та досягнення
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold text-gray-900 mb-2">ISO 9001:2015</h3>
              <p className="text-gray-600 text-sm">
                Сертифікат системи менеджменту якості
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="font-semibold text-gray-900 mb-2">Офіційний партнер</h3>
              <p className="text-gray-600 text-sm">
                Провідних європейських виробників обладнання
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-semibold text-gray-900 mb-2">100% гарантія</h3>
              <p className="text-gray-600 text-sm">
                Всі товари мають офіційну гарантію виробника
              </p>
            </div>
          </div>
        </div>
      </section>

 
    </div>
  );
};

export default AboutPage;