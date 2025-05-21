import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { UserPlayGame } from './userPlayGame.entity';
import { Repository } from 'typeorm';
import { UserPlayGameService } from './userPlayGame.service';
import { UserPlayGameController } from './userPlayGame.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserPlayGame])],
  providers: [UserPlayGameService],
  controllers: [UserPlayGameController],
  exports: [TypeOrmModule],
})
export class UserPlayGameModule {
  constructor(
    @InjectRepository(UserPlayGame)
    private readonly usersRepository: Repository<UserPlayGame>,
  ) {}
}
