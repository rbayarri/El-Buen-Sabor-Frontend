import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Producto } from '../../models/productos';

export default function CardDetalle() {
  const { id } = useParams();
  const [card, setCard] = useState<Producto | null>(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3306/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCard(data);
        } else {
          console.error('Error al obtener el producto:', response.status);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    obtenerProducto();
  }, [id]);

  return (
    <>
      <div className='carddetalle'>
        <div className='contenedor'>
          <table>
            <tr>
              <td>
                {card && <img className='imagen' src={`/src/assets/img/${card.image}`} alt='' />}
              </td>
              <td>
                <p className='nombre'>{card?.nombre}</p>
                <p className='precio'>Precio: {card?.precio}</p>
                <p className='descripcion'>{card?.detalle}</p>
              </td>
            </tr>
            <tr>
              <td>
                <Link className='btn btn-outline-secondary' style={{ placeItems: 'center', display: 'grid' }} to={''}>
                  Continuar Comprando
                </Link>
              </td>
              <td>
                <Link className='btn btn-outline-secondary' style={{ placeItems: 'center', display: 'grid' }} to={''}>
                  Agregar al Carrito
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}