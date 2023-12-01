import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GoogleMapsService {
  private googleMapsApiKey: string;
  private googleSolarApiBaseUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {
    this.googleMapsApiKey = this.configService.get<string>(
      'GOOGLE_MAPS_API_KEY'
    )!;
    this.googleSolarApiBaseUrl = this.configService.get<string>(
      'GOOGLE_SOLAR_API_BASE_URL'
    )!;

    console.log('Google Maps API Key:', this.googleMapsApiKey);
    console.log('Google Solar API Base URL:', this.googleSolarApiBaseUrl);
  }

  getSolarInsights(latitude: number, longitude: number): Observable<unknown> {
    // Endpoint and query parameters are properly concatenated
    const url = `${this.googleSolarApiBaseUrl}buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH`;

    // Including the API key in the headers or as a separate query parameter
    const headers = {
      Authorization: `Bearer ${this.googleMapsApiKey}`,
    };

    console.log('Constructed URL:', url);

    return this.httpService.get(url, { headers }).pipe(
      map((response) => {
        console.log('Solar API Response:', response.data);
        return response.data;
      }),
      catchError((error) => {
        console.error('Error calling Solar API:', error);
        return throwError(error);
      })
    );
  }
}
