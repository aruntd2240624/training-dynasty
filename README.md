# training_management
for dynasty gaming

## Install
npm install

.env file has TOKEN_SECRET used for generating jwt

Dependencies Referrence

## Express
npm install express

## bcrypt for password hashing
npm i bcrypt

## dotenv for excecuting .env  
npm install dotenv

## jsonwebtoken for jwt
npm install jsonwebtoken

##mongoose used for as Mongodb OMD for NodeJS
npm install mongoose

## Project Folder and Files
models folder => schema for the mongodb

routes folder => api routes

utils folder =>  has middleware for validating jwt auth

PostManCollection.json => Has postman collection for api testing.Make sure Body always JSON Type

for PATCH and DELETE use path params

for filtering use query params

refer postman collection

password hashing injected directly to user schema used bcrypt

utils/authenticateToken => Has authentication and role managed operation

exported => Collection of mongodb data
