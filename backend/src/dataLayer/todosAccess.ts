import * as AWS from 'aws-sdk'
import { TodoItem} from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

export class TodosAccess {
    constructor(
        private readonly docClient = new AWS.DynamoDB.DocumentClient(), 
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly createdAtIndex = process.env.TODOS_ID_INDEX,

        ) {}

//for Create Todo
async create(todo: TodoItem) {
 
  await this.docClient
  .put({
    TableName: this.todosTable,
    Item: todo
  }).promise()
}  

//for get Todo

async getTodos(userId: string): Promise<TodoItem[]> {

  const result = await this.docClient.query({
    TableName: this.todosTable,
    IndexName: this.createdAtIndex,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  })
  .promise()

  const items = result.Items
  return items as TodoItem[]

}

//for Update Todo

async update(userId: string, todoId: string, updateTodoRequest: TodoUpdate){
 await this.docClient.update ({
    TableName: this.todosTable,
    Key:{userId, todoId},
    UpdateExpression: "SET #name = :n, dueDate=:d, done=:o",
    ExpressionAttributeValues: {
        
        ":n": updateTodoRequest.name,
        ":d": updateTodoRequest.dueDate,
        ":o": updateTodoRequest.done
    },
    ExpressionAttributeNames: {
      '#name': 'n'
    }
  }).promise()
}

//for deleate todo

async delete(userId: string, todoId: string){
  
   await this.docClient.delete({
    TableName: this.todosTable,
    Key: {
      userId,
      todoId
    },
  }).promise()
}

//for Get with ID

async getById(userId: string, todoId: string): Promise<TodoItem> {
 const result = await this.docClient.get({
  TableName: this.todosTable,
  Key: {
    userId,
    todoId
  }
}).promise()

const item = result.Item
return item as TodoItem
}

//for S3

async setAttachmentUrl(userId: string, todoId: string, attachmentUrl: string) {
  await this.docClient.update({
    TableName: this.todosTable,
    Key: {
      userId,
      todoId
    },
    UpdateExpression: 'SET attachmentUrl = :attachmentUrl',
    ExpressionAttributeValues: {
      ':attachmentUrl': attachmentUrl
    }
  }).promise()
}


}
