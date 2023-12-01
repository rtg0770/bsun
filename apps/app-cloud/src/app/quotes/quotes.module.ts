import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from '../../entity/quote.entity';
import { GoogleMapsService } from '../../services/google-maps.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Quote]), HttpModule],
  providers: [QuotesService, GoogleMapsService],
  controllers: [QuotesController],
})
export class QuotesModule {}
