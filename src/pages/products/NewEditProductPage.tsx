import {CompleteProduct} from "../../models/products/complete-product.ts";
import {Navigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Col, Row} from "react-bootstrap";
import NewEditProductForm from "../../components/Cook/NewEditProductForm.tsx";

const initProduct: CompleteProduct = {
    id: "",
    name: "",
    description: "",
    cookingTime: 0,
    category: {
        id: ""
    },
    active: true,
    profitMargin: 100,
    productDetails: [{
        ingredient: {
            id: "0"
        },
        clientMeasurementUnit: "0",
        quantity: 0
    }]
}
const NewEditProductPage = () => {

    const {id} = useParams()
    const myContext = useContext(globalContext);
    const [product, setProduct] = useState<CompleteProduct>(initProduct);
    const [found, setFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getProduct = async (id: string) => {
        const api = settings.api.products.findById;

        const fetchedProduct = await doRequest<CompleteProduct>({
            path: api.path + "/" + id,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (fetchedProduct) {
            setProduct(fetchedProduct);
            setFound(true);
            setIsLoading(false);
        }
    }

    useEffect((() => {
        if (id) {
            if (id === "nuevo") {
                setIsLoading(false);
                setFound(false);
            } else {
                getProduct(id);
            }
        }
    }), []);

    if (myContext.userContext.authenticated && (myContext.userContext.role === "CHEF" || myContext.userContext.role === "ADMIN")) {
        return (
            <>
                {isLoading ? <h1>Loading...</h1> : (
                    <>
                        <Row>
                            <Col lg={6}>
                                <h1 className="my-2 fs-2">{found ? "Editar" : "Nuevo"} Producto</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"mb-5"}>
                                <NewEditProductForm product={product} found={found}/>
                            </Col>
                        </Row>
                    </>
                )}
            </>
        );
    }
    return (
        <Navigate to={"/"}/>
    )
};

export default NewEditProductPage;