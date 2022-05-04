import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])
                             
    const pressHandler = async (event)=>{
        if (event.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/short1vz/detail/${data.link._id}`)
            } catch (e) {
                
            }
        }                                                       
    }
    return (
        <div className="row">
            <div className="col s8 offser-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input onKeyPress={pressHandler} value={link} onChange={e => setLink(e.target.value)} placeholder="Вставьте ссылку" id="link" type="text"/>
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}