
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { CreateRecipeRequest } from '../../requests/CreateRecipeRequest'
import { createRecipe } from '../../businessLogic/recipes'
import { getUserId } from '../utils';



export const handler = middy( 

async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  console.log('Processing event: ', event)
  const newRecipe: CreateRecipeRequest = JSON.parse(event.body)


  const newItem = await createRecipe(getUserId(event), newRecipe)

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