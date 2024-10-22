import { IParamsDefault } from "./default";
import { IUser } from "./user";

export type ProductType = "perishable" | "not_perishable";
export type StatusType = "requested" | "received";
export interface IProductCreate {
  name: string;
  type: ProductType;
  quantity: number;
  weight?: string | null;
  description: string;
  status: StatusType;
  distributionPointId: string;
}

export interface IProductUpdate {
  name?: string;
  type?: ProductType;
  quantity?: number;
  weight?: string | null;
  description?: string;
}

export interface IProduct {
  id: string;
  name: string;
  type: ProductType;
  status: "received" | "requested";
  quantity: number;
  weight?: string;
  description?: string;
  creator?: IUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ISearchProducts extends IParamsDefault {
  distributionPointId?: string;
  type?: string;
  status?: string;
}
