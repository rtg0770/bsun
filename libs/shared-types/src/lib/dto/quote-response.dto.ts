import { QuoteStatus } from '../enum/quote-status.enum';

export interface QuoteResponseDto {
  id: string;
  status: QuoteStatus;
}
