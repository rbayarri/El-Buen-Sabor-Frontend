import {translateStatus} from "../../lib/status-translate.ts";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Order} from "../../models/order.ts";

const OrderIteration = (props: { orders: Order[], cancelable: boolean }) => {

    const {orders, cancelable} = props;

    const getTotalOrder = (order: Order) => {
        return order.orderDetails
            .reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
    }

    return (
        <>
            {orders?.map(o => (
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
                        <div className="d-flex align-items-center justify-content-around">
                            {cancelable && <p><Button variant="outline-danger" className="col me-1">Anular</Button></p>}
                            <p><Link to={`/user/pedidos/${o.id}`}
                                     className="btn btn-primary col me-1">Detalle</Link>
                            </p>
                            <p><a href={`http://localhost:8080/api/v1/orders/viewInvoice/${o.id}`}
                                  className="btn btn-dark col">Factura</a></p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default OrderIteration;