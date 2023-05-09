import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Producto from '../../models/producto';
import productoJson from "../../data/producto.json"
import "./StyleCards.css";

export const cardinfo: Producto[] = productoJson.producto
export default function CardDetalle() {

  const {id} = useParams ();
  const [card, setCard] = useState<Producto> ();

  const getPlatosResto = () => {
   
  const producto = cardinfo.filter((dato) => {
      return (dato.id === id )
    });
    
    setCard(producto[0])
  };

  useEffect(() => {
    getPlatosResto();
  }, []);

  return (
    <>
      <div className='carddetalle'>
        <div className='contenedor'>
          <table>
            <tr>
              <td>
                <img className='imagen' src={"/src/assets/img/" + card?.image} alt="" />
              </td>
              <td>
                <p className='instrumento'>{card?.nombre}</p>
                <p className='precio'>Precio: {card?.precio}</p>
                <p className='descripcion'>{card?.detalle}</p>
              </td>
            </tr>
            <tr>
              <td>
                <Link className='btn btn-outline-secondary' style={{placeItems: 'center',  display: 'grid'}} to={""}>Continuar Comprando</Link>

              </td>
              <td>
                <Link className='btn btn-outline-secondary' style={{placeItems: 'center',  display: 'grid'}} to={""}>Agregar al Carrito</Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  )
}
