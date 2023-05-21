import React from 'react'
import NavbarTabs from '../NavbarTabs/NavbarTabs'
import { Cards } from '../Card/Cards'

export default function Section() {
  return (
    <>
    <h2 id='Pizzas'></h2>
      <NavbarTabs />
      <div className="titulo">
        <h2>Pizzas</h2>
      </div>
      <div className="StyleCards">
        <Cards />
      </div>
    </>
  )
}
