const generateMessage = (message) => {
    return {
        text: message,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (url) => {
    return {
        linkText: url,
        createdAt: new Date().getTime()
    }
}

module.exports = { 
    generateMessage,
    generateLocationMessage
}