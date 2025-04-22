import { ApiResponseOptionsCustom } from "@core/decorators";

const getAllUsersSuccess: ApiResponseOptionsCustom = {
  status: 201,
  description: 'Get all users successfully',
  example: [{
    summary: 'Success',
    data: [
      {
        id: "70cfce74-52c0-4c04-bb07-21e23687836e",
        name: "Luka Martins",
        email: "luka@email.com",
        createdAt: "2025-04-18T17:10:52.758Z",
        updatedAt: "2025-04-18T17:10:52.758Z"
      }
    ],
    total: 1,
    page: 1,
    limit: 10,
    totalPages: 1
  }]
}


const getAllUsersErrorServer: ApiResponseOptionsCustom = {
  status: 500,
  description: 'Internal Server Error',
  example: [
    {
      summary: 'Internal Server Error',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: '/api/user',
      method: 'GET',
      message: 'Internal Server Error',
    },
  ]
}

const getAllUsersUnauthorizedError: ApiResponseOptionsCustom = {
  status: 401,
  description: 'Unauthorized',
  example: [{
    summary: 'Unauthorized',
    statusCode: 401,
    timestamp: new Date().toISOString(),
    path: '/api/user',
    method: 'GET',
    message: 'Unauthorized',
  }]
}

export const getAllUsersExample: ApiResponseOptionsCustom[] = [
  getAllUsersSuccess,
  getAllUsersErrorServer,
  getAllUsersUnauthorizedError,
]

