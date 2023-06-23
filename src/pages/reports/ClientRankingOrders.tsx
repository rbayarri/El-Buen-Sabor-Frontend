import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Order} from "../../models/order.ts";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import OrderIteration from "../../components/Orders/OrderIteration.tsx";
import {Navigate, useNavigate, useParams} from "react-router-dom";

const ClientRankingOrders = () => {

    const {id} = useParams();
    const myContext = useContext(globalContext);
    const [orders, setOrders] = useState<Order[]>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getOrders = async () => {
        const api = settings.api.orders.findAllByAdminAndUser;
        const response = await doRequest<Order[]>({
            path: `${api.path}/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt
        })
        if (response) {
            setOrders(response);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            getOrders();
        } else {
            navigate(-1);
        }
    }, [])

    if (myContext.userContext.authenticated && myContext.userContext.role === "ADMIN") {
        return (
            <>
                {isLoading ? <h1>Loading</h1> :
                    <>
                        <h1 className={"fs-2 mb-4"}>Pedidos</h1>
                        <div className="col-10">
                            {orders &&
                                <OrderIteration orders={orders} cancelable={false} cancelMethod={undefined}/>
                            }
                        </div>
                    </>
                }
            </>
        );
    }
    return <Navigate to={"/"}/>
}


export default ClientRankingOrders;