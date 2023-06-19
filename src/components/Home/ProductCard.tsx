import {Link} from 'react-router-dom';
import {ClientProduct} from '../../models/products/client-product.ts';
import Carta from 'react-bootstrap/Card';

export const ProductCard = ({cardinfo}: { cardinfo: ClientProduct }) => {

    return (
        <>
            <Carta style={{width: '15rem'}}>
                <Carta.Img src={`${cardinfo.image?.location}`} alt='' style={{maxHeight: '130px'}}/>
                <Carta.Body className="text-center">
                    <Carta.Title className="fw-bold fs-5">{cardinfo.name}</Carta.Title>
                    <Carta.Text className="mb-0">
                        <p className="small text-muted my-0">{cardinfo.description}</p>
                        <p className="fw-bold fs-5 mt-2 mb-0">
                            {cardinfo.stock > 0 ? cardinfo.price.toLocaleString("es-AR", {
                                    style: "currency",
                                    currency: "ARS"
                                }) :
                                "No disponible"
                            }</p>
                    </Carta.Text>
                    <Link to={`/detalle/${cardinfo?.id}`} className="btn btn-success d-block mt-3">
                        Ver Detalle
                    </Link>
                </Carta.Body>
            </Carta>
        </>
    );
};

