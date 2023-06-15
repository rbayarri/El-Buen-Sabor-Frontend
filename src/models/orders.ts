import { Product } from "./product";

export interface Orders {
id: string,
dateTime: string,
Product: Product,
status: string
cookingTime: string
}