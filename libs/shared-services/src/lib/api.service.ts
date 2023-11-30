/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import {
  CreateQuoteRequestDto,
  QuoteResponseDto,
} from '@bishub-energy/shared-types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string | undefined;

  constructor(private http: HttpClient, private configService: ConfigService) {
    // Subscribe to the baseUrlApi observable to get the value
    this.configService.baseUrlApi$.subscribe((url) => {
      this.baseUrl = url;
    });
  }

  submitQuoteRequest(
    formData: CreateQuoteRequestDto
  ): Observable<QuoteResponseDto> {
    return this.http.post<QuoteResponseDto>(
      `${this.baseUrl}/insightRequest`,
      formData
    );
  }
}
