import {EntityReference} from "../entity-reference.ts";

export interface NewEditCategory {
    id?: string,
    name: string,
    active: boolean,
    container: boolean,
    parent?: EntityReference
}