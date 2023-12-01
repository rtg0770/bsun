import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CheckoutStatus } from './checkout-status.entity';
import { IQuote } from '@bishub-energy/shared-types';

@Entity()
export class Quote implements IQuote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ type: 'decimal', nullable: true })
  latitude: number;

  @Column({ type: 'decimal', nullable: true })
  longitude: number;

  @Column('json', { nullable: true })
  solarApiResponse: unknown;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @OneToOne(() => CheckoutStatus, (checkoutStatus) => checkoutStatus.quote)
  checkoutStatus: CheckoutStatus;
}
