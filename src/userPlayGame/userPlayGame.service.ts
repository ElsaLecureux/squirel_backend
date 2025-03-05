import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserPlayGameService {
  constructor(private readonly jwtService: JwtService) {}
}
