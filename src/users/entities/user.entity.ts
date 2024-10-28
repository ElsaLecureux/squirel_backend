import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Exclude } from 'class-transformer';

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

  @Column()
  @IsString()
  @IsNotEmpty()
  salt: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  async setPassword(password: string): Promise<void> {
    const saltOrRounds = 12;
    const salt = await bcrypt.genSalt(saltOrRounds);
    this.salt = salt;
    const hashedPassword = await bcrypt.hash(password, this.salt);
    this.password = hashedPassword;
    console.log('hashedPassword', hashedPassword);
  }

  async validatePassword(password: string): Promise<boolean> {
    console.log('password entered', password);
    console.log(this.password);
    const res = await bcrypt.compare(password, this.password);
    console.log('response', res);
    return res;
  }
}
