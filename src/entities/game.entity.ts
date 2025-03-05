import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPlayGame } from './userPlayGame.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserPlayGame, (userPlayGame) => userPlayGame.game, { onDelete: 'CASCADE' })
  userPlayGame: UserPlayGame[];
}
