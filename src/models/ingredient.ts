interface Category {
  id: number;
  name: string;
}

export default interface ingredient {
  id: number;
  name: string;
  category: Category;
  minimumStock: number;
  measurementUnit: string;
  active: boolean;
  currentStock: number;
  lastCost: number;
}
