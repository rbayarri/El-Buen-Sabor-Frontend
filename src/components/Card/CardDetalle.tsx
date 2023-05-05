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
    <div>Hola</div>
  )
}
