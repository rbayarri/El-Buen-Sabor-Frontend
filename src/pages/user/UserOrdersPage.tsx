import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Link, Navigate} from "react-router-dom";
import {Order} from "../../models/order.ts";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import OrderIteration from "../../components/Orders/OrderIteration.tsx";
import UserPanel from "../../components/Users/UserPanel.tsx";

const UserOrdersPage = () => {

    const myContext = useContext(globalContext);
    const [orders, setOrders] = useState<Order[]>();
    const [isLoading, setIsLoading] = useState(true);

    const getOrders = async () => {
        const api = settings.api.orders.findAllByUser;
        const response = await doRequest<Order[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        })
        if (response) {
            setOrders(response);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

    if (myContext.userContext.authenticated && myContext.userContext.role === "USER") {
        return (
            <div className="row">
                <div className="col-3">
                    <UserPanel/>
                </div>
                <div className="col-9">
                    {isLoading ? <h1>Loading</h1> :
                        <>
                            <h1 className={"fs-2 mb-4"}>Mis Pedidos</h1>
                            {orders ?
                                <OrderIteration orders={orders} cancelable={true}/> :
                                <>
                                    <p>Aún no has realizado pedidos</p>
                                    <p>Crea tu primer pedido desde la página princial</p>
                                    <Link to={"/"} className="btn btn-primary">Home</Link>
                                </>
                            }
                        </>
                    }
                </div>
            </div>
        );
    }
    return <Navigate to={"/"}/>
}

export default UserOrdersPage;