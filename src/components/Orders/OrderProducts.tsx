import {CardGroup} from "react-bootstrap";
import CartItems from "../Cart/CartItems.tsx";
import {Order} from "../../models/order.ts";

const OrderProducts = (props: { editMode: boolean, order: Order | undefined, wholeWidth: boolean }) => {

    const {editMode, order, wholeWidth} = props;

    return (
        <>
            <section className={`border rounded-3 ${!wholeWidth && "col-12 col-lg-8"}`}>
                <CardGroup className="d-flex flex-column">
                    <CartItems editMode={editMode} order={order}/>
                </CardGroup>
            </section>
        </>
    );
};

export default OrderProducts;