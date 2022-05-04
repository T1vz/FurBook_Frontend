import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

export const GamePage = (props) => {

    const [rooms, setRooms] = useState([])
    console.log(props)
    const auth = useContext(AuthContext)

    const CreateGameHandler = () => {
        props.CreateGame()
    }

    // useEffect(()=>{
    //     console.log('qq')
    //     if(props.isConnected){
    //         console.log('qq2')
    //         props.client.onopen = () => {
    //             console.log('WebScoket client connected')
    //         }
    //         props.client.onmessage = (message) => {
    //             console.log('data', message)
    //         }
    //     }
        
    // }, [props.client])
    if(props.gameState.isConnected){
        console.log('qq2')
        // props.gameState.client.onopen = () => {
        //     console.log('WebScoket client connected')
        // }
        props.gameState.client.onmessage = (message) => {
            console.log('data', message)
            const mes = JSON.parse(message.data)
            console.log('parse', mes)
            if (mes.type === 'rooms'){
                setRooms([...mes.text])
            }
        }
    }
    useEffect(()=>{
        console.log('rooms', rooms)
    }, [rooms])
    
    return (
        <div className="row">
            <div className="center">
                <p>Games</p>
                {rooms.map((elem, index)=>{
                    return <a>{(index+1.).toString() + '. ' + elem.users.map((elem2)=> elem2.username ).join()}</a>
                })}
                <div>
                    <button onClick={CreateGameHandler}>Create game</button>
                </div>
                
            </div>  
        </div>
    )
}