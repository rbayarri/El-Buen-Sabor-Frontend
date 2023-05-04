import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productoJson from "../data/producto.json"
import Producto from '../models/producto';

export const productox: Producto[] = productoJson.producto
export default function InstrumentoIndividual() {

   const {id} = useParams ();
   const [producto, setProducto] = useState<Producto> ();

  const getPlatosResto = () => {
   
    const producto = productox.filter((dato) => {
      return (dato.id === id)
    });
    
    setProducto(producto[0])
  };

  useEffect(() => {
    getPlatosResto();
  }, []);

  return (
    <div>
<div>
    <p>{}</p>
</div>
    </div>
  )
}
