interface Category {
  id: number;
  name: string;
}

export default interface producto {
  id: number;
  name: string;
  category: Category;
  cookingTime: number;
  price: number;
  active: boolean;
}
