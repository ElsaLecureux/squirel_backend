import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './modules/users/user.entity';
import { Game } from './modules/game/game.entity';
import { UserPlayGame } from './modules/userPlayGame/userPlayGame.entity';
import { Card } from './modules/card/card.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  entities: [User, Game, UserPlayGame, Card],
  migrations: ['src/migrations/**/*.ts'],
  migrationsRun: false,
  synchronize: false,
});
