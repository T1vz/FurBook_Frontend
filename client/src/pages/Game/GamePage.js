import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {YMaps, Map, Placemark} from 'react-yandex-maps'

export const GamePage = (props) => {

    const [lat, setLat] = useState('err-latitude')
    const [lon, setLon] = useState('err-longitude')

    const getMyLocation = () => {
        const location = window.navigator && window.navigator.geolocation

        if (location) {
            location.getCurrentPosition((position) => {
                setLat(position.coords.latitude)
                setLon(position.coords.longitude)
            }, (error) => {
                setLat('err-latitude')
                setLon('err-longitude')
            })
        }

    }

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
    if (props.gameState.isConnected) {
        console.log('qq2')
        // props.gameState.client.onopen = () => {
        //     console.log('WebScoket client connected')
        // }
        props.gameState.client.onmessage = (message) => {
            console.log('data', message)
            const mes = JSON.parse(message.data)
            console.log('parse', mes)
            if (mes.type === 'rooms') {
                setRooms([...mes.text])
            }
        }
    }
    useEffect(() => {
        console.log('rooms', rooms)
    }, [rooms])

    useEffect(() => {
        getMyLocation()
    }, [])

    return (
        <div className="row">
            <div className="center">
                <YMaps>
                    <div>
                        {lat}|{lon}
                        Найди компанию для прогулки
                        <Map height={"600px"} width={"1300px"}
                             defaultState={lat == 'err-latitude' || lon == 'err-longitude' ? {
                                 center: [59.8695133, 30.3080524],
                                 zoom: 9
                             } : {center: [lat, lon], zoom: 9}}>
                            <Placemark
                                geometry={lat == 'err-latitude' || lon == 'err-longitude' ? [59.8695133, 30.3080524] : [lat, lon]}/>
                        </Map>

                    </div>
                </YMaps>
                {/*{rooms.map((elem, index)=>{*/}
                {/*    return <a>{(index+1.).toString() + '. ' + elem.users.map((elem2)=> elem2.username ).join()}</a>*/}
                {/*})}*/}
                {/*<div>*/}
                {/*    <button onClick={CreateGameHandler}>Create game</button>*/}
                {/*</div>*/}

            </div>
        </div>
    )
}