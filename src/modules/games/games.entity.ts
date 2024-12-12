import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  //relacion muchos a muchos con User
}
