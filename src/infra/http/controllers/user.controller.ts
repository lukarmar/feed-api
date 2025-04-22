
import { Public } from '@core/configs/auth';
import { CommonApiResponses } from '@core/decorators';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplyCreateUserUseCase, ApplyGetAllUsersUseCase, ApplyUpdateUserUseCase, ApplyDeleteUserUseCase } from '@infra/http/use-cases';
import { CreateUserDto, GetAllUsersDto, UpdateUserDto } from '@infra/http/dtos';
import { createUserExample, deleteUserExample, getAllUsersExample, updateUserExample } from '@core/swagger/examples/user';
import { CreateUserOutput, GetAllUsersOutput } from '@domain/user/types/user-cases';
import { PaginateResponse } from '@core/types';

@ApiTags('User')
@ApiBearerAuth()
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(
    private readonly applyCreateUserUseCase: ApplyCreateUserUseCase,
    private readonly applyGetAllUsersUseCase: ApplyGetAllUsersUseCase,
    private readonly applyUpdateUserUseCase: ApplyUpdateUserUseCase,
    private readonly applyDeleteUserUseCase: ApplyDeleteUserUseCase,
  ) {}

  @Post('/')
  @Public()
  @ApiOperation({
    summary: 'Create a new user',
    operationId: 'create-user',
    description: 'Create a new user',
  })
  @CommonApiResponses(createUserExample)
  async createUser(@Body() body: CreateUserDto): Promise<CreateUserOutput> {
    return this.applyCreateUserUseCase.execute(body);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get all users',
    operationId: 'get-all-users',
    description: 'Get all users',
  })
  @CommonApiResponses(getAllUsersExample)
  async getAllUsers(
    @Query() query: GetAllUsersDto
  ): Promise<PaginateResponse<GetAllUsersOutput>> {
    return this.applyGetAllUsersUseCase.execute(query);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update a user',
    operationId: 'update-user',
    description: 'Update a user',
  })
  @CommonApiResponses(updateUserExample)
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return this.applyUpdateUserUseCase.execute({
      id,
      ...body,
    });
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a user',
    operationId: 'delete-user',
    description: 'Delete a user',
  })
  @CommonApiResponses(deleteUserExample)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.applyDeleteUserUseCase.execute({
      id,
    });
  }
  
}
