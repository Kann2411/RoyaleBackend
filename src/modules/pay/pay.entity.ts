import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Pay {
  @PrimaryGeneratedColumn('uuid')
  paymentId: string;

  @Column({ nullable: true })
  paymentPlataform: string;

  @Column()
  price: string;

  @Column({ type: 'bigint' })
  chips: number;

  @Column({ nullable: true })
  date: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
