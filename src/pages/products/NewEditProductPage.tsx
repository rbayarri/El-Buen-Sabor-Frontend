import {Product} from "../../models/product.ts";
import {Navigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Col, Row} from "react-bootstrap";
import NewEditProductForm from "../../components/Cook/NewEditProductForm.tsx";

const initProduct: Product = {
    id: "",
    name: "",
    description: "",
    cookingTime: 0,
    category: {
        id: ""
    },
    recipe: "",
    active: true,
    profitMargin: 0,
    productDetails: [{
        ingredient: {
            id: "0"
        },
        clientMeasurementUnit: "0",
        quantity: 0
    }],
    image: null
}
const NewEditProductPage = () => {

    const {id} = useParams()
    const myContext = useContext(globalContext);
    const [product, setProduct] = useState<Product>(initProduct);
    const [found, setFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getProduct = async (id: string) => {
        const api = settings.api.products.findById;

        const fetchedProduct = await doRequest<Product>({
            path: api.path + "/" + id,
            method: api.method,
            jwt: myContext.jwt
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

    if (myContext.authenticated && (myContext.role === "CHEF" || myContext.role === "ADMIN")) {
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