import {CookieOrder, Order} from "../models/order.ts";
import {translateStatus} from "../lib/status-translate.ts";

const BasicOrderInfo = (props: { order: CookieOrder | Order }) => {

    const order = props.order;

    return (
        <div>
            <div className="d-flex">
                {(order as Order).id && <p className="mb-0 col"><b>ID: </b>{(order as Order).id}</p>}
                {(order as Order).status && <p className="mb-0 col"><b>Estado: </b>
                    {translateStatus((order as Order).status)}
                    {/*{(order as Order).status === "PENDING" ? "Pendiente" :*/}
                    {/*    (order as Order).status === "COOKING" ? "En cocina" :*/}
                    {/*        (order as Order).status === "READY" ? "Listo" :*/}
                    {/*            (order as Order).status === "DELIVERY" ? "En camino" :*/}
                    {/*                (order as Order).status === "DELIVERED" ? "Entregado" : "Cancelada"}*/}
                </p>}
            </div>
            <div className="d-flex">
                {(order as Order).dateTime &&
                    <p className="mb-0 col">
                        <b>Fecha: </b>
                        {new Date((order as Order).dateTime).toLocaleDateString("es-Ar", {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                    </p>}
                <p className={"mb-0 col"}>
                    <b>Forma de pago: </b>
                    {order.paymentMethod === "CASH" ? "Efectivo" : "Mercado Pago"}
                </p>
            </div>
            <p>
                <b>Forma de entrega: </b>
                {order.deliveryMethod === "LOCAL_PICKUP" ? "Retiro en local" : "Envío a domicilio"}
            </p>
        </div>
    );
};

export default BasicOrderInfo;