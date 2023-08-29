/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const port = 4000

const folderPath = path.join(__dirname, "files/")

const filePath = (filenameString) => {
  let fullfilePath = path.join(folderPath, filenameString)
  return fullfilePath
}


app.get('/files', (req,res)=>{
  fs.readdir(folderPath, 'utf-8', (err, files)=>{
    if(err){
      res.send("Sorry couldn't read given folder")
    }
    res.send(files)
  })

})

app.get('/files/:filename', (req,res)=>{
  let filename = req.params.filename
  let path = filePath(filename)
  fs.readFile(path, 'utf-8', (err, data)=>{
    if(err){
      res.send("couldn't read file, or the file doesn't exist")
    }
    res.send(data)
  })
})

app.listen(port)

module.exports = app;
