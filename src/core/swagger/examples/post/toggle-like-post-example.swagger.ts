import { ApiResponseOptionsCustom } from "@core/decorators";

const toggleLikePostSuccess: ApiResponseOptionsCustom = {
  status: 201,
  description: 'Toggle like post successfully',
  example: [{
    summary: 'Success',
  }]
}


const toggleLikePostErrorServer: ApiResponseOptionsCustom = {
  status: 404,
  description: 'NotFoundException',
  example: [
    {
      summary: 'Post not found',
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: '/api/post/:id/like',
      method: 'POST',
      message: 'Post not found',
    },
    {
      summary: 'User not found',
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: '/api/post/:id/like',
      method: 'POST',
      message: 'User not found',
    }
  ]
}

const toggleLikePostUnauthorizedError: ApiResponseOptionsCustom = {
  status: 401,
  description: 'Unauthorized',
  example: [{
    summary: 'Unauthorized',
    statusCode: 401,
    timestamp: new Date().toISOString(),
    path: '/api/post/:id/like',
    method: 'POST',
    message: 'Unauthorized',
  }]
}

export const toggleLikePostExample: ApiResponseOptionsCustom[] = [
  toggleLikePostSuccess,
  toggleLikePostErrorServer,
  toggleLikePostUnauthorizedError,
]

