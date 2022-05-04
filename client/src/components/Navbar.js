import React, { useContext } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {

  const auth = useContext(AuthContext)
  const history = useHistory()

  var path = useLocation().pathname
  path = path.slice(1, path.length)
  const findPath = path.indexOf('/')
  if (findPath !== -1) {
    path = path.slice(0, findPath)
  }

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  let links = []
  let title = 'T1vz'
  let color = 'green'

  switch (path) {
    case 'short1vz':
      links = [
        { to: "/short1vz/create", caption: "Создать" },
        { to: "/short1vz/links", caption: "Ссылки" },
        { to: "/main", caption: "Главное меню" }
      ]
      title = 'Link Shorter'
      color = 'blue'
      break
    case 'main':
      links = [
        { to: "/short1vz/links", caption: "Онлайн магазин" },
        { to: "/chat", caption: "Мессенджер" },
        { to: "/game", caption: "Найти компнаию для прогулки" },
      ]
      title = 'FurBook'
      color = 'green'
      break
    case 'chat':
      links = [
        { to: "/main", caption: "Главное меню" }
      ]
      title = 'FurBook Messenger'
      color = 'yellow'
      break
    case 'game':
      links = [
        { to: "/main", caption: "Главное меню" }
      ]
      title = 'T1vz Game'
      color = 'red'
      break
    default:
      links = []
      title = 'T1vz'
      color = 'green'
  }
  return (
    <nav>
      <div className={`nav-wrapper ${color} darken-1`} style={{ padding: '0 2rem' }}>
        <a href="#" className="brand-logo center">{title}</a>
        <a href="/" className="right" onClick={logoutHandler}>Выйти</a>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          {links.map(link => {
            return <li><NavLink to={link.to}>{link.caption}</NavLink></li>
          })}
        </ul>
      </div>
    </nav>
  )
}