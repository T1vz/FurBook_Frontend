import React from 'react'
import { Link } from 'react-router-dom'

export const LinkList = ({ links }) => {
    if (!links.length){
        return <p className="center">Товаров пока нет</p>
    }
    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Название</th>
                    <th>Картинка</th>
                    <th>Цена</th>
                    <th>Открыть</th>
                </tr>
            </thead>

            <tbody>
                {links.map((elem, index) => {
                    return (
                        <tr>
                            <td>{index+1}</td>
                            <td>{elem.title}</td>
                            <td><img src={elem.link}/></td>
                            <td>{elem.price}</td>
                            <td><Link to={`/shop/detail/${elem._id}`}>Открыть</Link></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )
}