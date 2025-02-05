import { IAddress } from "./address";
import { typeRoles, typeStatus } from "./auth";
import { IShelter } from "./shelter";

export interface IUserCreate {
  name: string;
  email: string;
  username: string;
  password: string;
  address?: IAddress;
  phone?: string;
  birthDate?: Date;
  isDonor?: boolean;
  isCoordinator?: boolean;
  hasVehicle?: boolean;
  vehicleType?: string;
  color?: string;
  identifier?: string;
  brand?: string;
  status?: typeStatus;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  address: IAddress;
  phone: string;
  birthDate: Date;
  isDonor: boolean;
  isCoordinator: boolean;
  roles: typeRoles[];
  hasVehicle?: boolean;
  vehicleType?: string;
  status: typeStatus;
  shelter: IShelter;
}
