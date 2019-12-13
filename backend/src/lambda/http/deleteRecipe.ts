import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { makeDelete } from '../../businessLogic/recipes'
import { getUserId } from '../utils'

export const handler= middy (async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const recipeId = event.pathParameters.recipeId
  
  
  const newDelete = await makeDelete(getUserId(event), recipeId)

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
