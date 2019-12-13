import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils';

import { createAttachment } from '../../businessLogic/recipes';

export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const recipeId = event.pathParameters.recipeId

  const generateUploadUrl = await createAttachment(getUserId(event), recipeId)
  
  return {
    statusCode: 201,
    body: JSON.stringify({
    uploadUrl: generateUploadUrl
  })
}
})

  handler.use(
    cors({
      credentials: true
    })
  )