import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotesModule } from './quotes/quotes.module';
import { CheckoutStatus } from '../entity/checkout-status.entity';
import { Quote } from '../entity/quote.entity';
import { GoogleMapsService } from '../services/google-maps.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [CheckoutStatus, Quote],
      synchronize: true,
    }),
    QuotesModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleMapsService],
})
export class AppModule {}
