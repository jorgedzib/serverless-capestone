
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils';



export const handler = middy( 

async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  // TODO: Implement creating a new TODO item
  
  console.log('Processing event: ', event)
  const newTodo: CreateTodoRequest = JSON.parse(event.body)


  const newItem = await createTodo(getUserId(event), newTodo)

return {
  statusCode: 200,
body: JSON.stringify({
  item: newItem, 
})
}

})

handler.use(
  cors({
    credentials: true
  })
)