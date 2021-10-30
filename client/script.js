// const url = `ws://127.0.0.1:8080/websocket`
const server = new WebSocket(`ws://127.0.0.1:8080/websocket`)


const message = document.getElementById("messages")
const input = document.getElementById("message")
const button = document.getElementById("send")

button.disabled = true
button.addEventListener('click', sendMessage, false)

server.onopen = function(){
    button.disabled = false
}

server.onmessage = function(event){
    const {data} = event
    generateMessageEntry(data, "server")
}

function generateMessageEntry(msg, type){
    const newMessage = document.createElement('div')
    newMessage.innerText = `${type} says: ${msg}`
    message.appendChild(newMessage)
}

function sendMessage(){
    const text = input.value
    generateMessageEntry(text, 'client')
    server.send(text)
}