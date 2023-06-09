import {EntityReference} from "./entity-reference.ts";

export default interface Ingredient {
    id: string;
    name: string;
    category: EntityReference;
    minimumStock: number;
    measurementUnit: string;
    active: boolean;
    currentStock: number;
    lastCost: number;
}
