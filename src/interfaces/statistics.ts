interface IProduct {
  name: string;
  qtd: number;
}

interface IProductFood {
  name: string;
  qtd: number;
  weight: number;
}

export interface IProductInventory {
  totalProducts: number;
  totalQuantityProducts: number;
  products: IProduct[];
  productsFood: IProductFood[];
}