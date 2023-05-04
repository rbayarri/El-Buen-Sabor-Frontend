import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Producto from '../models/producto'

import { Link } from 'react-router-dom'

interface myprops{
    productox: Producto
}


export default function CardInstrument({ productox }: myprops) {
    return (
        <div className='contenedor'>
            <div className="card width: 18rem;">
            <img className='imagen' src={"/img/" + productox.image} alt="" />
                <div className="card-body">
                    <h5 className="card-title">{productox.nombre}</h5>
                    <p className="card-text">{productox.detalle}</p>
                    <p className='precio'>$ {productox.precio}</p>
                    <a href="#" className="btn btn-primary">Ver Detalle</a>
                </div>
            </div>
        </div>
    )
}
