/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express")
const PORT = 3000;
const app = express();
const bodyParser = require('body-parser')
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server

app.use(bodyParser.json())


let userArray = []
let userCount = 0 


// This is signup function, to create a user
const createUser = (firstName, lastName, email, password) => {
  userCount = userCount + 1
  let newUser = {
    id : userCount,
    firstName : firstName,
    lastName : lastName,
    email : email,
    password : password
  }

  userArray.push(newUser)

  return true
}

// This is login function, to display the credentials to user
const checkUser = (email, password) =>{
  let findUser = userArray.find(user=> user.email === email)
  if(!findUser){
    return "Sorry Email does not exit"
  }
  if(findUser.password === password){
    return findUser
  }
  else{
    let message = `User found with email : ${email} , but the password is incorrent, try again`
    return message
  }
}


app.post('/signup', (req,res)=>{
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email
  let password = req.body.password

  let created = createUser(firstName, lastName, email, password)
  if(!created){
    res.send("Coudn't create User, try again...")
  }
  res.send('User Create successfully!!')
})

app.post('/login', (req,res)=>{
  let email = req.body.email
  let password = req.body.password
  
  let userOrMessage = checkUser(email, password)
  res.send(userOrMessage)
})
app.get('/data', (req,res)=>{
  res.json(userArray)
})

app.listen(5000)

module.exports = app;
