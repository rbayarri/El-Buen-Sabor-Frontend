import {useContext, useEffect, useState} from "react";
import {CookieProduct} from "../../models/cookie-product.ts";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {globalContext} from "../../routes/AppRoutes.tsx";
import CartTotal from "../../components/CartTotal.tsx";
import {Link, Navigate} from "react-router-dom";
import OrderProducts from "../../components/OrderProducts.tsx";

const MyOrderPage = () => {

    const myContext = useContext(globalContext);
    const [products, setProducts] = useState<CookieProduct[]>();
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = async () => {

        const api = settings.api.home.findProducts;
        const response = await doRequest<CookieProduct[]>({
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
                            <div className="row">
                                <OrderProducts editMode={true} order={undefined} wholeWidth={false}/>
                                <section className="col-3 ms-3">
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