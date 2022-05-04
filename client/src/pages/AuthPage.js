import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({email:'', password:'', username:''})
    const [isRegister, setIsRegister] = useState(false)

    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])
    
    useEffect(()=>{
        window.M.updateTextFields()
    }, [isRegister])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const isRegisterHandler = () => {
        setIsRegister(!isRegister)
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {email:form.email, password:form.password})
            auth.login(data.token, data.userId, data.username)
        } catch (e) {
            
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>FurBook</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{isRegister ? "Регистрация" : "Авторизация"}</span>
                        {isRegister && <div className="input-field">
                            <input value={form.username} onChange={changeHandler} placeholder="Введите Имя пользователя" id="username" type="text" className="validate" name="username"/>
                            <label htmlFor="username">Username</label>
                        </div>}
                        <div className="input-field">
                            <input value={form.email} onChange={changeHandler} placeholder="Введите Email" id="email" type="text" className="validate" name="email"/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input value={form.password} onChange={changeHandler} placeholder="Введите пароль" id="password" type="password" className="validate" name="password"/>
                            <label htmlFor="password">Пароль</label>
                        </div>
                    </div>
                    <div className="card-action">
                        {isRegister ? <button onClick={registerHandler} className="btn grey lighten-1 black-text" style={{marginRight: 10} } disabled={loading}>Регистрация</button> 
                        : <button onClick={loginHandler} className="btn yellow darken-4" style={{marginRight: 10} } disabled={loading}>Войти</button> 
                        } 
                        {isRegister ? <a href="#" onClick={isRegisterHandler} className="" disabled={loading}>Авторизоваться</a> : <a href="#" onClick={isRegisterHandler} className="" disabled={loading}>У меня еще нет пользователя</a>}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}