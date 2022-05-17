import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";

export const MainPage = () => {
    const auth = useContext(AuthContext)
    const [status, setStatus] = useState('Set status')
    const [profile, setProfile] = useState({status: 'loading...', avatar: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'})
    const [isChanging, setIsChanging] = useState(false)
    const {request} = useHttp()
    const parId = useParams().id
    const profileId = parId === 'me' ? auth.userId : parId

    const pressHandler = async (event)=>{
        if (event.key === 'Enter'){
            try {
                const data = await request('/api/profile/status/', 'POST', {status}, {
                    Authorization: `Bearer ${auth.token}`
                })
                setProfile(data.profile)
                setIsChanging(false)
            } catch (e) {

            }
        }
    }

    const setAvatar = async ()=>{
            try {
                const avatar = prompt('Введите ссылку на картинку');
                const data = await request('/api/profile/avatar/', 'POST', {avatar}, {
                    Authorization: `Bearer ${auth.token}`
                })
                setProfile(data.profile)
            } catch (e) {

            }
    }

    const getProfile = useCallback(async () => {
        try {
            const fetched = await request(`/api/profile/${profileId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setProfile(fetched)
            console.log(fetched)
        } catch (e) {

        }
    }, [auth.token, profileId, request])

    useEffect(() => {
        getProfile()
    }, [getProfile])

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        if (profile.status) {
            setStatus(profile.status)
        }
    }, [profile])

    return (
        <div className="row">
            <h1>{"Добро пожаловать " + auth.username}</h1>
            <p>Account link: http://localhost:3000/profile/{profileId}</p>
            <div className="col s8">
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-image">
                                <img
                                    src={profile.avatar}/>
                                <span className="card-title black-text">{auth.username}</span>
                                <a onClick={setAvatar} className="btn-floating halfway-fab waves-effect waves-light red"><i
                                    className="material-icons">add</i></a>
                            </div>
                            <div className="card-content">
                                {isChanging ?
                                    <input onKeyPress={pressHandler}
                                           value={status} onChange={event => setStatus(event.target.value)}/> :
                                    <p onClick={() => setIsChanging(true)}>{profile.status}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col s4">
                <div className="col s12 m5">
                    <div className="card">
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator"
                                 src="https://sun9-78.userapi.com/s/v1/if1/GqhD3J4utLvPSOlLcdoHXjt4dFOHEDPxd9VmG9Ufy6UVe79mp6F08yAJ_zVt6OtbWKnjVNGP.jpg?size=1522x1868&quality=96&type=album"/>
                        </div>
                        <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">Look at my dog!<i
                                        className="material-icons right">more_vert</i></span>
                        </div>
                        <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">My dog<i
                                        className="material-icons right">close</i></span>
                            <p>Look at my dog!</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator"
                                 src="https://sun9-6.userapi.com/s/v1/if1/eT5Y6vzwm8UTdbIm5tGMiuva06QfsoeWncahijVEXFT03juOS-BvshBMYA7yv224vWDvXSbq.jpg?size=2560x1912&quality=96&type=album"/>
                        </div>
                        <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">Look at my dog!<i
                                        className="material-icons right">more_vert</i></span>
                        </div>
                        <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">My dog<i
                                        className="material-icons right">close</i></span>
                            <p>My young dog!</p>
                        </div>
                    </div>
                    <a className="btn-floating btn-large waves-effect waves-light red"><i
                        className="material-icons">add</i></a>
                </div>
            </div>
        </div>
    )
}