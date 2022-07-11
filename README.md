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

Steps to execute the API:

1.Create Database training-dynasty in mongoDB.Make sure the DB name in index.js file.and run the api "npm run start"."Server has started"
2.We need a One role and One User to play with this API.
3.For this,remove "authenticateToken" in Role and User routing in index.js file.(For First time only).
4.Now import postman collection  "PostManCollection.json" in your postman app
5.Move to Roles->Create   //Create Roles
URL:http://localhost:5000/api/roles
Type:JSON
{
    "title": "Super Admin",  
    "level":100   //Super Admin=100//admin=101//User=1//
}

Once send to that you will get 

{
    "title": "Super Admin",
    "level": 100,
    "_id": "62cbd16852eaa0a8dc4f2ca9",   //Note this ID for New User Signup
    "__v": 0
}

Now we have three levels of user.

6.Move to User->Create   //Create First User
URL:http://localhost:5000/api/users
Type:JSON
Body (Make sure Body type JSON)
{
    "name": "Arun",
    "email": "arun@gmail.com",
    "password": "password",
    "role": "62cbd16852eaa0a8dc4f2ca9"     //Role ID we created at first=Super Admin
  }
Once send to that you will get 

{
    "name": "Arun1",
    "email": "arun1@gmail.com",
    "password": "$2b$10$AsdSYZ1lBrn6TIiM3nGwZuMGaXwXButM6U4kBsReMewH4tXDxs7zS",
    "role": "62cbd16852eaa0a8dc4f2ca9",
    "_id": "62cbd8b852eaa0a8dc4f2cb3",
    "created_at": "2022-07-11T08:00:56.599Z",
    "updated_at": "2022-07-11T08:00:56.599Z",
    "__v": 0
}

7.Now we have Three Levels and one User.Now we need to add authentication for further operation in Roles and Users.
8.Go to index and replace the "authenticateToken" in index which we removed earlier and restart the server by npm run start.
9.Go to the Postman collection move Auth->Login

URL:http://localhost:5000/api/auth/login
Type:JSON
To Send
{
    "email": "arun@gmail.com",
    "password": "password"
}

Received:

