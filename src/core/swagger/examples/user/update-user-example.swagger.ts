import { ApiResponseOptionsCustom } from "@core/decorators";

const updateUserSuccess: ApiResponseOptionsCustom = {
  status: 201,
  description: 'User updated successfully',
  example: [{
    summary: 'Success',
  }]
}


const updateErrorServer: ApiResponseOptionsCustom = {
  status: 404,
  description: 'NotFoundException',
  example: [
    {
      summary: 'NotFoundException',
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: '/api/user/:id',
      method: 'PATCH',
      message: 'User not found',
    },
  ]
}

const updateUserUnauthorizedError: ApiResponseOptionsCustom = {
  status: 401,
  description: 'Unauthorized',
  example: [{
    summary: 'Unauthorized',
    statusCode: 401,
    timestamp: new Date().toISOString(),
    path: '/api/user/:id',
    method: 'PATCH',
    message: 'Unauthorized',
  }, {
    summary: 'Not authorized',
    statusCode: 401,
    timestamp: new Date().toISOString(),
    path: '/api/user/:id',
    method: 'PATCH',
    message: 'You are not authorized to update this user',
  }
]
}

export const updateUserExample: ApiResponseOptionsCustom[] = [
  updateUserSuccess,
  updateErrorServer,
  updateUserUnauthorizedError,
]

