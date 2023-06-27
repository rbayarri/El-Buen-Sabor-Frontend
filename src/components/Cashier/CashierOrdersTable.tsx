import {translateStatus} from "../../lib/status-translate.js";
import {Order} from "../../models/order.js";
import {Button, Form} from "react-bootstrap";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import {Link} from "react-router-dom";
import {settings} from "../../lib/settings.js";
import {doRequest} from "../../lib/fetch.js";
import {ChangeEventHandler, useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.js";
import {Status} from "../../types/order-types.ts";
import swal from "sweetalert";

export default function CashierOrdersTable(props: { orders: Order[] }) {
    const myContext = useContext(globalContext);
    const [orders, setOrders] = useState(props.orders);
    const [ordersFiltered, setOrdersFiltered] = useState<Order[]>([]);
    const [statusSearch, setStatusSearch] = useState<string>("ALL");


    const filtrar: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const value = event.target.value;
        if (orders) {
            const ordersFiltered = orders.filter((o) =>
                value === "ALL" ? true : o.status === value as Status
            );
            setOrdersFiltered(ordersFiltered);
            setStatusSearch(value);
        }
    };
    const toCooking = async (id: string) => {
        const api = settings.api.orders.toCooking;
        const response = await doRequest<Order>({
            path: api.path + `/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            const newOrder = orders.find((o) => o.id === id);
            if (newOrder) {
                swal("Order pasada a cocina", "", "success");
                newOrder.status = "COOKING";
                setOrders([...orders]);
            }
        }
    };

    const toDelivery = async (id: string) => {
        const api = settings.api.orders.toDelivery;
        const response = await doRequest<Order>({
            path: api.path + `/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            const newOrder = orders.find((o) => o.id === id);
            if (newOrder) {
                swal("Order pasada a delivery", "", "success");
                newOrder.status = "ON_THE_WAY";
                setOrders([...orders]);
            }
        }
    };

    const toReady = async (id: string) => {
        const api = settings.api.orders.toReady;
        const response = await doRequest<Order>({
            path: api.path + `/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            const newOrder = orders.find((o) => o.id === id);
            if (newOrder) {
                swal("Order pasada a lista", "", "success");
                newOrder.status = "READY";
                setOrders([...orders]);
            }
        }
    };

    const toDelivered = async (id: string) => {
        const api = settings.api.orders.toDelivered;
        const response = await doRequest<Order>({
            path: api.path + `/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            const newOrder = orders.find((o) => o.id === id);
            if (newOrder) {
                swal("Order entregada", "", "success");
                newOrder.status = "DELIVERED";
                setOrders([...orders]);
            }
        }
    };

    const toPaid = async (id: string) => {
        const api = settings.api.orders.toPaid;
        const response = await doRequest<Order>({
            path: api.path + `/${id}`,
            method: api.method,
            jwt: myContext.userContext.jwt,
        });
        if (response) {
            const newOrder = orders.find((o) => o.id === id);
            if (newOrder) {
                swal("Order pagada", "", "success");
                newOrder.paid = true;
                setOrders([...orders]);
            }
        }
    };

    const cancel = (id: string) => {

        swal({
            title: "¿Está seguro?",
            text: "Esta acción no puede deshacerse",
            icon: "warning",
            buttons: ["Cancelar",true],
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
                        const newOrder = orders.find((o) => o.id === id);
                        if (newOrder) {
                            swal("Order cancelada", "", "success");
                            newOrder.status = "CANCELLED";
                            setOrders([...orders]);
                        }
                    }
                }
            });
    };

    useEffect(() => {
        setOrdersFiltered(orders.filter(o => statusSearch === "ALL" ? true : o.status === statusSearch));
    }, [])

    return (
        <>
            <div className={"my-4 d-flex justify-content-between align-items-center"}>
                <div className="d-flex align-items-center">
                    <span>Estado </span>
                    <Form.Select
                        className="ms-3"
                        value={statusSearch}
                        onChange={filtrar}
                    >
                        <option key={"ALL"} value={"ALL"}>
                            Todos
                        </option>
                        <option key={"PENDING"} value={"PENDING"}>
                            Pendiente
                        </option>
                        <option key={"COOKING"} value={"COOKING"}>
                            En cocina
                        </option>
                        <option key={"READY"} value={"READY"}>
                            Listo
                        </option>
                        <option key={"ON_THE_WAY"} value={"ON_THE_WAY"}>
                            En camino
                        </option>
                        <option key={"DELIVERED"} value={"DELIVERED"}>
                            Entregado
                        </option>
                        <option key={"CANCELLED"} value={"CANCELLED"}>
                            Cancelada
                        </option>
                    </Form.Select>
                </div>
            </div>
            {orders.length === 0 ? (
                <p>No hay registros</p>
            ) : (
                <table className="table table-sm small" style={{textAlign: "center"}}>
                    <thead>
                    <tr className="table-dark">
                        <th>Nombre y apellido</th>
                        <th>Fecha y hora</th>
                        <th>Forma de entrega</th>
                        <th>Forma de pago</th>
                        <th>Pagado</th>
                        <th>Estado</th>
                        <th>Detalles</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordersFiltered.map((ord, index) => (
                        <tr key={index}>
                            <td scope="row">{ord.user?.name + " " + ord.user?.lastName}</td>
                            <td>
                                {ord.dateTime.split("T")[0] +
                                    " " +
                                    ord.dateTime.split("T")[1].substring(0, 8)}
                            </td>
                            <td>
                                {ord.deliveryMethod === "LOCAL_PICKUP"
                                    ? "Retiro en el local"
                                    : "Envio a domicilio"}
                            </td>
                            <td>
                                {ord.paymentMethod === "CASH" ? "Efectivo" : "Mercado Pago"}
                            </td>
                            <td>{ord.paid ? "Si" : "No"}</td>
                            <td>{translateStatus(ord.status)}</td>
                            <td>
                                <Link to={`/pedidos/${ord.id}`} className="btn btn-primary btn-sm">
                                    Ver Detalle
                                </Link>
                            </td>
                            <td>
                                {ord.status === "PENDING" && ord.cookingTime > 0 && (
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => toCooking(ord.id)}
                                    >
                                        <SoupKitchenIcon></SoupKitchenIcon>
                                        Cocina
                                    </Button>
                                )}
                                {ord.status === "PENDING" && ord.cookingTime === 0 && (
                                    <Button
                                        variant="success"
                                        size="sm"
                                        style={{marginLeft: "10px"}}
                                        onClick={() => toReady(ord.id)}
                                    >
                                        <DoneAllIcon></DoneAllIcon>
                                        Listo
                                    </Button>
                                )}
                                {!ord.paid && (
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        style={{
                                            marginLeft: "10px",
                                            borderColor: "#003366",
                                            backgroundColor: "#003366",
                                            color: "white",
                                        }}
                                        onClick={() => toPaid(ord.id)}
                                    >
                                        <AttachMoneyIcon></AttachMoneyIcon>
                                        Cobrar
                                    </Button>
                                )}
                                {ord.status === "READY" &&
                                    ord.deliveryMethod === "LOCAL_PICKUP" &&
                                    ord.paid && (
                                        <Button
                                            variant="info"
                                            size="sm"
                                            style={{
                                                marginLeft: "10px",
                                                backgroundColor: "#8B008B",
                                                borderColor: "#8B008B",
                                                color: "white",
                                            }}
                                            onClick={() => toDelivered(ord.id)}
                                        >
                                            <FastfoodIcon></FastfoodIcon>
                                            Entregar
                                        </Button>
                                    )}

                                {ord.status === "READY" &&
                                    ord.deliveryMethod === "HOME_DELIVERY" && (
                                        <Button
                                            variant="info"
                                            size="sm"
                                            style={{
                                                marginLeft: "10px",
                                                backgroundColor: "#2ecc71",
                                                borderColor: "#2ecc71",
                                                color: "white",
                                            }}
                                            onClick={() => toDelivery(ord.id)}
                                        >
                                            <DeliveryDiningIcon></DeliveryDiningIcon>
                                            Delivery
                                        </Button>
                                    )}
                                {ord.status !== "CANCELLED" && ord.status !== "DELIVERED" &&
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        style={{
                                            marginLeft: "10px",
                                        }}
                                        onClick={() => cancel(ord.id)}
                                    >
                                        <HighlightOffIcon></HighlightOffIcon>
                                        Anular
                                    </Button>
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
