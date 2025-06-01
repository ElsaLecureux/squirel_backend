import { Connection } from 'mongoose';
import { gamePlaySchema } from './gamePlay.schema';

export const catsProviders = [
  {
    provide: 'GAME_PLAY_MODEL',
    useFactory: (connection: Connection) => connection.model('GamePlay', gamePlaySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
