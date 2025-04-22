
import { Public } from '@core/configs/auth';
import { CommonApiResponses } from '@core/decorators';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplySessionUseCase, ApplySessionMeUseCase } from '@infra/http/use-cases';
import { SessionDto } from '@infra/http/dtos';
import { createUserExample } from '@core/swagger/examples/user';
import { SessionOutput, SessionMeOutput } from '@domain/user/types/user-cases';

@ApiTags('Session')
@ApiBearerAuth()
@Controller({ path: 'session', version: '1' })
export class SessionController {
  constructor(
    private readonly applySessionUseCase: ApplySessionUseCase,
    private readonly applySessionMeUseCase: ApplySessionMeUseCase,
  ) {}

  @Post('/')
  @Public()
  @ApiOperation({
    summary: 'Create a new session',
    operationId: 'create-session',
    description: 'Create a new session',
  })
  @CommonApiResponses(createUserExample)
  async createUser(@Body() body: SessionDto): Promise<SessionOutput> {
    return this.applySessionUseCase.execute(body);
  }

  @Get('/me')
  @ApiOperation({
    summary: 'Get the current user',
    operationId: 'get-current-user',
    description: 'Get the current user',
  })
  @CommonApiResponses(createUserExample)
  async getCurrentUser(): Promise<SessionMeOutput> {
    return this.applySessionMeUseCase.execute();
  }
}
