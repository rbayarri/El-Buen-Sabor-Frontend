import { Orders } from "./orders";
import { Product } from "./product";

export interface OrdersDetail {
    id: string,
    orders: Orders,
    Product: Product,
    status: string
    
    }