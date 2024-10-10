import { IParamsDefault } from "./default";

export interface IDemandPointCreate {
  coordinatorId: string;
  shelterId: string;
  collectionDate: string;
  collectPoint: ICollectPoint;
}

export interface IDemandPoint {
  id: string;
  coordinator: ICoordinator;
  shelterName: string;
  shelterId: string;
  processed: boolean;
  collectionDate: string;
  collectPoint: ICollectPointApi;
}

export interface IDemandPointUpdate {
  collectionDate?: string;
  collectPoint?: ICollectPointUpdate;
}

export interface ISearchDemandPoint extends IParamsDefault {}

interface ICoordinator {
  id: string,
  name: string;
  contact: string;
}

interface ICollectPoint {
  cep: string;
  estado: string;
  pais: string;
  municipio: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento?: string;
}

interface ICollectPointUpdate {
  cep?: string;
  estado?: string;
  pais?: string;
  municipio?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
}
 interface ICollectPointApi {
  cep: string;
  state: string;
  country: string;
  county: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
 }

 export interface IDeleteDemandPoint {
  userId: string
 }