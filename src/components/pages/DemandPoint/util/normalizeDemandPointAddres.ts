import { IDemandPoint, IDemandPointCreate, IDemandPointUpdate } from "../../../../interfaces/demand-point";

export const dataDemandPoint = (demandPoint: IDemandPoint): IDemandPointCreate => {
 
  return {    
    coordinatorId: demandPoint.coordinator.id,
    shelterId: demandPoint.shelterId,
    collectionDate: demandPoint.collectionDate, 
    collectPoint: {
      cep: demandPoint.collectPoint.cep,
      estado: demandPoint.collectPoint.state,
      pais: demandPoint.collectPoint.country,
      municipio: demandPoint.collectPoint.county,
      bairro: demandPoint.collectPoint.neighborhood,
      logradouro: demandPoint.collectPoint.street,
      numero: demandPoint.collectPoint.number,
      complemento: demandPoint.collectPoint.complement
    }
  };
};

export const formatterToIDemandPoint = (
  data: IDemandPointUpdate, 
  demandPoint:IDemandPoint
): IDemandPoint => { 
  return {    
      id: demandPoint.id,
      coordinator: {
        id: demandPoint.coordinator.id,
        name: demandPoint.coordinator.name,
        contact: demandPoint.coordinator.contact
      },
      processed: demandPoint.processed,
      shelterId: demandPoint.shelterId,
      shelterName: demandPoint.shelterName,
      collectionDate: data?.collectionDate || demandPoint.collectionDate,
      collectPoint: {
        cep: data?.collectPoint?.cep || demandPoint.collectPoint.cep,
        state: data?.collectPoint?.estado || demandPoint.collectPoint.state,
        country: data?.collectPoint?.pais || demandPoint.collectPoint.country,
        county: data?.collectPoint?.municipio || demandPoint.collectPoint.county,
        neighborhood: data?.collectPoint?.bairro || demandPoint.collectPoint.neighborhood,
        street: data?.collectPoint?.logradouro || demandPoint.collectPoint.street,
        number: data?.collectPoint?.numero || demandPoint.collectPoint.number,
        complement: data?.collectPoint?.complemento || demandPoint.collectPoint.complement
      }
    };
};

