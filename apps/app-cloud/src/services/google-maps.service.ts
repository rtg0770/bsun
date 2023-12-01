import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

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
  }

  getSolarInsights(latitude: number, longitude: number): Observable<unknown> {
    const url = `${this.googleSolarApiBaseUrl}latitude=${latitude}&longitude=${longitude}&requiredQuality=HIGH`;
    const params = {
      key: this.googleMapsApiKey,
    };

    return this.httpService
      .get(url, { params })
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
