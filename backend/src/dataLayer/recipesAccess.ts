import * as AWS from 'aws-sdk'
import { RecipeItem} from '../models/RecipeItem'
import { RecipeUpdate } from '../models/RecipeUpdate'

export class RecipesAccess {
    constructor(
        private readonly docClient = new AWS.DynamoDB.DocumentClient(), 
        private readonly recipeTable = process.env.RECIPES_TABLE,
        private readonly createdAtIndex = process.env.RECIPES_ID_INDEX,

        ) {}

//for Create Recipe
async create(recipe: RecipeItem) {
 
  await this.docClient
  .put({
    TableName: this.recipeTable,
    Item: recipe
  }).promise()
}  

//for get Recipe

async getRecipe(userId: string): Promise<RecipeItem[]> {

  const result = await this.docClient.query({
    TableName: this.recipeTable,
    IndexName: this.createdAtIndex,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  })
  .promise()

  const items = result.Items
  return items as RecipeItem[]

}

//for Update Recipe

async update(userId: string, recipeId: string, updateRecipeRequest: RecipeUpdate){
 await this.docClient.update ({
    TableName: this.recipeTable,
    Key:{userId, recipeId},
    UpdateExpression: "SET #name = :n, dueDate=:d, done=:o",
    ExpressionAttributeValues: {
        
        ":n": updateRecipeRequest.name,
        ":d": updateRecipeRequest.dueDate,
        ":o": updateRecipeRequest.done
    },
    ExpressionAttributeNames: {
      '#name': 'n'
    }
  }).promise()
}

//for deleate recipe

async delete(userId: string, recipeId: string){
  
   await this.docClient.delete({
    TableName: this.recipeTable,
    Key: {
      userId,
      recipeId
    },
  }).promise()
}

//for Get with ID

async getById(userId: string, recipeId: string): Promise<RecipeItem> {
 const result = await this.docClient.get({
  TableName: this.recipeTable,
  Key: {
    userId,
    recipeId
  }
}).promise()

const item = result.Item
return item as RecipeItem
}

//for S3

async setAttachmentUrl(userId: string, recipeId: string, attachmentUrl: string) {
  await this.docClient.update({
    TableName: this.recipeTable,
    Key: {
      userId,
      recipeId
    },
    UpdateExpression: 'SET attachmentUrl = :attachmentUrl',
    ExpressionAttributeValues: {
      ':attachmentUrl': attachmentUrl
    }
  }).promise()
}


}
