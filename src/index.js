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

io.on('connection', (socket) => {
    console.log('Hello! A new user connected')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined')
    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })
})

server.listen(port, () => {
    console.log(`Server is up on ${port}`)
})