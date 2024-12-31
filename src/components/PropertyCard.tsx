import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Euro, MapPin, Bed, Bath } from 'lucide-react';
import { Property } from '../types';
import { useClientStore } from '../store/clientStore';
import { translations } from '../utils/translations';

const { properties: t } = translations;

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();
  const { clients } = useClientStore();
  const advisor = clients.find((client) => client.id === property.sellerId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = property.images.find(img => img.isMain) || property.images[0];

  return (
    <div 
      onClick={() => navigate(`/app/properties/${property.id}`)}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      {mainImage && (
        <img
          src={mainImage.url}
          alt={property.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
      
      <div className="space-y-2 text-gray-600">
        <div className="flex items-center">
          <Euro className="w-4 h-4 mr-2" />
          <span>{formatPrice(property.price)}</span>
        </div>
        
        <div className="flex items-center">
          <Home className="w-4 h-4 mr-2" />
          <span>{property.size} m²</span>
        </div>
        
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{property.location}</span>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms}</span>
          </div>
        </div>

        {advisor && (
          <div className="text-sm text-gray-500">
            {t.seller}: {advisor.firstName} {advisor.lastName}
          </div>
        )}
      </div>
    </div>
  );
}