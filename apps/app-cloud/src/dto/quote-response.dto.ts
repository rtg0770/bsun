import { QuoteResponseDto as SharedQuoteResponseDto } from '@bishub-energy/shared-types';
import { QuoteStatus } from '@bishub-energy/shared-types';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
export class QuoteResponseDto implements SharedQuoteResponseDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEnum(QuoteStatus)
  status: QuoteStatus;
}
