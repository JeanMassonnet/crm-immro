import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSearchStore } from '../store/searchStore';
import { useClientStore } from '../store/clientStore';
import { useAuthStore } from '../store/authStore';
import { PriceRange, BuyerSearch } from '../types/search';
import SearchFilters from '../components/search/SearchFilters';
import SearchList from '../components/search/SearchList';
import SearchModal from '../components/modals/SearchModal';
import { SearchTabs } from '../components/search/SearchTabs';

type TabType = 'my-searches' | 'all-searches';

export default function BuyerSearches() {
  const { searches, addSearch, updateSearch } = useSearchStore();
  const { clients } = useClientStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('my-searches');
  const [showModal, setShowModal] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState<BuyerSearch | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);

  const handleEditSearch = (search: BuyerSearch) => {
    setSelectedSearch(search);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSearch(null);
  };

  // Get unique locations from all searches
  const allLocations = Array.from(new Set(
    searches.flatMap(search => search.locations.map(loc => loc.city))
  )).sort();

  const filteredSearches = searches.filter((search) => {
    // Filter by user for "my-searches" tab
    if (activeTab === 'my-searches' && search.clientId !== user?.id) {
      return false;
    }

    // Location filter
    const matchesLocation = selectedLocations.length === 0 || 
      search.locations.some(loc => selectedLocations.includes(loc.city));

    // Price range filter
    const matchesPrice = !selectedPriceRange ||
      ((!selectedPriceRange.min || search.priceRange.min >= selectedPriceRange.min) &&
       (!selectedPriceRange.max || search.priceRange.max <= selectedPriceRange.max));

    return matchesLocation && matchesPrice;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Recherches acquéreurs</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle recherche
        </button>
      </div>

      <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <SearchFilters
        locations={allLocations}
        selectedLocations={selectedLocations}
        selectedPriceRange={selectedPriceRange}
        onLocationToggle={(city) => setSelectedLocations(prev => 
          prev.includes(city) ? prev.filter(loc => loc !== city) : [...prev, city]
        )}
        onPriceRangeToggle={setSelectedPriceRange}
      />

      <SearchList
        searches={filteredSearches}
        clients={clients}
        onEditSearch={handleEditSearch}
        hideClientInfo={activeTab === 'all-searches'}
      />

      <SearchModal
        isOpen={showModal}
        onClose={handleCloseModal}
        search={selectedSearch}
        onSubmit={(data) => {
          if (selectedSearch) {
            updateSearch(selectedSearch.id, data);
          } else {
            addSearch(data);
          }
          handleCloseModal();
        }}
      />
    </div>
  );
}