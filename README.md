# training_management
for dynasty gaming

## Git Clone
git clone --branch main https://github.com/aruntd2240624/training-dynasty.git training-management-dynasty

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

TrainingManagementPostmanCollection.json => Has postman collection for api testing.Make sure Body always JSON Type

for PATCH and DELETE use path params

for filtering use query params

refer postman collection

password hashing injected directly to user schema used bcrypt

utils/authenticateToken => Has authentication and role managed operation

Steps to execute the API:

1.Create Database training-dynasty in mongoDB.Make sure the DB name in index.js file.and run the api "npm run start"."Server has started"
2.We need a One role and One User to play with this API.
3.For this,remove "authenticateToken" in Role and User routing in index.js file.(For First time only).
4.Now import postman collection  "TrainingManagementPostmanCollection.json" in your postman app
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
    "subject": "Maths",
    "lastUpdatedBy": "62cbd07fd084561ca17ebb6c",
    "_id": "62cbe1f952eaa0a8dc4f2cc0",
    "created_at": "2022-07-11T08:40:25.836Z",
    "updated_at": "2022-07-11T08:40:25.836Z",
    "__v": 0
}

Reply:

{
    "subject": "Maths",                                   //Name
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
    "title":  "Basics Of Engineering",
    "courseType":  "62cd16c802cd4a8080f5d2ef",
    "subjects":  [
        "62cd19ac0da4f4757fc3ed27",    //Subject IDs
        "62cd19b60da4f4757fc3ed29",
        "62cd19d10da4f4757fc3ed2b"
    ]
}

Reply:

{
    "title": "International History",
    "courseType": "62c7110149db133fecb3a4d2",
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

Move to Subject->GET
URL:http://localhost:5000/api/subjects?sort=1&limit=10
header:authorization Key =Token received from login
Note:
sort=1 for ASC
sort=-1 for DESC
Reply:
[
    {
        "_id": "62cd198f0da4f4757fc3ed25",
        "subject": "Economics",
        "stream": "62cd17f30da4f4757fc3ed1d",
        "lastUpdatedBy": "62cc387328f5e7335210aee6",
        "created_at": "2022-07-12T06:49:51.698Z",
        "updated_at": "2022-07-12T06:49:51.698Z",
        "__v": 0
    },
    {
        "_id": "62cd19d10da4f4757fc3ed2b",
        "subject": "English",
        "stream": "62cd17fb0da4f4757fc3ed1f",
        "lastUpdatedBy": "62cc387328f5e7335210aee6",
        "created_at": "2022-07-12T06:50:57.504Z",
        "updated_at": "2022-07-12T06:50:57.504Z",
        "__v": 0
    },
    {
        "_id": "62cd19380da4f4757fc3ed23",
        "subject": "Finance",
        "stream": "62cd17f30da4f4757fc3ed1d",
        "lastUpdatedBy": "62cc387328f5e7335210aee6",
        "created_at": "2022-07-12T06:48:24.496Z",
        "updated_at": "2022-07-12T06:48:24.496Z",
        "__v": 0
    },
    {
        "_id": "62cd19ac0da4f4757fc3ed27",
        "subject": "Maths",
        "stream": "62cd18040da4f4757fc3ed21",
        "lastUpdatedBy": "62cc387328f5e7335210aee6",
        "created_at": "2022-07-12T06:50:20.071Z",
        "updated_at": "2022-07-12T06:50:20.071Z",
        "__v": 0
    },
    {
        "_id": "62cd19b60da4f4757fc3ed29",
        "subject": "Physics",
        "stream": "62cd18040da4f4757fc3ed21",
        "lastUpdatedBy": "62cc387328f5e7335210aee6",
        "created_at": "2022-07-12T06:50:30.009Z",
        "updated_at": "2022-07-12T06:50:30.009Z",
        "__v": 0
    },
    {
        "_id": "62cd19d90da4f4757fc3ed2d",
        "subject": "Social science",
        "stream": "62cd17fb0da4f4757fc3ed1f",
        "lastUpdatedBy": "62cc387328f5e7335210aee6",
        "created_at": "2022-07-12T06:51:05.600Z",
        "updated_at": "2022-07-12T06:51:05.600Z",
        "__v": 0
    },
    {
        "_id": "62cd60ed3d96e0d5fdabbcf7",
        "subject": "Tamil",
        "stream": "62cc3a20bf3bd6175fb3d5df",
        "lastUpdatedBy": "62cc387328f5e7335210aee6",
        "created_at": "2022-07-12T11:54:21.850Z",
        "updated_at": "2022-07-12T11:54:21.850Z",
        "__v": 0
    }
]


4.Get Training:ALL

Move to Courses->GET
URL:http://localhost:5000/api/courses
header:authorization Key =Token received from login
Reply:
[
    "Basics Of Engineering",
    "CA Fundamentals",
    "International Arts"
]

4.Get Training:By Subject

Move to Courses->GET
URL:http://localhost:5000/api/courses?subject=Maths
header:authorization Key =Token received from login
Reply:
[
    "Basics Of Engineering"    
]

5.Get Training:By Stream

Move to Courses->GET
URL:http://localhost:5000/api/courses?stream=Commerce
header:authorization Key =Token received from login
Reply:
[
    "CA Fundamentals",
    "International Arts"
]

6.Get Training:By Type

Move to Courses->GET
URL:http://localhost:5000/api/courses?type=Basic
header:authorization Key =Token received from login
Reply:
[
    "Basics Of Engineering",
    "CA Fundamentals"
]

7.USER FLOW

User Flow:
i)Register:Move to Auth->Sign up

