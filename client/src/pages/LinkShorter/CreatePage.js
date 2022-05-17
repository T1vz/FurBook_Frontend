import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [price, setPrice] = useState('')

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])
                             
    const pressHandler = async (event)=>{
            try {
                const data = await request('/api/link/generate', 'POST', {title, link, price}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/shop/detail/${data.item._id}`)
            } catch (e) {
                
            }
    }
    return (
        <div className="row">
            <div className="col s8 offser-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input  value={title} onChange={e => setTitle(e.target.value)} placeholder="Название товара" id="title" type="text"/>
                    <label htmlFor="title">Введите название товара</label>
                </div>
                <div className="input-field">
                    <input  value={link} onChange={e => setLink(e.target.value)} placeholder="Ссылка на картинку товара" id="link" type="text"/>
                    <label htmlFor="link">Введите ссылку на картинку</label>
                </div>
                <div className="input-field">
                    <input  value={price} onChange={e => setPrice(e.target.value)} placeholder="Цена товара" id="price" type="text"/>
                    <label htmlFor="price">Введите сумму для товара</label>
                </div>
                <a className="btn-floating btn-large waves-effect waves-light red" onClick={pressHandler}><i
                    className="material-icons">add</i></a>
            </div>
        </div>
    )
}