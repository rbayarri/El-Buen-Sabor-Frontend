import {useContext, useEffect, useState} from "react";
import {globalContext} from "../routes/AppRoutes.tsx";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {settings} from "../lib/settings.ts";
import {doRequest, host} from "../lib/fetch.ts";
import {Order} from "../models/order.ts";
import TotalAndSubtotalOrder from "../components/TotalAndSubtotalOrder.tsx";
import BasicOrderInfo from "../components/BasicOrderInfo.tsx";
import OrderProducts from "../components/OrderProducts.tsx";
import {Wallet} from "@mercadopago/sdk-react";
import ShipmentOrderInfo from "../components/ShipmentOrderInfo.tsx";
import TimeOrderInfo from "../components/TimeOrderInfo.tsx";

const SingleOrderPage = () => {

    const myContext = useContext(globalContext);
    const {id} = useParams();
    const [order, setOrder] = useState<Order>();
    const [isLoading, setIsLoading] = useState(true);
    const [preferenceId, setPreferenceId] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const navigate = useNavigate();

    const getOrder = async (id: string) => {
        const api = settings.api.orders.findByIdForUser;
        const response = await doRequest<Order>({
            path: api.path + "/" + id,
            method: api.method,
            jwt: myContext.userContext.jwt
        })
        if (response) {
            setOrder(response);
            if (!response.paid && response.paymentMethod === "MERCADO_PAGO") {
                getPreference(response.id)
            } else {
                setIsReady(true);
            }
            setIsLoading(false);
        } else {
            navigate("/");
        }
    }

    const getPreference = async (id: string) => {
        setIsLoading(true);

        const api = settings.api.orders.getPreference;

        fetch(host + api.path + "/" + id, {
            method: api.method,
            headers: {
                "Authorization": "Bearer " + myContext.userContext.jwt
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((preference) => {
                setPreferenceId(preference.id);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const renderCheckoutButton = (preferenceId) => {
        if (!preferenceId) return null;
        return (
            <Wallet
                initialization={{preferenceId: preferenceId}}
                onReady={() => setIsReady(true)}/>
        )
    }

    useEffect(() => {
        if (id) {
            getOrder(id);
        }
    }, [id])

    if (myContext.userContext.authenticated && myContext.userContext.role === "USER") {
        return (
            <div className="d-block m-auto w-75">
                {(isLoading || !order) ? <h1>Loading...</h1> :
                    <div className={isReady ? "d-block" : "d-none"}>
                        <h1 className={"fs-2 mb-3"}>Mi Pedido</h1>
                        <BasicOrderInfo order={order}/>
                        {order.deliveryMethod === "HOME_DELIVERY" &&
                            <ShipmentOrderInfo address={order.address}
                                               phoneNumber={order.phoneNumber}
                                               user={{
                                                   name: myContext.userContext.name,
                                                   lastName: myContext.userContext.lastName
                                               }}/>
                        }
                        <TimeOrderInfo deliveryMethod={order.deliveryMethod} status={order.status}
                                       cookingTime={order.cookingTime}/>
                        <OrderProducts editMode={false} order={order} wholeWidth={true}/>
                        <section className={"px-5 pb-2"}>
                            <TotalAndSubtotalOrder deliveryMethod={undefined} order={order}/>
                        </section>
                        <div className="d-flex justify-content-around mt-3 ">
                            {order.paid &&
                                <a className="btn btn-primary col-5 mx-5"
                                   href={`http://localhost:8080/api/v1/orders/viewInvoice/${id}`}>VER FACTURA</a>}
                            {order.status === "CANCELLED" &&
                                <a className="btn btn-primary col-5 mx-5"
                                   href={`http://localhost:8080/api/v1/orders/viewCreditNote/${id}`}>VER NOTA DE
                                    CRÉDITO</a>}
                            {renderCheckoutButton(preferenceId)}
                        </div>
                    </div>
                }
            </div>
        )
            ;
    }
    return <Navigate to={"/"}/>;
}

export default SingleOrderPage;