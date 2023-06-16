import {ChangeEventHandler, useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Link, Navigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {Search} from "react-bootstrap-icons";
import {Product} from "../../models/product.ts";
import ProductsTable from "../../components/Cook/ProductsTable.tsx";

const ProductsPage = () => {

    const myContext = useContext(globalContext);
    const [busqueda, setBusqueda] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = async () => {

        const api = settings.api.products.findAll;
        const response = await doRequest<Product[]>({path: api.path, method: api.method, jwt: myContext.userContext.jwt});
        if (response) {
            setProducts(response);
            setFilteredProducts(response);
            setIsLoading(false);
        }
    }

    const filter: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        const filteredProducts =
            products.filter((i) => i.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredProducts(filteredProducts);
        setBusqueda(value);
    }

    useEffect((() => {
        getProducts();
    }), []);

    if (myContext.userContext.authenticated && (myContext.userContext.role === "CHEF" || myContext.userContext.role === "ADMIN")) {
        return (
            <>
                <div className={"my-4 d-flex justify-content-between align-items-center"}>
                    <div className="d-flex align-items-center">
                        <h1>Productos</h1>
                        <Link className="btn btn-success ms-3" to={"/productos/nuevo"}>Nuevo</Link>
                    </div>

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Buscar productos..."
                            value={busqueda}
                            onChange={filter}
                        />
                        <Button>
                            <Search/>
                        </Button>
                    </Form>
                </div>
                {isLoading ? <p>Loading...</p> : (
                    <ProductsTable products={filteredProducts}/>
                )}
            </>
        );
    }
    return (
        <Navigate to={"/"}/>
    )
};

export default ProductsPage;