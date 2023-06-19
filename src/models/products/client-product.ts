import {Image} from "../image.ts";
import {ProductDetail} from "../product-detail.ts";

export interface ClientProduct {
    id: string
    name: string,
    price: number,
    description: string,
    image: Image,
    stock: number,
    productDetails? : ProductDetail[]
}