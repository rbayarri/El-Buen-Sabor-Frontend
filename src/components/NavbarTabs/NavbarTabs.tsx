import React from 'react'

import './NavbarTabs.css'
import { Link, NavLink } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

export default function NavbarTabs() {
  return (
    <>
   
    <div className='navbartabs'>
      <ul className="nav justify-content-center">
        <li className="nav-item">       
          {/* <Link className="nav-link" aria-current="page" to={'/'}>Pizzas</Link> */}
          <a href="#Pizzas" className="nav-link">Pizzas</a>
         
        </li>

        <li className="nav-item">
          {/* <Link className="nav-link active" aria-current="page" to={'/'}>Lomos</Link> */}
          <a href="#Lomos" className="nav-link">Lomos</a>
        </li>
        <li className="nav-item">
          {/* <Link className="nav-link active" aria-current="page" to={'/'}>Burgers</Link> */}
          <a href="#Hamburguesas" className="nav-link">Hamburguesas</a>
        </li>

        <li className="nav-item">
          {/* <Link className="nav-link active" aria-current="page" to={'/'}>Tacos</Link> */}
          <a href="#Tacos" className="nav-link">Tacos</a>
        </li>

        <li className="nav-item">
          {/* <Link className="nav-link active" aria-current="page" to={'/'}>Bebidas</Link> */}
          <a href="#Bebidas" className="nav-link">Bebidas</a>
        </li>
      </ul>
    </div>
   
    </>
  )
}
