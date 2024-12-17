import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pay } from '../pay/pay.entity';
import { Game } from '../games/games.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  nick: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', default: 'user' })
  role: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @Column({ type: 'boolean', default: false })
  inactive: boolean;

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  favorites: string;

  @Column({ type: 'varchar', nullable: true })
  country: string;

  @Column({ type: 'bigint', nullable: false, default: 0 })
  chips: number;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', default: false })
  firstChips: boolean;

  @OneToMany(() => Pay, (pay) => pay.user)
  payments: Pay[];

  @ManyToMany(() => Game)
  @JoinTable()
  games: Game[];
}
