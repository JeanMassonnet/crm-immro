import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Home, Euro, MapPin, Bed, Bath } from 'lucide-react';
import { usePropertyStore } from '../store/propertyStore';
import { translations } from '../utils/translations';
import PropertyVisits from '../components/PropertyVisits';
import PropertyTasks from '../components/PropertyTasks';
import PropertyDocuments from '../components/PropertyDocuments';

const { properties: t } = translations;

type Tab = 'info' | 'tasks' | 'documents';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties } = usePropertyStore();
  const [activeTab, setActiveTab] = useState<Tab>('info');
  
  const property = id ? properties.find(p => p.id === id) : undefined;

  if (!property) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = property.images.find(img => img.isMain) || property.images[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => navigate('/app/properties')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 ml-4">{property.title}</h1>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'info'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Informations
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tasks'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tâches
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Documents
          </button>
        </nav>
      </div>

      {activeTab === 'info' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {mainImage && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={mainImage.url}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {property.images.filter(img => !img.isMain).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image.url}
                        alt={`${property.title} - Image ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              <PropertyVisits propertyId={property.id} />
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center text-lg">
                    <Euro className="w-6 h-6 mr-2 text-primary" />
                    <span className="font-semibold">{formatPrice(property.price)}</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center text-lg">
                    <Home className="w-6 h-6 mr-2 text-primary" />
                    <span className="font-semibold">{property.size} m²</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{property.location}</span>
                </div>
                
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{property.bedrooms} {t.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{property.bathrooms} {t.bathrooms}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">{t.type}</h3>
                  <p>{t.propertyTypes[property.propertyType]}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Status</h3>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {t.status[property.status]}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">{t.description}</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{property.description}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={() => navigate(`/app/properties/${id}/edit`)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              <Edit className="w-5 h-5 mr-2" />
              {t.editProperty}
            </button>
          </div>
        </>
      )}

      {activeTab === 'tasks' && (
        <PropertyTasks propertyId={property.id} />
      )}

      {activeTab === 'documents' && (
        <PropertyDocuments propertyId={property.id} />
      )}
    </div>
  );
}