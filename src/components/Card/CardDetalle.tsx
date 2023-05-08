import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Producto from '../../models/producto';
import productoJson from "../../data/producto.json"

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
      <div>
        <table>
          <tr>
            <td>
              <img className='imagen' src={"/img/" + card?.image} alt="" />
              <p>Descipcion: </p>
              <p className='descripcion'>{card?.detalle}</p>
            </td>
            <td>
              <p className='instrumento'>{card?.nombre}</p>
              <p className='precio'>Precio: {card?.precio}</p>
              <p className='boton'>
                <Link className='agregar' to={""}>Agregar al Carrito</Link>
              </p>

            </td>
          </tr>
        </table>
      </div>
    </>
  )
}
