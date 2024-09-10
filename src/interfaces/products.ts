import { IParamsDefault } from "./default";
import { IUser } from "./user";

export type ProductType = "perishable" | "not_perishable";
export interface IProductCreate {
  name: string;
  type: ProductType;
  quantity: number;
  weight: string;
  description: string;
  distribuitionPointId: string;
}

export interface IProductUpdate {
  name?: string;
  type?: ProductType;
  quantity?: number;
  weight?: string;
  description?: string;
}

export interface IProduct {
  id: string;
  name: string;
  type: ProductType;
  quantity: number;
  weight?: string;
  description?: string;
  creator?: IUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ISearchProducts extends IParamsDefault {
  distribuitionPointId?: string;
  type?: string;
}
