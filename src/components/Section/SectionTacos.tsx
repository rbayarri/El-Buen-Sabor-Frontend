import React from 'react'
import NavbarTabs from '../NavbarTabs/NavbarTabs'
import { Cards } from '../Card/Cards'

export default function SectionTacos() {
  return (
    <>
    <NavbarTabs />
    <div className="titulo">
        <h2>Tacos</h2>
    </div>
    <div className="StyleCards">
    <Cards />
    </div>
    </>
  )
}
