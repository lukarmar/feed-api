import  { TokenPayload } from "@core/configs/auth";
import { SessionDataUserHelper } from "@core/helpers";
import { Encrypter } from "@core/types";
import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Response, Request, NextFunction } from "express";

@Injectable()
export class ApplyCurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly encrypter: Encrypter,
  ){}
  async use(req: Request, res: Response, next: NextFunction) {
    
   const token = req.headers.authorization?.split(" ")[1];
      
   try {
    if (!token) {
      throw new UnauthorizedException("Token not found");
    }
   
    const { sub } = await this.encrypter.decodeToken(token) as { sub: TokenPayload}
    SessionDataUserHelper.setSessionData(sub);
    next();
    }catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException("Error decoding token");
    }
  }
}