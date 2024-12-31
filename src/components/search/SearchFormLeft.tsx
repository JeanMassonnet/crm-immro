import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import LocationInput from '../LocationInput';
import { BuyerSearch } from '../../types/search';

type SearchFormData = Omit<BuyerSearch, 'id' | 'createdAt' | 'updatedAt'>;

type SearchFormLeftProps = {
  register: UseFormRegister<SearchFormData>;
  setValue: (name: any, value: any) => void;
  watch: (name: any) => any;
  buyers: Array<{ id: string; firstName: string; lastName: string; }>;
};

export default function SearchFormLeft({ register, setValue, watch, buyers }: SearchFormLeftProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Acquéreur
        </label>
        <select
          {...register('clientId', { required: true })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
        >
          <option value="">Sélectionner un acquéreur</option>
          {buyers.map((buyer) => (
            <option key={buyer.id} value={buyer.id}>
              {buyer.firstName} {buyer.lastName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Localisation(s)
        </label>
        <LocationInput
          locations={watch('locations')}
          onChange={(locations) => setValue('locations', locations)}
          maxLocations={10}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Budget maximum
        </label>
        <input
          type="number"
          {...register('priceRange.min')}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Surface minimum (m²)
        </label>
        <input
          type="number"
          {...register('sizeRange.min')}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chambres min
          </label>
          <input
            type="number"
            {...register('bedrooms')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salles de bain min
          </label>
          <input
            type="number"
            {...register('bathrooms')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('active')}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="ml-2">Recherche active</span>
        </label>
      </div>
    </div>
  );
}