interface Image {
  id: string;
  location: string;
}

interface User {
  username: string;
  name: string;
  lastName: string;
  image: Image;
}

interface Ingredient {
  id: string;
  name: string;
}

interface ProductDetails {
  ingredient: Ingredient;
  clientMeasurementUnit: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: Image;
  recipe: string;
  productDetails: ProductDetails[];
}

interface OrderDetail {
  product: Product;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  discount: number;
}

export default interface Order {
  id: string;
  dateTime: string;
  user: User;
  deliveryMethod: string;
  address: string;
  phoneNumber: string;
  paymentMethod: string;
  paid: boolean;
  status: string;
  discount: number;
  orderDetails: OrderDetail[];
  cookingTime: number;
  delayedMinutes: number;
  deliveryTime: number;
  totalTime: number;
}
