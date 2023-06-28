import {Order} from "../../models/order.ts";
import {translateStatus} from "../../lib/status-translate.ts";
import {ContextOrder} from "../../models/context/context-order.ts";

const BasicOrderInfo = (props: { order: ContextOrder | Order }) => {

    const order = props.order;

    return (
        <div>
            <div className="d-flex flex-column flex-lg-row">
                {(order as Order).id && <p className="mb-0 col"><b>ID: </b>{(order as Order).id}</p>}
                {(order as Order).status && <p className="mb-0 col"><b>Estado: </b>
                    {translateStatus((order as Order).status)}
                </p>}
            </div>
            <div className="d-flex flex-column flex-lg-row">
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