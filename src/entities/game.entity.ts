import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPlayGame } from './userPlayGame.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'integer', nullable: true })
  avatar: number;

  @Column({ type: 'integer', nullable: true })
  avatarGold: number;

  @OneToMany(() => UserPlayGame, (userPlayGame) => userPlayGame.game, { onDelete: 'CASCADE' })
  userPlayGame: UserPlayGame[];
}
