import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserPlayGameDto, UserPlayGameFullDto } from './userPlayGame.dto';
import { Errors } from 'src/shared/enums/errorsEnum';
import { UserPlayGame } from './userPlayGame.entity';

@Injectable()
export class UserPlayGameService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
    @InjectRepository(UserPlayGame)
    private readonly userPlayGameRepository: Repository<UserPlayGame>,
  ) {}

  async getUserGamesWon(userId: number): Promise<UserPlayGameFullDto> {
    const infos = await this.dataSource.query(
      `SELECT userplaygame.userId, userplaygame.gameId, userplaygame.numberOfTimeWon, game.name, encode(lo_get(game.avatar), 'base64') AS avatar_base64, encode(lo_get(game.avatargold), 'base64') AS avatargold_base64 FROM userplaygame INNER JOIN game ON userplaygame.gameId = game.id WHERE userId=$1 `,
      [userId],
    );
    if (infos.length === 0) {
      throw new NotFoundException(Errors.DATA_NOT_FOUND);
    }
    const datas = infos.map((gameData) => {
      gameData.avatar = `data:image/png;base64,${gameData.avatar_base64}`;
      gameData.avatargold = `data:image/png;base64,${gameData.avatargold_base64}`;
      delete gameData.avatar_base64;
      delete gameData.avatargold_base64;
      return gameData;
    });
    return datas;
  }

  async playerWonGame(userPlayGameDto: UserPlayGameDto): Promise<UserPlayGameFullDto> {
    const userId = userPlayGameDto.userId;
    const gameId = userPlayGameDto.gameId;
    try {
      let infos = [];
      infos = await this.dataSource.query(
        `SELECT * FROM userplaygame WHERE userId=$1 AND gameId=$2`,
        [userId, gameId],
      );
      if (infos.length === 0) {
        const result = await this.dataSource.query(
          `INSERT INTO userplaygame (userId, gameId, numberOfTimeWon) VALUES ($1, $2, 1) RETURNING *`,
          [userId, gameId],
        );
        return result[0];
      }
      const result = await this.dataSource.query(
        `UPDATE userplaygame SET numberOfTimeWon= numberOfTimeWon + 1  WHERE userId=$1 AND gameId=$2 RETURNING *`,
        [userId, gameId],
      );
      return result[0];
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(Errors.INTERNAL_SERVER_ERROR);
    }
  }
}
