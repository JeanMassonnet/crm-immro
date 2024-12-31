import { Address } from './index';

export type ProfileFormData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
  companyName: string;
  siret: string;
};