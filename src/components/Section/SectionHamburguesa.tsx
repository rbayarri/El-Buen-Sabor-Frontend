import React from 'react'
import NavbarTabs from '../NavbarTabs/NavbarTabs'
import { Cards } from '../Card/Cards'

export default function SectionHamburguesa() {
  return (
    <>
    <h2 id='Hamburguesas'></h2>
    <NavbarTabs />
    <div className="titulo">
        <h2>Hamburguesas</h2>
    </div>
    <div className="StyleCards">
    <Cards />
    </div>
    </>
  )
}
