
import React from "react"
import Producto from "../models/producto"

interface myprops{
    productox: Producto
}

export default function CardProducto({productox}:myprops) {
  return (
    <div className='contenedor'>
        <p className='instrumento'>{productox.nombre}</p>
        <table>
            <tr>
                <td>
                <img className='imagen' src={"/img/" + productox.image} alt="" />
                </td>
                <td>
        <p className='precio'>$ {productox.precio}</p>
        <p className='cantidad'> {productox.detalle}</p>
                </td>
            </tr>
        </table>   
    </div>
  )
}



