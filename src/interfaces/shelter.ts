import { IAddress } from "./address";
import { IParamsDefault } from "./default";
import { IUser } from "./user";

export interface IShelterCreate {
  name: string;
  phone: string;
  description?: string;
  address: IAddress;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IShelterUpdate {
  phone: string;
  name: string;
  description?: string;
  address: IAddress;
}

export interface IShelter {
  id: string;
  name: string;
  phone: string;
  description?: string;
  address: IAddress;
  creator: IUser;
  coordinators: IUser[];
  isSubscribe: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IAddOrRemoveCoordinator {
  coordinatorId: string;
}

export interface ISearchShelter extends IParamsDefault {}
