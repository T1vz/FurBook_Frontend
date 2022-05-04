import React from 'react'
import { Link } from 'react-router-dom'

export const LinkList = ({ links }) => {
    if (!links.length){
        return <p className="center">Ссылок пока нет</p>
    }
    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Изначальная</th>
                    <th>Сокращенная</th>
                    <th>Открыть</th>
                </tr>
            </thead>

            <tbody>
                {links.map((elem, index) => {
                    return (
                        <tr>
                            <td>{index+1}</td>
                            <td>{elem.from}</td>
                            <td>{elem.to}</td>
                            <td><Link to={`/short1vz/detail/${elem._id}`}>Открыть</Link></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )
}