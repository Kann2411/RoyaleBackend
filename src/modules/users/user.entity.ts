import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  nick: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @Column()
  avatar: string;

  @Column()
  banned: boolean;

  @Column()
  inactive: boolean;

  @Column()
  age: number;

  @Column()
  description: string;

  @Column()
  favorites: string;

  @Column()
  country: string;

  @Column()
  chips: bigint;
  password: string;

  @Column()
  firstChips: boolean;
}
