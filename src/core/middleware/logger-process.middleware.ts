import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggerProcessMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const date = new Date().toLocaleString();
    const userAgent = req.get('user-agent') ?? '';

    res.on('finish', () => {
      const { statusCode } = res;
      Logger.log(
        `${method} :: ${originalUrl} :: ${statusCode} - ${userAgent} - ${date}`,
        LoggerProcessMiddleware.name,
      );
    });

    next();
  }
}
