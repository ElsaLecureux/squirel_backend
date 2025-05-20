import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Game } from './modules/game/game.entity';
import { UserPlayGame } from './modules/userPlayGame/userPlayGame.entity';
import { User } from './modules/users/user.entity';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserPlayGameController } from './modules/userPlayGame/userPlayGame.controller';
import { UserPlayGameService } from './modules/userPlayGame/userPlayGame.service';
import { GameModule } from './modules/game/game.module';
import { UserPlayGameModule } from './modules/userPlayGame/userPlayGame.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    //Modules
    UsersModule,
    AuthModule,
    GameModule,
    UserPlayGameModule,
    //TypeOrm Config
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Game, UserPlayGame],
        controllers: [UsersController, UserPlayGameController],
        providers: [UsersService, UserPlayGameService],
        autoLoadEntities: true,
        synchronize: false,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsRun: false,
      }),
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/SquirelMongo'),
  ],
})
export class AppModule {}
