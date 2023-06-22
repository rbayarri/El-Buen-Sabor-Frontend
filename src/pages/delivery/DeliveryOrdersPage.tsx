import {useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {Order} from "../../models/order.ts";
import {doRequest} from "../../lib/fetch.ts";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {settings} from "../../lib/settings.ts";
import DeliveryOrdersTable from "../../components/Delivery/DeliveryOrdersTable.tsx";

const DeliveryOrdersPage = () => {
    const myContext = useContext(globalContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getDeliveryOrders = async () => {
        const api = settings.api.orders.delivery;
        const response = await doRequest<Order[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            setOrders(response);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDeliveryOrders();
    }, []);

    if (
        myContext.userContext.authenticated &&
        (myContext.userContext.role === "DELIVERY" ||
            myContext.userContext.role === "ADMIN")
    ) {
        return (
            <>
                <div
                    className={"my-4 d-flex justify-content-between align-items-center"}
                >
                    <div className="d-flex align-items-center">
                        <h1>Pedidos a entregar</h1>
                    </div>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DeliveryOrdersTable orders={orders}/>
                )}
            </>
        );
    }
    return <Navigate to={"/"}/>;
};

export default DeliveryOrdersPage;
