import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Pay {
  @PrimaryColumn()
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
