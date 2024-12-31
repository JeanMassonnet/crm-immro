import { ReactNode } from 'react';

export type Address = {
  street: string;
  streetNumber: string;
  additionalInfo?: string;
  zipCode: string;
  city: string;
  country: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
  companyName: string;
  siret: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ClientTypes = {
  buyer: boolean;
  seller: boolean;
};

export type LeadSource = 
  | 'referral'
  | 'website'
  | 'social_media'
  | 'phone'
  | 'email'
  | 'other';

export type PropertyType = 'house' | 'apartment' | 'land' | 'commercial';
export type PropertyStatus = 'available' | 'underContract' | 'underOffer' | 'sold';

export type PropertyImage = {
  url: string;
  isMain: boolean;
};

export type PropertyDocument = {
  id: string;
  propertyId: string;
  name: string;
  content: string;
  createdAt: Date;
};

export type PropertyCriteria = {
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  location?: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  size: number;
  location: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  images: PropertyImage[];
  documents: PropertyDocument[];
  status: PropertyStatus;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  types: ClientTypes;
  leadSource: LeadSource;
  properties?: Property[];
  searchCriteria?: PropertyCriteria;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Visit = {
  id: string;
  propertyId: string;
  clientId: string;
  date: Date;
  notes: string;
  interested: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskAssignee = 'agent' | 'client';

export type Task = {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: TaskAssignee;
  clientId?: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentTemplate = {
  id: string;
  name: string;
  content: string;
  type: 'visit' | 'offer' | 'custom';
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentVariable = {
  key: string;
  label: string;
  type: 'client' | 'property' | 'date' | 'custom';
};

export type GeneratedDocument = {
  id: string;
  templateId: string;
  clientId?: string;
  propertyId?: string;
  content: string;
  logo?: string;
  createdAt: Date;
};

export type DocumentPreview = {
  templateId: string;
  clientId: string;
  propertyId: string;
  content: string;
  logo?: string;
};