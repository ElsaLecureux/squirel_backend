import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';

import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Exclude } from 'class-transformer';
import { UserPlayGame } from './userPlayGame.entity';

// eslint-disable-next-line prettier/prettier
const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Exclude()
  @Matches(regexPassword)
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserPlayGame, (userPlayGame) => userPlayGame.user, { onDelete: 'CASCADE' })
  userPlayGame: UserPlayGame[];
}
