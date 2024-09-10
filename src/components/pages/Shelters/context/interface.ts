import { IShelter, IShelterCreate } from "../../../../interfaces/shelter";
import { IUser } from "../../../../interfaces/user";
import { IPaginate } from "../../../common/Table/interface";

export interface ICoordinatorsInitialData {
  data: IUser[];
  total: number;
}

export interface IShelterProvider {
  handleUpdateShelter: (data: IShelterCreate) => void;
  handleFilter: (data: any) => void;
  handleCoordinators: (data: IPaginate) => void;
  setOpenModalConfirmActionS: (event: boolean) => void;
  setOpenModalRemoveCoordinator: (event: boolean) => void;
  handleDeleteShelter: (shelterId: string) => void;
  handleSubscribeShelter: () => void;
  handleRemoveCoordinator: (coordinatorid: string) => void;
  updateShelterState: (data: any) => void;
  shelter: IShelter;
  coordinators: ICoordinatorsInitialData;
  openModalConfirmActionS: boolean;
  openModalRemoveCoordinator: boolean;
  requesting: boolean;
}

export interface IContextProvider {
  children: React.ReactNode;
  initialShelter: IShelter;
  initialCoordinators: ICoordinatorsInitialData;
}
