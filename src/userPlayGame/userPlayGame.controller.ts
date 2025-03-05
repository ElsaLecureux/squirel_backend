import { Controller } from '@nestjs/common';
import { UserPlayGameService } from './userPlayGame.service';

@Controller('userPlayGame')
export class UserPlayGameController {
  constructor(private readonly Service: UserPlayGameService) {}
}
