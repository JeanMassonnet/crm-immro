import { create } from 'zustand';
import { Client } from '../types';

const demoClients: Client[] = [
  {
    id: '1',
    firstName: 'Pierre',
    lastName: 'Dubois',
    email: 'pierre.dubois@email.com',
    phone: '06 12 34 56 78',
    types: { buyer: false, seller: true },
    leadSource: 'referral',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Laurent',
    email: 'marie.laurent@email.com',
    phone: '06 23 45 67 89',
    types: { buyer: true, seller: true },
    leadSource: 'website',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'jean.martin@email.com',
    phone: '06 34 56 78 90',
    types: { buyer: false, seller: true },
    leadSource: 'social_media',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@email.com',
    phone: '06 45 67 89 01',
    types: { buyer: true, seller: false },
    leadSource: 'phone',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface ClientState {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
}

export const useClientStore = create<ClientState>((set) => ({
  clients: demoClients,
  addClient: (clientData) => {
    set((state) => ({
      clients: [
        ...state.clients,
        {
          ...clientData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }));
  },
  updateClient: (id, clientData) => {
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id
          ? { ...client, ...clientData, updatedAt: new Date() }
          : client
      ),
    }));
  },
  deleteClient: (id) => {
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    }));
  },
}));