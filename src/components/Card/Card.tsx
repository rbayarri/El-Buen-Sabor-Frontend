
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Producto } from '../../models/productos';

export const Card = ({ cardinfo }: { cardinfo: Producto }) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:3306/products');
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          console.error('Error al obtener los productos:', response.status);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className='card text-center bg-dark'>
      <img src={`/src/assets/img/${cardinfo.image}`} alt='' />
      <div className='card-body text-light'>
        <h4 className='card-title'>{cardinfo.nombre}</h4>
        <p className='card-text'>{cardinfo.detalle}</p>
        <p className='card-text'>$: {cardinfo.precio}</p>
        <Link className='btn btn-outline-secondary' to={`/detalle/${cardinfo?.id}`}>
          Ver Todos los Productos
        </Link>
      </div>
    </div>
  );
};

