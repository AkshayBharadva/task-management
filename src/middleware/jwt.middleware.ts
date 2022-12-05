import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT } from 'src/constants';

export function auth(req: Request, res: Response, next: NextFunction) {
  let url: string;

  try {
    url = req.url;
  } catch (err) {
    throw new InternalServerErrorException();
  }

  if (!url.includes('/auth/')) {
    const token =
      req.body?.token || req.query?.token || req.headers['x-access-token'];

    if (!token) {
      throw new UnauthorizedException(
        'A token is required for authentication i.e, x-access-token',
      );
    }
    try {
      const decoded = verify(token, JWT.SECRET);
      console.log(decoded);
    } catch (err) {
      throw new BadRequestException('Invalid Token');
    }

    return next();
  } else {
    return next();
  }
}
