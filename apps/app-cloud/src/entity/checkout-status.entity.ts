import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Quote } from './quote.entity';
import { ICheckoutStatus } from '@bishub-energy/shared-types';

@Entity()
export class CheckoutStatus implements ICheckoutStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string; // For example, 'pending', 'completed', 'failed', etc.

  // Include other fields relevant to the checkout process

  @OneToOne(() => Quote, (quote) => quote.checkoutStatus)
  quote: Quote;
}
