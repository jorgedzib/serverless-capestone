import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getRecipePerUser } from '../../businessLogic/recipes'
import { getUserId } from '../utils';


export const handler = middy (async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
 
   const recipes = await getRecipePerUser(getUserId(event))
   
   return {
     statusCode:200,
     body: JSON.stringify({
       items: recipes
     })
   }
   
})

handler.use(
  cors({
    credentials: true
  })
)