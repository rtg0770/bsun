import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _googleMapsApiKey = new BehaviorSubject<string>('');
  private _baseApiUrl = new BehaviorSubject<string>('');

  set googleMapsApiKey(value: string) {
    this._googleMapsApiKey.next(value);
  }

  get googleMapsApiKey$(): Observable<string> {
    return this._googleMapsApiKey.asObservable();
  }

  set baseUrlApi(value: string) {
    this._baseApiUrl.next(value);
  }

  get baseUrlApi$(): Observable<string> {
    return this._baseApiUrl.asObservable();
  }
}
