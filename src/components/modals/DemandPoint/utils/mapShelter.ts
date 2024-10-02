import { IShelter } from "../../../../interfaces/shelter";


export function toMapShelterWithIdAndName(userId: string, shelters: IShelter[]) {
  if (!Array.isArray(shelters)) {
    console.error("shelters não é um array", shelters);
    return [];  
  }

  const shelterByUser = shelters.filter(
    s => s.coordinators.some(c => c.id === userId)
  );

  
  return shelterByUser.map(shelter => ({
    value: shelter.id,  
    label: shelter.name, 
  }));
}
