import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {settings} from "../../lib/settings.ts";
import {doRequest, host} from "../../lib/fetch.ts";
import {Order} from "../../models/order.ts";
import BasicOrderInfo from "../../components/Orders/BasicOrderInfo.tsx";
import OrderProducts from "../../components/Orders/OrderProducts.tsx";
import {initMercadoPago, Wallet} from "@mercadopago/sdk-react";
import ShipmentOrderInfo from "../../components/Orders/ShipmentOrderInfo.tsx";
import TimeOrderInfo from "../../components/Orders/TimeOrderInfo.tsx";
import {Button} from "react-bootstrap";
import TotalAndSubtotalOrder from "../../components/Orders/TotalAndSubtotalOrder.tsx";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";

const UserOrderPage = () => {

    const myContext = useContext(globalContext);
    const {id} = useParams();
    const [order, setOrder] = useState<Order>();
    const [isLoading, setIsLoading] = useState(true);
    const [preferenceId, setPreferenceId] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const navigate = useNavigate();

    const getOrder = async (id: string) => {
        const api = settings.api.orders.findByIdForUser;
        const path = myContext.userContext.role === "USER" ? `${api.path}/${id}/users` : `${api.path}/${id}`;
        const response = await doRequest<Order>({
            path: path,
            method: api.method,
            jwt: myContext.userContext.jwt
        })
        if (response) {
            setOrder(response);
            if (!response.paid && response.paymentMethod === "MERCADO_PAGO" && myContext.userContext.role === "USER") {
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

        initMercadoPago('TEST-7fe9b4a3-4df8-4628-9bdc-1d4101c3f82d');
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

    const renderCheckoutButton = ({preferenceId}: { preferenceId: any }) => {
        if (!preferenceId) return null;
        return (
            <Wallet
                initialization={{preferenceId: preferenceId}}
                onReady={() => setIsReady(true)}/>
        )
    }

    const toCooking = async () => {
        const api = settings.api.orders.toCooking;
        const response = await doRequest<Order>({
            path: api.path + `/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            if (order) {
                swal("Order pasada a cocina", "", "success");
                const newOrder = {...order};
                newOrder.status = "COOKING";
                setOrder(newOrder);
            }
        }
    };

    const toDelivery = async () => {
        const api = settings.api.orders.toDelivery;
        const response = await doRequest<Order>({
            path: api.path + `/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            if (order) {
                swal("Order pasada a delivery", "", "success");
                const newOrder = {...order};
                newOrder.status = "ON_THE_WAY";
                setOrder(newOrder);
            }
        }
    };

    const toReady = async () => {
        const api = settings.api.orders.toReady;
        const response = await doRequest<Order>({
            path: api.path + `/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            if (order) {
                swal("Order pasada a lista", "", "success");
                const newOrder = {...order};
                newOrder.status = "READY";
                setOrder(newOrder);
                navigate(-1);
            }
        }
    };

    const toDelivered = async () => {
        const api = settings.api.orders.toDelivered;
        const response = await doRequest<Order>({
            path: api.path + `/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            if (order) {
                swal("Order entregada", "", "success");
                const newOrder = {...order};
                newOrder.status = "DELIVERED";
                setOrder(newOrder);
            }
        }
    };

    const toPaid = async () => {
        const api = settings.api.orders.toPaid;
        const response = await doRequest<Order>({
            path: api.path + `/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            if (order) {
                swal("Order pagada", "", "success");
                const newOrder = {...order};
                newOrder.paid = true;
                setOrder(newOrder);
            }
        }
    };

    const cancel = () => {

        swal({
            title: "¿Estás seguro?",
            text: "Esta acción no puede deshacerse",
            icon: "warning",
            buttons: ["Cancelar", true],
            dangerMode: true,
        })
            .then(async ok => {
                if (ok) {
                    const api = settings.api.orders.cancel;
                    const response = await doRequest<Order>({
                        path: api.path + `/${id}`,
                        method: api.method,
                        jwt: myContext.userContext.jwt,
                    });
                    if (response) {
                        if (order) {
                            swal("Order cancelada", "", "success");
                            const newOrder = {...order};
                            newOrder.status = "CANCELLED";
                            setOrder(newOrder);
                        }
                    }
                }
            });
    };

    const addMinutes = async () => {
        const api = settings.api.orders.addMinutes;
        const response = await doRequest<Order[]>({
            path: api.path + '/' + id,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            if (order) {
                swal("Se agregaron 10 minutos", "", "success");
                const newOrder = {...order};
                if (newOrder) {
                    newOrder.cookingTime = (newOrder.cookingTime ? newOrder.cookingTime : 0) + 10;
                    setOrder(newOrder);
                }
            }
        }
    }

    useEffect(() => {
        if (id) {
            getOrder(id);
        }
    }, [id])

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
                    <TimeOrderInfo order={order}/>
                    <OrderProducts editMode={false} order={order} wholeWidth={true}/>
                    {myContext.userContext.role !== "CHEF" && myContext.userContext.role !== "DELIVERY" &&
                        <section className={"px-5 pb-2"}>
                            <TotalAndSubtotalOrder deliveryMethod={undefined} order={order}/>
                        </section>
                    }
                    <div className="d-flex justify-content-around align-items-center mt-3 ">
                        <Button variant="outline-danger" className="mx-1 mx-lg-5"
                                onClick={() => navigate(-1)}>Volver</Button>
                        {order.paid && order.status !== "CANCELLED" &&
                            <a className="btn btn-primary mx-1 mx-lg-5"
                               href={`${host}/orders/viewInvoice/${id}`}>Factura</a>}
                        {order.paid && order.status === "CANCELLED" &&
                            <a className="btn btn-primary  mx-1 mx-lg-5"
                               href={`${host}/orders/viewCreditNote/${id}`}>Nota de crédito</a>}
                        {myContext.userContext.role === "USER" && renderCheckoutButton({preferenceId: preferenceId})}
                        {myContext.userContext.role === "CASHIER" &&
                            <>
                                {(order.status === "PENDING" && order.cookingTime > 0) &&
                                    <Button
                                        variant="warning"
                                        className="mx-1 mx-lg-5"
                                        onClick={toCooking}
                                    >
                                        <SoupKitchenIcon></SoupKitchenIcon>
                                        Cocina
                                    </Button>
                                }
                                {order.status === "PENDING" && order.cookingTime === 0 && (
                                    <Button
                                        variant="success"
                                        className="mx-1 mx-lg-5"
                                        onClick={toReady}
                                    >
                                        <DoneAllIcon></DoneAllIcon>
                                        Listo
                                    </Button>
                                )}
                                {!order.paid && (
                                    <Button
                                        variant="primary"
                                        className="mx-1 mx-lg-5"
                                        style={{
                                            borderColor: "#003366",
                                            backgroundColor: "#003366",
                                            color: "white",
                                        }}
                                        onClick={toPaid}
                                    >
                                        <AttachMoneyIcon></AttachMoneyIcon>
                                        Cobrar
                                    </Button>
                                )}
                                {order.status === "READY" &&
                                    order.deliveryMethod === "LOCAL_PICKUP" &&
                                        order.paid && (
                                        <Button
                                            variant="info"
                                            className="mx-1 mx-lg-5"
                                            style={{
                                                backgroundColor: "#8B008B",
                                                borderColor: "#8B008B",
                                                color: "white",
                                            }}
                                            onClick={toDelivered}
                                        >
                                            <FastfoodIcon></FastfoodIcon>
                                            Entregar
                                        </Button>
                                    )}

                                {order.status === "READY" &&
                                    order.deliveryMethod === "HOME_DELIVERY" && (
                                        <Button
                                            variant="info"
                                            className="mx-1 mx-lg-5"
                                            style={{
                                                backgroundColor: "#2ecc71",
                                                borderColor: "#2ecc71",
                                                color: "white",
                                            }}
                                            onClick={toDelivery}
                                        >
                                            <DeliveryDiningIcon></DeliveryDiningIcon>
                                            Delivery
                                        </Button>
                                    )}
                                {order.status !== "CANCELLED" && order.status !== "DELIVERED" &&
                                    <Button
                                        variant="danger"
                                        className="mx-1 mx-lg-5"
                                        onClick={cancel}
                                    >
                                        <HighlightOffIcon></HighlightOffIcon>
                                        Anular
                                    </Button>
                                }
                            </>
                        }
                        {myContext.userContext.role === "CHEF" && order.status === "COOKING" &&
                            <>
                                <Button variant='success' className="mx-1 mx-lg-5" onClick={toReady}>
                                    Listo
                                </Button>
                                <Button className='mx-1 mx-lg-5 ' variant='danger'
                                        onClick={addMinutes}>
                                    <TimerOutlinedIcon/>
                                    + 10 minutos
                                </Button>
                            </>
                        }
                        {myContext.userContext.role === "DELIVERY" && order.status === "ON_THE_WAY" &&
                            <>
                                <Button
                                    variant="info"
                                    className="mx-1 mx-lg-5"
                                    style={{
                                        backgroundColor: "#8B008B",
                                        borderColor: "#8B008B",
                                        color: "white",
                                    }}
                                    onClick={toDelivered}
                                >
                                    <FastfoodIcon></FastfoodIcon>
                                    Entregar
                                </Button>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default UserOrderPage;