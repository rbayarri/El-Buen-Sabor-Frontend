import {Cart2} from "react-bootstrap-icons";
import {globalContext} from "../../routes/AppRoutes";
import {useContext} from "react"
import {Link} from "react-router-dom";

const CartButton = () => {

    const myContext = useContext(globalContext)

    if (!myContext.userContext.authenticated || myContext.userContext.role === "USER") {
        return (
            <div className="d-flex position-relative me-3">
                <Link to={"/pedido"}>
                    <Cart2 size={24} className="mt-1 ms-2 me-0 position-relative"/>
                </Link>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {myContext.order.orderDetails.filter(od => od.product !== undefined).map(od => od.quantity).reduce((acc, cur) => acc + cur, 0)}
        </span>
            </div>
        );
    }
    return <></>
};

export default CartButton;