const path = require('path')
const http = require('http')
const express = require('express')
var socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = socketio(server)

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

io.on('connection', function(socket){
    console.log('Hello! A new user connected');
})

server.listen(port, () => {
    console.log(`Server is up on ${port}`)
})