import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CreateQuoteRequestDto } from '@bishub-energy/shared-types';
import { ConfigService } from '@bishub-energy/shared-services';

@Component({
  selector: 'bishub-energy-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
})
export class QuoteFormComponent implements OnInit {
  @Output() submitForm = new EventEmitter<unknown>();
  requestQuoteForm: FormGroup;
  googleMapsApiKey: string;
  selectedCountryCode: string = 'BE';
  /**
   * Initializes the component with necessary services and form setup.
   * @param http HttpClient for making API requests.
   * @param configService ConfigService for accessing configuration like API keys.
   */
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.googleMapsApiKey = this.configService.googleMapsApiKey;

    // Initialize the form with saved data or empty values.
    const savedFormData = JSON.parse(
      localStorage.getItem('registrationForm') || '{}'
    );
    this.requestQuoteForm = new FormGroup({
      name: new FormControl(savedFormData.name || '', [Validators.required]),
      surname: new FormControl(savedFormData.surname || '', [
        Validators.required,
      ]),
      email: new FormControl(savedFormData.email || '', [
        Validators.required,
        Validators.email,
      ]),
      telephone: new FormControl(savedFormData.telephone || '', [
        Validators.required,
      ]),
      // New address fields including house number
      street: new FormControl(savedFormData.street || '', [
        Validators.required,
      ]),
      houseNumber: new FormControl(savedFormData.houseNumber || '', [
        Validators.required,
      ]),
      city: new FormControl(savedFormData.city || '', [Validators.required]),
      postalCode: new FormControl(savedFormData.postalCode || '', [
        Validators.required,
      ]),
      country: new FormControl(savedFormData.country || '', [
        Validators.required,
      ]),
      // ... any other address fields you need
    });
  }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit() {
    console.log('Init form');
  }

  /**
   * Handles the submission of the quote request form.
   * Validates the form and posts the data to the server.
   */
  submitQuoteRequest() {
    if (this.requestQuoteForm.valid) {
      const formData = this.requestQuoteForm.value;

      // Convert the form data to the required DTO format.
      const quoteData: CreateQuoteRequestDto = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.telephone,
      };

      // Post the quote data to the server and handle the response.
      this.http
        .post('http://localhost:3000/api/requestquote', quoteData)
        .subscribe(
          (response) => {
            console.log('Quote sent successfully', response);
            localStorage.removeItem('requestQuoteForm');
          },
          (error) => {
            console.log('Failed to send the quote request', error);
          }
        );
      // If address fields are also valid, convert to coordinates
      if (this.isAddressComplete()) {
        // Assuming `isAddressComplete` is a method that checks if all address fields are filled
        this.convertAddressToCoordinates();
      }
    } else {
      // Inform the user which fields are invalid
      this.markAllFieldsAsTouched(); // Utility method to trigger display of validation messages
    }
  }

  /**
   * Event handler for when an address is selected in the autocomplete component.
   * @param event The event object containing address data.
   */
  handleAddressSelect(event: unknown) {
    console.log(event);
  }

  /**
   * Event handler for when coordinates are selected in the autocomplete component.
   * @param coords Object containing latitude and longitude.
   */
  handleCoordinatesSelect(coords: { lat: number; lng: number }): void {
    console.log(coords);
  }

  /**
   * Event handler for when full address details are selected in the autocomplete component.
   * @param details Object containing the full address details.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAddressDetailsSelect(details: any): void {
    // Initialize an empty object to hold the address components
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const address: any = {
      street: '',
      houseNumber: '',
      city: '',
      postalCode: '',
      country: '',
    };

    // Iterate over the address components to assign the values to the address object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details.address_components.forEach((component: any) => {
      // Use the types array to determine the type of each address component
      if (component.types.includes('street_number')) {
        address.houseNumber = component.long_name;
      } else if (component.types.includes('route')) {
        address.street = component.long_name;
      } else if (component.types.includes('locality')) {
        address.city = component.long_name;
      } else if (component.types.includes('postal_code')) {
        address.postalCode = component.long_name;
      } else if (component.types.includes('country')) {
        address.country = component.long_name;
      }
      // Add other address components here if needed
    });

    // Patch the values to the form
    this.requestQuoteForm.patchValue(address);

    // Optionally, focus on the next empty field in the form or perform other actions
  }

  // Utility method to mark all fields as touched to show validation errors
  markAllFieldsAsTouched() {
    Object.keys(this.requestQuoteForm.controls).forEach((field) => {
      const control = this.requestQuoteForm.get(field);
      if (control) {
        // This check ensures that control is not null
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  // Method to check if all address fields are filled
  isAddressComplete() {
    return (
      this.requestQuoteForm.controls['street'].valid &&
      this.requestQuoteForm.controls['houseNumber'].valid &&
      this.requestQuoteForm.controls['city'].valid &&
      this.requestQuoteForm.controls['postalCode'].valid &&
      this.requestQuoteForm.controls['country'].valid
    );
  }

  // Stub for address to coordinates conversion
  convertAddressToCoordinates() {
    // Use a geocoding service to convert address to coordinates
    // Then emit or use the coordinates for the solar API call
  }
}
