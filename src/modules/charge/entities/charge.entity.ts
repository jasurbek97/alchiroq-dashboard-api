import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('premium_chargings')
export class ChargeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  tariff: string;

  @Column('varchar')
  status: string;

  @Column({ type: 'timestamp' })
  date: Date;
}
