import { ApiResponseOptionsCustom } from "@core/decorators";

const createPostSuccess: ApiResponseOptionsCustom = {
  status: 201,
  description: 'Create post successfully',
  example: [{
    summary: 'Success',
  }]
}


const createPostErrorServer: ApiResponseOptionsCustom = {
  status: 404,
  description: 'NotFoundException',
  example: [
    {
      summary: 'NotFoundException',
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: '/api/post',
      method: 'POST',
      message: 'User not found',
    },
  ]
}

const createPostUnauthorizedError: ApiResponseOptionsCustom = {
  status: 401,
  description: 'Unauthorized',
  example: [{
    summary: 'Unauthorized',
    statusCode: 401,
    timestamp: new Date().toISOString(),
    path: '/api/user/:id',
    method: 'POST',
    message: 'Unauthorized',
  }]
}

export const createPostExample: ApiResponseOptionsCustom[] = [
  createPostSuccess,
  createPostErrorServer,
  createPostUnauthorizedError,
]

