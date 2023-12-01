import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Quote } from './quote.entity';
import { ICheckoutStatus } from '@bishub-energy/shared-types';

@Entity()
export class CheckoutStatus implements ICheckoutStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string; // e.g., 'pending', 'completed', 'failed'

  @OneToOne(() => Quote)
  @JoinColumn()
  quote: Quote;
}
