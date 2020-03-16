const users = []

const addUser = ({id, username, room}) => {
    //Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Validate the data
    if(!username || !room){
        return {
            error: 'Username and room are required'
        }
    }
    //Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })
    if(existingUser){
        return {
            error: 'Username is in use'
        }
    }
    //Everything valid, store user
    const user = {id, username, room}
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    //Check for existing user
    const userIndex = users.findIndex((user) => user.id === id)
    if(userIndex !== -1)
    {
        return users.splice(userIndex, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    //Check for existing users in room
    return users.filter((user) => user.room === room.trim().toLowerCase())
}

module.exports = {
    addUser, 
    removeUser, 
    getUser, 
    getUsersInRoom
}