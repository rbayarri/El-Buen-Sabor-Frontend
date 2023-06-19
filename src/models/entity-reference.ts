import {Image} from "./image.ts";

export interface EntityReference {
    id: string,
    name?: string,
    image?: Image
}