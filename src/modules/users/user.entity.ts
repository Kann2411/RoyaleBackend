import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  nick: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

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

  @Column({ type: 'integer', nullable: false, default: 0 })
  chips: number;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', default: false, nullable: true })
  firstChips: boolean;
}
