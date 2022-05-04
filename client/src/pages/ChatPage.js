import React, { Component, useContext, useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { AuthContext } from '../context/AuthContext'



const ChatPage = () => {
    const auth = useContext(AuthContext)
    const [messages, setMessages] = useState ([])
    const [chatMessage, setChatMessage] = useState('')

    const [client, setClient] = useState(null)



    // const client = 

    useEffect(() => {
        const ws = new W3CWebSocket('ws://127.0.0.1:8999')
        setClient(ws)
    }, [])

    function sendText(message) {
        // Construct a msg object containing the data the server needs to process the message from the chat client.
        var msg = {
          type: "message",
          text: message,
          id:   auth.username,
          date: Date.now()
        };
      
        // Send the msg object as a JSON-formatted string.
        client.send(JSON.stringify(msg));
    }

    function authChat() {
        // Construct a msg object containing the data the server needs to process the message from the chat client.
        var msg = {
          type: "auth",
          text: '',
          id:   auth.username,
          date: Date.now()
        };
      
        // Send the msg object as a JSON-formatted string.
        client.send(JSON.stringify(msg));
    }

    const SendMessageHandler = ()=>{
        sendText(chatMessage)
        setChatMessage('')
    }

    const UpdateChatMessageHandler = (e)=>{
        setChatMessage(e.target.value)
    }

    const pressHandler = (event)=>{
        if (event.key === 'Enter'){
            SendMessageHandler(event.target.value)
        }                                                       
    }
    
   

    if (client){
        client.onopen = () => {
            console.log('WebScoket client connected')
            authChat()
        }
        client.onmessage = (message) => {
            setMessages([...messages, message.data])
        }
    }
    
    // useEffect(() => {
    //     console.log(messages);
    // }, [messages])

    const elems = messages.map((elem)=>
    {
        const data = JSON.parse(elem)
        const userId = data.id
        const date = data.date
        const text = data.text
        console.log(elem)
        return <p>{new Date(date).toLocaleTimeString()+':'+'<'+userId+'>: ' + text}</p>
    })

    return (
        <div>
            {elems}
            <input value={chatMessage} onKeyPress={pressHandler} onChange={UpdateChatMessageHandler}/>
            <button onClick={SendMessageHandler}>Send</button>
            <button onClick={()=>client.close()}>Close</button>
        </div>
    )
}

export default ChatPage;