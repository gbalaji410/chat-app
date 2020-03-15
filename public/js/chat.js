const socket = io()

//Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-message-template').innerHTML

socket.on('locationMessage', (url) => {
    const html = Mustache.render(locationTemplate, {
        url
    })
    $messages.insertAdjacentHTML('beforeend', html)})

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //disable the form
    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.msg.value
    socket.emit('sendMessage', message, (error) => {
        //enable
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if(error){
            console.log(error)
        }
        else {
            console.log('Message delivered!', message)
        }
    })
})

$locationButton.addEventListener('click', (e) => {
    e.preventDefault()
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    //disable
    $locationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            //enable
            $locationButton.removeAttribute('disabled')
            console.log('Location Shared!')
        })
    })
})