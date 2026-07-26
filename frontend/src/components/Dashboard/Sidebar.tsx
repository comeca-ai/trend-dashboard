'use client';

import { Globe, Filter } from 'lucide-react';

interface SidebarProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const countries = [
  { code: 'BR', name: 'Brasil' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'GB', name: 'Reino Unido' },
  { code: 'DE', name: 'Alemanha' },
  { code: 'FR', name: 'França' },
  { code: 'JP', name: 'Japão' },
];

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'business', name: 'Negócios' },
  { id: 'technology', name: 'Tecnologia' },
  { id: 'entertainment', name: 'Entretenimento' },
  { id: 'sports', name: 'Esportes' },
  { id: 'health', name: 'Saúde' },
];

export default function Sidebar({
  selectedCountry,
  onCountryChange,
  selectedCategory,
  onCategoryChange,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-700 p-6 overflow-y-auto hidden md:block">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Filter size={20} />
        Filtros
      </h2>

      {/* Countries */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
          <Globe size={16} />
          País
        </h3>
        <div className="space-y-2">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => onCountryChange(country.code)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                selectedCountry === country.code
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-4">Categoria</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
