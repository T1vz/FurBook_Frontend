import React from 'react'

export const LinkCard = ({link}) => {
    return(
    <div>
        <h2>Товар</h2>
        <p>Название : {link.title}</p>
        <img src={link.link}/>
        <p>Цена : {link.price}</p>
        <p>Количество кликов: <strong>{link.clicks}</strong></p>
        <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        <a onClick={() => alert("Спасибо за покупку, с вами скоро свяжутся!")} className="waves-effect waves-light btn">Купить</a>
    </div>
    )
}