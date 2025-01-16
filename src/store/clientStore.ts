import { create } from 'zustand';
import { Client } from '../types';

interface ClientState {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
}

export const useClientStore = create<ClientState>((set) => ({
  clients: [], // Empty array instead of demo data
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