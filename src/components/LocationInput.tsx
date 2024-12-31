import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, AlertCircle } from 'lucide-react';
import { Location } from '../types/search';
import { useGooglePlaces } from '../hooks/useGooglePlaces';

type LocationInputProps = {
  locations: Location[];
  onChange: (locations: Location[]) => void;
  maxLocations?: number;
};

export default function LocationInput({ locations, onChange, maxLocations = 10 }: LocationInputProps) {
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const { initAutocomplete } = useGooglePlaces({
    onPlaceSelected: (place) => {
      let cityName = '';
      let postalCode = '';

      place.address_components?.forEach((component: any) => {
        if (component.types.includes('locality')) {
          cityName = component.long_name;
        }
        if (component.types.includes('postal_code')) {
          postalCode = component.long_name;
        }
      });

      if (cityName) {
        handleAddLocation(cityName, postalCode);
      }
      
      // Clear input and suggestions after selection
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setSuggestions([]);
      setShowSuggestions(false);
    },
    onPredictions: (predictions) => {
      setSuggestions(predictions);
      setShowSuggestions(true);
    }
  });

  useEffect(() => {
    if (inputRef.current) {
      initAutocomplete(inputRef.current);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [initAutocomplete]);

  const handleAddLocation = (cityName: string, postalCode: string = '') => {
    if (!cityName.trim()) return;
    setError(null);

    // Vérifier la limite de villes
    if (locations.length >= maxLocations) {
      setError(`Vous ne pouvez pas ajouter plus de ${maxLocations} villes`);
      return;
    }

    // Vérifier si la ville existe déjà
    const exists = locations.some(
      loc => loc.city.toLowerCase() === cityName.toLowerCase()
    );

    if (exists) {
      setError('Cette ville est déjà dans votre sélection');
      return;
    }

    onChange([...locations, { 
      city: cityName.trim(),
      zipCode: postalCode.trim() || undefined
    }]);
  };

  const handleRemoveLocation = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setError(null);
    onChange(locations.filter((_, i) => i !== index));
  };

  const handleSuggestionClick = (event: React.MouseEvent, suggestion: google.maps.places.AutocompletePrediction) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (inputRef.current) {
      inputRef.current.value = suggestion.description;
      inputRef.current.dataset.placeId = suggestion.place_id;
      const placeChangedEvent = new Event('place_changed');
      inputRef.current.dispatchEvent(placeChangedEvent);
    }
  };

  return (
    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <div className={`flex items-center bg-white rounded-lg border ${
          error ? 'border-red-300' : 'border-gray-300'
        } focus-within:ring-2 ${
          error ? 'focus-within:border-red-500 focus-within:ring-red-500' : 'focus-within:border-primary focus-within:ring-primary'
        } focus-within:ring-opacity-50`}>
          <MapPin className={`w-5 h-5 ml-3 ${error ? 'text-red-400' : 'text-gray-400'}`} />
          <input
            ref={inputRef}
            type="text"
            placeholder={locations.length >= maxLocations ? 
              'Limite de villes atteinte' : 
              'Rechercher une ville...'}
            className="flex-1 px-3 py-2 border-none focus:ring-0 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
            disabled={locations.length >= maxLocations}
            onClick={(e) => e.stopPropagation()}
          />
          {locations.length > 0 && (
            <span className="mr-3 text-sm text-gray-400">
              {locations.length}/{maxLocations}
            </span>
          )}
        </div>

        {error && (
          <div className="absolute -bottom-6 left-0 flex items-center text-sm text-red-500">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </div>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.place_id}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                onClick={(e) => handleSuggestionClick(e, suggestion)}
              >
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{suggestion.description}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {locations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-sm group hover:bg-gray-200 transition-colors"
            >
              <MapPin className="w-4 h-4 text-gray-500 mr-1.5" />
              <span>{location.city}</span>
              {location.zipCode && (
                <span className="ml-1 text-gray-500">({location.zipCode})</span>
              )}
              <button
                type="button"
                onClick={(e) => handleRemoveLocation(index, e)}
                className="ml-2 p-0.5 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none rounded-full hover:bg-gray-300"
                title="Supprimer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}