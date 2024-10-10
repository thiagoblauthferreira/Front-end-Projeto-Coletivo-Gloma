import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input, Select } from "../../../common";
import { IDemandPointCreate } from "../../../../interfaces/demand-point";
import { useAuthProvider } from "../../../../context/Auth";
import { useEffect, useState } from "react";
import { listShelterByCoordinator, listShelters } from "../../../../services/shelter.service";
import { toMapShelterWithIdAndName } from "../utils/mapShelter";


interface ITabDemandPoint {
  register: UseFormRegister<IDemandPointCreate>;
  errors: FieldErrors<IDemandPointCreate>;
}

interface ISelectOption {
  value: string;
  label: string;
}

export function TabDemandPoint({ register, errors }: ITabDemandPoint) {
  const { currentUser } = useAuthProvider();
  const [shelters, setShelters] = useState([])
  const [shelterOptions, setShelterOptions] = useState<ISelectOption[]>([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const response = await listShelterByCoordinator(currentUser.id);
          setShelters(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, [currentUser]);

  
  useEffect(() => {
    if (currentUser && shelters.length > 0) {
      const shelterMap = toMapShelterWithIdAndName(currentUser?.id, shelters);
      setShelterOptions(shelterMap)
    }
  }, [currentUser, shelters]);

  
  
  return (
    <div
      className={`
        grid grid-flow-row auto-rows-max
        gap-2
      `}
     >
      <Select
       options={shelterOptions}       
       label="Abrigo"
       {...register("shelterId")}
       errors={errors.shelterId} 
       />
      <Input
        label="Data da demanda:"  
        {...register("collectionDate")}
        errors={errors}     
        type="datetime-local"   
      />
    </div>
  );
}
