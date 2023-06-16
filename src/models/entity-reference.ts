import {Image} from "./cookie-product.ts";

export interface EntityReference {
    id: string,
    name?: string,
    image?: Image
}