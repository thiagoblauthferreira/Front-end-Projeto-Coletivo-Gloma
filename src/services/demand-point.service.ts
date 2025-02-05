import { IDeleteDemandPoint, IDemandPointCreate, IDemandPointUpdate, ISearchDemandPoint } from "../interfaces/demand-point";
import { del, get, post, patch } from "./cg-api.service";

export function createDemandPoint(data: IDemandPointCreate){
  return post(`/management/create`, { data })
}

export function listDemandsPoint(params: ISearchDemandPoint){
  return get(`/management/find-all`,  { params })
}

export function findDemandPointById(demandId: string){
  return get(`/management/${demandId}`);
}

export function deleteDemandPointById(
  demandId: string, 
  userId: IDeleteDemandPoint,
  { params, headers }: { params?: any, headers?: any } = {}
) {
 
  return del(`/management/${demandId}`, { 
    data: { userId },
    params, 
    headers 
  });
}

export async function updateDemandPoint(
  demandId: string,
  data: IDemandPointUpdate,
  { params, headers }: { params?: any, headers?: any } = {}
){

 return  patch(`/management/${demandId}`, { 
        data,
        params, 
        headers 
});
}
