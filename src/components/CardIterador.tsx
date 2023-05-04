
import Producto from '../models/producto';
import productoJson from "../data/producto.json"
import { Link } from 'react-router-dom';
import CardProducto from './CardProducto';

export const productox: Producto[] = productoJson.producto

export const Productos = () => {

  return (
    <> 
      {productox.map((actual: Producto) =>
        <Link to={`/detalle/${actual.id}`}>
        <CardProducto productox={actual} />
        </Link>
      )}
    </>
  )
}
