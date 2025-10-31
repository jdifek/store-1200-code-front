import { Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
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

          <div></div>
          <div></div>
          {/* <div>
          <h3 className="text-lg font-semibold mb-4">Каталог</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="#" className="hover:text-white transition-colors">
              Контейнеры
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
              Ёмкости
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
              Бытовки на колёсах
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
              Асики
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
        </div> */}

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
  );
};
