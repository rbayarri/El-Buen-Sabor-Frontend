import {CookieProduct} from "./cookie-product.ts";
import {EntityReference} from "./entity-reference.ts";
import {Address} from "./address.ts";
import {PhoneNumber} from "./phone-number.ts";

export type PaymentMethod = "CASH" | "MERCADO_PAGO";

export type DeliveryMethod = "HOME_DELIVERY" | "LOCAL_PICKUP";

export interface CookieOrder {
    deliveryMethod?: DeliveryMethod;
    address?: string | EntityReference;
    phoneNumber?: string | EntityReference;
    paymentMethod?: PaymentMethod;
    orderDetails: CookieOrderDetail[];
    onChange?: (newOrder: CookieOrder) => void
}

export interface CookieOrderDetail {
    product: CookieProduct | undefined,
    quantity: number,
}

export interface Order {

    id: string,
    dateTime: string,
    address: Address,
    phoneNumber: PhoneNumber,
    deliveryMethod: DeliveryMethod,
    paymentMethod: PaymentMethod,
    paid: boolean,
    status: Status,
    orderDetails: OrderDetail[],
    cookingTime: number
    discount: number
}

export type Status = "PENDING" | "COOKING" | "READY" | "ON_THE_WAY" | "DELIVERY" | "DELIVERED" | "CANCELLED";

export interface OrderDetail {
    product: EntityReference,
    quantity: number,
    unitPrice: number,
    discount: number
}

export interface OrderBack {
    id: string,
    dateTime: string,
    address: Address,
    phoneNumber: PhoneNumber,
    deliveryMethod: DeliveryMethod,
    paymentMethod: PaymentMethod,
    paid: boolean,
    status: Status,
    orderDetails: OrderDetail[],
    cookingTime: number
    discount: number,
    user: {
        id: string,
        name: string,
        lastName: string
    }
}