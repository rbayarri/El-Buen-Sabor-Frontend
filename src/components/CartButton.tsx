import { Cart2 } from "react-bootstrap-icons";


const CartButton = () => {
  return (
    <div className="d-flex position-relative me-3">
      <Cart2 size={28} className="mt-1 ms-2 me-0 position-relative" />
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
    </div>
  );
};

export default CartButton;