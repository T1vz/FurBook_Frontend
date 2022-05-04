const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express()

const server = http.createServer(app)

const webSocketServer = new WebSocket.Server({ server });

const SendTextToUser = (client, data) => {
    var msg = {
        ...data,
        date: Date.now()
    };
    client.send(JSON.stringify(msg))
}

const SendTextToAll = (data) => {
    var msg = {
        ...data,
        date: Date.now()
    };
    webSocketServer.clients.forEach(client => client.send(JSON.stringify(msg)));
}

let messages = []
// let users = {}
//
// webSocketServer.on('connection', ws => {
//     console.log('hello')
//     ws.send(JSON.stringify({type:'messages',text:messages}))
//     ws.on('message', m => {
//         const mes = JSON.parse(m)
//         if (mes.type === 'auth') {
//             users[mes.username] = { ws, username: mes.username };
//             users['players'].push(mes.username)
//             SendTextToAll({
//                 type: "players",
//                 text: users.players,
//                 username: mes.username,})
//         }
//         else {
//             if (mes.type === 'start') {
//                 if (rooms.filter((elem) => elem.users.filter((elem2)=> elem2.username === mes.username).length !== 0).length === 0) {
//                     rooms.push({ users: [{ username: mes.username }] })
//                     var msg = {
//                         type: "rooms",
//                         text: rooms,
//                         username: mes.username,
//                         date: Date.now()
//                     };
//
//                     webSocketServer.clients.forEach(client => client.send(JSON.stringify(msg)));
//                 }
//
//             }
//             else {
//                 if (mes.type === 'message') {
//                 // if (rooms.filter((elem) => elem.users.filter((elem2)=> elem2.username === mes.username).length !== 0).length === 0) {
//                     // rooms.push({id,  users: [{ username: mes.username }] })
//                     console.log('test')
//                     messages.push({text:mes.text, date:mes.date, username:mes.username})
//                     console.log('messages', messages)
//                     var msg = {
//                         type: "messages",
//                         text: messages,
//                         // username: mes.username,
//                         date: Date.now()
//                     }
//                     webSocketServer.clients.forEach(client => client.send(JSON.stringify(msg)));
//                 // }
//
//             }
//             else {
//                 webSocketServer.clients.forEach(client => client.send(m));
//             }
//             }
//         }
//     })
//
//     ws.on("error", e => ws.send(e));
//
//     ws.on('close', () => {
//         console.log('disconnected')
//         var msg = {
//             type: "message",
//             text: 'Пользователь отключился',
//             date: Date.now()
//         };
//         webSocketServer.clients.forEach(client => client.send(JSON.stringify(msg)));
//     })
//
// });
let users = {}
let rooms = []
// webSocketServer.on('connection', ws => {
//     var id = null
//
//     ws.on('message', m => {
//         const mes = JSON.parse(m)
//         if (mes.type === 'auth') {
//             id = mes.id
//             users[id] = { ws, username: mes.username };
//             var msg = {
//                 type: "message",
//                 text: 'Пользователь подключился',
//                 id: id,
//                 username: mes.username,
//                 date: Date.now()
//             };
//             var msgRep = {
//                 type: "rooms",
//                 text: rooms,
//                 id: id,
//                 username: mes.username,
//                 date: Date.now()
//             };
//             ws.send(JSON.stringify(msgRep))
//             webSocketServer.clients.forEach(client => client.send(JSON.stringify(msg)));
//         }
//         else {
//             if (mes.type === 'createroom') {
//                 if (rooms.filter((elem) => elem.users.filter((elem2)=> elem2.username === mes.username).length !== 0).length === 0) {
//                     rooms.push({ users: [{ username: mes.username }] })
//                     var msg = {
//                         type: "rooms",
//                         text: rooms,
//                         id: mes.id,
//                         username: mes.username,
//                         date: Date.now()
//                     };
//
//                     webSocketServer.clients.forEach(client => client.send(JSON.stringify(msg)));
//                 }
//
//             }
//             else {
//                 if (mes.type === 'joinroom') {
//                 if (rooms.filter((elem) => elem.users.filter((elem2)=> elem2.username === mes.username).length !== 0).length === 0) {
//                     rooms.push({id,  users: [{ username: mes.username }] })
//                     var msg = {
//                         type: "rooms",
//                         text: rooms,
//                         id: mes.id,
//                         username: mes.username,
//                         date: Date.now()
//                     };
//
//                     webSocketServer.clients.forEach(client => client.send(JSON.stringify(msg)));
//                 }
//
//             }
//             else {
//                 webSocketServer.clients.forEach(client => client.send(m));
//             }
//             }
//         }
//     })
//
//     ws.on("error", e => ws.send(e));
//
//     ws.on('close', () => {
//         var msg = {
//             type: "message",
//             text: 'Пользователь отключился',
//             id: '$' + users[id].username + '$',
//             date: Date.now()
//         };
//         webSocketServer.clients.forEach(client => client.send(JSON.stringify(msg)));
//     })
//
// });

webSocketServer.on('connection', ws => {
    var id = Math.random();
    users[id] = {ws, username:''};
    ws.on('message', m => {
        const mes = JSON.parse(m)
        if (mes.type === 'auth'){
            users[id].username = mes.id
            var msg = {
                type: "message",
                text: 'Пользователь подключился',
                id:   '$'+users[id].username+'$',
                date: Date.now()
            };
            webSocketServer.clients.forEach(client => client.send(JSON.stringify(msg)));
        }
        else{
            webSocketServer.clients.forEach(client => client.send(m));
        }
    })

    ws.on("error", e => ws.send(e));

    ws.on('close', () => {
        var msg = {
            type: "message",
            text: 'Пользователь отключился',
            id:   '$'+users[id].username+'$',
            date: Date.now()
          };
        webSocketServer.clients.forEach(client => client.send(JSON.stringify(msg)));
    })

    // ws.send('Hi there, I am a WebSocket server');
 });

server.listen(8999, () => console.log("WebSocket server started"))

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000
const MONGOURI = config.get('mongoURI')

async function start() {
    try {
        await mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        app.listen(PORT, () => {
            console.log('Server has been started on port ' + PORT + ' ...')
        })
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()