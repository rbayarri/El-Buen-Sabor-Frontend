import {DeliveryMethod, Status} from "../models/order.ts";

const TimeOrderInfo = (props: { deliveryMethod: DeliveryMethod, status: Status, cookingTime: number }) => {

    const {deliveryMethod, status, cookingTime} = props;

    return (
        <>
            {((deliveryMethod === "HOME_DELIVERY" && status !== "DELIVERED") ||
                    (deliveryMethod === "LOCAL_PICKUP" && status !== "READY")) &&
                <p className="col">
                    <b>Tiempo estimado de entrega: </b>
                    {cookingTime} minutos
                </p>}
        </>

    );
};

export default TimeOrderInfo;