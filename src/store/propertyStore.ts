import { create } from 'zustand';
import { Property } from '../types';

interface PropertyState {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Property;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getPropertiesBySellerId: (sellerId: string) => Property[];
  getPropertiesByStatus: (status: Property['status']) => Property[];
  setMainImage: (propertyId: string, imageUrl: string) => void;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [], // Empty array instead of demo data
  addProperty: (propertyData) => {
    const newProperty = {
      ...propertyData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      properties: [...state.properties, newProperty],
    }));

    return newProperty;
  },
  updateProperty: (id, propertyData) => {
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === id
          ? { ...property, ...propertyData, updatedAt: new Date() }
          : property
      ),
    }));
  },
  deleteProperty: (id) => {
    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
    }));
  },
  getPropertiesBySellerId: (sellerId) => {
    return get().properties.filter((property) => property.sellerId === sellerId);
  },
  getPropertiesByStatus: (status) => {
    return get().properties.filter((property) => property.status === status);
  },
  setMainImage: (propertyId, imageUrl) => {
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              images: property.images.map((image) => ({
                ...image,
                isMain: image.url === imageUrl,
              })),
              updatedAt: new Date(),
            }
          : property
      ),
    }));
  },
}));