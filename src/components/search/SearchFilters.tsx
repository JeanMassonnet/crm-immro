import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { PriceRange } from '../../types/search';
import { priceRanges } from '../../utils/priceRanges';

type SearchFiltersProps = {
  locations: string[];
  selectedLocations: string[];
  selectedPriceRange: PriceRange | null;
  onLocationToggle: (city: string) => void;
  onPriceRangeToggle: (range: PriceRange) => void;
};

export default function SearchFilters({
  locations,
  selectedLocations,
  selectedPriceRange,
  onLocationToggle,
  onPriceRangeToggle,
}: SearchFiltersProps) {
  const [citySearch, setCitySearch] = useState('');

  const filteredLocations = locations.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">Localisation</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            placeholder="Rechercher une ville..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        {selectedLocations.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedLocations.map((city) => (
              <button
                key={city}
                onClick={() => onLocationToggle(city)}
                className="flex items-center px-3 py-1.5 rounded-full text-sm bg-primary text-white"
              >
                <MapPin className="w-4 h-4 mr-1.5" />
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">Budget</h3>
        <select
          value={selectedPriceRange ? `${selectedPriceRange.min}-${selectedPriceRange.max}` : ''}
          onChange={(e) => {
            const [min, max] = e.target.value.split('-').map(Number);
            const range = priceRanges.find(r => r.min === min && r.max === max);
            if (range) {
              onPriceRangeToggle(range);
            }
          }}
          className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Tous les prix</option>
          {priceRanges.map((range) => (
            <option 
              key={`${range.min}-${range.max}`} 
              value={`${range.min}-${range.max}`}
            >
              {range.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}