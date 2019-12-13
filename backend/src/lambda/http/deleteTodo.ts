import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { makeDelete } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler= middy (async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
  
  
  const newDelete = await makeDelete(getUserId(event), todoId)

    // create a response
    return {
      statusCode: 201,
    body: JSON.stringify({
      newDelete
    })
  }
  //return undefined
})

handler
  //Error Handler?
  .use(
    cors({
      credentials: true
    })
  )
