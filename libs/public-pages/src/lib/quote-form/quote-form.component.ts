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
      email: new FormControl(savedFormData.email || '', [Validators.required]),
      telephone: new FormControl(savedFormData.telephone || '', [
        Validators.required,
      ]),
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
    } else {
      console.log('Form is invalid');
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
  handleAddressDetailsSelect(details: unknown): void {
    console.log(details);
  }
}
