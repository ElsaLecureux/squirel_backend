import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPlayGame } from '../userPlayGame/userPlayGame.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 25 })
  name: string;

  @Column({ type: 'integer', nullable: true })
  avatar: number;

  @Column({ type: 'integer', nullable: true })
  avatargold: number;

  @OneToMany(() => UserPlayGame, (userPlayGame) => userPlayGame.game, { onDelete: 'CASCADE' })
  userPlayGame: UserPlayGame[];
}
