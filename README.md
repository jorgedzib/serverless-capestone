# Serverless RECIPES

This application will allow creating/removing/updating/fetching Recipes. Each RECIPE item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

# Frontend

The `client` folder contains a web application that can use the API in the project.

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless TODO application.

## Acknowledgments

This project was created using the code of the Serverless TODO application project of my Cloud Developer Nanodegree at Udacity.

To finish this App some changes in the Frontend would be needed. However this was not the scope of this work becuase the objective it to make the capestone project of my cloud developer Nanodegree.