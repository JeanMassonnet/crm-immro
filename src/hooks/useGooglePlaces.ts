import { useCallback, useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
    initGooglePlaces: () => void;
  }
}

type UseGooglePlacesProps = {
  onPlaceSelected: (place: any) => void;
  onPredictions?: (predictions: google.maps.places.AutocompletePrediction[]) => void;
};

export function useGooglePlaces({ onPlaceSelected, onPredictions }: UseGooglePlacesProps) {
  const autocompleteRef = useRef<any>(null);
  const placesServiceRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  const loadGooglePlacesScript = useCallback(() => {
    if (!document.querySelector('#google-places-script')) {
      const script = document.createElement('script');
      script.id = 'google-places-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD4EGQUEvL6ZsJdKEdAIckvmSVTtdVNATE&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
      };
      document.head.appendChild(script);
    } else {
      scriptLoadedRef.current = true;
    }
  }, []);

  useEffect(() => {
    loadGooglePlacesScript();
    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [loadGooglePlacesScript]);

  const initAutocomplete = useCallback((inputElement: HTMLInputElement) => {
    const initializeAutocomplete = () => {
      if (!window.google?.maps?.places) {
        setTimeout(initializeAutocomplete, 100);
        return;
      }

      autocompleteRef.current = new window.google.maps.places.AutocompleteService();
      placesServiceRef.current = new window.google.maps.places.PlacesService(document.createElement('div'));

      // Add input listener
      let timeoutId: NodeJS.Timeout;
      inputElement.addEventListener('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const value = inputElement.value;
          if (value) {
            autocompleteRef.current.getPlacePredictions(
              {
                input: value,
                types: ['(cities)'],
                componentRestrictions: { country: 'fr' }
              },
              (predictions: google.maps.places.AutocompletePrediction[] | null) => {
                if (predictions && onPredictions) {
                  onPredictions(predictions);
                }
              }
            );
          }
        }, 300);
      });

      // Add place_changed listener
      inputElement.addEventListener('place_changed', () => {
        const placeId = inputElement.dataset.placeId;
        if (placeId) {
          placesServiceRef.current.getDetails(
            { placeId, fields: ['address_components'] },
            (place: google.maps.places.PlaceResult | null) => {
              if (place) {
                onPlaceSelected(place);
              }
            }
          );
        }
      });
    };

    initializeAutocomplete();
  }, [onPlaceSelected, onPredictions]);

  return { initAutocomplete };
}