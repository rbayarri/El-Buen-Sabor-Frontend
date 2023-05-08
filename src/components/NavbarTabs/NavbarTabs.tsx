import React from 'react'

import './NavbarTabs.css'
import { Link } from 'react-router-dom'

export default function NavbarTabs() {
  return (
    <div className='navbartabs'>
        <ul className="nav justify-content-center">
  <li className="nav-item">
    <Link className="nav-link active" aria-current="page" to="#">Pizzas</Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to={'#'}>Lomos</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to={'#'}>Burgers</Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to={'#'}>Tacos</Link>
  </li>

   <li className="nav-item">
    <Link className="nav-link" to={'#'}>Bebidas</Link>
  </li>


</ul>
    </div>
  )
}
