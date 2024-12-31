import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useClientStore } from '../../store/clientStore';
import { BuyerSearch, WorkType } from '../../types/search';
import { PropertyType } from '../../types';
import { translations } from '../../utils/translations';
import SearchFormLeft from '../search/SearchFormLeft';

const { properties: t, workTypes } = translations;

const propertyFeatures = [
  { id: 'garden', label: 'Jardin' },
  { id: 'terrace', label: 'Terrasse' },
  { id: 'balcony', label: 'Balcon' },
  { id: 'pool', label: 'Piscine' },
  { id: 'parking', label: 'Parking' },
  { id: 'garage', label: 'Garage' },
  { id: 'elevator', label: 'Ascenseur' },
  { id: 'cellar', label: 'Cave' },
  { id: 'fireplace', label: 'Cheminée' },
];

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  search?: BuyerSearch;
  onSubmit: (data: Omit<BuyerSearch, 'id' | 'createdAt' | 'updatedAt'>) => void;
};

type SearchFormData = Omit<BuyerSearch, 'id' | 'createdAt' | 'updatedAt'>;

export default function SearchModal({ isOpen, onClose, search, onSubmit }: SearchModalProps) {
  const { clients } = useClientStore();
  const { register, handleSubmit, setValue, watch } = useForm<SearchFormData>({
    defaultValues: search || {
      locations: [],
      priceRange: { min: 0 },
      sizeRange: { min: 0 },
      propertyTypes: [],
      features: [],
      workTypes: [],
      active: true,
    },
  });

  if (!isOpen) return null;

  const buyers = clients.filter(client => client.types.buyer);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {search ? 'Modifier la recherche' : 'Nouvelle recherche'}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Colonne de gauche */}
          <SearchFormLeft
            register={register}
            setValue={setValue}
            watch={watch}
            buyers={buyers}
          />

          {/* Colonne de droite */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Types de biens
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['house', 'apartment', 'land', 'commercial'] as PropertyType[]).map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('propertyTypes')}
                      value={type}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2">{t.propertyTypes[type]}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Travaux
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(workTypes) as WorkType[]).map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('workTypes')}
                      value={type}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2">{workTypes[type]}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caractéristiques souhaitées
              </label>
              <div className="grid grid-cols-2 gap-2">
                {propertyFeatures.map((feature) => (
                  <label key={feature.id} className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('features')}
                      value={feature.id}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2">{feature.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Boutons de formulaire */}
          <div className="col-span-2 flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              {search ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}