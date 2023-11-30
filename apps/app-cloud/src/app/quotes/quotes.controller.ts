import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateRequestDto } from '../../dto/create-request.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post('insightRequest')
  async createQuote(@Body() createQuoteDto: CreateRequestDto) {
    try {
      const quote = await this.quotesService.createQuote(createQuoteDto);
      return quote;
    } catch (error) {
      // Basic error handling
      throw new HttpException(
        'Failed to create quote',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
