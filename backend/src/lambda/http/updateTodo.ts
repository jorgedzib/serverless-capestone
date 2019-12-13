import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import { makeUpdate } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  await makeUpdate(getUserId(event), todoId, updatedTodo)  

  return {
    statusCode: 200,
  body:''
}

})

handler
  //Error Handler?
  .use(
    cors({
      credentials: true
    })
  )

 