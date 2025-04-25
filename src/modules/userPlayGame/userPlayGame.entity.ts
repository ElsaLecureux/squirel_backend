import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Game } from '../game/game.entity';

@Entity()
export class UserPlayGame {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userPlayGame, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Game, (game) => game.userPlayGame, { onDelete: 'CASCADE' })
  game: Game;

  @Column()
  numberOfTimeWon: number;
}
