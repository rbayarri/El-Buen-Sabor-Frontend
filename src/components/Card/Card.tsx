
import { Link } from 'react-router-dom';
import { Producto } from '../../models/productos';

export const Card = ({ cardinfo }: { cardinfo: Producto }) => {
 
  return (
    <div className='card text-center bg-dark'>
      {cardinfo.image && 
      <img src={`${cardinfo.image.location}`} alt='' />}
      <div className='card-body text-light'>
        <h4 className='card-title'>{cardinfo.name}</h4>
        <p className='card-text'>{cardinfo.description}</p>
        <p className='card-text'>$: {cardinfo.price}</p>
        <Link className='btn btn-outline-secondary' to={`/detalle/${cardinfo?.id}`}>
          Ver Detalle
        </Link>
      </div>
    </div>
  );
};

