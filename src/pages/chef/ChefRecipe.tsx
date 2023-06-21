import { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { CompleteProduct } from '../../models/products/complete-product';
import { settings } from '../../lib/settings';
import { doRequest } from '../../lib/fetch';
import { globalContext } from "../../routes/AppRoutes.tsx";
import swal from 'sweetalert';
import { Button, Card, Col } from 'react-bootstrap';

export default function ChefRecipe() {

    const { id } = useParams();
    const [product, setProduct] = useState<CompleteProduct>();
    const myContext = useContext(globalContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getProduct = async (id: string) => {

        const api = settings.api.products.findById;
        const fetchedProduct = await doRequest<CompleteProduct>({
            path: api.path + "/" + id,
            method: api.method,
            jwt: myContext.userContext.jwt

        });
        if (fetchedProduct) {
            setProduct(fetchedProduct);
            setIsLoading(false);
        } else {
            swal("Producto no encontrado", '', "error")
            navigate('/');
        }
    }

    useEffect((() => {
        if (id) {
            getProduct(id);
        }
    }), [id]);
    return (
        <>
        {isLoading ? <h1>Loading...</h1> : product && (
            <>
                <Card className="d-flex flex-row border-0">
                    <Col xl={5} lg={5} md={5} className={"p-3"}>
                        <Card.Img
                            src={product.image?.location}/>
                    </Col>
                    <Col className="ms-4">
                        <Card.Body>
                            <Card.Title
                                className="fw-bold fs-3 mb-4 d-flex align-items-center">
                                <div>{product.name}</div>                             
                            </Card.Title>
                            <Card.Text>
                                <div>
                                    <p className="mb-4">{product.description}</p>
                                    <p className="fw-bold ">Ingredientes</p>
                                    <ul>
                                        {product.productDetails?.map(pd => (
                                            <li>{pd.ingredient.name} {pd.quantity} {pd.clientMeasurementUnit}</li>
                                        ))}
                                    </ul>
                                </div>
                            </Card.Text>                    
                        </Card.Body>
                    </Col>
                </Card>
                <Card.Text  className="mb-4 d-flex align-items-center">
                <p className="mb-4">{product.recipe}</p>               
                </Card.Text>
                <div className="d-flex justify-content-center my-5">
                    <Button onClick={() => navigate(-1)} variant='primary' size='lg'>
                        Volver
                    </Button>               
                </div>
            </>
        )
        }             
        </>

    )
}
