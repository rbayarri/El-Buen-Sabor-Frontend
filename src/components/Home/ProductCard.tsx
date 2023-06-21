import {useNavigate} from 'react-router-dom';
import {ClientProduct} from '../../models/products/client-product.ts';
import Carta from 'react-bootstrap/Card';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartArrowDown} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";

export const ProductCard = ({product}: { product: ClientProduct }) => {

    const myContext = useContext(globalContext);
    const navigate = useNavigate();

    const addProductToOrder = () => {

        const newOrder = {...myContext.order};
        const orderDetail = newOrder.orderDetails.find(od => od.product?.id === product.id);
        if (orderDetail) {
            orderDetail.quantity += 1;
        } else {
            newOrder.orderDetails.push({product, quantity: 1});
        }
        if (myContext.order.onChange) {
            myContext.order.onChange(newOrder);
        }
    }

    return (
        <>
            <Carta style={{width: '15rem', cursor: 'pointer'}} onClick={() => navigate(`/detalle/${product.id}`)}
                   key={product.id}>
                <Carta.Img src={`${product.image?.location}`} alt='' style={{maxHeight: '130px'}}/>
                <Carta.Body className="text-center d-flex flex-column justify-content-between">
                    <div>
                        <Carta.Title className="fw-bold fs-5">{product.name}</Carta.Title>
                        <Carta.Text className="mb-0">
                            <span className="d-block small text-muted my-0">{product.description}</span>
                        </Carta.Text>
                    </div>
                    <div>
                        <Carta.Text className="mb-0">
                        <span className="fw-bold fs-5 mt-2 mb-0 d-block">
                            {product.stock > 0 ? product.price.toLocaleString("es-AR", {
                                    style: "currency",
                                    currency: "ARS"
                                }) :
                                "No disponible"
                            }</span>
                        </Carta.Text>
                        {myContext.userContext.role !== "USER" || product.stock > 0 &&
                            <Button className='d-block mt-3 mx-auto'
                                    variant="success"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        addProductToOrder();
                                    }}>
                                <FontAwesomeIcon icon={faCartArrowDown} className={"me-3"}/>
                                Agregar al pedido
                            </Button>
                        }
                    </div>
                </Carta.Body>
            </Carta>
        </>
    );
};