URL:http://localhost:5000/api/auth/signup
header:authorization Key =Token received from login

Type:JSON
{
    "name":  "user",
    "email":  "user@gmail.com",
    "password":  "password",
    "role":"62c6edde5938891a1d9a2e9c"   //Role ID
}

Reply:

{
    "message": "Registration successfull please login!"
}


ii)Login:Move to Auth->Login

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

iii)Update Password: Move to Users->UPDATE PASSWORD(PATCH)

URL:http://localhost:5000/api/users/update-password
Type:JSON
header:authorization Key =Token received from login

To Send
{
    "id":"62cd5f8a3d96e0d5fdabbcf5",  //User ID
    "oldpassword":  "password",
    "password":"pass"
}

Reply:
{
    "id":"62cd5f8a3d96e0d5fdabbcf5",
    "oldpassword":  "password",
    "password":"pass"
}

iii)Update Password: Move to Users->UPDATE PASSWORD(PATCH)

URL:http://localhost:5000/api/users/update-password
Type:JSON
header:authorization Key =Token received from login

To Send
{
    "id":"62cd5f8a3d96e0d5fdabbcf5",  //User ID
    "oldpassword":  "password",
    "password":"pass"
}

Reply:
{
    "message": "Password Updated successfully"
}

iv)Update Profile: Move to Users->UPDATE(PATCH)

URL:http://localhost:5000/api/users/62cd5f8a3d96e0d5fdabbcf5      //User ID
Type:JSON
header:authorization Key =Token received from login

To Send
{
    "name" : "ARUN1"  //or "role":"62cd5f5e3d96e0d5fdabbcf3"
} 

OR

{
    "role":"62cd5f5e3d96e0d5fdabbcf3"
} 

Reply:

{
    "_id": "62cd5f8a3d96e0d5fdabbcf5",
    "name": "ARUN1",
    "email": "user@gmail.com",
    "password": "$2b$10$YIppQepXYP5yZRTu1RY.k.d2wY7ucFqsfFcT3vW4uRzq4bXZBfuDO",
    "role": "62cd5f5e3d96e0d5fdabbcf3",
    "created_at": "2022-07-12T11:48:26.918Z",
    "updated_at": "2022-07-12T11:48:26.918Z",
    "__v": 0
}



Thankyou!

ARUN THANGARAJ