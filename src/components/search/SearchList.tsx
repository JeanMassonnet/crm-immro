import React from 'react';
import { MapPin, Euro, Home, Bed, Bath, Edit, User } from 'lucide-react';
import { BuyerSearch } from '../../types/search';
import { Client } from '../../types';
import { formatPrice } from '../../utils/format';
import { translations } from '../../utils/translations';

const { properties: t } = translations;

type SearchListProps = {
  searches: BuyerSearch[];
  clients: Client[];
  onEditSearch: (search: BuyerSearch) => void;
  hideClientInfo?: boolean;
};

export default function SearchList({ searches, clients, onEditSearch, hideClientInfo = false }: SearchListProps) {
  const formatLocation = (location: { city: string; zipCode?: string }): string => {
    if (location.zipCode) {
      return `${location.city} (${location.zipCode})`;
    }
    return location.city;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {searches.map((search) => {
        const client = clients.find((c) => c.id === search.clientId);
        if (!client) return null;

        return (
          <div
            key={search.id}
            className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-4 relative group"
          >
            <div className="flex justify-between items-start">
              <div>
                {hideClientInfo ? (
                  <div className="flex items-center text-gray-500">
                    <User className="w-5 h-5 mr-2" />
                    <span>Mandataire</span>
                  </div>
                ) : (
                  <h3 className="text-lg font-semibold">
                    {client.firstName} {client.lastName}
                  </h3>
                )}
                <div className="flex items-center text-gray-500 mt-1 flex-wrap">
                  <MapPin className="w-4 h-4 mr-1 shrink-0" />
                  <p className="text-sm">
                    {search.locations.map(formatLocation).join(', ')}
                  </p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  search.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {search.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Euro className="w-4 h-4 mr-2 shrink-0" />
                <span className="text-sm">
                  {search.priceRange.min && formatPrice(search.priceRange.min)}
                  {' - '}
                  {search.priceRange.max && formatPrice(search.priceRange.max)}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Home className="w-4 h-4 mr-2 shrink-0" />
                <span className="text-sm">
                  {search.sizeRange.min}
                  {' - '}
                  {search.sizeRange.max} m²
                </span>
              </div>
            </div>

            {(search.bedrooms || search.bathrooms) && (
              <div className="flex space-x-4 text-gray-600">
                {search.bedrooms && (
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-sm">{search.bedrooms}+</span>
                  </div>
                )}
                {search.bathrooms && (
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-sm">{search.bathrooms}+</span>
                  </div>
                )}
              </div>
            )}

            {search.propertyTypes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {search.propertyTypes.map((type) => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {t.propertyTypes[type]}
                  </span>
                ))}
              </div>
            )}

            {search.features && search.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {search.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {search.notes && (
              <p className="text-sm text-gray-500 italic">
                {search.notes}
              </p>
            )}

            {!hideClientInfo && (
              <button
                onClick={() => onEditSearch(search)}
                className="absolute bottom-4 right-4 p-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full hover:bg-gray-100"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}