If Valid User API replied with following JSON
{
    "name": "Arun",
    "email": "arun@gmail.com",
    "role": {
        "_id": "62cbd00a49abb25d5eda729f",
        "title": "Super Admin",
        "level": 100,
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2JkMDdmZDA4NDU2MWNhMTdlYmI2YyIsImVtYWlsIjoiYXJ1bkBnbWFpbC5jb20iLCJsZXZlbCI6MTAwLCJpYXQiOjE2NTc1MjY0MjIsImV4cCI6MTY1NzUzMDAyMn0.HTzHjinqjSKegm_jY8POWXOJPyUR1lV0SXGpnr-fSY8"
}

Copy this token and to operations(GET,POST,PATCH,DELETE) with  Courses,Streams,Course Type,Subjects,Users.
Add this token as authorization headers as key.If you are Super admin you can do GET,POST,PATCH and DELETE operations data.
If you registered as a User you can do GET operation.

10.This role should be mentioned in Sign up 

URL:http://localhost:5000/api/auth/signup
Type:JSON
{
    "name":  "Arun",
    "email":  "arun@gmail.com",
    "password":  "password",
    "role":"62c6edde5938891a1d9a2e9c"   //Role ID
}

11.Create Training Course Type and Stream type and note the ID's ofr giving output to the Training course creation using authentication.



RESULTS For TASK GIVEN:

1.Add New Subject

Move to Subjects->CREATE
URL:http://localhost:5000/api/subjects
header:authorization Key =Token u received from login
Type:JSON
{
    "title": "Maths",
    "lastUpdatedBy": "62cbd07fd084561ca17ebb6c",
    "_id": "62cbe1f952eaa0a8dc4f2cc0",
    "created_at": "2022-07-11T08:40:25.836Z",
    "updated_at": "2022-07-11T08:40:25.836Z",
    "__v": 0
}

Reply:

{
    "title": "Maths",                                   //Name
    "lastUpdatedBy": "62cbd07fd084561ca17ebb6c",        //By user
    "_id": "62cbe1f952eaa0a8dc4f2cc0",                  //Note this ID for course Creation JSON
    "created_at": "2022-07-11T08:40:25.836Z",
    "updated_at": "2022-07-11T08:40:25.836Z",
    "__v": 0
}

2.Add New Traing Course

Move to Courses->POST
URL:http://localhost:5000/api/courses
Type:JSON
header:authorization Key =Token received from login
{
    "title":  "International History",
    "type":  "62c7110149db133fecb3a4d2",   //Course Type ID
    "stream": "62c714f9f8a11e211653abe8",  //Stream ID
    "subjects":  [
        "62cbe1df52eaa0a8dc4f2cba",   //Subjects ID
        "62cbe1ed52eaa0a8dc4f2cbc",    //Subjects ID
        "62cbe1f352eaa0a8dc4f2cbe"   //Subjects ID
    ]
  }

Reply:

{
    "title": "International History",
    "type": "62c7110149db133fecb3a4d2",
    "stream": "62c714f9f8a11e211653abe8",
    "subjects": [
        "62cbe1df52eaa0a8dc4f2cba",
        "62cbe1ed52eaa0a8dc4f2cbc",
        "62cbe1f352eaa0a8dc4f2cbe"
    ],
    "lastUpdatedBy": "62cbd07fd084561ca17ebb6c",
    "_id": "62cbe46c52eaa0a8dc4f2cc4",
    "created_at": "2022-07-11T08:50:52.735Z",
    "updated_at": "2022-07-11T08:50:52.735Z",
    "__v": 0
}

3.Get All Subject:

Move to Courses->GET
URL:http://localhost:5000/api/subjects?sort=1&limit=10
header:authorization Key =Token received from login
Note:
sort=1 for ASC
sort=-1 for DESC
Reply:
[
    {
        "_id": "62cbe1ed52eaa0a8dc4f2cbc",
        "title": "English",
        "lastUpdatedBy": "62cbd07fd084561ca17ebb6c",
        "created_at": "2022-07-11T08:40:13.140Z",
        "updated_at": "2022-07-11T08:40:13.140Z",
        "__v": 0
    },
    {
        "_id": "62cbe1f952eaa0a8dc4f2cc0",
        "title": "Maths",
        "lastUpdatedBy": "62cbd07fd084561ca17ebb6c",
        "created_at": "2022-07-11T08:40:25.836Z",
        "updated_at": "2022-07-11T08:40:25.836Z",
        "__v": 0
    },
    {
        "_id": "62cbe1df52eaa0a8dc4f2cba",
        "title": "Social Science",
        "lastUpdatedBy": "62cbd07fd084561ca17ebb6c",
        "created_at": "2022-07-11T08:39:59.284Z",
        "updated_at": "2022-07-11T08:39:59.284Z",
        "__v": 0
    },
    {
        "_id": "62cbe1f352eaa0a8dc4f2cbe",
        "title": "Tamil",
        "lastUpdatedBy": "62cbd07fd084561ca17ebb6c",
        "created_at": "2022-07-11T08:40:19.748Z",
        "updated_at": "2022-07-11T08:40:19.748Z",
        "__v": 0
    }
]


3.Get Training:

Move to Courses->GET
URL:http://localhost:5000/api/courses
header:authorization Key =Token received from login
Reply:

[
    {
        "_id": "62cbe46c52eaa0a8dc4f2cc4",
        "title": "International History",
        "type": basic,
        "stream": Science,
        "subjects": ["Maths","Social Science"],
        "lastUpdatedBy": {
            "_id": "62cbd07fd084561ca17ebb6c",
            "name": "Arun",
            "email": "arun@gmail.com",
            "password": "$2b$10$k1U.I9HkyWg1IgyivIFwjOvuxkbVi.2NrvWWVnvEf500iAqJ77mWe",
            "role": "62cbd00a49abb25d5eda729f",
            "created_at": "2022-07-11T07:25:51.680Z",
            "updated_at": "2022-07-11T07:25:51.680Z",
            "__v": 0
        },
        "created_at": "2022-07-11T08:50:52.735Z",
        "updated_at": "2022-07-11T08:50:52.735Z",
        "__v": 0
    }
]