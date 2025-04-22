/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export interface ApiResponseOptionsCustom {
  status: number;
  description: string;
  example: Array<Record<string, any>>; 
}


export function CommonApiResponses(responses : ApiResponseOptionsCustom[]): <Y>(
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<Y>,
) => void {
  const decorators = responses.map((response) => {
    return ApiResponse(
      {
       status: response.status,
       description: response.description,
       content: {
         'application/json': {
          examples: response.example.reduce((acc, item, index) => {
            const summary = item.summary
            delete item.summary
            acc[`example-${index}`] = {
              summary,
              value: item,
            };
            return acc;
          }, {} as Record<string, { summary: string; value: any }>)
         } 
        },
      },
    );
  })
  return applyDecorators(...decorators)
}
