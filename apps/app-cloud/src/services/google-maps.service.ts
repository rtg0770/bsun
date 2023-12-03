import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleMapsService {
  private googleMapsApiKey: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {
    this.googleMapsApiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY')!;
  }

  async getSolarInsights(latitude: number, longitude: number): Promise<unknown> {
    const url = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=${this.googleMapsApiKey}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url)
      );
      return response.data;
    } catch (error) {
      console.error('Error calling Solar API:', error);
      throw error;
    }
  }
}
