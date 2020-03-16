const path = require('path')
const http = require('http')
const express = require('express')
var socketio = require('socket.io')
var Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = socketio(server)

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

io.on('connection', (socket) => {

    socket.on('join', ({ username, room }) => {
        socket.join(room)
        //Three types of emit - socket.emit, io.emit, socket.broadcast.emit
        //io.to.emit - Emit message to everyone in a room
        //socket.broadcast.to.emit - Emit message to everyone in a room, except the sender
        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`))
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }
        io.to('Almaden').emit('message', generateMessage(message))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has just left!'))
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`))
        callback()
    })
})

server.listen(port, () => {
    console.log(`Server is up on ${port}`)
})