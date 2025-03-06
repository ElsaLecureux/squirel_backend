import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { UserPlayGameDto } from './userPlayGame.dto';
import { Errors } from 'src/Enums/enums';

@Injectable()
export class UserPlayGameService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async getUserGameWon(userPlayGameDto: UserPlayGameDto): Promise<any> {
    const userId = userPlayGameDto.userId;
    const gameId = userPlayGameDto.gameId;
    let infos = [];
    infos = await this.dataSource.query(
      `SELECT * FROM userplaygame WHERE userId=$1 AND gameId=$2`,
      [userId, gameId],
    );
    if (infos.length === 0) {
      throw new NotFoundException(Errors.DATA_NOT_FOUND);
    }
    return infos;
  }

  async updateUserGameWon(userId: number, gameId: number): Promise<any> {
    //return this.dataSource.query(`SELECT * FROM USERS`);
  }
}
