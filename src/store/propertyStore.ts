import { create } from 'zustand';
import { Property } from '../types';

const demoProperties: Property[] = [
  {
    id: '1',
    title: 'Villa Moderne avec Piscine',
    description: 'Magnifique villa contemporaine avec piscine chauffée et jardin paysager',
    price: 850000,
    size: 220,
    location: 'Aix-en-Provence',
    propertyType: 'house',
    bedrooms: 4,
    bathrooms: 3,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800&h=500',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&q=80&w=800&h=500',
        isMain: false
      }
    ],
    status: 'available',
    sellerId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Appartement Haussmannien',
    description: 'Superbe appartement avec moulures et parquet d\'époque',
    price: 595000,
    size: 125,
    location: 'Lyon 6ème',
    propertyType: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800&h=500',
        isMain: true
      }
    ],
    status: 'underContract',
    sellerId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Maison de Ville avec Terrasse',
    description: 'Charmante maison de ville rénovée avec terrasse ensoleillée',
    price: 425000,
    size: 140,
    location: 'Bordeaux Centre',
    propertyType: 'house',
    bedrooms: 3,
    bathrooms: 2,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&q=80&w=800&h=500',
        isMain: true
      }
    ],
    status: 'underOffer',
    sellerId: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Loft Industriel',
    description: 'Ancien atelier converti en loft avec hauteur sous plafond exceptionnelle',
    price: 680000,
    size: 180,
    location: 'Paris 11ème',
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800&h=500',
        isMain: true
      }
    ],
    status: 'sold',
    sellerId: '4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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
  properties: demoProperties,
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