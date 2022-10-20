import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'varchar', nullable: true })
  action: string;
}
