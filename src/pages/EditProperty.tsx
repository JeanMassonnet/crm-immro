import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Plus } from 'lucide-react';
import { Property, PropertyType, PropertyStatus, PropertyImage } from '../types';
import { usePropertyStore } from '../store/propertyStore';
import { useClientStore } from '../store/clientStore';
import { translations } from '../utils/translations';
import ClientModal from '../components/modals/ClientModal';
import ImageUpload from '../components/ImageUpload';

const { properties: t, common } = translations;

type PropertyFormData = Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'images'>;

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm<PropertyFormData>();
  const { properties, addProperty, updateProperty } = usePropertyStore();
  const { clients } = useClientStore();
  const [showClientModal, setShowClientModal] = useState(false);
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const property = id ? properties.find(p => p.id === id) : undefined;
  const sellers = clients.filter((client) => client.type === 'seller');
  const selectedSellerId = watch('sellerId');

  useEffect(() => {
    if (property) {
      reset({
        title: property.title,
        description: property.description,
        price: property.price,
        size: property.size,
        location: property.location,
        propertyType: property.propertyType,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        status: property.status,
        sellerId: property.sellerId,
      });
      setImages(property.images);
    } else {
      reset({
        title: '',
        description: '',
        price: 0,
        size: 0,
        location: '',
        propertyType: 'house',
        bedrooms: 1,
        bathrooms: 1,
        status: 'available',
        sellerId: '',
      });
      setImages([]);
    }
  }, [property, reset]);

  const onSubmit = (data: PropertyFormData) => {
    if (images.length === 0) {
      setError('Au moins une image est requise');
      return;
    }

    const propertyData = {
      ...data,
      images,
    };

    if (property) {
      updateProperty(property.id, propertyData);
      navigate(`/app/properties/${property.id}`);
    } else {
      const newProperty = addProperty(propertyData);
      navigate(`/app/properties/${newProperty.id}`);
    }
  };

  const handleImagesChange = (newImages: PropertyImage[]) => {
    setImages(newImages);
    setError(null);
  };

  const handleImageError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/app/properties')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {property ? t.editProperty : t.addProperty}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
          </label>
          <ImageUpload
            images={images}
            onChange={handleImagesChange}
            onError={handleImageError}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre
          </label>
          <input
            {...register('title', { required: true })}
            type="text"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.price}
            </label>
            <input
              {...register('price', { required: true, min: 0 })}
              type="number"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.size} (m²)
            </label>
            <input
              {...register('size', { required: true, min: 0 })}
              type="number"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.location}
          </label>
          <input
            {...register('location', { required: true })}
            type="text"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.type}
            </label>
            <select
              {...register('propertyType')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
            >
              {(Object.keys(t.propertyTypes) as PropertyType[]).map((type) => (
                <option key={type} value={type}>
                  {t.propertyTypes[type]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.bedrooms}
            </label>
            <input
              {...register('bedrooms', { required: true, min: 0 })}
              type="number"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.bathrooms}
            </label>
            <input
              {...register('bathrooms', { required: true, min: 0 })}
              type="number"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.seller}
            </label>
            <select
              {...register('sellerId', { required: true })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
            >
              <option value="">Sélectionner un vendeur</option>
              {sellers.map((seller) => (
                <option key={seller.id} value={seller.id}>
                  {seller.firstName} {seller.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-6">
            <button
              type="button"
              onClick={() => setShowClientModal(true)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter un vendeur
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            {...register('status')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
          >
            {(Object.keys(t.status) as PropertyStatus[]).map((status) => (
              <option key={status} value={status}>
                {t.status[status]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.description}
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/app/properties')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            {common.cancel}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            {property ? common.update : common.add}
          </button>
        </div>
      </form>

      <ClientModal
        isOpen={showClientModal}
        onClose={() => setShowClientModal(false)}
        defaultType="seller"
      />
    </div>
  );
}