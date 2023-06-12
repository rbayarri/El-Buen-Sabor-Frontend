
import { Link } from 'react-router-dom';
import { Producto } from '../../models/productos';
import  defaultImage  from '../../assets/FondoHeader.png'
import Carta from 'react-bootstrap/Card';
import { Button, ListGroup } from 'react-bootstrap';

export const Card = ({ cardinfo }: { cardinfo: Producto }) => {
 
  return (
    <>
  <Carta style={{ width: '15rem' }}>
  {cardinfo.image ? (
        <Carta.Img src={`${cardinfo.image.location}`} alt='' style={{ height: '145px', maxWidth: '240px'}}/>
      ) : (
        <Carta.Img src={defaultImage} alt='Imagen por defecto' style={{height: '145px', maxWidth: '240px' }}/>
      )}
      <Carta.Body>
        <Carta.Title>{cardinfo.name}</Carta.Title>
        <Carta.Subtitle className="mb-2 text-muted">{cardinfo.price}</Carta.Subtitle>
        <Carta.Text>
        {cardinfo.description}
        </Carta.Text>
        
        <Button variant="success" size="sm">
        <Link to={`/detalle/${cardinfo?.id}`} style={{textDecoration:'none', color: 'white'}}>
          Ver Detalle
        </Link>
        </Button>
      </Carta.Body>
    </Carta>
    </>
  );
};

