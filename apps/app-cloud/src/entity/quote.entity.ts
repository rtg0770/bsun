import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CheckoutStatus } from './checkout-status.entity';
import { IQuote } from '@bishub-energy/shared-types';

@Entity()
export class Quote implements IQuote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column('json')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  solarApiResponse: any;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @OneToOne(() => CheckoutStatus, { eager: true, cascade: true })
  @JoinColumn()
  checkoutStatus: CheckoutStatus;
}
