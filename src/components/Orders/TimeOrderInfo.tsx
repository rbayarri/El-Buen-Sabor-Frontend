import {DeliveryMethod, Status} from "../../types/order-types.ts";

const TimeOrderInfo = (props: { deliveryMethod: DeliveryMethod, status: Status, totalTime: number }) => {

    const {deliveryMethod, status, totalTime} = props;

    return (
        <>
            {((deliveryMethod === "HOME_DELIVERY" && status !== "DELIVERED") ||
                    (deliveryMethod === "LOCAL_PICKUP" && status !== "READY")) &&
                <p className="col">
                    <b>Tiempo estimado de entrega: </b>
                    {totalTime === 0? "0" : totalTime} minutos
                </p>}
        </>

    );
};

export default TimeOrderInfo;