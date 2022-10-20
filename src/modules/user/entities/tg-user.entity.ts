import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class TgUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: null | Date;
}
