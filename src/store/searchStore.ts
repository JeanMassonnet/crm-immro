import { create } from 'zustand';
import { BuyerSearch } from '../types/search';

interface SearchState {
  searches: BuyerSearch[];
  addSearch: (search: Omit<BuyerSearch, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSearch: (id: string, search: Partial<BuyerSearch>) => void;
  deleteSearch: (id: string) => void;
  toggleSearchStatus: (id: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searches: [],
  addSearch: (searchData) => {
    set((state) => ({
      searches: [
        ...state.searches,
        {
          ...searchData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }));
  },
  updateSearch: (id, searchData) => {
    set((state) => ({
      searches: state.searches.map((search) =>
        search.id === id
          ? { ...search, ...searchData, updatedAt: new Date() }
          : search
      ),
    }));
  },
  deleteSearch: (id) => {
    set((state) => ({
      searches: state.searches.filter((search) => search.id !== id),
    }));
  },
  toggleSearchStatus: (id) => {
    set((state) => ({
      searches: state.searches.map((search) =>
        search.id === id
          ? { ...search, active: !search.active, updatedAt: new Date() }
          : search
      ),
    }));
  },
}));