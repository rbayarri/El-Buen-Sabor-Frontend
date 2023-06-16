import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Order} from "../../models/order.ts";
import {DeliveryMethod} from "../../types/order-types.ts";

const TotalAndSubtotalOrder = (props: { deliveryMethod: DeliveryMethod | undefined, order: Order | undefined }) => {

    const myContext = useContext(globalContext);
    const order = props.order ? props.order : myContext.order;
    const deliveryMethod = props.order ? order.deliveryMethod : props.deliveryMethod ? props.deliveryMethod : order.deliveryMethod
    const filteredOrderDetails = myContext.order.orderDetails.filter(od => od.product !== undefined);
    const total = props.order ? props.order.orderDetails.reduce((total, item) => total + (item.unitPrice * item.quantity), 0) :
        filteredOrderDetails.reduce((total, item) => total + (item.product!.price * item.quantity), 0);

    return (
        <div className={`${props.deliveryMethod && "border rounded-3"} p-3`}>
            <div className="d-flex justify-content-between align-items-center">
                <span>Subtotal</span>
                <span>{total.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS"
                })}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <span>Descuento</span>
                <span>{((deliveryMethod === "LOCAL_PICKUP" ? 0.1 : 0) * total).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS"
                })}</span>
            </div>
            <div
                className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-secondary">
                <span className="fs-5 fw-bold">Total</span>
                <span
                    className="fs-5 fw-bold">{(total - (deliveryMethod === "LOCAL_PICKUP" ? 0.1 : 0) * total).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS"
                })}</span>
            </div>
        </div>
    );
};

export default TotalAndSubtotalOrder;