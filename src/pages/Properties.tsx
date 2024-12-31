import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { usePropertyStore } from '../store/propertyStore';
import { translations } from '../utils/translations';
import PropertyCard from '../components/PropertyCard';
import { Property, PropertyStatus } from '../types';

const { properties: t } = translations;

export default function Properties() {
  const navigate = useNavigate();
  const { getPropertiesByStatus } = usePropertyStore();

  const availableProperties = getPropertiesByStatus('available');
  const underContractProperties = getPropertiesByStatus('underContract');
  const underOfferProperties = getPropertiesByStatus('underOffer');
  const soldProperties = getPropertiesByStatus('sold');

  const KanbanColumn = ({ title, status, properties }: { title: string; status: PropertyStatus; properties: Property[] }) => (
    <div className="flex-1 min-w-[280px] bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">{title}</h3>
      <div className="space-y-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
        {properties.length === 0 && (
          <p className="text-center text-gray-500 py-4">Aucun bien</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.title}</h1>
        <button
          onClick={() => navigate('/app/properties/new')}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t.addProperty}
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        <KanbanColumn
          title="Avis de valeur"
          status="available"
          properties={availableProperties}
        />
        <KanbanColumn
          title="Sous mandat"
          status="underContract"
          properties={underContractProperties}
        />
        <KanbanColumn
          title="Sous compromis"
          status="underOffer"
          properties={underOfferProperties}
        />
        <KanbanColumn
          title="Vendu"
          status="sold"
          properties={soldProperties}
        />
      </div>
    </div>
  );
}