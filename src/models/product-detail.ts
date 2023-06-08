import {EntityReference} from "./entity-reference.ts";

export interface ProductDetail {
    ingredient: EntityReference,
    clientMeasurementUnit: string,
    quantity: number
}