import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from '../../dto/create-request.dto'; // Adjust the import path as necessary
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from '../../entity/quote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>
  ) {}

  // TODO: How this will work, what and when we will save.
  async createQuote(createRequestDto: CreateRequestDto): Promise<Quote> {
    const quote = this.quoteRepository.create(createRequestDto);
    return await this.quoteRepository.save(quote);
  }
}
