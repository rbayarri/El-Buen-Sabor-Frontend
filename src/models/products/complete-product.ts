import {EntityReference} from "../entity-reference.ts";
import {ProductDetail} from "../product-detail.ts";
import {Image} from "../image.ts";
export interface CompleteProduct {
  id?: string,
  name: string,
  description: string,
  cookingTime: number,
  category: EntityReference,
  recipe?: string,
  active: boolean,
  profitMargin: number,
  productDetails: ProductDetail[]
  image?: Image
}
