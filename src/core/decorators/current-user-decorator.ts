import { TokenPayload } from '@core/configs/auth';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as TokenPayload;
  },
);
