import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GameModule } from './modules/game/game.module';
import { UserPlayGameModule } from './modules/userPlayGame/userPlayGame.module';
import { GamePlayModule } from './schemas/gamePlay/gamePlay.module';

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
    GamePlayModule,
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
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsRun: configService.get<boolean>('TYPEORM_MIGRATIONS_RUN'),
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('MONGO_DATABASE_USER')}:${configService.get<string>('MONGO_DATABASE_PASSWORD')}@cluster.nh2qdfn.mongodb.net/${configService.get<string>('MONGO_DATABASE_NAME')}?retryWrites=true&w=majority`,
      }),
    }),
  ],
})
export class AppModule {}
