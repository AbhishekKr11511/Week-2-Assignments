const {MongoClient} = require("mongodb")
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 8000

const url = "mongodb://0.0.0.0:27017"
const client = new MongoClient(url);

const connectServer = async() =>{
    
    // Connect method to connect to the MongoDB Server
    await client.connect()
    console.log('Connect Successfully to dataBase');

    const dataBase = client.db("e-commerce")
    const collection = dataBase.collection('products')
    const findResult = await collection.find({}).toArray()

    return findResult
}


app.get('/todos', (req,res)=> {
    connectServer()
    .then(res.send)
    .catch(console.error)
    .finally(()=>client.close())
})

app.listen(port)