import {Link, useNavigate, useParams} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {ClientProduct} from '../../models/products/client-product.ts';
import {settings} from '../../lib/settings.ts';
import {doRequest} from '../../lib/fetch.ts';
import swal from 'sweetalert';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import {Button, Card, Col} from "react-bootstrap";
import {globalContext} from "../../routes/AppRoutes.tsx";

export default function ProductDescription() {

    const {id} = useParams();
    const myContext = useContext(globalContext);
    const [product, setProduct] = useState<ClientProduct>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getProduct = async (id: string) => {
        const api = settings.api.home.findById;

        const fetchedProduct = await doRequest<ClientProduct>({
            path: api.path + "/" + id,
            method: api.method,

        });
        if (fetchedProduct) {
            setProduct(fetchedProduct);
            setIsLoading(false);
        } else {
            swal("Producto no encontrado", '', "error")
            navigate('/');
        }
    }

    const addProductToOrder = () => {

        const newOrder = {...myContext.order};
        const orderDetail = newOrder.orderDetails.find(od => od.product?.id === product?.id);
        if (orderDetail) {
            orderDetail.quantity += 1;
        } else {
            newOrder.orderDetails.push({product, quantity: 1});
        }
        if (myContext.order.onChange) {
            myContext.order.onChange(newOrder);
        }
    }

    useEffect((() => {
        if (id) {
            getProduct(id);
        }
    }), []);

    return (
        <>
            {isLoading ? <h1>Loading...</h1> : product && (
                <>
                    <Card className="d-flex flex-column flex-md-row border-0">
                        <div className="col-8 col-md-5 p-3 mx-auto">
                            <Card.Img
                                src={product.image.location}/>
                        </div>
                        <Col className="ms-4">
                            <Card.Body>
                                <Card.Title
                                    className="fw-bold fs-3 mb-4 d-flex flex-column flex-sm-row align-items-center">
                                    <div>{product.name}</div>
                                    {product.stock > 0 &&
                                        <div
                                            className="d-flex align-items-center ms-0 ms-sm-5 mt-3 mt-sm-0 p-4 bg-dark rounded-5 text-white"
                                            style={{
                                                height: "10vw",
                                                maxHeight: "70px",
                                                boxShadow: "8px -8px 2px #F3C11B"
                                            }}
                                        >{product.price ? product.price.toLocaleString('es-AR', {
                                            style: 'currency',
                                            currency: 'ARS'
                                        }) : ""}
                                        </div>
                                    }
                                </Card.Title>

                                <Card.Text>
                                    <div>
                                        <p className="mb-4">{product.description}</p>
                                        <p className="fw-bold ">Ingredientes</p>
                                        <ul>
                                            {product.productDetails?.map(pd => (
                                                <li>{pd.ingredient.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Card>
                    <div className="d-flex justify-content-center my-3 my-sm-5">
                        <Link className='btn btn-outline-success btn-lg d-none d-sm-block'
                              to={'/'}>
                            Continuar Comprando
                        </Link>
                        <Link className='btn btn-outline-success d-sm-none'
                              to={'/'}>
                            Continuar Comprando
                        </Link>
                        {product.stock > 0 && (!myContext.userContext.authenticated || myContext.userContext.role === "USER") &&
                            <>
                                <Button className='ms-5 btn-lg d-none d-sm-block'
                                        variant="success"
                                        size="lg"
                                        onClick={addProductToOrder}>
                                    <FontAwesomeIcon icon={faCartArrowDown} className={"me-3"}/>
                                    Agregar al pedido
                                </Button>
                                <Button className='ms-2 d-sm-none'
                                        variant="success"
                                        onClick={addProductToOrder}>
                                    <FontAwesomeIcon icon={faCartArrowDown} className={"me-3"}/>
                                    Agregar al pedido
                                </Button>
                            </>
                        }
                    </div>
                </>
            )
            }
        </>
    );
}