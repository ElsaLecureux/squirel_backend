import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { UserPlayGameDto, UserPlayGameFullDto } from './userPlayGame.dto';
import { Errors } from 'src/Enums/enums';

@Injectable()
export class UserPlayGameService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async getUserGamesWon(userPlayGameDto: UserPlayGameDto): Promise<UserPlayGameFullDto> {
    const userId = userPlayGameDto.userId;
    //ajouter join pour avoir le nom du jeu!
    const infos = await this.dataSource.query(`SELECT * FROM userplaygame WHERE userId=$1`, [
      userId,
    ]);
    if (infos.length === 0) {
      throw new NotFoundException(Errors.DATA_NOT_FOUND);
    }
    return infos;
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
