import React, {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

export const MainPage = () => {
    const auth = useContext(AuthContext)
    return (
        <div className="row">
            <h1>{"Добро пожаловать " + auth.username}</h1>
            <div className="col s10">
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-image">
                                <img width="600px" height="600px"
                                     src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"/>
                                <span className="card-title">Card Title</span>
                                <a className="btn-floating halfway-fab waves-effect waves-light red"><i
                                    className="material-icons">add</i></a>
                            </div>
                            <div className="card-content">
                                <p>I am a very friendly dog owner. Let's walk together</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col s2">
                <div className="row">
                    <div className="col s12 m5">
                        <div className="card-panel grey">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}