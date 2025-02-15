/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = 3000


let idCounter = 0

let todolist = []

// New Todo is added through this function
const addTodo = (title, info) => {
  idCounter = idCounter + 1
  let id = idCounter
  let newTodo = {
    id : id,
    title : title,
    info : info
  }
  console.log(newTodo)
  todolist.push(newTodo)
  return true
}

// Delete the specific todo
const deleteTodo = (task, index) => {
  todolist.splice(index , 1)
  console.log(task)
  return true
}

// Update the specific todo
const updateTodo = (id, title, info) =>{
  let updateThis = todolist.find(element=> element.id === id)
  let taskIndex = todolist.indexOf(updateThis)

  updateThis.title = title
  updateThis.info = info

  todolist[taskIndex] = updateThis

  return updateThis
}

app.get('/todos', (req, res)=>{
  res.json(todolist)
})

app.get('/todos/:id', (req, res)=>{
  let id = parseInt(req.params.id)
  let task = todolist.find(element => element.id === id)
  if(!task){
    return res.status(404).send('Sorry, No task with that id found!')
  }
  res.json(task)
})

app.post('/todos', (req, res)=>{
  let todoTitle = req.body.title
  let todoInfo = req.body.info

  let added = addTodo(todoTitle, todoInfo)

  if(!added){
    res.send("Sorry Couldn't add Task")
  }
  res.send("New Added Successfully")
})

app.delete('/todos/:id', (req, res)=>{
  let id = parseInt(req.params.id)
  let task = todolist.find(element=> element.id === id)
  let index = todolist.indexOf(task)
  if(!task){
    res.send("Sorry, No such task found !")
  }
  let deleted = deleteTodo(task, index)
  if(!deleted){
    res.send("Sorry Couldn't delete task")
  }
  res.send("Deletion Successful")
})

app.put('/todos/:id', (req, res)=>{
  let id = parseInt(req.params.id)
  let updatedTitle = req.body.title
  let updatedInfo = req.body.info

  let requiredTask = todolist.find(element=> element.id === id)

  let updatedTask = updateTodo(id, updatedTitle, updatedInfo)

  res.json(`${requiredTask} is updated to ${updatedTask}`)
})

app.listen(port)


module.exports = app;
