import { get, patch, post, del } from "./cg-api.service";
import {
  IDistribuitionPointCreate,
  IDistribuitionPointUpdate,
  ISearchDistribuitionPoint,
} from "../interfaces/distriuition-points";

export function listOneDistribuitionPoint(distribuitionPointId: string) {
  return get(`/distribuitionPoint/${distribuitionPointId}`);
}

export function createDistribuitionPoints(data: IDistribuitionPointCreate) {
  return post(`/distribuitionPoint`, { data });
}

export function updateDistribuitionPoints(
  distribuitionPointId: string,
  data: IDistribuitionPointUpdate
) {
  return patch(`/distribuitionPoint/${distribuitionPointId}`, { data });
}

export function listDistribuitionPoints(params: ISearchDistribuitionPoint) {
  return get(`/distribuitionPoint`, { params });
}

export function deleteDistribuitionPoint(distribuitionPointId: string) {
  return del(`/distribuitionPoint/${distribuitionPointId}`);
}
