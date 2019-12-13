import * as uuid  from 'uuid'

import { TodosAccess } from '../dataLayer/todosAccess'
import { UploadAccess } from '../dataLayer/storageAccess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as createError from 'http-errors'

const contentAccess = new TodosAccess()
const filesAccess = new UploadAccess() 

//for Create Todo

export async function createTodo(userId: string, 
  CreateTodoRequest: CreateTodoRequest): Promise<TodoItem> {
    const timestamp = new Date().toISOString()
    const itemId = uuid.v4()
  


  const newTodo: TodoItem = {
    userId: userId,
    todoId: itemId,
    createdAt: timestamp,
    ...CreateTodoRequest,
    done: false,
  }

  await contentAccess.create(newTodo)

  return newTodo
  
  }

//for Get Todo


  
  export async function getTodosPerUser(userId: string): Promise<TodoItem[]> 
  {
    return await contentAccess.getTodos(userId) 

  }




//for Update todo 

export async function makeUpdate(
  userId: string,
  todoId: string,
  updateTodoRequest: UpdateTodoRequest): Promise<void>
  {
    await checkIfExists(userId, todoId)

    return await contentAccess.update(userId, todoId, updateTodoRequest)

    }


//for Delete todo  



export async function makeDelete(userId: string, todoId: string){

  return await contentAccess.delete(userId, todoId)

  
  }  

//getbyId and error
async function getById(userId: string, todoId: string): Promise<TodoItem> {
  const todo = await contentAccess.getById(userId, todoId)
  if (!todo) {
    throw createError(404, JSON.stringify({
      error: 'TODO not found'
    }))
  }

  return todo
}

async function checkIfExists(userId: string, todoId: string) {
  await getById(userId, todoId)
}



  //for S3


  export async function createAttachment(userId: string, todoId: string): Promise<string> {
  const findTodo = await getById(userId, todoId)

    const presignedUrl = filesAccess.getUploadUrl(todoId)
  
    if (!findTodo.attachmentUrl) {
      await contentAccess.setAttachmentUrl(userId, todoId, filesAccess.findUrl(todoId))
    }

    return presignedUrl
  }
