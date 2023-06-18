import {EntityReference} from "./entity-reference.ts";
import {Address} from "./users/address.ts";
import {PhoneNumber} from "./users/phone-number.ts";
import {Image} from "./image.ts";
import {ProductDetail} from "./product-detail.ts";
import {DeliveryMethod, PaymentMethod, Status} from "../types/order-types.ts";

export interface Order {

    id: string,
    dateTime: string,
    user?: OrderUser;
    address: Address,
    phoneNumber: PhoneNumber,
    deliveryMethod: DeliveryMethod,
    paymentMethod: PaymentMethod,
    paid: boolean,
    status: Status,
    orderDetails: OrderDetail[],
    discount: number
    cookingTime: number
    delayedMinutes?: number;
    deliveryTime?: number;
    totalTime: number;
}

export interface OrderDetail {
    product: EntityReference | Product,
    quantity: number,
    unitPrice: number,
    discount: number
}

interface OrderUser {
    username: string;
    name: string;
    lastName: string;
    image: Image;
}

interface Product {
    id: string;
    name: string;
    description: string;
    image: Image;
    recipe?: string;
    productDetails: ProductDetail[];
}