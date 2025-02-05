import { IDeleteDemandPoint } from './../../../../interfaces/demand-point';
import { IDemandPoint, IDemandPointUpdate } from "../../../../interfaces/demand-point";


export interface IDemandPointProvider {
  handleFilter: (data: any) => void;
  handleUpdateDemandPoint: (data: IDemandPointUpdate) => void;
  handleDeleteDemandPoint: (demandPointId: string, userId: IDeleteDemandPoint) => void;
  updateDemandPointState: (data: any) => void;  
  setOpenModalConfirmActionDP: (event: boolean) => void;
  openModalConfirmActionDP: boolean;
  demandPoint: IDemandPoint;
  requesting: boolean;
}

export interface IContextProvider {
  children: React.ReactNode;
  initialDemandPoint: IDemandPoint;
}
