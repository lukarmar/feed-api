import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from "@nestjs/common";
import { Response, Request } from "express";

@Catch()
export class CustomExceptionFilterMiddleware implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;

    const errorValidator = this.getErrorMessage(exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message,
      ...(status === 422 && {
        detail: errorValidator?.detail,
      })
    });
  }

  private getErrorMessage(exception: HttpException): { message: string;  detail: string[] } | undefined {
    if(exception.getResponse) {
    const errorResponse = exception.getResponse() as {
      message: string;
      detail: string[];
    };
      return {
        message: errorResponse.message,
        detail: errorResponse.detail,
      };
    }
  }
}