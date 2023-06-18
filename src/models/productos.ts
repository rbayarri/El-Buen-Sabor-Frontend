import { EntityReference } from "./entity-reference"

export interface Producto {

    id?: string
    name: string,
    price: string,
    description: string,
    image?: Image,
    category: EntityReference
}
interface Image {
    id: string,
    location: string
}