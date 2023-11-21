import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _googleMapsApiKey!: string;

  set googleMapsApiKey(value: string) {
    this._googleMapsApiKey = value;
  }

  get googleMapsApiKey(): string {
    return this._googleMapsApiKey;
  }
}
