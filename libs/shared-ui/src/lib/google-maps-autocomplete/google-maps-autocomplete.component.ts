import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from '../config';

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          AutocompleteService: new () => any;
          PlacesServiceStatus: any;
        };
      };
    };
    initMap: () => void;
  }
}

declare const google: any;

@Component({
  selector: 'bishub-energy-google-maps-autocomplete',
  templateUrl: './google-maps-autocomplete.component.html',
  styleUrls: ['./google-maps-autocomplete.component.scss'],
})
export class GoogleMapsAutocompleteComponent implements OnInit {
  private autocompleteService: any;
  predictions: any[] = [];
  @Output() addressSelect = new EventEmitter<any>();

  ngOnInit() {
    this.loadGoogleMapsApi()
      .then(() => {
        this.autocompleteService = new google.maps.places.AutocompleteService();
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  loadGoogleMapsApi(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Check if the Google Maps API script is already loaded
      if (window['google'] && window['google'].maps) {
        resolve();
        return;
      }

      // Create the script tag to load the Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsJsApiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;

      // Define a global function to run when the Maps API has finished loading
      window['initMap'] = () => resolve();

      // Attach the script to the document head
      document.head.appendChild(script);

      // Optional: handle script loading errors
      script.onerror = (error) => reject(error);
    });
  }

  onSearch(term: string | null) {
    if (!term) {
      this.predictions = [];
      return;
    }

    this.autocompleteService.getPlacePredictions(
      { input: term },
      (predictions: any[], status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.predictions = predictions;
          console.log(predictions);
        }
      }
    );
  }

  onSelect(prediction: any) {
    this.addressSelect.emit(prediction);
    this.predictions = [];
  }
}
