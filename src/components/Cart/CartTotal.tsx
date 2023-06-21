import {useContext} from 'react';
import {Link} from "react-router-dom";
import {globalContext} from "../../routes/AppRoutes.tsx";

const CartTotal = () => {

    const myContext = useContext(globalContext);

    return (
        <div className={"border rounded-3 p-3"}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <span>{myContext.order.orderDetails.filter(od => od.product !== undefined).map(od => od.quantity).reduce((acc, cur) => acc + cur, 0)} artículos</span>
                <span
                    className="fs-5 fw-bold">{(myContext.order.orderDetails.filter(od => od.product !== undefined).reduce((total, item) => total + (item.product!.price * item.quantity), 0)).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS"
                })}</span>
            </div>
            <Link className={"w-100 mb-2 btn btn-primary"}
                  to={myContext.userContext.authenticated ? "/pedido/opciones" : "/login"}>CONFIRMAR PEDIDO</Link>
            <Link className={"btn btn-outline-primary w-100"} to={"/"}>CONTINUAR COMPRANDO</Link>
        </div>
    );
};

export default CartTotal;