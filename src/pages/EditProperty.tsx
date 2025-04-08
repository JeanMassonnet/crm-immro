import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { Property, PropertyType, PropertyStatus, PropertyImage, PropertyContact } from '../types';
import { usePropertyStore } from '../store/propertyStore';
import { translations } from '../utils/translations';
import ImageUpload from '../components/ImageUpload';
import { useGooglePlaces } from '../hooks/useGooglePlaces';
import PropertyContactSelect from '../components/PropertyContactSelect';

const { properties: t, common } = translations;

type PropertyFormData = Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'images' | 'sellerId' | 'contacts'>;

type AddressComponents = {
  streetNumber: string;
  street: string;
  city: string;
  zipCode: string;
};

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, watch } = useForm<PropertyFormData>();
  const { properties, addProperty, updateProperty } = usePropertyStore();
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [contacts, setContacts] = useState<PropertyContact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [addressComponents, setAddressComponents] = useState<AddressComponents>({
    streetNumber: '',
    street: '',
    city: '',
    zipCode: '',
  });
  
  const property = id ? properties.find(p => p.id === id) : undefined;

  const { initAutocomplete } = useGooglePlaces({
    onPlaceSelected: (place) => {
      let components: AddressComponents = {
        streetNumber: '',
        street: '',
        city: '',
        zipCode: '',
      };

      place.address_components?.forEach((component: any) => {
        if (component.types.includes('street_number')) {
          components.streetNumber = component.long_name;
        }
        if (component.types.includes('route')) {
          components.street = component.long_name;
        }
        if (component.types.includes('locality')) {
          components.city = component.long_name;
        }
        if (component.types.includes('postal_code')) {
          components.zipCode = component.long_name;
        }
      });

      setAddressComponents(components);
      const fullAddress = `${components.streetNumber} ${components.street}, ${components.zipCode} ${components.city}`;
      setValue('location', fullAddress);
    }
  });

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
      });
      setImages(property.images);
      setContacts(property.contacts || []);
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
      });
      setImages([]);
      setContacts([]);
    }
  }, [property, reset]);

  useEffect(() => {
    const locationInput = document.getElementById('location') as HTMLInputElement;
    if (locationInput) {
      initAutocomplete(locationInput);
    }
  }, [initAutocomplete]);

  const onSubmit = (data: PropertyFormData) => {
    if (images.length === 0) {
      setError('Au moins une image est requise');
      return;
    }

    const propertyData = {
      ...data,
      images,
      contacts,
      sellerId: '', // Champ vide par défaut
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
            Contacts associés
          </label>
          <PropertyContactSelect
            selectedContacts={contacts}
            onChange={setContacts}
            maxContacts={4}
          />
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
            id="location"
            {...register('location', { required: true })}
            type="text"
            placeholder="Saisissez l'adresse du bien"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
          />
          {addressComponents.city && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Numéro : {addressComponents.streetNumber}</p>
              <p>Rue : {addressComponents.street}</p>
              <p>Ville : {addressComponents.city}</p>
              <p>Code postal : {addressComponents.zipCode}</p>
            </div>
          )}
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
    </div>
  );
}