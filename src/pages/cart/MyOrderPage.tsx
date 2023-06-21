import {useContext, useEffect, useState} from "react";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {globalContext} from "../../routes/AppRoutes.tsx";
import CartTotal from "../../components/Cart/CartTotal.tsx";
import {Link, Navigate} from "react-router-dom";
import OrderProducts from "../../components/Orders/OrderProducts.tsx";
import {ClientProduct} from "../../models/products/client-product.ts";

const MyOrderPage = () => {

    const myContext = useContext(globalContext);
    const [products, setProducts] = useState<ClientProduct[]>();
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = async () => {

        const api = settings.api.home.findProducts;
        const response = await doRequest<ClientProduct[]>({
            path: api.path,
            method: api.method
        });
        if (response) {
            setProducts(response);
        }
    }

    const updateOrderCookie = () => {

        const newOrder = myContext.order;
        newOrder.orderDetails.forEach(od => {
            od.product = products?.find(p => p.id === od.product?.id);
            od.quantity = parseInt(od.quantity.toFixed(0));
        })
        if (myContext.order.onChange) {
            myContext.order.onChange(newOrder);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!myContext.userContext.authenticated || myContext.userContext.role === "USER") {
            getProducts();
        }
    }, [])

    useEffect(() => {
        if (products) {
            updateOrderCookie();
        }
    }, [products]);

    if (!myContext.userContext.authenticated || myContext.userContext.role === "USER") {
        return (
            <div>
                {isLoading ? <h1>Loading...</h1> :
                    <>
                        <h1 className={"fs-2"}>Mi Pedido</h1>
                        {myContext.order.orderDetails.filter(od => od.product !== undefined).length > 0 ?
                            <div className="d-flex flex-column flex-lg-row align-items-center">
                                <OrderProducts editMode={true} order={undefined} wholeWidth={false}/>
                                <section className="col-12 col-md-6 col-lg-3 ms-0 ms-lg-3 mt-4 mt-lg-0">
                                    <CartTotal/>
                                </section>
                            </div> :
                            <div className={"mt-5"}>
                                <p>No hay productos en el pedido</p>
                                <Link to={"/"} className={"btn btn-primary"}>CONTINUAR COMPRANDO</Link>
                            </div>
                        }
                    </>
                }
            </div>
        );
    }
    return <Navigate to={"/"}/>
};

export default MyOrderPage;