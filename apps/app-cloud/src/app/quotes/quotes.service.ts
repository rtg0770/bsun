import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from '../../dto/create-request.dto'; // Adjust the import path as necessary
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from '../../entity/quote.entity';
import { Repository } from 'typeorm';
import { GoogleMapsService } from '../../services/google-maps.service';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
    private googleMapsService: GoogleMapsService
  ) {}

  // TODO: How this will work, what and when we will save.
  async createQuote(createRequestDto: CreateRequestDto): Promise<Quote> {
    const quote = this.quoteRepository.create(createRequestDto);
    return await this.quoteRepository.save(quote);
  }

  async handlePaymentSuccess(quoteId: string): Promise<void> {
    // Find the quote and its related checkout status
    const quote = await this.quoteRepository.findOne({
      where: { id: quoteId },
      relations: ['checkoutStatus'],
    });

    if (quote) {
      // Update CheckoutStatus
      if (quote.checkoutStatus) {
        quote.checkoutStatus.status = 'completed'; // Example status
        // You might need to save this status change in the database
      }

      // Fetch Solar Insights
      const insights = await this.googleMapsService.getSolarInsights(
        quote.latitude,
        quote.longitude
      );
      quote.solarApiResponse = insights;
      await this.quoteRepository.save(quote);
    }
  }

  async mockStripePayment(quoteId: string): Promise<void> {
    // Simulate payment processing
    console.log(`Simulating payment for quote ${quoteId}`);

    // Call the method to handle post-payment logic
    await this.handlePaymentSuccess(quoteId);
  }
}
