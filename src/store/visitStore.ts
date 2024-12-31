import { create } from 'zustand';
import { Visit } from '../types';

interface VisitState {
  visits: Visit[];
  addVisit: (visit: Omit<Visit, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateVisit: (id: string, visit: Partial<Visit>) => void;
  deleteVisit: (id: string) => void;
  getVisitsByPropertyId: (propertyId: string) => Visit[];
}

export const useVisitStore = create<VisitState>((set, get) => ({
  visits: [],
  addVisit: (visitData) => {
    set((state) => ({
      visits: [
        ...state.visits,
        {
          ...visitData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }));
  },
  updateVisit: (id, visitData) => {
    set((state) => ({
      visits: state.visits.map((visit) =>
        visit.id === id
          ? { ...visit, ...visitData, updatedAt: new Date() }
          : visit
      ),
    }));
  },
  deleteVisit: (id) => {
    set((state) => ({
      visits: state.visits.filter((visit) => visit.id !== id),
    }));
  },
  getVisitsByPropertyId: (propertyId) => {
    return get().visits.filter((visit) => visit.propertyId === propertyId);
  },
}));