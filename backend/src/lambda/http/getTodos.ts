import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getTodosPerUser } from '../../businessLogic/todos'
import { getUserId } from '../utils';


export const handler = middy (async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   // TODO: Get all TODO items for a current user
 
   const todos = await getTodosPerUser(getUserId(event))
   
   return {
     statusCode:200,
     body: JSON.stringify({
       items: todos
     })
   }
   
})

handler.use(
  cors({
    credentials: true
  })
)