import { ApiResponseOptionsCustom } from "@core/decorators";

const deleteUserSuccess: ApiResponseOptionsCustom = {
  status: 201,
  description: 'User deleted successfully',
  example: [{
    summary: 'Success',
  }]
}


const deleteErrorServer: ApiResponseOptionsCustom = {
  status: 404,
  description: 'NotFoundException',
  example: [
    {
      summary: 'NotFoundException',
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: '/api/user/:id',
      method: 'DELETE',
      message: 'User not found',
    },
  ]
}

const deleteUserUnauthorizedError: ApiResponseOptionsCustom = {
  status: 401,
  description: 'Unauthorized',
  example: [
    {
    summary: 'Unauthorized',
    statusCode: 401,
    timestamp: new Date().toISOString(),
    path: '/api/user/:id',
    method: 'DELETE',
    message: 'Unauthorized',
  },
  {
    summary: 'Not authorized',
    statusCode: 401,
    timestamp: new Date().toISOString(),
    path: '/api/user/:id',
    method: 'DELETE',
    message: 'You are not authorized to update this user',
  }
]
}

export const deleteUserExample: ApiResponseOptionsCustom[] = [
  deleteUserSuccess,
  deleteErrorServer,
  deleteUserUnauthorizedError,
]

