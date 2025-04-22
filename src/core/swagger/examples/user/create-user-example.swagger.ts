import { ApiResponseOptionsCustom } from "@core/decorators";

const createUserSuccess: ApiResponseOptionsCustom = {
  status: 201,
  description: 'User created successfully',
  example: [{
    summary: 'Success',
    id: '4893cb7b-6f66-465e-8d82-f59b4c4a39b4',
    name: 'John Doe',
    email: 'john.doe@email.com',
    createdAt: '2023-10-01T00:00:00.000Z',
    updatedAt: '2023-10-01T00:00:00.000Z',
  }]
}


const createUserConflict: ApiResponseOptionsCustom = {
  status: 409,
  description: 'Conflict',
  example: [
    {
      summary: 'User exists',
      statusCode: 409,
      timestamp: new Date().toISOString(),
      path: '/api/user',
      method: 'POST',
      message: 'User already exists',
    },
    {
      summary: 'Passwords do not match',
      statusCode: 409,
      timestamp: new Date().toISOString(),
      path: '/api/user',
      method: 'POST',
      message: 'Passwords do not match',
    }
  ]
}

const createUserGenericError: ApiResponseOptionsCustom = {
  status: 400,
  description: 'Error creating user',
  example: [{
    summary: 'Error creating user',
    statusCode: 400,
    timestamp: new Date().toISOString(),
    path: '/api/user',
    method: 'POST',
    message: 'Error creating user',
  }]
}

export const createUserExample: ApiResponseOptionsCustom[] = [
  createUserSuccess,
  createUserConflict,
  createUserGenericError,
]

