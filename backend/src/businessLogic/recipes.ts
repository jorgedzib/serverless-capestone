import * as uuid  from 'uuid'

import { RecipesAccess } from '../dataLayer/recipesAccess'
import { UploadAccess } from '../dataLayer/storageAccess'
import { RecipeItem } from '../models/RecipeItem'
import { CreateRecipeRequest } from '../requests/CreateRecipeRequest'
import { UpdateRecipeRequest } from '../requests/UpdateRecipeRequest'
import * as createError from 'http-errors'

const contentAccess = new RecipesAccess()
const filesAccess = new UploadAccess() 

//for Create Recipe

export async function createRecipe(userId: string, 
  CreateRecipeRequest: CreateRecipeRequest): Promise<RecipeItem> {
    const timestamp = new Date().toISOString()
    const itemId = uuid.v4()
  


  const newRecipe: RecipeItem = {
    userId: userId,
    recipeId: itemId,
    createdAt: timestamp,
    ...CreateRecipeRequest,
    done: false,
  }

  await contentAccess.create(newRecipe)

  return newRecipe
  
  }

//for Get Recipe


  
  export async function getRecipePerUser(userId: string): Promise<RecipeItem[]> 
  {
    return await contentAccess.getRecipe(userId) 

  }




//for Update Recipe 

export async function makeUpdate(
  userId: string,
  recipeId: string,
  updateRecipeRequest: UpdateRecipeRequest): Promise<void>
  {
    await checkIfExists(userId, recipeId)

    return await contentAccess.update(userId, recipeId, updateRecipeRequest)

    }


//for Delete Recipe  



export async function makeDelete(userId: string, recipeId: string){

  return await contentAccess.delete(userId, recipeId)

  
  }  

//getbyId and error
async function getById(userId: string, recipeId: string): Promise<RecipeItem> {
  const recipe = await contentAccess.getById(userId, recipeId)
  if (!recipe) {
    throw createError(404, JSON.stringify({
      error: 'Recipe not found'
    }))
  }

  return recipe
}

async function checkIfExists(userId: string, recipeId: string) {
  await getById(userId, recipeId)
}



  //for S3


  export async function createAttachment(userId: string, recipeId: string): Promise<string> {
  const findRecipe = await getById(userId, recipeId)

    const presignedUrl = filesAccess.getUploadUrl(recipeId)
  
    if (!findRecipe.attachmentUrl) {
      await contentAccess.setAttachmentUrl(userId, recipeId, filesAccess.findUrl(recipeId))
    }

    return presignedUrl
  }
