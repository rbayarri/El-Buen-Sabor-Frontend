import React from 'react'
import '../../components/Header/Header.css'

export const Header = () => {
  return (
    <>
    <div className='header'>
        <img className='imagenH' src={ "src/assets/img/FondoHeader.png" } alt="" />
        <img className='logo' src={ "src/assets/el_buen_sabor.png" } alt="" />
    </div>
    </>
  )
}



