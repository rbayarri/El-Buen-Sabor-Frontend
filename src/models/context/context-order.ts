import {DeliveryMethod, PaymentMethod} from "../../types/order-types.ts";
import {EntityReference} from "../entity-reference.ts";
import {ClientProduct} from "../products/client-product.ts";

export interface ContextOrder {
    deliveryMethod?: DeliveryMethod;
    address?: string | EntityReference;
    phoneNumber?: string | EntityReference;
    paymentMethod?: PaymentMethod;
    orderDetails: ContextOrderDetail[];
    onChange?: (newOrder: ContextOrder) => void
}

export interface ContextOrderDetail {
    product: ClientProduct | undefined,
    quantity: number,
}