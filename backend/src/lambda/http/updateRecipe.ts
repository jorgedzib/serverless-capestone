import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { UpdateRecipeRequest } from '../../requests/UpdateRecipeRequest'

import { makeUpdate } from '../../businessLogic/recipes'
import { getUserId } from '../utils'

export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const recipeId = event.pathParameters.recipeId
  const updatedRecipe: UpdateRecipeRequest = JSON.parse(event.body)

  await makeUpdate(getUserId(event), recipeId, updatedRecipe)  

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

 