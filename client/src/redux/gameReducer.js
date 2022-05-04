import { w3cwebsocket } from "websocket"

const SET_USER_DATA = 'SET_USER_DATA'
const SET_SERVER_CONNECTION = 'SET_SERVER_CONNECTION'
const CREATE_NEW_GAME = 'CREATE_NEW_GAME'

let initialState = {
    player:{
        username:null,
        userId:null,
        items: [],
        spells:[],
        usingSpells:[],
        usingItems:[]
    },
    room:{
        players:[],
        turn:null,
        order:null,
    },
    isConnected: false,
    client: null
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:{
            const copyState = {
                player:{
                    username:action.data.username,
                    userId:action.data.userId
                }
            }
            // state.isAuth = true
            return {...state,...copyState}
        }
        case SET_SERVER_CONNECTION:{
            if (!state.isConnected){
                const ws = new w3cwebsocket('ws://127.0.0.1:8999')
                ws.onopen = () => {
                    sendText(ws, {id:action.data.userId, username:state.player.username, type:"auth", message:""})
                    console.log('WebScoket client connected')
                }
                // ws.onmessage = (message) => {
                //     console.log('data', message)
                // }
                return {...state, client:ws, isConnected:true}
            }
            
            // state.isAuth = true
            return {...state}
        }
        case CREATE_NEW_GAME:{
            sendText(state.client,{id:state.player.userId, username:state.player.username, type:"createroom", message:""} )
            // state.isAuth = true
            return {...state}
        }
        default:{
            return state
        }
    }
}

function sendText(ws, data) {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    var msg = {
      type: data.type,
      text: data.message,
      username: data.username,
      id: data.id,
      date: Date.now()
    };
  
    // Send the msg object as a JSON-formatted string.
    ws.send(JSON.stringify(msg));
}

export const SetUserData = (data) => ({type:SET_USER_DATA,data})
export const CreateNewGame = () => ({type:CREATE_NEW_GAME})
export const ConnectToServer = (data) => ({type: SET_SERVER_CONNECTION, data})

// export const GetLogin = () => (dispatch) => {
//         return usersApi.GetLogin().then(data => {
//             if (data.resultCode === 0){
//                 let {id, login, email} = data.data
//                 dispatch(SetUserData({id,login,email,isAuth:true}))
//             }
//         })
    
// }
// export const login = (email,password,rememberMe = false) => (dispatch) => {
//         usersApi.Login(email,password,rememberMe).then(data => {
//             if (data.resultCode === 0){
//                 dispatch(GetLogin())
//             } else {
//                 let errorMessage = data.messages.length > 0 ? data.messages[0] : 'Some error'
//                 dispatch(stopSubmit('login',{_error: errorMessage}))
//             }
//         })
// }
// export const logout = () => (dispatch) => {
//         usersApi.Logout().then(data => {
//             if (data.resultCode === 0){
//                 dispatch(SetUserData({login:null,
//                     email:null,
//                     id:null,
//                     isAuth:false
//                 }))
//             }
//         })
// }

export default gameReducer