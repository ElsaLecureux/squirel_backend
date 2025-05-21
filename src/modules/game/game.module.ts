import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../game/game.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  exports: [TypeOrmModule],
})
export class GameModule {
  constructor(
    @InjectRepository(Game)
    private readonly usersRepository: Repository<Game>,
  ) {}
}
