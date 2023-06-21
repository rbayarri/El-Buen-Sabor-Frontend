import {useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {Order} from "../../models/order.ts";
import CashierOrdersTable from "../../components/Cashier/CashierOrdersTable.tsx";
import {doRequest} from "../../lib/fetch.ts";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {settings} from "../../lib/settings.ts";

const CashierPage = () => {
    const myContext = useContext(globalContext);
    const [ordenes, setOrdenes] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCashierOrders = async () => {
        const api = settings.api.orders.cashier;
        const response = await doRequest<Order[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            setOrdenes(response);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCashierOrders();
    }, []);

    if (
        myContext.userContext.authenticated &&
        myContext.userContext.role === "CASHIER"
    ) {
        return (
            <>
                <h1>Listado de Pedidos</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <CashierOrdersTable orders={ordenes}/>
                )}
            </>
        );
    }
    return <Navigate to={"/"}/>;
};

export default CashierPage;
