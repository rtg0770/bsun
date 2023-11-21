import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'bishub-energy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'brusun';
  googleMapsApiKey = environment.googleMapsApiKey;

  handleAddressSelect(event: unknown) {
    // Define the method to handle the event
    // Handle the address selection event
    console.log(event);
  }

  handleCoordinatesSelect(coords: { lat: number; lng: number }): void {
    // Handle the coordinates
    console.log(coords);
  }

  handleAddressDetailsSelect(details: unknown): void {
    // Handle the full address details
    console.log(details);
  }
}
