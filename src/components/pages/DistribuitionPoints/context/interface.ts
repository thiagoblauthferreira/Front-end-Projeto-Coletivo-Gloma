import {
  IDistribuitionPoint,
  IDistribuitionPointCreate,
} from "../../../../interfaces/distriuition-points";
import {
  IProduct,
  IProductCreate,
  IProductUpdate,
} from "../../../../interfaces/products";
import { IPaginate } from "../../../common/Table/interface";

export interface IProductsInitialData {
  data: IProduct[];
  total: number;
}

export interface IDistribuitionPointProvider {
  setOpenModalProduct: (event: boolean) => void;
  setOpenModalUpdateProduct: (event: boolean) => void;
  setOpenModalConfirmActionDP: (event: boolean) => void;
  setOpenModalConfirmActionProduct: (event: boolean) => void;
  handleFilter: (data: any) => void;
  handleProducts: (data: IPaginate) => void;
  handleCreateProduct: (data: IProductCreate) => void;
  handleUpdateProduct: (productId: string, data: IProductUpdate) => void;
  handleDeleteProduct: (productId: string) => void;
  handleProduct: (productId: string) => Promise<IProduct>;
  handleUpdateDistribuitionPoint: (data: IDistribuitionPointCreate) => void;
  handleDeleteDistribuitionPoint: (distribuitionPointId: string) => void;
  updateDistribuitionPointState: (data: any) => void;
  openModalProduct: boolean;
  openModalUpdateProduct: boolean;
  openModalConfirmActionProduct: boolean;
  openModalConfirmActionDP: boolean;
  products: IProductsInitialData;
  distribuitionPoint: IDistribuitionPoint;
  requesting: boolean;
}

export interface IContextProvider {
  children: React.ReactNode;
  initialDistribuitionPoint: IDistribuitionPoint;
  initialProducts: IProductsInitialData;
}
