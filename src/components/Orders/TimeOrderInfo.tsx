import {Order} from "../../models/order.ts";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {useContext} from "react";

const TimeOrderInfo = (props: { order: Order }) => {

    const myContext = useContext(globalContext);
    const {order} = props;

    return (
        <>
            {((order.deliveryMethod === "HOME_DELIVERY" && order.status !== "DELIVERED") ||
                    (order.deliveryMethod === "LOCAL_PICKUP" && order.status !== "READY")) &&
                <p className="col">
                    <b>Tiempo estimado de entrega: </b>
                    {myContext.userContext.role !== "CHEF" ? <>
                            {order.totalTime === 0 ? "0" : order.totalTime} minutos
                        </>
                        : <>
                            {order.cookingTime} minutos
                        </>}
                </p>}
        </>

    );
};

export default TimeOrderInfo;