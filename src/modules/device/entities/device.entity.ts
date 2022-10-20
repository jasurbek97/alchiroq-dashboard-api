import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('firebases')
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  user_agent: string;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: null | Date;
}
