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
    case 'shop':
      links = [
        { to: "/shop/create", caption: "Создать товар" },
        { to: "/shop/items", caption: "Мои товары" },
        { to: "/shop/buy", caption: "Все товары" },
        { to: "/profile/me", caption: "Главное меню" }
      ]
      title = 'Online Shop'
      color = 'blue'
      break
    case 'profile':
      links = [
        { to: "/shop/buy", caption: "Онлайн магазин" },
        { to: "/chat", caption: "Мессенджер" },
        { to: "/locator", caption: "Найти компнаию для прогулки" },
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
    case 'locator':
      links = [
        { to: "/profile/me", caption: "Главное меню" }
      ]
      title = 'Locator'
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