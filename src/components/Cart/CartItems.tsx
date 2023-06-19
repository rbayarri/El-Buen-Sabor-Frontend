import CartItem from "./CartItem.tsx";
import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Order} from "../../models/order.ts";

const CartItems = (props: { editMode: boolean, order: Order | undefined }) => {

    const myContext = useContext(globalContext);
    const editMode = props.editMode;
    const order = props.order;

    return (
        <>
            {(order ? order.orderDetails : myContext.order.orderDetails).map(od => <CartItem orderDetail={od} editMode={editMode}/>)}
        </>
    );
};

export default CartItems;