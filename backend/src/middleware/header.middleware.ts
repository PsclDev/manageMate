import {
  Injectable,
  type NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { ConfigService } from '../config';

@Injectable()
export class HeaderMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, _: Response, next: NextFunction) {
    const header = req.headers['x-auth-api-key'];

    if (!header) {
      throw new UnauthorizedException('Required authentication is missing.');
    }

    const expectedValue = this.configService.apiSecret;
    if (header !== expectedValue) {
      throw new UnauthorizedException('Invalid API key');
    }

    next();
  }
}
