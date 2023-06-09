import {EntityReference} from "./entity-reference.ts";
import {ProductDetail} from "./product-detail.ts";

interface Image {
  id: string,
  location: string
}

export interface Product {
  id: string,
  name: string,
  description: string,
  cookingTime: number,
  category: EntityReference,
  recipe: string,
  active: boolean,
  profitMargin: number,
  productDetails: ProductDetail[]
  image: Image | null
}
