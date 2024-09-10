import { del, get, patch, post } from "./cg-api.service";
import {
  IAddOrRemoveCoordinator,
  ISearchShelter,
  IShelterCreate,
  IShelterUpdate,
} from "../interfaces/shelter";

export function listShelters(params: ISearchShelter) {
  return get(`/shelter`, { params });
}

export function listOneShelter(shelterId: string) {
  return get(`/shelter/${shelterId}`);
}

export function listCoordinators(shelterId: string, params?: any) {
  return get(`/shelter/${shelterId}/coordinators`, { params });
}

export function createShelter(data: IShelterCreate) {
  return post("/shelter", { data });
}

export function deleteShelter(shelterId: string) {
  return del(`/shelter/${shelterId}`);
}

export function updateShelter(shelterId: string, data: IShelterUpdate) {
  return patch(`/shelter/${shelterId}`, { data });
}

export function addCoordinator(shelterId: string, data: IAddOrRemoveCoordinator) {
  return patch(`/shelter/${shelterId}/coordinators`, {
    data: { action: "add", ...data },
  });
}

export function removeCoordinator(shelterId: string, data: IAddOrRemoveCoordinator) {
  return patch(`/shelter/${shelterId}/coordinators`, {
    data: { action: "remove", ...data },
  });
}
