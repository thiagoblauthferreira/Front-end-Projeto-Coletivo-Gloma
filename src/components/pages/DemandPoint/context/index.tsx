import React from "react";
import {
  IContextProvider,
  IDemandPointProvider
} from "./interface";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toastMessage } from "../../../../helpers/toast-message";
import { IDeleteDemandPoint, IDemandPoint, IDemandPointUpdate } from "../../../../interfaces/demand-point";
import { deleteDemandPointById, updateDemandPoint } from "../../../../services/demand-point.service";
import { formatterToIDemandPoint } from "../util/normalizeDemandPointAddres";

const DemandPointContext = React.createContext<IDemandPointProvider>(
  {} as IDemandPointProvider
);

export function DemandPointProvider({
  children,
  initialDemandPoint
}: IContextProvider) {
  const { id = "" } = useParams();
  const navigation = useNavigate();
  const filteredRef = React.useRef({});
  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [openModalConfirmActionDP, setOpenModalConfirmActionDP] =
    React.useState<boolean>(false);
  const [demandPoint, setDemandPoint] = React.useState<IDemandPoint>(
    initialDemandPoint
  );

  const updateDemandPointState = (data: IDemandPoint) => {  
    setDemandPoint((currentDemandPoint) => {
       return { ...currentDemandPoint, ...data };
    });
  };

  const handleFilter = async (filter: any) => {
    filteredRef.current = filter;

    try {
      setRequesting(true);
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleUpdateDemandPoint = async (data: IDemandPointUpdate) => {
  
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }
    try {
      setRequesting(true);  
      await updateDemandPoint(id, data);      
      const demandPointUpdate: IDemandPoint = formatterToIDemandPoint(data, demandPoint);
      updateDemandPointState(demandPointUpdate);
      toast.success("Ponto de demanda atualizado");
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleDeleteDemandPoint = async (
    demandPointId: string,
    userId: IDeleteDemandPoint
  ) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      setRequesting(true);
       await deleteDemandPointById(demandPointId, userId);

      setOpenModalConfirmActionDP(false);

      toast.success("Ponto de demanda deletado");
      navigation("/demands-point");
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <DemandPointContext.Provider
      value={{
        handleFilter,
        handleUpdateDemandPoint,
        setOpenModalConfirmActionDP,
        handleDeleteDemandPoint,
        updateDemandPointState,  
        openModalConfirmActionDP,   
        demandPoint,
        requesting,
      }}
    >
      {children}
    </DemandPointContext.Provider>
  );
}

export const useDemandPointProvider = () => {
  return React.useContext(DemandPointContext);
};
