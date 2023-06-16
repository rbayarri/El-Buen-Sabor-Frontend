import {Card, Col} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import {CookieOrderDetail, OrderDetail} from "../models/order.ts";
import {useContext, useState} from "react";
import {globalContext} from "../routes/AppRoutes.tsx";
import {CookieProduct} from "../models/cookie-product.ts";

const CartItem = (props: { orderDetail: CookieOrderDetail | OrderDetail, editMode: boolean }) => {

    const {order} = useContext(globalContext);
    const [orderDetail, setOrderDetail] = useState<CookieOrderDetail | OrderDetail>(props.orderDetail);
    const editMode = props.editMode;
    const unitPrice = (orderDetail as OrderDetail).unitPrice ? (orderDetail as OrderDetail).unitPrice : ((orderDetail as CookieOrderDetail).product) ? (orderDetail as CookieOrderDetail).product!.price : 0;

    function updateContextAndState(newOrderDetail: { product: CookieProduct | undefined; quantity: number }) {
        const newOrder = {...order};
        const index = newOrder.orderDetails.findIndex(od => od.product?.id === orderDetail.product?.id);
        if (index !== -1) {
            newOrder.orderDetails[index] = newOrderDetail;
            if (order.onChange) {
                order.onChange(newOrder);
            }
        }
        setOrderDetail(newOrderDetail);
    }

    const addItem = () => {
        if (orderDetail.quantity < (orderDetail as CookieOrderDetail).product!.stock) {
            const newOrderDetail: CookieOrderDetail = {...orderDetail} as CookieOrderDetail;
            newOrderDetail.quantity += 1;
            updateContextAndState(newOrderDetail);
        }
    }

    const substractItem = () => {

        if (orderDetail.quantity > 1) {
            const newOrderDetail = {...orderDetail} as CookieOrderDetail;
            newOrderDetail.quantity -= 1;
            updateContextAndState(newOrderDetail);
        }
    }

    const deleteItem = () => {
        updateContextAndState({product: undefined, quantity: 0});
    }

    if (orderDetail.product !== undefined) {
        return (
            <Card className="d-flex flex-row border-0 align-items-center">
                <Col xl={2} lg={2} md={2} className={"p-3"}>
                    <Card.Img
                        src={orderDetail.product?.image?.location}/>
                </Col>
                <Col md="5" lg="5" xl="5">
                    <Card.Body>
                        <Card.Title>{orderDetail.product?.name}</Card.Title>
                        <Card.Text className="fw-bold">{unitPrice.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS'
                        })}
                        </Card.Text>
                    </Card.Body>
                </Col>
                <Col md="2" lg="2" xl="2"
                     className="d-flex flex-column justify-content-center align-items-center">
                    <div
                        className={`input-group ${editMode && "border"} d-flex align-items-center justify-content-center`}>
                        {editMode && <span className="input-group-text py-1" style={{cursor: "pointer"}}
                                           onClick={substractItem}>-</span>}
                        <span
                            className={`text-center ${editMode && "form-control form-control-sm "}border-0 fs-6 py-1`}>{orderDetail.quantity}</span>
                        {editMode && <span className="input-group-text py-1" style={{cursor: "pointer"}}
                                           onClick={addItem}>+</span>}
                    </div>
                    {editMode && <span
                        className="text-muted small">{(orderDetail as CookieOrderDetail).product?.stock} disponibles</span>}
                </Col>
                <Col md="3" lg="3" xl="3"
                     className={`d-flex justify-content-end align-items-center ${editMode && "pb-4"}`}>
                <span
                    className="fs-5 fw-bold me-3">{(orderDetail.quantity * unitPrice).toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS'
                })}</span>
                    {editMode && <DeleteIcon htmlColor={"gray"} fontSize="small" className="me-2 mt-1"
                                             style={{cursor: "pointer"}}
                                             onClick={deleteItem}/>}
                </Col>
            </Card>
        );
    }
    return <></>
};

export default CartItem;