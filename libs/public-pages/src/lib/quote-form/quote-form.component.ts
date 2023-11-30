import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { CreateQuoteRequestDto } from '@bishub-energy/shared-types';
import { ConfigService } from '@bishub-energy/shared-services';
import { Subscription } from 'rxjs';

interface IMarker {
  lat: number;
  lng: number;
  class?: string;
  description: string;
}

@Component({
  selector: 'bishub-energy-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
})
export class QuoteFormComponent implements OnInit, OnDestroy {
  @Output() submitForm = new EventEmitter<unknown>();
  requestQuoteForm: FormGroup;
  selectedCountryCode: string = 'BE';
  isLinear = true;
  markers!: IMarker[];
  private subscription: Subscription = new Subscription();
  googleMapsApiKey!: string;

  predictionSelected: boolean = false;
  addressConfirmed: boolean = false;

  addressCompleted = false;
  insightReceived = false;
  coords = { lat: 0, lng: 0 };
  progressBarMode = 'indeterminate';
  progressBarValue = 0;

  /**
   * Initializes the component with necessary services and form setup.
   * @param http HttpClient for making API requests.
   * @param configService ConfigService for accessing configuration like API keys.
   */
  constructor(private http: HttpClient, private configService: ConfigService) {
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

      // TODO: Fill them in the form, make address values unavailable to change somehow
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
    });
  }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit() {
    this.subscription.add(
      this.configService.googleMapsApiKey$.subscribe((key) => {
        this.googleMapsApiKey = key;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSolarInsights() {}

  completeProgress() {
    this.progressBarMode = 'determinate';
    this.progressBarValue = 100;
  }

  /**
   * Handles the submission of the quote request form.
   * Validates the form and posts the data to the server.
   */
  submitQuoteRequest() {
    // create object according to the dto
    // send request to the endpoint
    // API: create a record in the db > handle payment success vs. fail > navigate to complete process
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
    this.coords = coords;
    console.log(coords);
  }

  /**
   * Event handler for when full address details are selected in the autocomplete component.
   * @param details Object containing the full address details.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAddressDetailsSelect(details: any): void {
    console.log('DETAILS:', details);

    // Check if address_components is defined and is an array
    if (Array.isArray(details.address_components)) {
      const hasHouseNumber = this.checkForHouseNumber(
        details.address_components
      );
      if (hasHouseNumber) {
        console.log('It has house number');
        this.addressCompleted = true;
        this.completeProgress();
      } else {
        console.warn('It does not have a house number');
      }
    } else {
      // Handle the scenario where address_components is undefined
      console.warn('Address components are undefined');
      // You may want to take additional actions here, like setting an error state
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkForHouseNumber(addressComponents: any[]): boolean {
    const houseNumberTypes = ['street_number'];
    return addressComponents.some((component) =>
      houseNumberTypes.includes(component.types[0])
    );
  }
}
