import { CommonApiResponses } from "@core/decorators";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApplyCreatePostUseCase, ApplyGetAllPostUseCase, ApplyToggleLikePostUseCase } from "@infra/http/use-cases";
import { CreatePostDto, GetAllPostDto, ToggleLikePostDto } from "@infra/http/dtos";
import { GetAllPostOutput } from "@domain/feed/types/user-cases";
import { PaginateResponse } from "@core/types";
import { createPostExample, getAllPostExample, toggleLikePostExample } from "@core/swagger/examples";

@ApiTags('Post')
@ApiBearerAuth()
@Controller({ path: 'post', version: '1' })
export class PostController {
  constructor(
    private readonly applyCreatePostUseCase: ApplyCreatePostUseCase,
    private readonly applyGetAllPostUseCase: ApplyGetAllPostUseCase,
    private readonly applyToggleLikePostUseCase: ApplyToggleLikePostUseCase
  ) {}

  @Post('/')
  @ApiOperation({
    summary: 'Create a new post',
    operationId: 'create-post',
    description: 'Create a new post',
  })
  @CommonApiResponses(createPostExample)
  async createPost(
    @Body() body: CreatePostDto
  ): Promise<void> {
    return this.applyCreatePostUseCase.execute(body);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get all posts',
    operationId: 'get-all-posts',
    description: 'Get all posts',
  })
  @CommonApiResponses(getAllPostExample)
  async getAllPost(
    @Query() query: GetAllPostDto
  ): Promise<PaginateResponse<GetAllPostOutput>> {
    return this.applyGetAllPostUseCase.execute(query);
  }

  @Post('/like')
  @ApiOperation({
    summary: 'Toggle like post',
    operationId: 'toggle-like-post',
    description: 'Toggle like post',
  })
  @CommonApiResponses(toggleLikePostExample)
  async toggleLikePost(
    @Body() body: ToggleLikePostDto
  ): Promise<void> {
    return this.applyToggleLikePostUseCase.execute(body);
  }
}