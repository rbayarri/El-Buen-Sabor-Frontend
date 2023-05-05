
import { Link } from 'react-router-dom';
import Producto from '../../models/producto'



interface myprops{
    cardinfo: Producto
}

export  const Card = ({cardinfo}:myprops) => {
  return (
    <div className='card text-center bg-dark'>
        <img className='imagen' src={"/img/" + cardinfo.image} alt="" />
<div className='card-body text-light '>
<h4 className='card-title'>{cardinfo.nombre}</h4>
<p className='card-text'>{cardinfo.detalle}</p>
<p className='card-text'>$: {cardinfo.precio}</p>
<Link className='btn btn-outline-secondary' to={`/detalle/${cardinfo.id}`}>Ver Detalle</Link>
</div>
    </div>
  )
}

