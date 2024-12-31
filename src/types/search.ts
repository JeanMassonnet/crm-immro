import { PropertyType } from './index';

export type Location = {
  city: string;
  zipCode?: string;
};

export type PriceRange = {
  min?: number;
};

export type SizeRange = {
  min?: number;
};

export type WorkType = 'new' | 'none' | 'refresh' | 'major';

export type BuyerSearch = {
  id: string;
  clientId: string;
  locations: Location[];
  priceRange: PriceRange;
  sizeRange: SizeRange;
  propertyTypes: PropertyType[];
  bedrooms?: number;
  bathrooms?: number;
  features: string[];
  workTypes: WorkType[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
};