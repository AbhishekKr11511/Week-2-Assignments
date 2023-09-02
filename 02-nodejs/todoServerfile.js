const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 6000
app.use(bodyParser.json())

const todosPath = path.join(__dirname, 'myTodos.json')


app.get('/', (req,res)=>{
    res.send('Hello From port 6000')
})

app.get('/todos', (req,res)=>{
    fs.readFile(todosPath, 'utf-8', (err, content)=>{
        if(err){
            console.log('Error : '+err)
            res.status(404).send("Error 404, Not found")
        }
        else{
            res.status(200).json(JSON.parse(content))
        }
    })
})


app.post('/todos', (req,res)=>{
    let newData = {
        id : Math.floor(Math.random()*1000),
        name : req.body.name,
        age : req.body.age
    }

    fs.readFile(todosPath, 'utf-8', (err, data)=>{
        if(err)throw(err)
        const todos = JSON.parse(data)
        todos.push(newData)
        fs.writeFile(todosPath, JSON.stringify(todos), (err)=>{
            if(err)throw(err)
            res.status(200).json(newData)
        })
    })
})



app.listen(port)
