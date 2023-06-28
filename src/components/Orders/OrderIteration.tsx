import {translateStatus} from "../../lib/status-translate.ts";
import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {Order} from "../../models/order.ts";
import {host} from "../../lib/fetch.ts";
import "../../pages/user/order-iteration.css";

const OrderIteration = (props: {
    orders: Order[],
    cancelable: boolean,
    cancelMethod: ((id: string) => void) | undefined
}) => {

    const {orders, cancelable, cancelMethod} = props;
    const navigate = useNavigate();

    const getTotalOrder = (order: Order) => {
        return order.orderDetails
            .reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
    }

    return (
        <>
            {orders?.map(o => (
                <div onClick={() => navigate(`/pedidos/${o.id}`)} className={"selected-order"}>
                    <div className="border rounded-3 border-dark mb-2">
                        <p className="small ps-3 pt-2 fw-bold">
                            {new Date(o.dateTime).toLocaleDateString("es-AR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                }) + " - " +
                                new Date(o.dateTime).toLocaleTimeString("es-AR", {
                                    hour12: false
                                })
                            }
                        </p>
                        <div className="d-flex flex-row align-items-center justify-content-between px-3">
                            <p className=""><b>N° Pedido: </b>{o.id.split("-")[0].toUpperCase()}</p>
                            <p className=""><b>Total: {getTotalOrder(o).toLocaleString("es-AR", {
                                style: "currency",
                                currency: "ARS"
                            })}</b></p>
                            <p className={o.status === "CANCELLED" ? "text-danger" :
                                o.status === "DELIVERED" ? "text-success" : ""}>
                                {translateStatus(o.status)}
                            </p>
                            <div className="d-none d-lg-flex align-items-center justify-content-around">
                                {cancelable && o.status !== "CANCELLED" && !o.paid &&
                                    <p><Button variant="outline-danger" className="col me-1"
                                               onClick={() => cancelMethod!(o.id)}>Anular</Button></p>}
                                <p><Link to={`/pedidos/${o.id}`}
                                         className="btn btn-primary col me-1">Detalle</Link>
                                </p>
                                {o.paid && <p><a href={`${host}/orders/viewInvoice/${o.id}`}
                                                 className="btn btn-dark col">Factura</a></p>}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default OrderIteration;