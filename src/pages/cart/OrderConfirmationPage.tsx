import {MouseEventHandler, useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Button} from "react-bootstrap";
import TotalAndSubtotalOrder from "../../components/Orders/TotalAndSubtotalOrder.tsx";
import swal from "sweetalert";
import {EntityReference} from "../../models/entity-reference.ts";
import BasicOrderInfo from "../../components/Orders/BasicOrderInfo.tsx";
import OrderProducts from "../../components/Orders/OrderProducts.tsx";
import {ContextOrder} from "../../models/context/context-order.ts";

const OrderConfirmationPage = () => {

    const myContext = useContext(globalContext);
    const navigate = useNavigate();

    const handleConfirmacion: MouseEventHandler<HTMLButtonElement> = async () => {

        const body: ContextOrder = {
            deliveryMethod: myContext.order.deliveryMethod,
            paymentMethod: myContext.order.paymentMethod,
            orderDetails: myContext.order.orderDetails.filter(od => od.product !== undefined)
        };
        if (body.deliveryMethod === "HOME_DELIVERY") {
            if (myContext.order.address) {
                body.address = {
                    id: myContext.order.address as string
                };
            }
            if (myContext.order.phoneNumber) {
                body.phoneNumber = {
                    id: myContext.order.phoneNumber as string
                }
            }
        }

        const api = settings.api.orders.save;
        const response = await doRequest<EntityReference>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt,
            body: body
        })
        if (response) {
            swal("Orden Confirmada", myContext.order.paymentMethod === "MERCADO_PAGO" ? "Su pedido será preparado una vez se reciba su pago" : "", "success");
            if (myContext.order.onChange) {
                myContext.order.onChange({orderDetails: [], onChange: myContext.order.onChange});
            }
            navigate(`/pedidos/${response.id}`)
        }
    }

    if (!myContext.userContext.authenticated || myContext.userContext.role === "USER") {
        return (
            <div className="d-block m-auto w-75">
                <h1 className={"fs-2 mb-3"}>Mi Pedido</h1>
                <BasicOrderInfo order={myContext.order}/>
                {myContext.order.orderDetails.filter(od => od.product !== undefined).length > 0 ?
                    <>
                        <OrderProducts editMode={false} order={undefined} wholeWidth={true}/>
                        <section className={"px-5 pb-2"}>
                            <TotalAndSubtotalOrder deliveryMethod={undefined} order={undefined}/>
                        </section>
                        <div className="d-flex justify-content-around mt-3 ">
                            <Link className={"btn btn-outline-danger col mx-5"}
                                  to={"/pedido/opciones"}>VOLVER</Link>
                            <Button className={"col mx-5"} onClick={handleConfirmacion}>CONFIRMAR
                                PEDIDO</Button>
                        </div>
                    </> :
                    <div className={"mt-5"}>
                        <p>No hay productos en el pedido</p>
                        <Link to={"/"} className={"btn btn-primary"}>CONTINUAR COMPRANDO</Link>
                    </div>
                }
            </div>
        );
    }
    return <Navigate to={"/"}/>
}
export default OrderConfirmationPage;